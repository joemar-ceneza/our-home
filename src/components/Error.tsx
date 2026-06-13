export default function Error({ message }: { message?: string }) {
  return (
    <div className="w-full h-[150px] flex justify-center items-center text-clay text-center font-semibold">
      {message ?? "Something went wrong while loading. Please try again."}
    </div>
  );
}
