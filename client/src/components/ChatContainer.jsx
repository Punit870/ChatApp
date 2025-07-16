import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef (null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwnMessage && (
                <div className="flex-shrink-0 mr-2">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                </div>
              )}

              <div className="max-w-xs">
                <div className="flex items-center mb-1 space-x-1">
                  <time className="text-xs text-gray-500">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div
                  className={`rounded-lg px-3 py-2 ${
                    isOwnMessage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>

              {isOwnMessage && (
                <div className="flex-shrink-0 ml-2">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
