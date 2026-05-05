import {
  PaginationMetaDto,
  PaginatedResponseDto,
} from '../dto/api-response.dto';

export function paginate<T>(
  items: T[],
  page: number,
  limit: number,
): PaginatedResponseDto<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  const meta: PaginationMetaDto = { page, limit, total, totalPages };
  return { data, meta };
}
