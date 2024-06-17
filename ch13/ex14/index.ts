export class PromisePool {
  private pool: Array<Promise<void>> = [];
  queue: (() => Promise<void>)[] = [];
  private queueSize: number;
  private maxRunningPromises: number;
  private loop: () => void = () => {
    const p = this.queue.pop();
    const next = p ? p() : new Promise((resolve) => setTimeout(resolve, 0));
    return next.then(this.loop);
  };
  private isStart: boolean = false;
  private isEnd: boolean = false;

  /**
   * Constructs PromisePool.
   *
   * @param queueSize the max size of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queueSize or maxRunningPromises is less than 1
   */
  constructor(queueSize: number, maxRunningPromises: number) {
    if (queueSize === 0 || maxRunningPromises === 0) {
      throw new Error("illegal argument");
    }
    this.queueSize = queueSize;
    this.maxRunningPromises = maxRunningPromises;
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start(): Promise<void> {
    if (this.isStart) {
      return Promise.reject();
    }
    this.isStart = true;
    for (let i = 0; i < this.maxRunningPromises; i++) {
      this.pool.push(Promise.resolve().then(this.loop));
    }
    return Promise.resolve();
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop(): Promise<void> {
    if (!this.isStart || this.isEnd) {
      return Promise.reject();
    }
    this.isEnd = true;
    this.loop = () => () => {
      const p = this.queue.pop();
      if (p) {
        return p()?.then(this.loop);
      }
    };
    for (let i = 0; i < this.maxRunningPromises; i++) {
      await this.pool[i];
    }
    return Promise.resolve();
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseFactory the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    if (!this.isStart || this.isEnd) {
      return Promise.reject();
    }
    const addTask: () => Promise<void> = () => {
      if (this.queue.length >= this.queueSize) {
        return new Promise((resolve) => setTimeout(resolve, 0)).then(addTask);
      } else {
        this.queue.push(promiseFactory);
        return Promise.resolve();
      }
    };
    return Promise.resolve().then(addTask);
  }
}
