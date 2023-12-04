export interface PaginationRequestQuery {
  skip: number;
  limit: number;
}

export function onGetPaginationParams({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
}): PaginationRequestQuery {
  return {skip: (page - 1) * limit, limit: Number(limit)};
}
