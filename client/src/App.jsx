import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('form'); // 'form' | 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    !!localStorage.getItem('adminToken')
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    setView('form');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mini Header Nav for testing views */}
      <nav className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center shadow-sm">
        <span className="font-bold text-gray-800 tracking-wide text-md">She Can Assignment</span>
        <div className="space-x-2">
          <button
            onClick={() => setView('form')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
              view === 'form' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Public Form
          </button>
          <button
            onClick={() => setView('admin')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
              view === 'admin' ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Admin Panel
          </button>
        </div>
      </nav>

      {/* View Routing Conditional Engine */}
      <main className="p-4 md:p-8">
        {view === 'form' && <ContactForm />}
        
        {view === 'admin' && (
          !isAdminAuthenticated ? (
            <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
          ) : (
            <AdminDashboard onLogout={handleLogout} />
          )
        )}
      </main>
    </div>
  );
}

export default App;