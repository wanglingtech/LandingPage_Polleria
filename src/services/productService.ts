import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export const productService = {
  /**
   * Retrieves all products.
   * Can be swapped for an async fetch('/api/products') in the future.
   */
  async getAll(): Promise<Product[]> {
    return [...PRODUCTS];
  },

  async getById(id: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.id === id);
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.slug === slug);
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    if (categoryId === 'todos') {
      return [...PRODUCTS];
    }
    return PRODUCTS.filter((p) => p.category === categoryId);
  },

  async getFeatured(): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.featured || p.popular);
  },

  async getRelated(currentProductId: string, limit = 4): Promise<Product[]> {
    const current = PRODUCTS.find((p) => p.id === currentProductId);
    if (!current) return PRODUCTS.slice(0, limit);

    // Prefer same category or related items (papas, chaufa, combos, gaseosa)
    const related = PRODUCTS.filter(
      (p) => p.id !== currentProductId && (p.category === current.category || p.popular)
    );
    return related.slice(0, limit);
  },

  async search(query: string, categoryId = 'todos', favoritesOnly = false, favoriteIds: string[] = []): Promise<Product[]> {
    let result = [...PRODUCTS];

    if (favoritesOnly) {
      result = result.filter((p) => favoriteIds.includes(p.id));
    }

    if (categoryId !== 'todos') {
      result = result.filter((p) => p.category === categoryId);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.includes.some((inc) => inc.toLowerCase().includes(q))
      );
    }

    return result;
  },
};
