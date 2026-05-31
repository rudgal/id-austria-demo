export type Awaitable<T> = T | Promise<T>;

export interface ServerSideComponentProp<
  Params = undefined,
  SearchParams = { [key: string]: string | string[] | undefined },
> {
  params: Awaitable<Params>;
  searchParams: Awaitable<SearchParams>;
}
