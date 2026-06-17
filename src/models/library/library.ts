import type { ReadingDirection } from "@yui540/comimi";

export type Book = {
  id: string;
  name: string;
  seriesId: string;
  seriesOrder: number;
  pages: Array<string>;
  readingDirection?: ReadingDirection;
};

export type SeriesBook = {
  id: string;
  name: string;
};

export type Series = {
  id: string;
  name: string;
  libraryOrder: number;
  books: Array<SeriesBook>;
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
