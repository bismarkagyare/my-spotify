const Loader = ({ message }: { message?: string }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white/25">
      <div className="flex flex-col space-y-6 items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-600 border-t-transparent" />
        <span className="text-center text-white">{message}</span>
      </div>
    </div>
  );
};

export default Loader;
