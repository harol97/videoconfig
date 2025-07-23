import React, { useEffect, useMemo, useState } from 'react';
import { VideoGrid } from './VideoGrid';
import { ControlBar } from './ControlBar';
import { ChatPanel } from './ChatPanel';
import { TranscriptionPanel } from './TranscriptionPanel';
import { SettingsPanel } from './SettingsPanel';
import { RemoteControlPanel } from './RemoteControlPanel';
import { NotesPanel } from './NotesPanel';
import { RecordingStopModal } from './RecordingStopModal';
import { useVideoConference } from './useVideoConference';
import "./videoconference.css";
import {useStartTwilio} from './twilio-hook';


export const VideoConference = () => {
  const {
    participants,
    currentUser,
    chatMessages,
    transcriptionEntries,
    transcriptionSummary,
    isChatOpen,
    isTranscriptionOpen,
    isNotesOpen,
    isRecording,
    isSettingsOpen,
    isRemoteControlOpen,
    showRecordingStopModal,
    settings,
    meetingStartTime,
    pendingControlRequests,
    noteFolders,
    noteArticles,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleHandRaise,
    toggleChat,
    toggleTranscription,
    toggleNotes,
    toggleRecording,
    confirmStopRecording,
    cancelStopRecording,
    toggleSettings,
    toggleRemoteControl,
    updateSettings,
    sendMessage,
    addParticipant,
    removeParticipant,
    muteParticipant,
    lowerAllHands,
    toggleTranscriptionEnabled,
    updateTranscriptionLanguage,
    generateSummary,
    requestRemoteControl,
    approveRemoteControl,
    denyRemoteControl,
    stopRemoteControl,
    createFolder,
    updateFolder,
    deleteFolder,
    createArticle,
    updateArticle,
    deleteArticle,
  } = useVideoConference();


  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/credentials", {
      method:"get",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((response) => response.json())
    .then(data => setCredentials(data))
  }, [setCredentials])

  const [twilioParticipants, setParticipants] = useState([]);
  const [videoMediaInfo, setVideoMediaInfo] = useState();
  const [audioMediaInfo, setAudioMediaInfo] = useState();
  const [localParticipant, setLocalParticipant] = useState(currentUser);
  useStartTwilio(credentials?.token, setParticipants, setLocalParticipant, videoMediaInfo, audioMediaInfo)

  const meetingDuration = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - meetingStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [meetingStartTime]);

  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4 flex-shrink-0">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-white text-xl font-semibold">Team Meeting</h1>
            <p className="text-gray-400 text-sm">Daily standup • Room ID: 123-456-789</p>
          </div>
          <div className="text-gray-400 text-sm">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <VideoGrid
          participants={twilioParticipants}
          currentUser={currentUser}
          settings={settings}
          onRemoveParticipant={removeParticipant}
          onMuteParticipant={muteParticipant}
        />
        
        <TranscriptionPanel
          isOpen={isTranscriptionOpen}
          onClose={toggleTranscription}
          transcriptionEntries={transcriptionEntries}
          transcriptionSummary={transcriptionSummary}
          participants={participants}
          isTranscriptionEnabled={settings.isTranscriptionEnabled}
          onToggleTranscription={toggleTranscriptionEnabled}
          onGenerateSummary={generateSummary}
          transcriptionLanguage={settings.transcriptionLanguage}
          onLanguageChange={updateTranscriptionLanguage}
        />
        
        <NotesPanel
          isOpen={isNotesOpen}
          onClose={toggleNotes}
          folders={noteFolders}
          articles={noteArticles}
          onCreateFolder={createFolder}
          onUpdateFolder={updateFolder}
          onDeleteFolder={deleteFolder}
          onCreateArticle={createArticle}
          onUpdateArticle={updateArticle}
          onDeleteArticle={deleteArticle}
        />
        
        <ChatPanel
          isOpen={isChatOpen}
          onClose={toggleChat}
          messages={chatMessages}
          participants={participants}
          onSendMessage={sendMessage}
        />
      </div>

      <div className="flex-shrink-0">
        <ControlBar
          currentUser={currentUser}
          participants={participants}
          participantCount={participants.length}
          isChatOpen={isChatOpen}
          isTranscriptionOpen={isTranscriptionOpen}
          isNotesOpen={isNotesOpen}
          isRecording={isRecording}
          onToggleMute={toggleMute}
          onToggleCamera={toggleCamera}
          onToggleScreenShare={toggleScreenShare}
          onToggleHandRaise={toggleHandRaise}
          onToggleChat={toggleChat}
          onToggleTranscription={toggleTranscription}
          onToggleNotes={toggleNotes}
          onToggleRecording={toggleRecording}
          onToggleSettings={toggleSettings}
          onToggleRemoteControl={toggleRemoteControl}
          onAddParticipant={addParticipant}
          onLowerAllHands={lowerAllHands}
          meetingDuration={meetingDuration}
        />
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={toggleSettings}
        settings={settings}
        onUpdateSettings={updateSettings}
        setAudio={setAudioMediaInfo}
        setVideo={setVideoMediaInfo}
      />

      <RemoteControlPanel
        isOpen={isRemoteControlOpen}
        onClose={toggleRemoteControl}
        participants={participants}
        currentUser={currentUser}
        pendingRequests={pendingControlRequests}
        onRequestControl={requestRemoteControl}
        onApproveControl={approveRemoteControl}
        onDenyControl={denyRemoteControl}
        onStopControl={stopRemoteControl}
      />

      <RecordingStopModal
        isOpen={showRecordingStopModal}
        onClose={cancelStopRecording}
        onConfirmStop={confirmStopRecording}
        recordingDuration={meetingDuration}
      />
    </div>
  );
};
