const Loading = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loading;
  