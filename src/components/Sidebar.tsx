import React, { useState } from 'react';
import { Menu, LogOut, Home, Users, Settings, MessageCircle, BarChart, HelpCircle, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logout realizado com sucesso!');
      navigate('/login');
    } catch (error: any) {
      toast.error('Erro ao fazer logout. Tente novamente.');
    }
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Dashboard' },
    { icon: MessageCircle, label: 'Conversas' },
    { icon: Users, label: 'Equipe' },
    { icon: BarChart, label: 'Relatórios' },
    { icon: Settings, label: 'Configurações' },
    { icon: HelpCircle, label: 'Ajuda' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirmar Saída
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tem certeza que deseja sair do sistema?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0 w-48' : 'w-14'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Toggle */}
          <div className="flex items-center h-14 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={toggle}
              className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className={`flex-1 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'w-34 opacity-100' : 'w-0 opacity-0'}`}>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white font-['MuseoModerno'] logo-text truncate pl-0">
                nexo suporte
              </h1>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-2">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group relative h-11"
                >
                  <div className="w-14 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <span
                    className={`text-sm text-left transition-all duration-500 ease-in-out text-gray-600 dark:text-gray-300 ${
                      isOpen ? 'opacity-100 w-34' : 'opacity-0 w-0'
                    } overflow-hidden whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                  {/* Tooltip */}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group relative h-11"
          >
            <div className="w-14 flex items-center justify-center flex-shrink-0">
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <span
              className={`text-sm text-left transition-all duration-500 ease-in-out ${
                theme === 'dark' ? 'text-yellow-500' : 'text-gray-600'
              } ${
                isOpen ? 'opacity-100 w-34' : 'opacity-0 w-0'
              } overflow-hidden whitespace-nowrap`}
            >
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </span>
            {/* Tooltip */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
              </div>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group relative h-14"
          >
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span
              className={`text-sm text-left transition-all duration-500 ease-in-out text-red-600 ${
                isOpen ? 'opacity-100 w-34' : 'opacity-0 w-0'
              } overflow-hidden whitespace-nowrap`}
            >
              Sair
            </span>
            {/* Tooltip */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                Sair
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};