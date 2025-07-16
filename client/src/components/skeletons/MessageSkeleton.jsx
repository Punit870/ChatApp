const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isOwn = idx % 2 !== 0;
        return (
          <div
            key={idx}
            className={`flex items-start gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
          >
            {!isOwn && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
              </div>
            )}

            <div className="flex flex-col space-y-2 max-w-xs">
              <div className="h-4 w-16 bg-zinc-200 rounded animate-pulse" />
              <div className="h-16 w-[200px] bg-zinc-200 rounded animate-pulse" />
            </div>

            {isOwn && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
