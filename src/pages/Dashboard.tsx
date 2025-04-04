import React, { useState, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatMessage } from '../components/ChatMessage';
import { ChatListItem } from '../components/ChatListItem';
import { Send, Paperclip, Smile, Search, Users, ChevronDown, ArrowRightCircle, Trash2 } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<number>(1);
  const [chatFilter, setChatFilter] = useState<'all' | 'mine'>('mine');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showResolveMenu, setShowResolveMenu] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setShowResolveMenu(false));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const departments = [
    { id: 'all', name: 'Todos os Departamentos' },
    { id: 'tech', name: 'Suporte Técnico' },
    { id: 'sales', name: 'Vendas' },
    { id: 'finance', name: 'Financeiro' },
    { id: 'hr', name: 'Recursos Humanos' },
  ];

  const chats = [
    {
      id: 1,
      name: "João Silva",
      lastMessage: "Obrigado pelo suporte!",
      timestamp: "14:30",
      unreadCount: 2,
      department: 'tech',
      isMyChat: true,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      lastMessage: "Consegui resolver o problema",
      timestamp: "13:45",
      department: 'sales',
      isMyChat: false,
    },
    {
      id: 3,
      name: "Carlos Santos",
      lastMessage: "Pode me ajudar com uma dúvida?",
      timestamp: "12:20",
      unreadCount: 1,
      department: 'tech',
      isMyChat: true,
    },
    {
      id: 4,
      name: "Ana Souza",
      lastMessage: "O sistema está funcionando perfeitamente agora",
      timestamp: "11:15",
      department: 'finance',
      isMyChat: false,
    },
  ];

  const filteredChats = chats.filter(chat => {
    const matchesDepartment = selectedDepartment === 'all' || chat.department === selectedDepartment;
    const matchesChatFilter = chatFilter === 'all' || (chatFilter === 'mine' && chat.isMyChat);
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesChatFilter && matchesSearch;
  });

  const messages = [
    { id: 1, message: 'Olá, como posso ajudar?', timestamp: '10:30', isOutgoing: false },
    { id: 2, message: 'Estou com um problema no sistema', timestamp: '10:31', isOutgoing: true },
    { id: 3, message: 'Pode me descrever melhor o problema?', timestamp: '10:32', isOutgoing: false },
    { id: 4, message: 'Claro! Quando tento acessar a página principal, recebo um erro de conexão', timestamp: '10:33', isOutgoing: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      
      <main 
        className="flex-1 flex" 
        style={{ 
          marginLeft: isSidebarOpen ? '192px' : '56px',
          padding: '8px'
        }}
      >
        <div className="flex gap-2 w-full">
          {/* Chat List (Area 1) */}
          <div className="w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[calc(100vh-16px)]">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {/* Chat Type Filter */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setChatFilter('mine')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chatFilter === 'mine'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Users className="w-4 h-4 inline-block mr-2" />
                  Meus Chats
                </button>
                <button
                  onClick={() => setChatFilter('all')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chatFilter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Users className="w-4 h-4 inline-block mr-2" />
                  Todos
                </button>
              </div>

              {/* Department Filter */}
              <div className="mb-3">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  name={chat.name}
                  lastMessage={chat.lastMessage}
                  timestamp={chat.timestamp}
                  unreadCount={chat.unreadCount}
                  isActive={activeChat === chat.id}
                  onClick={() => setActiveChat(chat.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Chat Area (Area 2) */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[calc(100vh-16px)]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {chats.find(chat => chat.id === activeChat)?.name || 'Chat de Suporte'}
              </h2>

              <div className="relative" ref={dropdownRef}>
                <div className="flex">
                  <button
                    onClick={() => setShowResolveMenu(!showResolveMenu)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-l-lg border-r border-blue-600"
                  >
                    RESOLVER
                  </button>
                  <button
                    onClick={() => setShowResolveMenu(!showResolveMenu)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded-r-lg flex items-center"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top ${
                    showResolveMenu 
                      ? 'opacity-100 transform scale-y-100 max-h-[200px]' 
                      : 'opacity-0 transform scale-y-0 max-h-0'
                  }`}
                >
                  <button
                    onClick={() => {
                      // Handle transfer
                      setShowResolveMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ArrowRightCircle className="w-4 h-4" />
                    Transferir
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                      setShowResolveMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isOutgoing={msg.isOutgoing}
                />
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};