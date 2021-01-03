import { Book } from './book.model';

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pageQuantity: number;
  data: Book[];
  filter: {};
  totalRows: number;
}
