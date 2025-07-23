import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorStop,
  MessageSquare,
  Phone,
  Settings,
  UserPlus,
  Circle,
  Users,
  Hand,
  HandMetal,
  FileText,
  MousePointer,
  NotebookPen,
} from 'lucide-react';
import { Tooltip } from './Tooltip';
// import { Tooltip } from './Tooltip';


export const ControlBar = ({
  currentUser,
  participants,
  participantCount,
  isChatOpen,
  isTranscriptionOpen,
  isNotesOpen,
  isRecording,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onToggleHandRaise,
  onToggleChat,
  onToggleTranscription,
  onToggleNotes,
  onToggleRecording,
  onToggleSettings,
  onToggleRemoteControl,
  onAddParticipant,
  onLowerAllHands,
  meetingDuration,
}) => {
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');

  const raisedHandsCount = participants.filter(p => p.isHandRaised).length;
  const hasActiveControl = participants.some(p => p.isControllingScreen || p.isAllowingControl);

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (newParticipantName.trim()) {
      onAddParticipant(newParticipantName.trim());
      setNewParticipantName('');
      setShowAddParticipant(false);
    }
  };

  return (
    // <div className="bg-dark border-top border-secondary p-3">
    //   <div className="container-fluid">
    //     <div className="row align-items-center">
    //       {/* Left side - Meeting info */}
    //       <div className="col-md-4 d-flex align-items-center gap-3">
    //         <div className="d-flex align-items-center gap-2">
    //           {isRecording && (
    //             <div className="d-flex align-items-center gap-1">
    //               <Tooltip content="Recording" hint="Meeting is being recorded">
    //                 <Circle className="text-danger" size={16} fill="currentColor" />
    //               </Tooltip>
    //               <span className="text-danger small fw-bold">REC</span>
    //             </div>
    //           )}
    //           <span className="text-light small">{meetingDuration}</span>
    //         </div>
    //         <div className="d-flex align-items-center gap-1 text-light small">
    //           <Tooltip content="Participants" hint="Number of people in the meeting">
    //             <Users size={16} />
    //           </Tooltip>
    //           <span>{participantCount}</span>
    //         </div>
    //         {raisedHandsCount > 0 && (
    //           <div className="d-flex align-items-center gap-2">
    //             <div className="d-flex align-items-center gap-1 text-warning small">
    //               <Tooltip content="Raised Hands" hint="Participants wanting to speak">
    //                 <Hand size={16} />
    //               </Tooltip>
    //               <span>{raisedHandsCount}</span>
    //             </div>
    //             {currentUser.isHost && (
    //               <Tooltip content="Lower All Hands" hint="Remove all raised hands">
    //                 <button
    //                   onClick={onLowerAllHands}
    //                   className="btn btn-sm btn-warning text-white"
    //                 >
    //                   Lower All
    //                 </button>
    //               </Tooltip>
    //             )}
    //           </div>
    //         )}
    //         {hasActiveControl && (
    //           <div className="d-flex align-items-center gap-1 text-primary small">
    //             <Tooltip content="Remote Control" hint="Someone is controlling another's screen">
    //               <MousePointer size={16} />
    //             </Tooltip>
    //             <span>Remote Control Active</span>
    //           </div>
    //         )}
    //       </div>

    //       {/* Center - Main controls */}
    //       <div className="col-md-4 d-flex justify-content-center gap-2">
    //         <Tooltip 
    //           content={currentUser.isMuted ? "Unmute" : "Mute"} 
    //           hint={currentUser.isMuted ? "Turn on your microphone" : "Turn off your microphone"}
    //         >
    //           <button
    //             onClick={onToggleMute}
    //             className={`btn rounded-circle p-2 ${currentUser.isMuted ? 'btn-danger' : 'btn-secondary'}`}
    //           >
    //             {currentUser.isMuted ? (
    //               <MicOff size={20} className="text-white" />
    //             ) : (
    //               <Mic size={20} className="text-white" />
    //             )}
    //           </button>
    //         </Tooltip>

    //         <Tooltip 
    //           content={currentUser.isCameraOn ? "Turn off camera" : "Turn on camera"} 
    //           hint={currentUser.isCameraOn ? "Stop your video" : "Start your video"}
    //         >
    //           <button
    //             onClick={onToggleCamera}
    //             className={`btn rounded-circle p-2 ${!currentUser.isCameraOn ? 'btn-danger' : 'btn-secondary'}`}
    //           >
    //             {currentUser.isCameraOn ? (
    //               <Video size={20} className="text-white" />
    //             ) : (
    //               <VideoOff size={20} className="text-white" />
    //             )}
    //           </button>
    //         </Tooltip>

    //         <div className="position-relative">
    //           <Tooltip 
    //             content={currentUser.isScreenSharing ? "Stop sharing" : "Share screen"} 
    //             hint={currentUser.isScreenSharing ? "Stop presenting your screen" : "Share your screen with others"}
    //           >
    //             <button
    //               onClick={onToggleScreenShare}
    //               className={`btn rounded-pill d-flex align-items-center gap-2 ${currentUser.isScreenSharing ? 'btn-success' : 'btn-secondary'}`}
    //             >
    //               {currentUser.isScreenSharing ? (
    //                 <>
    //                   <MonitorStop size={20} className="text-white" />
    //                   <span className="text-white small fw-medium">Stop Sharing</span>
    //                 </>
    //               ) : (
    //                 <>
    //                   <Monitor size={20} className="text-white" />
    //                   <span className="text-white small fw-medium">Share Screen</span>
    //                 </>
    //               )}
    //             </button>
    //           </Tooltip>
              
    //           {currentUser.isScreenSharing && (
    //             <div className="position-absolute top-0 start-50 translate-middle-x bg-success text-white px-2 py-1 rounded small fw-medium">
    //               You're presenting
    //             </div>
    //           )}
    //         </div>

    //         <Tooltip 
    //           content={currentUser.isHandRaised ? "Lower hand" : "Raise hand"} 
    //           hint={currentUser.isHandRaised ? "Lower your hand" : "Raise your hand to speak"}
    //         >
    //           <button
    //             onClick={onToggleHandRaise}
    //             className={`btn rounded-circle p-2 ${currentUser.isHandRaised ? 'btn-warning' : 'btn-secondary'}`}
    //           >
    //             <Hand size={20} className="text-white" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip 
    //           content={isRecording ? "Stop recording" : "Start recording"} 
    //           hint={isRecording ? "Stop recording the meeting" : "Start recording the meeting"}
    //         >
    //           <button
    //             onClick={onToggleRecording}
    //             className={`btn rounded-pill d-flex align-items-center gap-2 ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
    //           >
    //             <Circle size={16} className={`${isRecording ? 'text-white' : 'text-white'}`} fill={isRecording ? "currentColor" : "none"} />
    //             <span className="text-white small fw-medium">REC</span>
    //           </button>
    //         </Tooltip>

    //         <div className="position-relative">
    //           <Tooltip content="Add participant" hint="Invite someone to join the meeting">
    //             <button
    //               onClick={() => setShowAddParticipant(!showAddParticipant)}
    //               className="btn btn-secondary rounded-circle p-2"
    //             >
    //               <UserPlus size={20} className="text-white" />
    //             </button>
    //           </Tooltip>

    //           {showAddParticipant && (
    //             <div className="position-absolute bottom-100 start-50 translate-middle-x bg-secondary rounded p-3 mb-2">
    //               <form onSubmit={handleAddParticipant} className="d-flex flex-column gap-2">
    //                 <input
    //                   type="text"
    //                   value={newParticipantName}
    //                   onChange={(e) => setNewParticipantName(e.target.value)}
    //                   placeholder="Participant name"
    //                   className="form-control form-control-sm bg-dark text-white"
    //                   autoFocus
    //                 />
    //                 <div className="d-flex gap-2">
    //                   <button
    //                     type="submit"
    //                     className="btn btn-primary btn-sm flex-grow-1"
    //                   >
    //                     Add
    //                   </button>
    //                   <button
    //                     type="button"
    //                     onClick={() => setShowAddParticipant(false)}
    //                     className="btn btn-secondary btn-sm flex-grow-1"
    //                   >
    //                     Cancel
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           )}
    //         </div>

    //         <Tooltip content="Leave meeting" hint="End the call and leave the meeting">
    //           <button className="btn btn-danger rounded-circle p-2">
    //             <Phone size={20} className="text-white" />
    //           </button>
    //         </Tooltip>
    //       </div>

    //       {/* Right side - Secondary controls */}
    //       <div className="col-md-4 d-flex justify-content-end gap-2">
    //         <Tooltip 
    //           content="Remote control" 
    //           hint={hasActiveControl ? "Manage screen control sessions" : "Request or grant screen control"}
    //         >
    //           <button
    //             onClick={onToggleRemoteControl}
    //             className={`btn rounded-circle p-2 ${hasActiveControl ? 'btn-primary' : 'btn-secondary'}`}
    //           >
    //             <MousePointer size={20} className="text-white" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip 
    //           content="Transcription" 
    //           hint={isTranscriptionOpen ? "Close transcription panel" : "Open live transcription and AI summary"}
    //         >
    //           <button
    //             onClick={onToggleTranscription}
    //             className={`btn rounded-circle p-2 ${isTranscriptionOpen ? 'btn-purple' : 'btn-secondary'}`}
    //           >
    //             <FileText size={20} className="text-white" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip 
    //           content="Notes" 
    //           hint={isNotesOpen ? "Close notes panel" : "Open meeting notes and documentation"}
    //         >
    //           <button
    //             onClick={onToggleNotes}
    //             className={`btn rounded-circle p-2 ${isNotesOpen ? 'btn-success' : 'btn-secondary'}`}
    //           >
    //             <NotebookPen size={20} className="text-white" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip 
    //           content="Chat" 
    //           hint={isChatOpen ? "Close chat panel" : "Open chat and participant list"}
    //         >
    //           <button
    //             onClick={onToggleChat}
    //             className={`btn rounded-circle p-2 ${isChatOpen ? 'btn-primary' : 'btn-secondary'}`}
    //           >
    //             <MessageSquare size={20} className="text-white" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip content="Settings" hint="Open meeting settings and preferences">
    //           <button 
    //             onClick={onToggleSettings}
    //             className="btn btn-secondary rounded-circle p-2"
    //           >
    //             <Settings size={20} className="text-white" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gray-900 border-t border-gray-700 p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left side - Meeting info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-1">
                <Tooltip content="Recording" hint="Meeting is being recorded">
                  <Circle className="w-3 h-3 text-red-500 fill-current animate-pulse" />
                </Tooltip>
                <span className="text-red-400 text-sm font-medium">REC</span>
              </div>
            )}
            <span className="text-gray-300 text-sm">{meetingDuration}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-300 text-sm">
            <Tooltip content="Participants" hint="Number of people in the meeting">
              <Users className="w-4 h-4" />
            </Tooltip>
            <span>{participantCount}</span>
          </div>
          {raisedHandsCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                <Tooltip content="Raised Hands" hint="Participants wanting to speak">
                  <Hand className="w-4 h-4" />
                </Tooltip>
                <span>{raisedHandsCount}</span>
              </div>
              {currentUser.isHost && (
                <Tooltip content="Lower All Hands" hint="Remove all raised hands">
                  <button
                    onClick={onLowerAllHands}
                    className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    Lower All
                  </button>
                </Tooltip>
              )}
            </div>
          )}
          {hasActiveControl && (
            <div className="flex items-center space-x-1 text-blue-400 text-sm">
              <Tooltip content="Remote Control" hint="Someone is controlling another's screen">
                <MousePointer className="w-4 h-4" />
              </Tooltip>
              <span>Remote Control Active</span>
            </div>
          )}
        </div>

        {/* Center - Main controls */}
        <div className="flex items-center space-x-2">
          <Tooltip 
            content={currentUser.isMuted ? "Unmute" : "Mute"} 
            hint={currentUser.isMuted ? "Turn on your microphone" : "Turn off your microphone"}
          >
            <button
              onClick={onToggleMute}
              className={`p-3 rounded-full transition-all ${
                currentUser.isMuted
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {currentUser.isMuted ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>
          </Tooltip>

          <Tooltip 
            content={currentUser.isCameraOn ? "Turn off camera" : "Turn on camera"} 
            hint={currentUser.isCameraOn ? "Stop your video" : "Start your video"}
          >
            <button
              onClick={onToggleCamera}
              className={`p-3 rounded-full transition-all ${
                !currentUser.isCameraOn
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {currentUser.isCameraOn ? (
                <Video className="w-5 h-5 text-white" />
              ) : (
                <VideoOff className="w-5 h-5 text-white" />
              )}
            </button>
          </Tooltip>

          <div className="relative">
            <Tooltip 
              content={currentUser.isScreenSharing ? "Stop sharing" : "Share screen"} 
              hint={currentUser.isScreenSharing ? "Stop presenting your screen" : "Share your screen with others"}
            >
              <button
                onClick={onToggleScreenShare}
                className={`px-4 py-10 rounded-md transition-all flex items-center space-x-2 ${
                  currentUser.isScreenSharing
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {currentUser.isScreenSharing ? (
                  <>
                    <MonitorStop className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Stop Sharing</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Share Screen</span>
                  </>
                )}
              </button>
            </Tooltip>
            
            {currentUser.isScreenSharing && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                You're presenting
              </div>
            )}
          </div>

          <Tooltip 
            content={currentUser.isHandRaised ? "Lower hand" : "Raise hand"} 
            hint={currentUser.isHandRaised ? "Lower your hand" : "Raise your hand to speak"}
          >
            <button
              onClick={onToggleHandRaise}
              className={`p-3 rounded-full transition-all ${
                currentUser.isHandRaised
                  ? 'bg-yellow-600 hover:bg-yellow-700 animate-pulse'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Hand className="w-5 h-5 text-white" />
            </button>
          </Tooltip>

          <Tooltip 
            content={isRecording ? "Stop recording" : "Start recording"} 
            hint={isRecording ? "Stop recording the meeting" : "Start recording the meeting"}
          >
            <button
              onClick={onToggleRecording}
              className={`px-4 py-10 rounded-md transition-all flex items-center space-x-2 ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Circle className={`w-4 h-4 ${isRecording ? 'text-white fill-current animate-pulse' : 'text-white'}`} />
              <span className="text-white text-sm font-medium">REC</span>
            </button>
          </Tooltip>

          <div className="relative">
            <Tooltip content="Add participant" hint="Invite someone to join the meeting">
              <button
                onClick={() => setShowAddParticipant(!showAddParticipant)}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
              >
                <UserPlus className="w-5 h-5 text-white" />
              </button>
            </Tooltip>

            {showAddParticipant && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-3 min-w-[200px]">
                <form onSubmit={handleAddParticipant} className="space-y-2">
                  <input
                    type="text"
                    value={newParticipantName}
                    onChange={(e) => setNewParticipantName(e.target.value)}
                    placeholder="Participant name"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm transition-colors"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddParticipant(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white rounded px-3 py-1 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <Tooltip content="Leave meeting" hint="End the call and leave the meeting">
            <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-all">
              <Phone className="w-5 h-5 text-white" />
            </button>
          </Tooltip>
        </div>

        {/* Right side - Secondary controls */}
        <div className="flex items-center space-x-2">
          <Tooltip 
            content="Remote control" 
            hint={hasActiveControl ? "Manage screen control sessions" : "Request or grant screen control"}
          >
            <button
              onClick={onToggleRemoteControl}
              className={`p-3 rounded-full transition-all ${
                hasActiveControl
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <MousePointer className="w-5 h-5 text-white" />
            </button>
          </Tooltip>

          <Tooltip 
            content="Transcription" 
            hint={isTranscriptionOpen ? "Close transcription panel" : "Open live transcription and AI summary"}
          >
            <button
              onClick={onToggleTranscription}
              className={`p-3 rounded-full transition-all ${
                isTranscriptionOpen
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <FileText className="w-5 h-5 text-white" />
            </button>
          </Tooltip>

          <Tooltip 
            content="Notes" 
            hint={isNotesOpen ? "Close notes panel" : "Open meeting notes and documentation"}
          >
            <button
              onClick={onToggleNotes}
              className={`p-3 rounded-full transition-all ${
                isNotesOpen
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <NotebookPen className="w-5 h-5 text-white" />
            </button>
          </Tooltip>

          <Tooltip 
            content="Chat" 
            hint={isChatOpen ? "Close chat panel" : "Open chat and participant list"}
          >
            <button
              onClick={onToggleChat}
              className={`p-3 rounded-full transition-all ${
                isChatOpen
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </button>
          </Tooltip>

          <Tooltip content="Settings" hint="Open meeting settings and preferences">
            <button 
              onClick={onToggleSettings}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};