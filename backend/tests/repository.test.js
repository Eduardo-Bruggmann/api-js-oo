import { describe, expect, it, vi } from 'vitest'
import Repository from '../src/repositories/Repository.js'

class TestRepository extends Repository {
  constructor(database) {
    super(database, 'test')
  }
}

describe('Repository', () => {
  it('paginates findAll results and returns metadata', async () => {
    const database = {
      test: {
        findMany: vi.fn().mockResolvedValue([{ id: 3 }]),
        count: vi.fn().mockResolvedValue(12),
      },
    }
    const repository = new TestRepository(database)

    const result = await repository.findAll({
      page: '2',
      limit: '2',
      author_id: '1',
    })

    expect(database.test.findMany).toHaveBeenCalledWith({
      where: { author_id: 1 },
      skip: 2,
      take: 2,
    })
    expect(database.test.count).toHaveBeenCalledWith({
      where: { author_id: 1 },
    })
    expect(result).toEqual({
      data: [{ id: 3 }],
      meta: {
        page: 2,
        limit: 2,
        total: 12,
        totalPages: 6,
      },
    })
  })

  it('uses safe default pagination values', async () => {
    const database = {
      test: {
        findMany: vi.fn().mockResolvedValue([]),
        count: vi.fn().mockResolvedValue(0),
      },
    }
    const repository = new TestRepository(database)

    await repository.findAll({ page: 'invalid', limit: '999' })

    expect(database.test.findMany).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 100,
    })
  })
})
