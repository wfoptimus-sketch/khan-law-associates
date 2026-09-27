import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Scale, 
  TrendingUp, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  MessageSquareQuote, 
  Inbox, 
  PhoneCall, 
  Image as ImageIcon, 
  Search, 
  Settings, 
  History, 
  UserCheck, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Shield,
  Layers
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    currentUser, 
    logout, 
    activeTab, 
    setActiveTab, 
    setActiveView,
    consultationRequests,
    settings,
    supabaseStatus
  } = useChamber();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Unread / new consultation count
  const newRequestsCount = consultationRequests.filter(r => r.status === 'new').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage & Hero', icon: <Home className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Information', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'practice-areas', label: 'Practice Areas', icon: <Scale className="w-4 h-4" /> },
    { id: 'team', label: 'Our Legal Team', icon: <Users className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience & Stats', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'expertise-services', label: 'Expertise & Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'blog', label: 'Legal Insights (Blog)', icon: <FileText className="w-4 h-4" /> },
    { id: 'consultations', label: 'Consultation Requests', icon: <Inbox className="w-4 h-4" />, badge: newRequestsCount },
    { id: 'faqs', label: 'FAQs Management', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Client Feedback', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO Settings', icon: <Search className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'revisions', label: 'Revision History', icon: <History className="w-4 h-4" /> },
    { id: 'users', label: 'Users & Database', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#0B1F3A] text-white p-4 flex justify-between items-center border-b border-[#173B6C] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#C9A227]" />
          <span className="font-serif-title font-bold text-sm tracking-wide">
            {settings.brandName} CMS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('public')}
            className="p-1.5 text-xs bg-slate-800 rounded text-slate-300"
            title="Preview Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-200 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#071527] text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 z-20 md:min-h-screen`}
      >
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0B1F3A] border border-[#C9A227] rounded flex items-center justify-center text-[#C9A227] shadow">
                <Scale className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h2 className="font-serif-title text-sm font-bold text-white tracking-wide truncate">
                  {settings.brandName}
                </h2>
                <span className="text-[10px] text-[#C9A227] uppercase tracking-wider block truncate">
                  Admin CMS
                </span>
              </div>
            </div>
          </div>

          {/* User badge */}
          {currentUser && (
            <div className="p-3 mx-3 my-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 capitalize flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#C9A227]" />
                  <span>{currentUser.role === 'super_admin' ? 'Super Admin' : 'Editor'}</span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log out of CMS"
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#173B6C] text-white font-semibold shadow-sm border border-[#234E8A]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#C9A227]' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[#C9A227] text-[#071527] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Action: Switch to Live Public Website & Supabase Status */}
        <div className="p-4 border-t border-slate-800 space-y-2.5">
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full py-1.5 px-2.5 rounded text-[11px] font-mono flex items-center justify-between border cursor-pointer ${
              supabaseStatus.isConnected
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 border-amber-800 text-amber-300 hover:bg-amber-900/60'
            }`}
            title="Supabase Database Status - Click to inspect or sync"
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${supabaseStatus.isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{supabaseStatus.isConnected ? 'Supabase Live' : 'Supabase Setup'}</span>
            </span>
            <span className="text-[10px] text-slate-400">Manage →</span>
          </button>

          <button
            onClick={() => setActiveView('public')}
            className="w-full bg-[#0B1F3A] hover:bg-[#173B6C] text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer shadow"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Content Area */}
      <main className="flex-1 min-w-0 bg-slate-50 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
              Khan Law Associates CMS
            </span>
            <h1 className="font-serif-title text-xl sm:text-2xl font-bold text-[#0B1F3A]">
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
              supabaseStatus.isConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${supabaseStatus.isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{supabaseStatus.isConnected ? 'PostgreSQL Connected' : 'Supabase Offline Mode'}</span>
            </span>

            <button
              onClick={() => setActiveView('public')}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Live Website Preview</span>
            </button>
          </div>
        </header>

        {/* Render child component */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>

    </div>
  );
};
