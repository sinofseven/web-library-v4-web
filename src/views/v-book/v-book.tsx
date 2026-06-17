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
import type { Book, LatestBook, Series, SeriesBook } from "@/models/library";
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
        {createInfoBlock(book, series, seriesId)}
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

function createInfoBlock(book: Book, series: Series | null, seriesId: string) {
  function resolveBetweenBooks(): [SeriesBook | null, SeriesBook | null] {
    if (series == null) {
      return [null, null];
    }

    const currentSeriesIndex = series.books.findIndex((x) => x.id === book.id);
    if (currentSeriesIndex === -1) {
      return [null, null];
    }

    const previousBook: SeriesBook | undefined =
      series.books[currentSeriesIndex - 1];
    const nextBook: SeriesBook | undefined =
      series.books[currentSeriesIndex + 1];

    return [
      previousBook == null ? null : previousBook,
      nextBook == null ? null : nextBook,
    ];
  }

  const rowSeries =
    series == null ? null : (
      <tr>
        <th>Series</th>
        <td>{series.name}</td>
      </tr>
    );

  const [previousBook, nextBook] = resolveBetweenBooks();

  const rowPreviousBook =
    previousBook == null ? null : (
      <tr>
        <th>Previous Book</th>
        <td>
          <Link
            to={`/series/${seriesId}/book/${previousBook.id}`}
            reloadDocument
          >
            {previousBook.name}
          </Link>
        </td>
      </tr>
    );
  const rowNextBook =
    nextBook == null ? null : (
      <tr>
        <th>Next Book</th>
        <td>
          <Link to={`/series/${seriesId}/book/${nextBook.id}`} reloadDocument>
            {nextBook.name}
          </Link>
        </td>
      </tr>
    );

  return (
    <table className="table is-fullwidth is-striped">
      <tbody>
        <tr>
          <th>Title</th>
          <td>{book.name}</td>
        </tr>
        {rowSeries}
        {rowNextBook}
        {rowPreviousBook}
      </tbody>
    </table>
  );
}
