import type { ReadingDirection } from "@yui540/comimi";

export type Book = {
  id: string;
  name: string;
  seriesId: string;
  seriesIndex: number;
  pages: Array<string>;
  readingDirection?: ReadingDirection;
};

export type Series = {
  id: string;
  name: string;
  libraryIndex: number;
  books: Array<{
    id: string;
    name: string;
  }>;
};

export type Library = {
  series: Array<{
    id: string;
    name: string;
  }>;
};

export type LatestBook = {
  id: string;
  seriesId: string;
  name: string;
  pageIndex: number;
};
