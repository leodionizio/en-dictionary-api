export interface PaginationParams {
  limit: number;
  cursor?: string;
  direction?: 'next' | 'previous';
}

export interface CursorPagination<T> {
  results: T;
  totalDocs: number;
  previous: string;
  next: string;
  hasNext: boolean;
  hasPrev: boolean;
}
