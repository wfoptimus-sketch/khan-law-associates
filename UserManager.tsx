import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  KeyRound, 
  Download, 
  Upload, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle,
  Database,
  RefreshCw,
  Copy,
  ExternalLink,
  UserPlus,
  Lock,
  Layers,
  FileCode2
} from 'lucide-react';
import { 
  getSupabaseConfig, 
  testSupabaseConnection, 
  sanitizeAndValidateSupabaseUrl, 
  isValidAnonKey 
} from '../../lib/supabase';

export const UserManager: React.FC = () => {
  const { 
    currentUser, 
    exportDatabaseJson, 
    importDatabaseJson, 
    resetToDefaults, 
    showNotification,
    updatePassword,
    signUpWithEmail,
    supabaseStatus,
    checkSupabaseConnection,
    syncDataToSupabase,
    configureSupabaseOverride
  } = useChamber();

  // Password Update
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  // New Staff Registration
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffRole, setStaffRole] = useState<UserRole>('editor');
  const [staffRegistering, setStaffRegistering] = useState(false);

  // Supabase Project Config (filter out default placeholder from initial input)
  const config = getSupabaseConfig();
  const [supaUrl, setSupaUrl] = useState(
    config.url && !config.url.includes('your-project') ? config.url : ''
  );
  const [supaKey, setSupaKey] = useState(
    config.anonKey && !config.anonKey.includes('your-anon-key') ? config.anonKey : ''
  );
  const [testingDb, setTestingDb] = useState(false);
  const [syncingDb, setSyncingDb] = useState(false);
  const [showSqlViewer, setShowSqlViewer] = useState(false);

  // JSON Import
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  const handleDownloadBackup = () => {
    const json = exportDatabaseJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khan-law-associates-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Complete chamber database downloaded as JSON');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const ok = importDatabaseJson(importJsonText);
    if (ok) {
      setImportJsonText('');
      setShowImportArea(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all data to verified default credentials? This replaces all existing edits with verified empty placeholders.')) {
      resetToDefaults();
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    setPasswordUpdating(true);
    const res = await updatePassword(newPassword);
    setPasswordUpdating(false);
    if (res.success) {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleRegisterStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffEmail.trim() || !staffPassword || !staffName.trim()) {
      showNotification('All fields required for staff registration', 'error');
      return;
    }
    setStaffRegistering(true);
    const res = await signUpWithEmail(staffEmail, staffPassword, staffName, staffRole);
    setStaffRegistering(false);
    if (res.success) {
      setStaffName('');
      setStaffEmail('');
      setStaffPassword('');
    }
  };

  const handleSaveSupabaseCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supaUrl.trim() && !supaKey.trim()) {
      configureSupabaseOverride('', '');
      showNotification('Supabase override cleared. Running in local sandbox mode.');
      return;
    }

    const validUrl = sanitizeAndValidateSupabaseUrl(supaUrl);
    if (!validUrl) {
      showNotification('Please enter a valid HTTP or HTTPS Supabase project URL (e.g. https://xyz.supabase.co)', 'error');
      return;
    }

    if (!isValidAnonKey(supaKey)) {
      showNotification('Please enter a valid Supabase public Anon Key (minimum 20 characters).', 'error');
      return;
    }

    configureSupabaseOverride(validUrl, supaKey.trim());
    showNotification('Supabase project credentials saved and initialized.');
  };

  const handleTestDatabase = async () => {
    setTestingDb(true);
    await checkSupabaseConnection();
    const res = await testSupabaseConnection();
    setTestingDb(false);
    if (res.success) {
      showNotification('Supabase PostgreSQL database connected successfully!');
    } else {
      showNotification(res.message, 'error');
    }
  };

  const handleSyncToSupabase = async () => {
    setSyncingDb(true);
    await syncDataToSupabase();
    setSyncingDb(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* 1. Current User Session Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              Active Administrative Session
            </h2>
            <p className="text-xs text-slate-500">Authenticated user details and privilege level</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="capitalize">{currentUser?.role === 'super_admin' ? 'Super Admin' : 'Editor'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-0.5">User Identity:</span>
            <span className="font-bold text-slate-900">{currentUser?.name || 'Chamber Administrator'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-0.5">Authorized Email:</span>
            <span className="font-mono text-slate-900">{currentUser?.email || 'admin@khanlawassociates.com'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-0.5">Backend Engine:</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <Database className="w-3 h-3 text-[#C9A227]" />
              <span>{supabaseStatus.isConnected ? 'Supabase Live' : 'Local / Offline'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Supabase Cloud Database & PostgreSQL Backend Management */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#C9A227]" />
              <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
                Supabase Backend & PostgreSQL Database
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Row Level Security, cloud storage, authentication, and persistent chamber tables
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1.5 ${
              supabaseStatus.isConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${supabaseStatus.isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{supabaseStatus.isConnected ? 'PostgreSQL Connected' : 'Configuration Pending'}</span>
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-semibold text-[#0B1F3A]">Status Details:</div>
          <p className="font-mono text-slate-600 bg-white p-2.5 rounded border border-slate-200">
            {supabaseStatus.message}
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSaveSupabaseCredentials} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="url"
                value={supaUrl}
                onChange={(e) => setSupaUrl(e.target.value)}
                placeholder="https://xyzproject.supabase.co"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Public Anon Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="text"
                value={supaKey}
                onChange={(e) => setSupaKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded text-xs font-semibold cursor-pointer shadow-xs transition-colors"
            >
              Save Project Credentials
            </button>

            <button
              type="button"
              onClick={handleTestDatabase}
              disabled={testingDb}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-300 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingDb ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>

            <button
              type="button"
              onClick={handleSyncToSupabase}
              disabled={syncingDb || !supabaseStatus.isConnected}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{syncingDb ? 'Syncing Tables...' : 'Sync Website Content to Supabase'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSqlViewer(!showSqlViewer)}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <FileCode2 className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{showSqlViewer ? 'Hide Schema Instructions' : 'View SQL Schema & RLS'}</span>
            </button>
          </div>
        </form>

        {/* SQL Schema helper drawer */}
        {showSqlViewer && (
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-3 text-xs border border-slate-700">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="font-bold text-[#C9A227]">Supabase Schema & RLS Script</span>
              <span className="font-mono text-[11px] text-slate-400">/supabase/schema.sql</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              To prepare a clean Supabase database, copy and run the complete migration script in your Supabase project&apos;s <strong>SQL Editor</strong>. It establishes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
              <li>All 14 tables: profiles, settings, sections, team, practice_areas, articles, consultations, etc.</li>
              <li>Strict Row Level Security (RLS) on every table (public can read published items; public can only insert consultations; admins have full management).</li>
              <li>Storage bucket <code>chamber-media</code> with public view and authenticated upload policies.</li>
              <li>Updated_at triggers for automatic timestamp tracking.</li>
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('Please run /supabase/schema.sql in your Supabase SQL Editor.');
                  showNotification('Schema reference copied! Open /supabase/schema.sql to view full SQL.');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-3 py-1.5 rounded text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Copy File Path Reference</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Security Password Change (Real Supabase Auth) */}
      <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
            Update Account Security Password
          </h2>
          <p className="text-xs text-slate-500">Update your authenticated Supabase login password</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password (min 6 characters)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full text-xs px-3.5 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={passwordUpdating}
          className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>{passwordUpdating ? 'Updating Password...' : 'Update Password'}</span>
        </button>
      </form>

      {/* 4. Register New Chamber Staff User */}
      {currentUser?.role === 'super_admin' && (
        <form onSubmit={handleRegisterStaff} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
              Add Chamber Staff / Editor Account
            </h2>
            <p className="text-xs text-slate-500">
              Provision an authorized account with Supabase Authentication and Role-Based Access Control
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="e.g. Legal Research Associate"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                placeholder="associate@khanlawassociates.com"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Password</label>
              <input
                type="password"
                required
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                placeholder="Temporary password"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Privilege Role</label>
              <select
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value as UserRole)}
                className="text-xs px-3 py-2 rounded border border-slate-300 bg-white"
              >
                <option value="editor">Legal Content Editor (Articles, FAQ, Practice Areas)</option>
                <option value="super_admin">Super Administrator (Full Chamber Authority)</option>
              </select>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                disabled={staffRegistering}
                className="bg-[#C9A227] hover:bg-[#b8921e] text-[#071527] px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{staffRegistering ? 'Registering...' : 'Provision Staff Account'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 5. Role Permissions Matrix */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
            Role-Based Access Control (RBAC) Specification
          </h2>
          <p className="text-xs text-slate-500">Security boundaries between Super Admin and Editor roles</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3">Permission / Capability</th>
                <th className="p-3 text-center">Super Admin</th>
                <th className="p-3 text-center">Legal Editor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-3">Manage Website Settings & Global Contact Coordinates</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
                <td className="p-3 text-center text-rose-500 font-bold">✕ Restricted</td>
              </tr>
              <tr>
                <td className="p-3">Manage Practice Areas & Verified Advocate Profiles</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
              </tr>
              <tr>
                <td className="p-3">Publish Legal Articles & Blog Insights</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
              </tr>
              <tr>
                <td className="p-3">Access Confidential Consultation Inquiries (CRM)</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Granted</td>
                <td className="p-3 text-center text-amber-600 font-bold">Assigned only</td>
              </tr>
              <tr>
                <td className="p-3">Restore Historical Revisions & Database Reset</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓ Full Control</td>
                <td className="p-3 text-center text-rose-500 font-bold">✕ Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Database Backup & Disaster Recovery */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="font-serif-title text-base font-bold text-[#0B1F3A]">
            Chamber Database Portability & JSON Backup
          </h2>
          <p className="text-xs text-slate-500">
            Export entire website state as JSON or restore from external backup file
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownloadBackup}
            className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow transition-colors"
          >
            <Download className="w-4 h-4 text-[#C9A227]" />
            <span>Download Database JSON Backup</span>
          </button>

          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import Database JSON</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="border border-rose-200 hover:bg-rose-50 text-rose-700 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Verified Defaults</span>
          </button>
        </div>

        {showImportArea && (
          <form onSubmit={handleImportSubmit} className="space-y-3 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Paste JSON Backup Content Below:
            </label>
            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON database payload here..."
              className="w-full text-xs font-mono p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportArea(false)}
                className="px-3 py-1.5 rounded border border-slate-300 text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0B1F3A] text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                Restore JSON State
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
