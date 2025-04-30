import React, { useEffect, useRef, useCallback, useState } from 'react';
import useConversation from '@/hooks/other/useConversation';
import SearchInTable from '@/components/TableComp/SearchInTable';
import { Link } from 'react-router-dom';

const Messenger = () => {
  const { conversations, setPage, pagination, error, loading, search, setSearch } = useConversation();
  const scrollRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const timeoutRef = useRef(null);






  const loadMore = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!loading && pagination?.has_more_pages && !isFetching) {
        setIsFetching(true);
        setPage(prev => prev + 1);
      }
    }, 300);
  }, [loading, pagination, setPage, isFetching]);

  const checkLoadMore = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return false;

    const containerNotFull = element.scrollHeight <= element.clientHeight;

    const nearBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 100;

    return (containerNotFull || nearBottom) && !loading && pagination?.has_more_pages;
  }, [loading, pagination]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (checkLoadMore()) {
      loadMore();
    }
  }, [checkLoadMore, loadMore]);

  // Initial load check
  useEffect(() => {
    if (checkLoadMore() && conversations.length > 0) {
      loadMore();
    }
  }, [checkLoadMore, conversations.length, loadMore]);

  // Set up scroll listener
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Set up resize observer
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      if (checkLoadMore()) {
        loadMore();
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [checkLoadMore, loadMore]);

  // Reset fetching state after load completes
  useEffect(() => {
    if (!loading) {
      setIsFetching(false);
    }
  }, [loading]);

  // Filter conversations
  const recentConversations = conversations.filter(conv => conv.last_message);
  const newConversations = conversations.filter(conv => !conv.last_message);

  if (error) {
    return (
      <div className="w-full px-8 mb-4 p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading conversations: {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 mb-4 p-6">
      <header className="mb-8 w-5/6 mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Messenger</h1>
        <p className="text-gray-600 mt-2">
          Connect and communicate with your patients
        </p>
      </header>

      <section className="bg-white rounded-xl shadow-sm border w-5/6 mx-auto border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Conversations</h2>
          <div className="w-64">
            <SearchInTable
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {conversations.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {recentConversations.map((conv) => (
                <li key={conv.id} className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                  <Link to={`${conv.id}`} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 relative">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {conv.name?.charAt(0) || 'U'}
                      </div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conv.name || 'Unknown User'}
                        </p>
                      </div>
                      <p className={`text-sm truncate ${conv.message_type === 'sent' ? "font-semibold text-gray-700" : "text-gray-500"}`}>
                        {conv.last_message?.message || 'No messages yet'}
                      </p>
                    </div>
                    {conv.message_type === 'sent' && (
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-xs text-white">
                        1
                      </span>
                    )}
                  </Link>
                </li>
              ))}

              {recentConversations.length > 0 && newConversations.length > 0 && (
                <hr className="border-gray-200" />
              )}

              {newConversations.map((conv) => (
                <li key={conv.id} className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                  <Link to={`${conv.id}`} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 relative">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {conv.name?.charAt(0) || 'N'}
                      </div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-300 ring-2 ring-white"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conv.name || 'New User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Click to start a conversation
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  </Link>
                </li>
              ))}

              {loading && (
                <li className="p-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </li>
              )}
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
              <p className="text-gray-500">
                {loading ? 'Loading conversations...' : 'No conversations found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Messenger;