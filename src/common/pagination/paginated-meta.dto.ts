import { ApiProperty } from '@nestjs/swagger'

export class PaginatedMetaDto {
  @ApiProperty({
    description: 'Number of items on the current page',
  })
  itemCount: number

  @ApiProperty({
    description: 'Total number of available items',
  })
  totalItems: number

  @ApiProperty({
    description: 'Number of items per page',
  })
  itemsPerPage: number

  @ApiProperty({
    description: 'Total number of pages',
  })
  totalPages: number

  @ApiProperty({
    description: 'Current page number',
  })
  currentPage: number
}
