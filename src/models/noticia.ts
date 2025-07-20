import { ItemNoticia } from "./itemNoticia";

export interface Noticia {
  page: number;
  nextPage: number;
  previousPage: number;
  showingTo: number;
  totalPages: number;
  count: number;
  items: ItemNoticia[];
}