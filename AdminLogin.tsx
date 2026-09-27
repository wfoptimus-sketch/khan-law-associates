import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { UserRole } from '../../types';
import { 
  Scale, 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { 
  getSupabaseConfig, 
  testSupabaseConnection, 
  sanitizeAndValidateSupabaseUrl, 
  isValidAnonKey 
} from '../../lib/supabase';

type AuthMode = 'login' | 'reset' | 'signup' | 'supabase_config';

export const AdminLogin: React.FC = () => {
  const { 
    loginWithEmail, 
    signUpWithEmail, 
    resetPassword, 
    setActiveView, 
    supabaseStatus, 
    checkSupabaseConnection,
    configureSupabaseOverride,
    showNotification 
  } = useChamber();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('super_admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Supabase Custom Config Form (filter out default placeholders from initial input)
  const currentConfig = getSupabaseConfig();
  const [customUrl, setCustomUrl] = useState(
    currentConfig.url && !currentConfig.url.includes('your-project') ? currentConfig.url : ''
  );
  const [customKey, setCustomKey] = useState(
    currentConfig.anonKey && !currentConfig.anonKey.includes('your-anon-key') ? currentConfig.anonKey : ''
  );
  const [testingConnection, setTestingConnection] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const res = await loginWithEmail(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unexpected login error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signUpWithEmail(email, password, fullName, role);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to create chamber account.');
      } else {
        setSuccessMessage('Chamber staff account registered successfully.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const res = await resetPassword(email);
      if (res.success) {
        setSuccessMessage(`Password recovery email dispatched to ${email}. Follow instructions in your inbox.`);
      } else {
        setErrorMessage(res.error || 'Could not send reset email.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Reset password error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim() && !customKey.trim()) {
      configureSupabaseOverride('', '');
      setSuccessMessage('Supabase credentials cleared. Running in local sandbox mode.');
      setErrorMessage('');
      return;
    }

    const validUrl = sanitizeAndValidateSupabaseUrl(customUrl);
    if (!validUrl) {
      setErrorMessage('Please provide a valid HTTP or HTTPS Supabase project URL (e.g. https://your-ref.supabase.co)');
      setSuccessMessage('');
      return;
    }

    if (!isValidAnonKey(customKey)) {
      setErrorMessage('Please provide a valid Supabase public Anon Key (minimum 20 characters).');
      setSuccessMessage('');
      return;
    }

    configureSupabaseOverride(validUrl, customKey.trim());
    setSuccessMessage('Supabase credentials saved and initialized successfully.');
    setErrorMessage('');
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    await checkSupabaseConnection();
    const res = await testSupabaseConnection();
    if (res.success) {
      setSuccessMessage('Database Connection Verified: Supabase PostgreSQL connected!');
      setErrorMessage('');
    } else {
      setErrorMessage(res.message);
      setSuccessMessage('');
    }
    setTestingConnection(false);
  };

  const handleCopySchemaNotice = () => {
    navigator.clipboard.writeText('Please inspect /supabase/schema.sql in the project repository.');
    setCopiedSql(true);
    showNotification('SQL Schema path copied. Run /supabase/schema.sql in Supabase SQL Editor.');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#071527] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-200">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="mx-auto w-14 h-14 bg-[#0B1F3A] border-2 border-[#C9A227] rounded-lg flex items-center justify-center text-[#C9A227] shadow-xl">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-wide">
          KHAN LAW ASSOCIATES
        </h2>
        <p className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
          Chamber Administrative Portal & CMS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#0B1F3A] py-8 px-6 sm:px-10 shadow-2xl rounded-xl border border-slate-700 space-y-6">
          
          {/* Header Row: Security & Supabase Status Badge */}
          <div className="border-b border-slate-700/80 pb-3 flex justify-between items-center text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>Chamber Security</span>
            </span>

            <button
              onClick={() => setMode('supabase_config')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono cursor-pointer transition-colors border ${
                supabaseStatus.isConnected
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700 hover:bg-emerald-900'
                  : 'bg-amber-950/80 text-amber-300 border-amber-700 hover:bg-amber-900'
              }`}
              title="Click to view Supabase database connection and migration status"
            >
              <Database className="w-3 h-3" />
              <span>{supabaseStatus.isConnected ? 'Supabase Live' : 'Supabase Setup'}</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-rose-950/70 border border-rose-700/80 text-xs text-rose-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-700/80 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. LOGIN MODE */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Authorized Advocate / Staff Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@khanlawassociates.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Account Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('reset');
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    className="text-[11px] text-[#C9A227] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C9A227] hover:bg-[#B58F1E] text-[#071527] font-bold py-3 rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate & Enter CMS'}</span>
              </button>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="hover:text-[#C9A227] flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Chamber Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('supabase_config')}
                  className="hover:text-[#C9A227] flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Database Setup</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTRATION MODE */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Legal Designation
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chamber Head / Legal Editor"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Authorized Chamber Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@khanlawassociates.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Security Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Account Privilege Level
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="super_admin">Super Administrator (Full Chamber Authority)</option>
                  <option value="editor">Legal Content Editor (Publishing & Articles)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C9A227] hover:bg-[#B58F1E] text-[#071527] font-bold py-2.5 rounded-lg text-sm transition-all cursor-pointer"
              >
                {isLoading ? 'Creating User Profile...' : 'Register Authorized Account'}
              </button>
            </form>
          )}

          {/* 3. PASSWORD RESET MODE */}
          {mode === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your chamber administrative email address. If an authorized account exists, Supabase will transmit a secure password recovery link.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@khanlawassociates.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C9A227] hover:bg-[#B58F1E] text-[#071527] font-bold py-2.5 rounded-lg text-sm shadow transition-all cursor-pointer"
              >
                {isLoading ? 'Sending Request...' : 'Send Password Reset Link'}
              </button>
            </form>
          )}

          {/* 4. SUPABASE DATABASE CONFIGURATION & SQL MIGRATION VIEW */}
          {mode === 'supabase_config' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Login</span>
                </button>
                <span className="font-mono text-[11px] text-[#C9A227]">
                  PostgreSQL / Supabase Engine
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-200">Current Connection Status:</div>
                <div className="text-slate-400 leading-relaxed">
                  {supabaseStatus.message}
                </div>
              </div>

              <form onSubmit={handleSaveSupabaseConfig} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="text"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#C9A227]"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Never input the service_role key into browser clients.
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#173B6C] hover:bg-[#204a85] text-white py-2 rounded text-xs font-semibold cursor-pointer border border-[#2d5d9e]"
                  >
                    Save Project Credentials
                  </button>

                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testingConnection}
                    className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer border border-slate-700"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                    <span>Test</span>
                  </button>
                </div>
              </form>

              {/* Schema migration path & helper */}
              <div className="pt-2 border-t border-slate-700/80 space-y-2">
                <span className="text-slate-400 block font-semibold">
                  Database Schema Migration:
                </span>
                <p className="text-[11px] text-slate-400 leading-normal">
                  The complete SQL migration script with 14 tables, Row Level Security (RLS) policies, and storage bucket definitions is available in <code className="bg-slate-900 px-1 py-0.5 rounded text-[#C9A227]">/supabase/schema.sql</code>.
                </p>
                <button
                  type="button"
                  onClick={handleCopySchemaNotice}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 text-slate-300 text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{copiedSql ? 'Schema Reference Copied!' : 'Copy SQL Schema Reference'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Return to Public Website */}
          <div className="pt-2 text-center border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveView('public')}
              className="text-xs text-slate-400 hover:text-[#C9A227] flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span>← Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
