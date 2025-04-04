import React from 'react';
import { Link } from 'react-router-dom';
import { Headset, MessageSquare, Shield, Users, MessageCircle } from 'lucide-react';

export const LandingPage = () => {
  const openWhatsApp = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${formattedPhone}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="font-['MuseoModerno'] logo-text">nexo suporte</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
          Transforme seu suporte técnico com inteligência e eficiência
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Começar Agora
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            Fazer Login
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chat WhatsApp Integrado</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Atendimento direto pelo WhatsApp com integração completa
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Segurança Avançada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proteção de dados e conformidade com LGPD
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-equipes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gerencie múltiplas equipes de suporte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Básico</h3>
              <p className="text-4xl font-bold mb-6">R$ 99<span className="text-lg">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ 3 Agentes</li>
                <li>✓ Chat WhatsApp</li>
                <li>✓ Relatórios Básicos</li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Começar Grátis
              </Link>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Profissional</h3>
              <p className="text-4xl font-bold mb-6">R$ 199<span className="text-lg">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ 10 Agentes</li>
                <li>✓ Chat WhatsApp</li>
                <li>✓ Relatórios Avançados</li>
                <li>✓ API de Integração</li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition"
              >
                Escolher Plano
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Empresarial</h3>
              <p className="text-4xl font-bold mb-6">R$ 399<span className="text-lg">/mês</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Agentes Ilimitados</li>
                <li>✓ Chat WhatsApp</li>
                <li>✓ Relatórios Personalizados</li>
                <li>✓ Suporte 24/7</li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Falar com Vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => openWhatsApp('12974060613')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Suporte: (12) 97406-0613</span>
              </button>
              <button
                onClick={() => openWhatsApp('12996807562')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comercial: (12) 9 9680-7562</span>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Desenvolvido por{' '}
              <a
                href="https://emasoftware.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold font-['MuseoModerno']"
              >
                ema-software
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};