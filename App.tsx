import React, { useEffect } from 'react';
import { ChamberProvider, useChamber } from './context/ChamberContext';
import { PublicWebsite } from './components/public/PublicWebsite';
import { AdminPortal } from './components/admin/AdminPortal';
import { CheckCircle2, AlertCircle, Info, Sliders, ExternalLink } from 'lucide-react';

const ChamberApp: React.FC = () => {
  const { activeView, setActiveView, notification, currentUser } = useChamber();

  // Listen to path or hash changes (/admin or #admin)
  useEffect(() => {
    const handleRoute = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin');
      const isHashAdmin = window.location.hash.startsWith('#admin') || window.location.hash.startsWith('#/admin');
      if (isPathAdmin || isHashAdmin) {
        setActiveView('admin');
      }
    };
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, [setActiveView]);

  // Synchronize browser URL bar when view changes
  useEffect(() => {
    if (activeView === 'admin') {
      if (!window.location.pathname.startsWith('/admin') && window.location.hash !== '#admin') {
        window.history.pushState({ view: 'admin' }, '', '#admin');
      }
    } else {
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        window.history.pushState({ view: 'public' }, '', window.location.pathname.startsWith('/admin') ? '/' : ' ');
      }
    }
  }, [activeView]);

  return (
    <div className="relative min-h-screen bg-white text-[#1A1A1A]">
      
      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 text-xs sm:text-sm font-medium ${
            notification.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : notification.type === 'info'
              ? 'bg-[#0B1F3A] text-white border-slate-700'
              : 'bg-emerald-900 text-white border-emerald-800'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main View: Public Website or Admin CMS */}
      {activeView === 'admin' ? (
        <AdminPortal />
      ) : (
        <PublicWebsite />
      )}

      {/* Floating Mode Switcher Button (Subtle & Professional) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setActiveView(activeView === 'admin' ? 'public' : 'admin')}
          className="bg-[#0B1F3A]/90 hover:bg-[#0B1F3A] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg border border-slate-700/80 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
          title="Switch between Public Website and Secure CMS"
        >
          <Sliders className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>
            {activeView === 'admin' ? 'Return to Public Site' : 'Admin CMS Portal'}
          </span>
          {currentUser && activeView !== 'admin' && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Admin Logged In"></span>
          )}
        </button>
      </div>

    </div>
  );
};

export default function App() {
  return (
    <ChamberProvider>
      <ChamberApp />
    </ChamberProvider>
  );
}
