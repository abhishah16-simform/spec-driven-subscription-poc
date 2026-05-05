import { paginate } from './pagination';

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

  it('returns the first page with default-like params (page=1, limit=10)', () => {
    const result = paginate(items, 1, 10);
    expect(result.data).toHaveLength(10);
    expect(result.data[0]).toEqual({ id: 1 });
    expect(result.data[9]).toEqual({ id: 10 });
    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  it('returns the second page correctly', () => {
    const result = paginate(items, 2, 10);
    expect(result.data).toHaveLength(10);
    expect(result.data[0]).toEqual({ id: 11 });
    expect(result.data[9]).toEqual({ id: 20 });
    expect(result.meta.page).toBe(2);
    expect(result.meta.total).toBe(25);
    expect(result.meta.totalPages).toBe(3);
  });

  it('returns the last partial page', () => {
    const result = paginate(items, 3, 10);
    expect(result.data).toHaveLength(5);
    expect(result.data[0]).toEqual({ id: 21 });
    expect(result.data[4]).toEqual({ id: 25 });
    expect(result.meta.totalPages).toBe(3);
  });

  it('returns empty data for a page beyond the last page', () => {
    const result = paginate(items, 4, 10);
    expect(result.data).toHaveLength(0);
    expect(result.meta.total).toBe(25);
    expect(result.meta.totalPages).toBe(3);
  });

  it('returns all items when limit exceeds total', () => {
    const result = paginate(items, 1, 100);
    expect(result.data).toHaveLength(25);
    expect(result.meta.totalPages).toBe(1);
  });

  it('returns empty data and zero totalPages for an empty collection', () => {
    const result = paginate([], 1, 10);
    expect(result.data).toHaveLength(0);
    expect(result.meta.total).toBe(0);
    expect(result.meta.totalPages).toBe(0);
  });

  it('respects a custom limit', () => {
    const result = paginate(items, 1, 5);
    expect(result.data).toHaveLength(5);
    expect(result.meta.totalPages).toBe(5);
  });
});
