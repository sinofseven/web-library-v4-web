import { createBrowserRouter } from "react-router";

import { LDefault } from "@/layouts/l-default";
import { VLibrary } from "@/views/v-library";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LDefault,
    children: [{ index: true, Component: VLibrary }],
  },
]);
