export function TailwindBreakpointHelper() {
  return (
    <div className="fixed bottom-0 right-0 z-50 m-[20px] flex size-7 cursor-none items-center justify-center rounded-full border-2 border-gray-300 bg-rose-500 font-mono text-sm font-bold text-white sm:bg-cyan-500 md:bg-amber-500 lg:bg-lime-500 xl:bg-sky-500 2xl:bg-fuchsia-500">
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
      <div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
      <div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
    </div>
  );
}
