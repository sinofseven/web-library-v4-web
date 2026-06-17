import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router";

import { CLoadingMessage } from "@/components/c-loading-message";
import type { Series } from "@/models/library";

import { loaderVSeries } from "./loader-v-series";

export function VSeries() {
  const { promiseSeries, seriesId } = useLoaderData<typeof loaderVSeries>();

  const headerWhenUnresolved = (
    <>
      <nav className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Library</Link>
          </li>
          <li className="is-active">
            <span className="pl-3">series: xxx</span>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );

  function elementFallback() {
    return (
      <>
        {headerWhenUnresolved}
        <CLoadingMessage />
      </>
    );
  }

  function elementAwait(series: Series | null) {
    if (series === null) {
      return (
        <>
          {headerWhenUnresolved}
          <article className="message is-warning">
            <div className="message-header">
              <p>Not Found</p>
            </div>
            <div className="message-body p-5">
              Series `{seriesId}` is not found.
            </div>
          </article>
        </>
      );
    }

    const rows = series.books.map((x) => {
      return (
        <tr key={x.id}>
          <td>
            <Link to={`/series/${seriesId}/book/${x.id}`}>{x.name}</Link>
          </td>
        </tr>
      );
    });

    return (
      <>
        <nav className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Library</Link>
            </li>
            <li className="is-active">
              <span className="pl-3">series: {series.name}</span>
            </li>
          </ul>
        </nav>
        <hr />
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>{series.name}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </>
    );
  }

  function elementError() {
    return (
      <>
        {headerWhenUnresolved}
        <article className="message is-danger">
          <div className="message-header">
            <p>Failed to fetch series</p>
          </div>
          <div className="message-body p-5">
            Failed to fetch series ({seriesId}).
          </div>
        </article>
      </>
    );
  }

  return (
    <Suspense fallback={elementFallback()}>
      <Await resolve={promiseSeries} errorElement={elementError()}>
        {elementAwait}
      </Await>
    </Suspense>
  );
}
