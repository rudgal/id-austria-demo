// see discussion https://github.com/vercel/next.js/discussions/46131
export interface ServerSideComponentProp<
  Params = undefined,
  SearchParams = { [key: string]: string | string[] | undefined },
> {
  params: Params;
  searchParams: SearchParams;
}
