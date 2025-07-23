import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Search, Settings, Mic, MicOff, Languages, Copy, Check, FileText, Sparkles, Clock, Users, Target, RefreshCw } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const TranscriptionPanel = ({
  isOpen,
  onClose,
  transcriptionEntries,
  transcriptionSummary,
  participants,
  isTranscriptionEnabled,
  onToggleTranscription,
  onGenerateSummary,
  transcriptionLanguage,
  onLanguageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('transcription');
  const [copiedId, setCopiedId] = useState(null);
  const transcriptionEndRef = useRef(null);

  const scrollToBottom = () => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'transcription') {
      scrollToBottom();
    }
  }, [transcriptionEntries, activeTab]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const filteredEntries = transcriptionEntries.filter(entry =>
    entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadTranscription = () => {
    const transcriptText = transcriptionEntries
      .map(entry => `[${formatTime(entry.timestamp)}] ${entry.participantName}: ${entry.text}`)
      .join('\n');
    
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSummary = () => {
    if (!transcriptionSummary) return;

    const summaryText = `
Meeting Summary: ${transcriptionSummary.title}
Generated: ${formatTime(transcriptionSummary.timestamp)}
Duration: ${transcriptionSummary.duration}
Participants: ${transcriptionSummary.participants.join(', ')}

SUMMARY:
${transcriptionSummary.content}

KEY POINTS:
${transcriptionSummary.keyPoints.map(point => `• ${point}`).join('\n')}

ACTION ITEMS:
${transcriptionSummary.actionItems.map(item => `• ${item}`).join('\n')}
    `.trim();
    
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-summary-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEntry = async (entry) => {
    try {
      await navigator.clipboard.writeText(`[${formatTime(entry.timestamp)}] ${entry.participantName}: ${entry.text}`);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleCopySummary = async () => {
    if (!transcriptionSummary) return;

    try {
      const summaryText = `${transcriptionSummary.title}\n\n${transcriptionSummary.content}\n\nKey Points:\n${transcriptionSummary.keyPoints.map(point => `• ${point}`).join('\n')}\n\nAction Items:\n${transcriptionSummary.actionItems.map(item => `• ${item}`).join('\n')}`;
      await navigator.clipboard.writeText(summaryText);
      setCopiedId('summary');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy summary:', error);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-danger';
  };

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
  ];

  if (!isOpen) return null;

  return (
    // <div className="w-80 bg-dark border-start border-secondary d-flex flex-column h-100">
    //   {/* Header */}
    //   <div className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
    //     <div className="d-flex align-items-center gap-2">
    //       <Tooltip content="Transcription" hint="Live speech-to-text conversion">
    //         <Mic className="text-white" size={20} />
    //       </Tooltip>
    //       <h3 className="text-white fw-medium m-0">Transcription</h3>
    //       <Tooltip 
    //         content={isTranscriptionEnabled ? "Active" : "Inactive"} 
    //         hint={isTranscriptionEnabled ? "Transcription is running" : "Transcription is paused"}
    //       >
    //         <div className={`rounded-circle ${isTranscriptionEnabled ? 'bg-success' : 'bg-secondary'}`} style={{width: '8px', height: '8px'}} />
    //       </Tooltip>
    //     </div>
    //     <Tooltip content="Close transcription" hint="Close the transcription panel">
    //       <button
    //         onClick={onClose}
    //         className="btn btn-sm btn-outline-secondary"
    //       >
    //         <X size={20} className="text-muted" />
    //       </button>
    //     </Tooltip>
    //   </div>

    //   {/* Tabs */}
    //   <div className="border-bottom border-secondary">
    //     <ul className="nav nav-tabs">
    //       <li className="nav-item">
    //         <button
    //           onClick={() => setActiveTab('transcription')}
    //           className={`nav-link ${activeTab === 'transcription' ? 'active text-primary' : 'text-muted'}`}
    //         >
    //           Live Text
    //         </button>
    //       </li>
    //       <li className="nav-item">
    //         <button
    //           onClick={() => setActiveTab('summary')}
    //           className={`nav-link ${activeTab === 'summary' ? 'active text-primary' : 'text-muted'} d-flex align-items-center gap-1`}
    //         >
    //           <Tooltip content="AI Summary" hint="AI-generated meeting summary">
    //             <Sparkles size={16} />
    //           </Tooltip>
    //           <span>Summary</span>
    //         </button>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* Controls */}
    //   {activeTab === 'transcription' && (
    //     <div className="p-3 border-bottom border-secondary">
    //       {/* Transcription Toggle */}
    //       <div className="d-flex align-items-center justify-content-between mb-3">
    //         <span className="text-light small">Live Transcription</span>
    //         <Tooltip 
    //           content={isTranscriptionEnabled ? "Turn off" : "Turn on"} 
    //           hint={isTranscriptionEnabled ? "Stop live transcription" : "Start live transcription"}
    //         >
    //           <button
    //             onClick={onToggleTranscription}
    //             className={`btn btn-sm ${isTranscriptionEnabled ? 'btn-success' : 'btn-secondary'}`}
    //           >
    //             {isTranscriptionEnabled ? (
    //               <>
    //                 <Mic size={16} className="me-1" />
    //                 On
    //               </>
    //             ) : (
    //               <>
    //                 <MicOff size={16} className="me-1" />
    //                 Off
    //               </>
    //             )}
    //           </button>
    //         </Tooltip>
    //       </div>

    //       {/* Search */}
    //       <div className="input-group mb-3">
    //         <Tooltip content="Search" hint="Search through transcription text">
    //           <span className="input-group-text">
    //             <Search size={16} className="text-muted" />
    //           </span>
    //         </Tooltip>
    //         <input
    //           type="text"
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           placeholder="Search transcription..."
    //           className="form-control form-control-sm bg-dark text-white border-secondary"
    //         />
    //       </div>

    //       {/* Action Buttons */}
    //       <div className="d-flex gap-2 mb-3">
    //         <Tooltip content="Settings" hint="Configure transcription settings">
    //           <button
    //             onClick={() => setShowSettings(!showSettings)}
    //             className="btn btn-sm btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
    //           >
    //             <Settings size={16} />
    //             <span>Settings</span>
    //           </button>
    //         </Tooltip>
    //         <Tooltip content="Export" hint="Download transcription as text file">
    //           <button
    //             onClick={handleDownloadTranscription}
    //             disabled={transcriptionEntries.length === 0}
    //             className="btn btn-sm btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
    //           >
    //             <Download size={16} />
    //             <span>Export</span>
    //           </button>
    //         </Tooltip>
    //       </div>

    //       {/* Settings Panel */}
    //       {showSettings && (
    //         <div className="bg-secondary rounded p-3 mb-3">
    //           <div className="mb-3">
    //             <label className="form-label text-light small">
    //               Language
    //             </label>
    //             <select
    //               value={transcriptionLanguage}
    //               onChange={(e) => onLanguageChange(e.target.value)}
    //               className="form-select form-select-sm bg-dark text-white border-secondary"
    //             >
    //               {languages.map((lang) => (
    //                 <option key={lang.code} value={lang.code}>
    //                   {lang.name}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //           <div className="small text-muted">
    //             <p>• Transcription accuracy depends on audio quality</p>
    //             <p>• Clear speech improves recognition</p>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   )}

    //   {/* Summary Controls */}
    //   {activeTab === 'summary' && (
    //     <div className="p-3 border-bottom border-secondary">
    //       <div className="d-flex gap-2">
    //         <Tooltip 
    //           content="Generate summary" 
    //           hint={transcriptionSummary?.isGenerating ? "AI is processing..." : "Create AI summary of the meeting"}
    //         >
    //           <button
    //             onClick={onGenerateSummary}
    //             disabled={transcriptionEntries.length === 0 || (transcriptionSummary?.isGenerating ?? false)}
    //             className="btn btn-sm btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
    //           >
    //             {transcriptionSummary?.isGenerating ? (
    //               <>
    //                 <RefreshCw size={16} className="animate-spin" />
    //                 <span>Generating...</span>
    //               </>
    //             ) : (
    //               <>
    //                 <Sparkles size={16} />
    //                 <span>Generate Summary</span>
    //               </>
    //             )}
    //           </button>
    //         </Tooltip>
    //         {transcriptionSummary && !transcriptionSummary.isGenerating && (
    //           <Tooltip content="Download summary" hint="Download summary as text file">
    //             <button
    //               onClick={handleDownloadSummary}
    //               className="btn btn-sm btn-primary"
    //             >
    //               <Download size={16} />
    //             </button>
    //           </Tooltip>
    //         )}
    //       </div>
    //     </div>
    //   )}

    //   {/* Content */}
    //   <div className="flex-grow-1 overflow-auto p-3">
    //     {activeTab === 'transcription' ? (
    //       // Transcription Content
    //       !isTranscriptionEnabled ? (
    //         <div className="text-center py-4">
    //           <MicOff size={48} className="text-muted mb-3 mx-auto" />
    //           <p className="text-muted small mb-2">Transcription is disabled</p>
    //           <p className="text-muted small">Enable live transcription to see real-time captions</p>
    //         </div>
    //       ) : filteredEntries.length === 0 ? (
    //         <div className="text-center py-4">
    //           <Mic size={48} className="text-muted mb-3 mx-auto" />
    //           <p className="text-muted small mb-2">
    //             {searchTerm ? 'No matching transcription found' : 'Listening for speech...'}
    //           </p>
    //           <p className="text-muted small">
    //             {searchTerm ? 'Try a different search term' : 'Start speaking to see live captions'}
    //           </p>
    //         </div>
    //       ) : (
    //         <div className="d-flex flex-column gap-3">
    //           {filteredEntries.map((entry) => (
    //             <div
    //               key={entry.id}
    //               className={`p-3 rounded ${entry.isFinal ? 'bg-secondary' : 'bg-secondary bg-opacity-50 border border-secondary'}`}
    //             >
    //               <div className="d-flex justify-content-between mb-2">
    //                 <div className="d-flex align-items-center gap-2">
    //                   <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px'}}>
    //                     {entry.participantName.split(' ').map(n => n[0]).join('')}
    //                   </div>
    //                   <div>
    //                     <p className="text-light small fw-medium m-0">{entry.participantName}</p>
    //                     <div className="d-flex align-items-center gap-2">
    //                       <p className="text-muted small m-0">{formatTime(entry.timestamp)}</p>
    //                       <div className={`small ${getConfidenceColor(entry.confidence)}`}>
    //                         {Math.round(entry.confidence * 100)}%
    //                       </div>
    //                       {!entry.isFinal && (
    //                         <span className="small text-warning">Processing...</span>
    //                       )}
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <Tooltip content="Copy text" hint="Copy this transcription entry">
    //                   <button
    //                     onClick={() => handleCopyEntry(entry)}
    //                     className="btn btn-sm btn-link p-0 opacity-0 group-hover:opacity-100"
    //                   >
    //                     {copiedId === entry.id ? (
    //                       <Check size={16} className="text-success" />
    //                     ) : (
    //                       <Copy size={16} className="text-muted" />
    //                     )}
    //                   </button>
    //                 </Tooltip>
    //               </div>
    //               <p className={`small m-0 ${entry.isFinal ? 'text-light' : 'text-muted fst-italic'}`}>
    //                 {entry.text}
    //               </p>
    //             </div>
    //           ))}
    //           <div ref={transcriptionEndRef} />
    //         </div>
    //       )
    //     ) : (
    //       // Summary Content
    //       !transcriptionSummary ? (
    //         <div className="text-center py-4">
    //           <Sparkles size={48} className="text-muted mb-3 mx-auto" />
    //           <p className="text-muted small mb-2">No summary generated yet</p>
    //           <p className="text-muted small">Generate an AI summary of the meeting transcription</p>
    //         </div>
    //       ) : transcriptionSummary.isGenerating ? (
    //         <div className="text-center py-4">
    //           <RefreshCw size={48} className="text-primary mb-3 mx-auto animate-spin" />
    //           <p className="text-primary small mb-2">Generating summary...</p>
    //           <p className="text-muted small">Analyzing transcription and extracting key insights</p>
    //         </div>
    //       ) : (
    //         <div className="d-flex flex-column gap-3">
    //           {/* Summary Header */}
    //           <div className="bg-primary bg-opacity-10 border border-primary rounded p-3">
    //             <div className="d-flex justify-content-between mb-3">
    //               <h3 className="text-light fw-semibold m-0">{transcriptionSummary.title}</h3>
    //               <Tooltip content="Copy summary" hint="Copy the entire summary to clipboard">
    //                 <button
    //                   onClick={handleCopySummary}
    //                   className="btn btn-sm btn-link p-0"
    //                 >
    //                   {copiedId === 'summary' ? (
    //                     <Check size={16} className="text-success" />
    //                   ) : (
    //                     <Copy size={16} className="text-muted" />
    //                   )}
    //                 </button>
    //               </Tooltip>
    //             </div>
                
    //             <div className="row g-2 small">
    //               <div className="col-6 d-flex align-items-center gap-2 text-light">
    //                 <Tooltip content="Duration" hint="Total meeting duration">
    //                   <Clock size={16} className="text-primary" />
    //                 </Tooltip>
    //                 <span>{transcriptionSummary.duration}</span>
    //               </div>
    //               <div className="col-6 d-flex align-items-center gap-2 text-light">
    //                 <Tooltip content="Participants" hint="Number of meeting participants">
    //                   <Users size={16} className="text-primary" />
    //                 </Tooltip>
    //                 <span>{transcriptionSummary.participants.length} participants</span>
    //               </div>
    //             </div>
                
    //             <p className="text-muted small mt-2 m-0">
    //               Generated {formatTime(transcriptionSummary.timestamp)}
    //             </p>
    //           </div>

    //           {/* Summary Content */}
    //           <div className="bg-secondary rounded p-3">
    //             <h4 className="text-light fw-medium mb-3 d-flex align-items-center gap-2">
    //               <Tooltip content="Summary" hint="AI-generated meeting overview">
    //                 <FileText size={16} className="text-primary" />
    //               </Tooltip>
    //               <span>Summary</span>
    //             </h4>
    //             <p className="text-light small">
    //               {transcriptionSummary.content}
    //             </p>
    //           </div>

    //           {/* Key Points */}
    //           {transcriptionSummary.keyPoints.length > 0 && (
    //             <div className="bg-secondary rounded p-3">
    //               <h4 className="text-light fw-medium mb-3 d-flex align-items-center gap-2">
    //                 <Tooltip content="Key Points" hint="Important discussion points">
    //                   <Sparkles size={16} className="text-warning" />
    //                 </Tooltip>
    //                 <span>Key Points</span>
    //               </h4>
    //               <ul className="list-unstyled d-flex flex-column gap-2">
    //                 {transcriptionSummary.keyPoints.map((point, index) => (
    //                   <li key={index} className="text-light small d-flex align-items-start gap-2">
    //                     <span className="text-warning">•</span>
    //                     <span>{point}</span>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           )}

    //           {/* Action Items */}
    //           {transcriptionSummary.actionItems.length > 0 && (
    //             <div className="bg-secondary rounded p-3">
    //               <h4 className="text-light fw-medium mb-3 d-flex align-items-center gap-2">
    //                 <Tooltip content="Action Items" hint="Tasks and follow-ups identified">
    //                   <Target size={16} className="text-success" />
    //                 </Tooltip>
    //                 <span>Action Items</span>
    //               </h4>
    //               <ul className="list-unstyled d-flex flex-column gap-2">
    //                 {transcriptionSummary.actionItems.map((item, index) => (
    //                   <li key={index} className="text-light small d-flex align-items-start gap-2">
    //                     <span className="text-success">•</span>
    //                     <span>{item}</span>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           )}

    //           {/* Participants */}
    //           <div className="bg-secondary rounded p-3">
    //             <h4 className="text-light fw-medium mb-3 d-flex align-items-center gap-2">
    //               <Tooltip content="Participants" hint="People who spoke during the meeting">
    //                 <Users size={16} className="text-primary" />
    //               </Tooltip>
    //               <span>Participants</span>
    //             </h4>
    //             <div className="d-flex flex-wrap gap-2">
    //               {transcriptionSummary.participants.map((participant, index) => (
    //                 <span
    //                   key={index}
    //                   className="badge bg-dark text-light"
    //                 >
    //                   {participant}
    //                 </span>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       )
    //     )}
    //   </div>

    //   {/* Footer Info */}
    //   {activeTab === 'transcription' && isTranscriptionEnabled && (
    //     <div className="p-3 border-top border-secondary bg-secondary bg-opacity-25">
    //       <div className="d-flex justify-content-between small text-muted">
    //         <span>{filteredEntries.length} entries</span>
    //         <div className="d-flex align-items-center gap-1">
    //           <Tooltip content="Language" hint="Current transcription language">
    //             <Languages size={12} />
    //           </Tooltip>
    //           <span>{languages.find(l => l.code === transcriptionLanguage)?.name}</span>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tooltip content="Transcription" hint="Live speech-to-text conversion">
            <Mic className="w-5 h-5 text-gray-400" />
          </Tooltip>
          <h3 className="text-white font-medium">Transcription</h3>
          <Tooltip 
            content={isTranscriptionEnabled ? "Active" : "Inactive"} 
            hint={isTranscriptionEnabled ? "Transcription is running" : "Transcription is paused"}
          >
            <div className={`w-2 h-2 rounded-full ${isTranscriptionEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
          </Tooltip>
        </div>
        <Tooltip content="Close transcription" hint="Close the transcription panel">
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </Tooltip>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex p-2">
          <button
            onClick={() => setActiveTab('transcription')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'transcription'
                ? 'text-blue-400 border-blue-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
          >
            Live Text
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'summary'
                ? 'text-purple-400 border-purple-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
          >
            <Tooltip content="AI Summary" hint="AI-generated meeting summary">
              <Sparkles className="w-4 h-4" />
            </Tooltip>
            <span>Summary</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      {activeTab === 'transcription' && (
        <div className="p-4 border-b border-gray-700 space-y-3">
          {/* Transcription Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Live Transcription</span>
            <Tooltip 
              content={isTranscriptionEnabled ? "Turn off" : "Turn on"} 
              hint={isTranscriptionEnabled ? "Stop live transcription" : "Start live transcription"}
            >
              <button
                onClick={onToggleTranscription}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isTranscriptionEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
              >
                {isTranscriptionEnabled ? (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>On</span>
                  </>
                ) : (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Off</span>
                  </>
                )}
              </button>
            </Tooltip>
          </div>

          {/* Search */}
          <div className="relative">
            <Tooltip content="Search" hint="Search through transcription text">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </Tooltip>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transcription..."
              className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Tooltip content="Settings" hint="Configure transcription settings">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex-1 flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2 text-sm transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </Tooltip>
            <Tooltip content="Export" hint="Download transcription as text file">
              <button
                onClick={handleDownloadTranscription}
                disabled={transcriptionEntries.length === 0}
                className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </Tooltip>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-800 rounded-lg p-3 space-y-3">
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Language
                </label>
                <select
                  value={transcriptionLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-xs text-gray-400">
                <p>• Transcription accuracy depends on audio quality</p>
                <p>• Clear speech improves recognition</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary Controls */}
      {activeTab === 'summary' && (
        <div className="p-4 border-b border-gray-700 space-y-3">
          <div className="flex space-x-2">
            <Tooltip 
              content="Generate summary" 
              hint={transcriptionSummary?.isGenerating ? "AI is processing..." : "Create AI summary of the meeting"}
            >
              <button
                onClick={onGenerateSummary}
                disabled={transcriptionEntries.length === 0 || (transcriptionSummary?.isGenerating ?? false)}
                className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {transcriptionSummary?.isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Summary</span>
                  </>
                )}
              </button>
            </Tooltip>
            {transcriptionSummary && !transcriptionSummary.isGenerating && (
              <Tooltip content="Download summary" hint="Download summary as text file">
                <button
                  onClick={handleDownloadSummary}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'transcription' ? (
          // Transcription Content
          !isTranscriptionEnabled ? (
            <div className="text-center py-8">
              <MicOff className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Transcription is disabled</p>
              <p className="text-gray-500 text-xs">Enable live transcription to see real-time captions</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <Mic className="w-12 h-12 text-gray-500 mx-auto mb-3 animate-pulse" />
              <p className="text-gray-400 text-sm mb-2">
                {searchTerm ? 'No matching transcription found' : 'Listening for speech...'}
              </p>
              <p className="text-gray-500 text-xs">
                {searchTerm ? 'Try a different search term' : 'Start speaking to see live captions'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`group p-3 rounded-lg transition-colors ${
                    entry.isFinal ? 'bg-gray-800' : 'bg-gray-800/50 border border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {entry.participantName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">{entry.participantName}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-500 text-xs">{formatTime(entry.timestamp)}</p>
                          <div className={`text-xs ${getConfidenceColor(entry.confidence)}`}>
                            {Math.round(entry.confidence * 100)}%
                          </div>
                          {!entry.isFinal && (
                            <span className="text-xs text-yellow-400 animate-pulse">Processing...</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Tooltip content="Copy text" hint="Copy this transcription entry">
                      <button
                        onClick={() => handleCopyEntry(entry)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-700 transition-all"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    entry.isFinal ? 'text-white' : 'text-gray-300 italic'
                  }`}>
                    {entry.text}
                  </p>
                </div>
              ))}
              <div ref={transcriptionEndRef} />
            </div>
          )
        ) : (
          // Summary Content
          !transcriptionSummary ? (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">No summary generated yet</p>
              <p className="text-gray-500 text-xs">Generate an AI summary of the meeting transcription</p>
            </div>
          ) : transcriptionSummary.isGenerating ? (
            <div className="text-center py-8">
              <RefreshCw className="w-12 h-12 text-purple-500 mx-auto mb-3 animate-spin" />
              <p className="text-purple-400 text-sm mb-2">Generating summary...</p>
              <p className="text-gray-500 text-xs">Analyzing transcription and extracting key insights</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Header */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-lg">{transcriptionSummary.title}</h3>
                  <Tooltip content="Copy summary" hint="Copy the entire summary to clipboard">
                    <button
                      onClick={handleCopySummary}
                      className="p-1 rounded hover:bg-gray-700 transition-colors"
                    >
                      {copiedId === 'summary' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </Tooltip>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Tooltip content="Duration" hint="Total meeting duration">
                      <Clock className="w-4 h-4 text-purple-400" />
                    </Tooltip>
                    <span>{transcriptionSummary.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Tooltip content="Participants" hint="Number of meeting participants">
                      <Users className="w-4 h-4 text-purple-400" />
                    </Tooltip>
                    <span>{transcriptionSummary.participants.length} participants</span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-xs mt-2">
                  Generated {formatTime(transcriptionSummary.timestamp)}
                </p>
              </div>

              {/* Summary Content */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                  <Tooltip content="Summary" hint="AI-generated meeting overview">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </Tooltip>
                  <span>Summary</span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {transcriptionSummary.content}
                </p>
              </div>

              {/* Key Points */}
              {transcriptionSummary.keyPoints.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                    <Tooltip content="Key Points" hint="Important discussion points">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </Tooltip>
                    <span>Key Points</span>
                  </h4>
                  <ul className="space-y-2">
                    {transcriptionSummary.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Items */}
              {transcriptionSummary.actionItems.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                    <Tooltip content="Action Items" hint="Tasks and follow-ups identified">
                      <Target className="w-4 h-4 text-green-400" />
                    </Tooltip>
                    <span>Action Items</span>
                  </h4>
                  <ul className="space-y-2">
                    {transcriptionSummary.actionItems.map((item, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Participants */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                  <Tooltip content="Participants" hint="People who spoke during the meeting">
                    <Users className="w-4 h-4 text-blue-400" />
                  </Tooltip>
                  <span>Participants</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {transcriptionSummary.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer Info */}
      {activeTab === 'transcription' && isTranscriptionEnabled && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{filteredEntries.length} entries</span>
            <div className="flex items-center space-x-1">
              <Tooltip content="Language" hint="Current transcription language">
                <Languages className="w-3 h-3" />
              </Tooltip>
              <span>{languages.find(l => l.code === transcriptionLanguage)?.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};