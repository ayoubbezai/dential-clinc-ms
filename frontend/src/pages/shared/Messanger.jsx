import useConversation from '@/hooks/other/useConversation';
import React from 'react';

const Messenger = () => {
  const { conversations, setPage, pagination, page } = useConversation();
  const conversationList = Array.isArray(conversations) ? conversations : [];

  console.log(conversations);
  console.log(pagination);
  return (
    <div className="w-full px-8 mb-4 p-6">
      <button onClick={() => setPage(page + 1)}>add</button>
      <header className="mb-8 w-5/6 mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Messenger</h1>
        <p className="text-gray-600 mt-2">
          Connect and communicate with your patients
        </p>
      </header>

      <section className="bg-white rounded-xl shadow-sm border w-5/6 mx-auto border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Conversations</h2>
        </div>

        {conversationList.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {/* Recent Conversations */}
            {recentConversations.map((conv) => (
              <li
                key={conv.conversation_id}
                className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {conv.user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-300 ring-2 ring-white"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conv.user?.name || 'Unknown User'}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.last_message || 'No messages yet'}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-xs text-white">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </li>
            ))}

            {/* New Conversations Separator */}
            {newConversations.length > 0 && (
              <>
                <hr className="border-gray-200" />
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500">New connections</p>
                </div>
              </>
            )}

            {/* New Conversations */}
            {newConversations.map((conv) => (
              <li
                key={conv.user?.id || 'new-' + Math.random()}
                className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {conv.user?.name?.charAt(0) || 'N'}
                    </div>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-300 ring-2 ring-white"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conv.user?.name || 'New User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Click to start a conversation
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    New
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500">No conversations found</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Messenger;