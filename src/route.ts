import { createBrowserRouter } from "react-router";

import { LDefault } from "@/layouts/l-default";
import { VBook, loaderVBook } from "@/views/v-book";
import { VLibrary, loaderVLibrary } from "@/views/v-library";
import { VSeries, loaderVSeries } from "@/views/v-series";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LDefault,
    children: [
      { index: true, Component: VLibrary, loader: loaderVLibrary },
      { path: "series/:seriesId", Component: VSeries, loader: loaderVSeries },
      {
        path: "series/:seriesId/book/:bookId",
        Component: VBook,
        loader: loaderVBook,
      },
    ],
  },
]);
