class BaseDataSource {
  constructor() {
    if (new.target === BaseDataSource) {
      throw new TypeError('Cannot construct BaseDataSource instances directly');
    }
  }

  applyFilters(data: T[]): Partial<T>[] {
    let result = data;

    // Apply filtering
    if (this.filter) {
      result = result.filter(item =>
        Object.entries(this.filter!).every(
          ([key, value]) => item[key as keyof T] === value
        )
      );
    }

    // Apply sorting
    if (this.orderBy) {
      result = result.sort((a, b) => {
        for (const { field, direction } of this.orderBy!) {
          if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
          if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Apply pagination
    if (this.pagination) {
      const { page, pageSize } = this.pagination;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      result = result.slice(start, end);
    }

    // Apply limit
    if (this.limit !== undefined) {
      result = result.slice(0, this.limit);
    }

    // Apply select (projection)
    if (this.select) {
      result = result.map(item => {
        const selectedItem: Partial<T> = {};
        this.select!.forEach(key => {
          selectedItem[key] = item[key];
        });
        return selectedItem;
      });
    }

    return result;
  }

  async get(id) {
    throw new Error("Method 'get' must be implemented.");
  }

  async getAll(filter = {}) {
    throw new Error("Method 'getAll' must be implemented.");
  }

  async add(item) {
    throw new Error("Method 'add' must be implemented.");
  }

  async update(id, data) {
    throw new Error("Method 'update' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented.");
  }
}

export default BaseDataSource;
