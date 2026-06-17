import type { LoaderFunctionArgs } from "react-router";

import { fetchBook, fetchSeries } from "@/usecases";

type Params = {
  seriesId: string;
  bookId: string;
};

export async function loaderVBook(args: LoaderFunctionArgs) {
  const { seriesId, bookId } = args.params as Params;

  return {
    promiseSeries: fetchSeries(seriesId),
    promiseBook: fetchBook(bookId),
    seriesId,
    bookId,
  };
}
