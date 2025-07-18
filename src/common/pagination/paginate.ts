import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm'
import { PaginatedResult } from './paginated-result.interface'

export async function paginate<T extends ObjectLiteral>(repo: Repository<T>, page: number, limit: number, options: FindManyOptions<T> = {}): Promise<PaginatedResult<T>> {
  const [items, total] = await repo.findAndCount({
    ...options,
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    items,
    meta: {
      itemCount: items.length,
      totalItems: total,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    },
  }
}
