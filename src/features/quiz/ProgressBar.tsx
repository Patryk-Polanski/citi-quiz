export default function ProgressBar() {
  return (
    <>
      <div className="mt-4 grid h-[14px] w-full grid-cols-[24] overflow-hidden rounded-md">
        <span className="rounded-md border-[1px] border-solid border-white bg-green-600" />
        <span className="rounded-md border-[1px] border-solid border-white bg-green-600" />
        <span className="rounded-md border-[1px] border-solid border-white bg-red-600" />
        <span className="rounded-md border-[1px] border-solid border-white bg-green-600" />
        <span className="col-start-5 col-end-[25] rounded-md bg-white/30" />
      </div>
    </>
  );
}
