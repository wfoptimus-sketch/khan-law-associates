import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { History, RotateCcw, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

export const RevisionHistoryManager: React.FC = () => {
  const { revisions, restoreRevision, showNotification } = useChamber();
  const [selectedRevId, setSelectedRevId] = useState<string | null>(null);

  const selectedRev = revisions.find(r => r.id === selectedRevId);

  const handleRestore = (id: string) => {
    if (confirm('Restore the chamber website data to this previous revision snapshot?')) {
      restoreRevision(id);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="font-serif-title text-lg font-bold text-[#0B1F3A]">
          Content Revision History & Snapshot Log
        </h2>
        <p className="text-xs text-slate-500">
          Automated audit trail of modifications with one-click historical restore functionality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Timeline list */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 font-serif-title uppercase">
              Revision Log ({revisions.length})
            </span>
            <span className="text-[11px] text-slate-400">Click entry to inspect snapshot</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {revisions.map((rev) => {
              const isSelected = selectedRevId === rev.id;
              return (
                <div
                  key={rev.id}
                  onClick={() => setSelectedRevId(rev.id)}
                  className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 flex items-start justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-l-[#0B1F3A]' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{rev.section}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(rev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">{rev.summary}</p>
                    <span className="text-[11px] text-slate-400 block">Modified by {rev.modifiedBy}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestore(rev.id);
                    }}
                    className="p-1.5 rounded border border-slate-300 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] text-slate-600 hover:text-white transition-colors cursor-pointer text-[11px] font-semibold flex items-center gap-1 flex-shrink-0"
                    title="Restore this snapshot"
                  >
                    <RotateCcw className="w-3 h-3 text-[#C9A227]" />
                    <span>Restore</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Snapshot Details Viewer */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          {selectedRev ? (
            <>
              <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-serif-title text-base font-bold text-[#0B1F3A]">
                    {selectedRev.section} Snapshot
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Recorded on {new Date(selectedRev.timestamp).toLocaleString()} by {selectedRev.modifiedBy}
                  </span>
                </div>

                <button
                  onClick={() => handleRestore(selectedRev.id)}
                  className="bg-[#0B1F3A] hover:bg-[#173B6C] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Restore Snapshot</span>
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700">Change Summary:</span>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                  {selectedRev.summary}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700">Stored State Payload:</span>
                <pre className="text-[11px] font-mono bg-slate-900 text-slate-300 p-3.5 rounded-lg overflow-x-auto max-h-72 leading-relaxed">
                  {JSON.stringify(JSON.parse(selectedRev.dataSnapshot), null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-xs text-slate-400 space-y-2">
              <History className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Select any revision from the log on the left to inspect recorded values and restore state.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
