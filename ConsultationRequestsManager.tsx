import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { ConsultationRequest, ConsultationStatus } from '../../types';
import { 
  Inbox, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Trash2, 
  Archive, 
  CheckCircle, 
  UserCheck, 
  Clock, 
  AlertCircle,
  Database,
  Lock,
  PlusCircle
} from 'lucide-react';

export const ConsultationRequestsManager: React.FC = () => {
  const { 
    consultationRequests, 
    updateConsultationRequest, 
    deleteConsultationRequest,
    loadDemoConsultations,
    clearAllConsultations
  } = useChamber();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const filteredRequests = consultationRequests.filter(req => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      req.fullName.toLowerCase().includes(q) ||
      req.phoneNumber.toLowerCase().includes(q) ||
      req.email.toLowerCase().includes(q) ||
      req.legalMatter.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleSelectRequest = (req: ConsultationRequest) => {
    setSelectedRequest(req);
    setAdminNotes(req.adminNotes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedRequest) return;
    updateConsultationRequest(selectedRequest.id, { adminNotes });
    setSelectedRequest(prev => (prev ? { ...prev, adminNotes } : null));
  };

  const handleStatusChange = (newStatus: ConsultationStatus) => {
    if (!selectedRequest) return;
    updateConsultationRequest(selectedRequest.id, { status: newStatus });
    setSelectedRequest(prev => (prev ? { ...prev, status: newStatus } : null));
  };

  const isDemoItem = (req: ConsultationRequest) => {
    return req.fullName.includes('DEMO') || req.id.includes('demo') || req.briefDescription.includes('DEMO DATA');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Strict Privacy Notice & RLS Protection */}
      <div className="p-4 rounded-xl bg-[#0B1F3A] text-slate-200 text-xs border border-slate-700 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">
              Confidential Advocate-Client Communication & Database Security:
            </span>
            <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
              Consultation inquiries are strictly private. Supabase Row Level Security (RLS) policies prohibit public access; only authenticated chamber staff may view or manage these records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {consultationRequests.length === 0 ? (
            <button
              onClick={loadDemoConsultations}
              className="bg-slate-800 hover:bg-slate-700 text-[#C9A227] border border-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Loads sample test inquiries clearly tagged as DEMO DATA"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Load Test Inquiry</span>
            </button>
          ) : (
            <button
              onClick={clearAllConsultations}
              className="bg-slate-800/80 hover:bg-rose-950 text-rose-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Inquiries</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, phone, matter..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 w-full sm:w-auto overflow-x-auto text-xs">
          {['all', 'new', 'contacted', 'in_progress', 'completed', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white text-[#0B1F3A] font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

      </div>

      {/* Main Grid: Request List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* List of Requests */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 font-serif-title uppercase">
              Inquiries ({filteredRequests.length})
            </span>
            <span className="text-[11px] text-slate-400">Click row to review & update</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {consultationRequests.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Inbox className="w-6 h-6" />
                </div>
                <div className="font-serif-title text-base font-bold text-slate-800">
                  No consultation requests yet.
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Real client inquiries submitted from the website or via Supabase API will appear here confidentially for advocate review.
                </p>
                <div className="pt-2">
                  <button
                    onClick={loadDemoConsultations}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>Load Test Sample (DEMO DATA — NOT REAL CLIENT INFORMATION)</span>
                  </button>
                </div>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400">
                No consultation requests match this criteria.
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isSelected = selectedRequest?.id === req.id;
                const isDemo = isDemoItem(req);
                return (
                  <div
                    key={req.id}
                    onClick={() => handleSelectRequest(req)}
                    className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-blue-50/60 border-l-4 border-l-[#0B1F3A]' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{req.fullName}</span>
                        {isDemo && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-tight">
                            DEMO DATA — NOT REAL CLIENT INFORMATION
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
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
                      </div>

                      <div className="text-xs text-slate-600 font-medium">
                        {req.legalMatter}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{req.phoneNumber}</span>
                        <span>·</span>
                        <span>Pref: {req.preferredDate}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 text-right whitespace-nowrap">
                      {new Date(req.submittedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5 sticky top-24">
          {selectedRequest ? (
            <>
              <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
                    {selectedRequest.fullName}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Logged on {new Date(selectedRequest.submittedAt).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => deleteConsultationRequest(selectedRequest.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                  title="Archive or Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {isDemoItem(selectedRequest) && (
                <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 text-center uppercase tracking-wide">
                  DEMO DATA — NOT REAL CLIENT INFORMATION
                </div>
              )}

              {/* Contact Coordinates */}
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <a href={`tel:${selectedRequest.phoneNumber}`} className="hover:underline font-mono">
                    {selectedRequest.phoneNumber}
                  </a>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <a href={`mailto:${selectedRequest.email}`} className="hover:underline font-mono truncate">
                    {selectedRequest.email}
                  </a>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <span>Preferred Date: {selectedRequest.preferredDate || 'Flexible / Earliest Available'}</span>
                </div>
              </div>

              {/* Legal Matter Description */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 block">Brief Matter Description:</span>
                <div className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedRequest.briefDescription}
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 block">Consultation Status:</span>
                <select
                  value={selectedRequest.status}
                  onChange={(e) => handleStatusChange(e.target.value as ConsultationStatus)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B1F3A] bg-white capitalize cursor-pointer font-medium"
                >
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted (Appointment Scheduled)</option>
                  <option value="in_progress">In Progress (Active Case Evaluation)</option>
                  <option value="completed">Completed (Retained / Advice Delivered)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Internal Chamber Notes (Confidential) */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-700 block flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Internal Chamber Notes (Advocate Eyes Only):</span>
                </span>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record confidential notes, required statutory documents, appointed counsel, or conflict check status..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0B1F3A]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="w-full bg-[#0B1F3A] hover:bg-[#173B6C] text-white py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Save Internal Notes
                </button>
              </div>
            </>
          ) : (
            <div className="p-10 text-center text-slate-400 text-xs">
              Select an inquiry from the list to review details and record chamber notes.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
