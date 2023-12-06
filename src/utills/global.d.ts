declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {}
  }
}

declare module 'mongoose' {
  interface UpdateWriteOpResult {
    nModified?: number;
  }
}
