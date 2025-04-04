import React from 'react';
import { Check } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isOutgoing: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, timestamp, isOutgoing }) => {
  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOutgoing
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
        }`}
      >
        <p className="break-words">{message}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">{timestamp}</span>
          {isOutgoing && <Check className="w-4 h-4 opacity-70" />}
        </div>
      </div>
    </div>
  );
};