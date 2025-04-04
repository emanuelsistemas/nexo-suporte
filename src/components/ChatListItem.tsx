import React from 'react';
import { User, Check } from 'lucide-react';

interface ChatListItemProps {
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isActive?: boolean;
  avatarUrl?: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  lastMessage,
  timestamp,
  unreadCount,
  isActive,
  avatarUrl
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/20'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
            {timestamp}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {lastMessage}
          </p>
          {unreadCount ? (
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {unreadCount}
            </span>
          ) : (
            <Check className="w-4 h-4 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};