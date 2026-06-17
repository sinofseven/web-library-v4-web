import type { LoaderFunctionArgs } from "react-router";

import { fetchSeries } from "@/usecases";

type Params = {
  seriesId: string;
};

export async function loaderVSeries(args: LoaderFunctionArgs) {
  const { seriesId } = args.params as Params;
  return {
    promiseSeries: fetchSeries(seriesId),
    seriesId,
  };
}
