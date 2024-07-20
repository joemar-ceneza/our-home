export default function SpinnerLoader() {
  return (
    <div className="max-w-full h-[150px] mx-auto flex justify-center items-center transform">
      <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-14 w-14"></div>
    </div>
  );
}
