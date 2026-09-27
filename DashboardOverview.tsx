import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { 
  Users, 
  Scale, 
  FileText, 
  Inbox, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    practiceAreas, 
    team, 
    articles, 
    consultationRequests, 
    revisions,
    setActiveTab,
    updateConsultationRequest,
    exportDatabaseJson,
    showNotification
  } = useChamber();

  const publishedAreas = practiceAreas.filter(p => p.status === 'published').length;
  const publishedAdvocates = team.filter(t => t.status === 'published').length;
  const publishedArticles = articles.filter(a => a.status === 'published').length;
  const draftArticles = articles.filter(a => a.status === 'draft').length;
  const newRequests = consultationRequests.filter(r => r.status === 'new');

  const handleDownloadBackup = () => {
    const json = exportDatabaseJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khan-law-associates-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Database backup downloaded successfully');
  };

  return (
    <div className="space-y-8">
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Consultation Requests */}
        <div 
          onClick={() => setActiveTab('consultations')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#173B6C] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                New Consultations
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif-title text-[#0B1F3A]">
                  {newRequests.length}
                </span>
                <span className="text-xs text-slate-400">
                  / {consultationRequests.length} total
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-[#C9A227] group-hover:bg-[#0B1F3A] transition-colors">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-3 text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1">
            <span>Manage Client Requests</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* Practice Areas */}
        <div 
          onClick={() => setActiveTab('practice-areas')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#173B6C] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Practice Areas
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif-title text-[#0B1F3A]">
                  {publishedAreas}
                </span>
                <span className="text-xs text-slate-400">
                  of {practiceAreas.length} active
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-[#173B6C] group-hover:bg-[#173B6C] group-hover:text-white transition-colors">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-3 text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1">
            <span>Edit Practice Scopes</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* Team Members */}
        <div 
          onClick={() => setActiveTab('team')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#173B6C] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Advocates Enrolled
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif-title text-[#0B1F3A]">
                  {publishedAdvocates}
                </span>
                <span className="text-xs text-slate-400">
                  profiles active
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-3 text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1">
            <span>Manage Advocates & Bar Info</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* Legal Insights */}
        <div 
          onClick={() => setActiveTab('blog')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#173B6C] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Legal Insights Articles
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif-title text-[#0B1F3A]">
                  {publishedArticles}
                </span>
                <span className="text-xs text-slate-400">
                  ({draftArticles} drafts)
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-3 text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1">
            <span>Write & Publish Commentary</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
            Quick Chamber Management Actions
          </h3>
          <p className="text-xs text-slate-500">
            Rapid access to create content or update chamber configuration
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('team')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Add Advocate Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('practice-areas')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Add Practice Area</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Write Legal Article</span>
          </button>

          <button
            onClick={handleDownloadBackup}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Database JSON</span>
          </button>
        </div>
      </div>

      {/* Grid: Recent Consultations & Audit Snapshots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Consultations Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
                Recent Inbound Consultation Requests
              </h3>
              <p className="text-xs text-slate-500">
                Client submissions needing chamber advocate review
              </p>
            </div>
            <button
              onClick={() => setActiveTab('consultations')}
              className="text-xs font-semibold text-[#0B1F3A] hover:underline"
            >
              View All ({consultationRequests.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Client & Phone</th>
                  <th className="p-3.5">Legal Matter</th>
                  <th className="p-3.5">Preferred Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {consultationRequests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{req.fullName}</div>
                      <div className="text-slate-500">{req.phoneNumber}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800">{req.legalMatter}</span>
                      <div className="text-[11px] text-slate-400 capitalize">{req.preferredContactMethod.replace('_', ' ')}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {req.preferredDate}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        req.status === 'new' 
                          ? 'bg-amber-100 text-amber-800' 
                          : req.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : req.status === 'in_progress'
                          ? 'bg-purple-100 text-purple-800'
                          : req.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          const nextStatus = req.status === 'new' ? 'contacted' : req.status === 'contacted' ? 'in_progress' : 'completed';
                          updateConsultationRequest(req.id, { status: nextStatus });
                        }}
                        className="text-xs text-[#0B1F3A] hover:underline font-semibold cursor-pointer"
                      >
                        Advance Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Audit / Revision Snapshots */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
                Recent Revisions
              </h3>
              <p className="text-xs text-slate-500">Auto-logged content snapshots</p>
            </div>
            <button
              onClick={() => setActiveTab('revisions')}
              className="text-xs text-[#0B1F3A] font-semibold hover:underline"
            >
              History
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto">
            {revisions.slice(0, 6).map((rev) => (
              <div 
                key={rev.id} 
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-900">{rev.section}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(rev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-600 leading-snug">{rev.summary}</p>
                <span className="text-[10px] text-slate-400 block pt-0.5">By {rev.modifiedBy}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
