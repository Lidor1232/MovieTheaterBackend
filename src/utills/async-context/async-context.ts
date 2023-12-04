import {AsyncLocalStorage} from 'async_hooks';

interface StorageOptions {
  requestId: string;
}

export const context = new AsyncLocalStorage<StorageOptions>();
