/* eslint-disable @typescript-eslint/no-explicit-any */
const DEFAULT_CACHE_DURATION = 1000 * 60 * 1; // 1 minutes

/**
 * A function that accept any number of arguments
 */
type GenericFn<Args extends any[], Result> = (...args: Args) => Result;

export type CacheOptions = { duration?: number; tags?: string[] };

type FunctionCacheItem<T> = {
  value: T;
  expireAt: number;
};

type GlobalCacheItem<T = any> = {
  value: Map<string, FunctionCacheItem<T>>;
  tags: Set<string>;
};

export type CacheApi = {
  cache: <Args extends any[], Result>(
    fn: GenericFn<Args, Result>,
    options?: CacheOptions,
  ) => GenericFn<Args, Result>;

  clearByTags: (tags: string[]) => void;
};

export class CacheUtils implements CacheApi {
  private readonly globalCache: Map<unknown, GlobalCacheItem> = new Map<
    unknown,
    GlobalCacheItem
  >();

  public cache<Args extends any[], Result>(
    fn: GenericFn<Args, Result>,
    options?: CacheOptions,
  ) {
    const { duration = DEFAULT_CACHE_DURATION, tags = [] } = options ?? {};

    let gcItem = this.globalCache.get(fn);
    if (!gcItem) {
      gcItem = {
        value: new Map(),
        tags: new Set(tags),
      };
      this.globalCache.set(fn, gcItem);
    }

    const cachedFn: typeof fn = (...args) => {
      const now = Date.now();
      const key = JSON.stringify(args);
      const fnCache = gcItem.value;
      let fcItem: FunctionCacheItem<Result> | undefined = fnCache.get(key);

      // return cached value, if not expired
      if (fcItem !== undefined && fcItem.expireAt > now) {
        return fcItem.value;
      }

      // cache miss, calling the original function and save the result to cache
      const result = fn(...args);
      fcItem = {
        value: result,
        expireAt: now + duration,
      };
      fnCache.set(key, fcItem);

      // if result is a rejected promise, remove it from cache
      if (result instanceof Promise) {
        result.catch(() => {
          setTimeout(() => fnCache.delete(key), 10);
        });
      }

      return result;
    };

    return cachedFn;
  }

  public clearByTags(tags: string[]): void {
    for (const gcItem of this.globalCache.values()) {
      // if an item of the global cache contain tags
      const hasTag = tags.some((tag) => gcItem.tags.has(tag));
      if (hasTag) {
        // clear function cache
        gcItem.value.clear();
      }
    }
  }
}

export const cacheUtils = new CacheUtils();
