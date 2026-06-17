import { type MouseEvent, Suspense } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router";

import { CLoadingMessage } from "@/components/c-loading-message";
import type { LatestBook, Library } from "@/models/library";
import { putReadingProgress } from "@/unsafe-usecases/put-reading-progress";

import { loaderVLibrary } from "./loader-v-library";

export function VLibrary() {
  const { promiseLibrary, promiseLatest } =
    useLoaderData<typeof loaderVLibrary>();
  const navigate = useNavigate();

  function elementAwait([library, latestBook]: [Library, LatestBook | null]) {
    function createLatestBlock() {
      if (latestBook === null) {
        return null;
      }

      const series = library.series.find((x) => x.id === latestBook.seriesId);

      const url = `/series/${latestBook.seriesId}/book/${latestBook.id}`;

      const handleOnCLick = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await putReadingProgress(latestBook.id, latestBook.pageIndex);
        navigate(url);
      };

      return (
        <table className="table is-fullwidth mb-5">
          <thead>
            <tr>
              <th colSpan={3}>Latest road book</th>
            </tr>
            <tr>
              <th>series</th>
              <th>book</th>
              <th>page</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{series?.name}</td>
              <td>
                <Link to={url} onClick={handleOnCLick}>
                  {latestBook.name}
                </Link>
              </td>
              <td>
                <Link to={url} onClick={handleOnCLick}>
                  P{latestBook.pageIndex + 1}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    const rowsSeries = library.series.map((x) => (
      <tr key={x.id}>
        <td>
          <Link to={`/series/${x.id}`}>{x.name}</Link>
        </td>
      </tr>
    ));

    return (
      <>
        {createLatestBlock()}
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>series</th>
            </tr>
          </thead>
          <tbody>{rowsSeries}</tbody>
        </table>
      </>
    );
  }

  function elementError() {
    return (
      <article className="message is-danger">
        <div className="message-header">
          <p>Failed Load</p>
        </div>
        <div className="message-body">
          <p>ロードに失敗しました。</p>
        </div>
      </article>
    );
  }

  return (
    <>
      <nav className="breadcrumb">
        <ul>
          <li className="is-active">Library</li>
        </ul>
      </nav>
      <hr />
      <Suspense fallback={<CLoadingMessage />}>
        <Await
          resolve={Promise.all([promiseLibrary, promiseLatest])}
          errorElement={elementError()}
        >
          {elementAwait}
        </Await>
      </Suspense>
    </>
  );
}
