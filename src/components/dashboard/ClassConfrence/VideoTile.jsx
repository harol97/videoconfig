import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Hand, 
  X, 
  MousePointer, 
  MoreVertical, 
  UserX, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { Tooltip } from './Tooltip';
import ParticipantComponent from './participant-component';

export const VideoTile = ({
  participant,
  currentUser,
  settings,
  isCurrentUser = false,
  onRemove,
  onMuteParticipant,
  className = '',
  isScreenShare = false,
}) => {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleRemoveClick = () => {
    setShowRemoveConfirm(true);
  };

  const handleConfirmRemove = () => {
    if (onRemove) {
      onRemove(participant.id);
    }
    setShowRemoveConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowRemoveConfirm(false);
  };

  const handleMuteClick = () => {
    if (onMuteParticipant && !isCurrentUser && currentUser.isHost) {
      onMuteParticipant(participant.id);
    }
  };

  const handleContextMenuClick = (e) => {
    e.stopPropagation();
    setShowContextMenu(!showContextMenu);
  };

  const handleQuickRemove = (e) => {
    e.stopPropagation();
    setShowRemoveConfirm(true);
    setShowContextMenu(false);
  };

  const handleQuickMute = (e) => {
    e.stopPropagation();
    handleMuteClick();
    setShowContextMenu(false);
  };

  const getBackgroundStyle = () => {
    if (!isCurrentUser || isScreenShare) {
      return {};
    }

    const { selectedBackground } = settings;
    
    switch (selectedBackground.type) {
      case 'blur':
        return {
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
        };
      case 'image':
        return selectedBackground.url ? {
          backgroundImage: `url(${selectedBackground.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : {};
      default:
        return {};
    }
  };

  return (
    <div className={`relative ${isScreenShare ? 'bg-black' : 'bg-gray-900'} bg-red-900 rounded-3xl overflow-hidden group w-full h-full min-h-0 ${className}`}>
      <ParticipantComponent participant={participant} />
    </div>
  );
};



/*
 
      <div className="w-full h-full flex items-center justify-center relative" style={getBackgroundStyle()}>
        {participant.isCameraOn || participant.isScreenSharing ? (
          <div className={`w-full h-full ${isScreenShare ? '' : 'bg-gradient-to-br from-blue-600 to-purple-700'} flex items-center justify-center relative`}>
            {isCurrentUser && settings.selectedBackground.type !== 'none' && !isScreenShare && (
              <div 
                className="absolute inset-0"
                style={getBackgroundStyle()}
              />
            )}
            
            {isScreenShare ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Monitor className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-300 text-xl font-medium">{participant.name}'s Screen</p>
              </div>
            ) : (
              <div className="text-white text-4xl font-semibold relative z-10">
                {participant.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <VideoOff className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-300 text-lg font-medium">{participant.name}</p>
            </div>
          </div>
        )}

        {!isCurrentUser && currentUser.isHost && onRemove && !isScreenShare && (
          <>
            <Tooltip content="Remove participant" hint="Remove this participant from the meeting">
              <button
                onClick={handleRemoveClick}
                className="absolute top-2 left-2 p-2 rounded-full bg-red-600 bg-opacity-90 hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm border border-red-500 border-opacity-50 shadow-lg"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </Tooltip>

            <div className="absolute top-2 right-2 z-20">
              <Tooltip content="More options" hint="Additional participant controls">
                <button
                  onClick={handleContextMenuClick}
                  className="p-2 rounded-full bg-gray-800 bg-opacity-90 hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-gray-600 border-opacity-50 shadow-lg"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </Tooltip>

              {showContextMenu && (
                <div className="absolute top-12 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-xl min-w-[160px] z-30">
                  <div className="py-1">
                    <button
                      onClick={handleQuickMute}
                      className="w-full text-start px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                    >
                      {participant.isMuted ? (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Unmute</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>Mute</span>
                        </>
                      )}
                    </button>
                    <div className="border-t border-gray-600 my-1" />
                    <button
                      onClick={handleQuickRemove}
                      className="w-full text-start px-4 py-2 text-sm text-red-500 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                    >
                      <UserX className="w-4 h-4" />
                      <span>Remove from meeting</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {participant.isHandRaised && !isScreenShare && (
          <Tooltip content="Hand raised" hint="This participant wants to speak">
            <div className="absolute top-12 left-2 bg-yellow-500 text-black px-2.5 py-1 rounded-full text-sm flex items-center animate-bounce z-10 font-medium">
              <Hand className="w-4 h-4 mr-1" />
              Hand Raised
            </div>
          </Tooltip>
        )}

        {participant.isHost && !isScreenShare && (
          <Tooltip content="Host" hint="This participant is the meeting host">
            <div className={`absolute ${!isCurrentUser && currentUser.isHost && onRemove ? 'top-2 left-12' : 'top-2 left-2'} bg-blue-600 text-white px-2.5 py-1 rounded text-sm font-medium z-10`}>
              Host
            </div>
          </Tooltip>
        )}

        {participant.isScreenSharing && !isScreenShare && (
          <Tooltip content="Presenting" hint="This participant is sharing their screen">
            <div className={`absolute top-2 ${
              !isCurrentUser && currentUser.isHost && onRemove ? 'right-14' : 'right-2'
            } bg-green-600 text-white px-2.5 py-1 rounded text-sm flex items-center z-10 font-medium`}>
              <Monitor className="w-4 h-4 mr-1" />
              Presenting
            </div>
          </Tooltip>
        )}

        {participant.isControllingScreen && !isScreenShare && (
          <Tooltip content="Controlling screen" hint="This participant is controlling another's screen">
            <div className={`absolute ${participant.isHandRaised ? 'top-10' : 'top-2'} ${
              participant.isScreenSharing && !isCurrentUser && currentUser.isHost && onRemove ? 'right-26' :
              participant.isScreenSharing ? 'right-18' :
              !isCurrentUser && currentUser.isHost && onRemove ? 'right-14' : 'right-2'
            } bg-blue-600 text-white px-2.5 py-1 rounded text-sm font-medium z-10 flex items-center`}>
              <MousePointer className="w-4 h-4 mr-1" />
              Controlling
            </div>
          </Tooltip>
        )}

        {participant.isAllowingControl && !isScreenShare && (
          <Tooltip content="Sharing control" hint="This participant is allowing screen control">
            <div className={`absolute ${participant.isHandRaised ? 'top-10' : 'top-2'} ${
              participant.isControllingScreen && participant.isScreenSharing && !isCurrentUser && currentUser.isHost && onRemove ? 'right-38' :
              participant.isControllingScreen && !isCurrentUser && currentUser.isHost && onRemove ? 'right-26' :
              participant.isControllingScreen ? 'right-20' :
              participant.isScreenSharing && !isCurrentUser && currentUser.isHost && onRemove ? 'right-26' :
              participant.isScreenSharing ? 'right-18' :
              !isCurrentUser && currentUser.isHost && onRemove ? 'right-14' : 'right-2'
            } bg-orange-500 text-white px-2.5 py-1 rounded text-sm font-medium z-10 flex items-center`}>
              <MousePointer className="w-4 h-4 mr-1" />
              Sharing Control
            </div>
          </Tooltip>
        )}

        {isCurrentUser && settings.selectedBackground.type !== 'none' && !isScreenShare && (
          <Tooltip content="Background effect" hint={`Using ${settings.selectedBackground.name} background`}>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm font-medium z-10">
              {settings.selectedBackground.name}
            </div>
          </Tooltip>
        )}
      </div>

      {!isScreenShare && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white text-lg font-semibold truncate">
                {participant.name}
                {isCurrentUser && ' (You)'}
              </span>
              <div className="flex items-center gap-2">
                <Tooltip 
                  content={participant.isMuted ? "Muted" : "Unmuted"} 
                  hint={!isCurrentUser && currentUser.isHost ? "Click to mute/unmute" : "Microphone status"}
                >
                  <button
                    onClick={handleMuteClick}
                    disabled={isCurrentUser || !currentUser.isHost}
                    className={`${
                      !isCurrentUser && currentUser.isHost 
                        ? 'cursor-pointer hover:scale-110 transition-transform' 
                        : 'cursor-default'
                    }`}
                  >
                    {participant.isMuted ? (
                      <MicOff className="w-5 h-5 text-red-500" />
                    ) : (
                      <Mic className="w-5 h-5 text-green-500" />
                    )}
                  </button>
                </Tooltip>
                {!participant.isCameraOn && (
                  <Tooltip content="Camera off" hint="Video is disabled">
                    <VideoOff className="w-5 h-5 text-red-500" />
                  </Tooltip>
                )}
                {participant.isHandRaised && (
                  <Tooltip content="Hand raised" hint="Wants to speak">
                    <Hand className="w-5 h-5 text-yellow-500" />
                  </Tooltip>
                )}
                {participant.isControllingScreen && (
                  <Tooltip content="Controlling" hint="Controlling another's screen">
                    <MousePointer className="w-5 h-5 text-blue-500" />
                  </Tooltip>
                )}
                {participant.isAllowingControl && (
                  <Tooltip content="Sharing control" hint="Allowing screen control">
                    <MousePointer className="w-5 h-5 text-orange-500" />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isCurrentUser && !isScreenShare && (
        <div className="absolute inset-0 border-4 border-blue-500 rounded-3xl pointer-events-none" />
      )}

      {showRemoveConfirm && (
        <div 
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-40 rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm mx-4 border border-gray-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <UserX className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-white text-lg font-semibold">Remove Participant</h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove <span className="font-medium text-white">{participant.name}</span> from the meeting? 
              They will be disconnected immediately and won't be able to rejoin without a new invitation.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelRemove}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <UserX className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
 */
