import { MangaViewer } from "@yui540/comimi-react";
import type {
  Manga,
  MangaViewerHandle,
  ViewerEventMap,
  ViewerSettings,
} from "@yui540/comimi-react";
import { Suspense, useRef } from "react";
import { Await, Link, useLoaderData } from "react-router";

import { CLoadingMessage } from "@/components/c-loading-message";
import type { Book, LatestBook, Series } from "@/models/library";
import { putLatest } from "@/usecases";
import { DOMAIN_IMAGE } from "@/variables";

import { loaderVBook } from "./loader-v-book";

export function VBook() {
  const { promiseBook, promiseSeries, seriesId, bookId } =
    useLoaderData<typeof loaderVBook>();
  const handler = useRef<MangaViewerHandle>(null);

  const message = (
    <article className="message is-danger">
      <div className="message-header">
        <p>本の情報取得に失敗しました</p>
      </div>
      <div className="message-body">本に情報取得に失敗しました。</div>
    </article>
  );

  function elementAwait([book, series]: [Book | null, Series | null]) {
    if (book === null) {
      if (series === null) {
        return (
          <>
            {message}
            <hr />
            <nav className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">Library</Link>
                </li>
                <li>
                  <Link to={`/series/${seriesId}`}>Series: unknown</Link>
                </li>
                <li className="is-active">
                  <span className="pl-3">Book: unknown</span>
                </li>
              </ul>
            </nav>
          </>
        );
      } else {
        return (
          <>
            {message}
            <hr />
            <nav className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">Library</Link>
                </li>
                <li>
                  <Link to={`/series/${seriesId}`}>Series: {series.name}</Link>
                </li>
                <li className="is-active">
                  <span className="pl-3">Book: unknown</span>
                </li>
              </ul>
            </nav>
          </>
        );
      }
    }

    async function handlePageChange({
      pageIndex,
    }: ViewerEventMap["pageChange"]) {
      console.log(`page change: ${pageIndex}`);
      const latest: LatestBook = {
        id: bookId,
        seriesId: seriesId,
        name: book!.name,
        pageIndex: pageIndex,
      };
      await putLatest(latest);
    }

    const manga: Manga = {
      id: bookId,
      title: book.name,
      pages: book.pages.map((path) => {
        const url = `https://${DOMAIN_IMAGE}/${path}`;
        return {
          id: path,
          type: "image",
          src: url,
        };
      }),
    };
    const setting: Partial<ViewerSettings> = {
      theme: "dark",
      readingDirection:
        book.readingDirection == null ? "rtl" : book.readingDirection,
    };

    return (
      <>
        <MangaViewer
          manga={manga}
          settings={setting}
          ref={handler}
          onPageChange={handlePageChange}
        />
        <hr />
        <nav className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Library</Link>
            </li>
            <li>
              <Link to={`/series/${seriesId}`}>
                Series: {series === null ? "xxx" : series.name}
              </Link>
            </li>
            <li className="is-active">
              <span className="pl-3">Book: {book.name}</span>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  function elementError() {
    return (
      <>
        {message}
        <hr />
        <nav className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Library</Link>
            </li>
            <li>
              <Link to={`/series/${seriesId}`}>Series: xxx</Link>
            </li>
            <li className="is-active">
              <span className="is-active">Book: xxx</span>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  return (
    <Suspense fallback={<CLoadingMessage />}>
      <Await
        resolve={Promise.all([promiseBook, promiseSeries])}
        errorElement={elementError()}
      >
        {elementAwait}
      </Await>
    </Suspense>
  );
}
