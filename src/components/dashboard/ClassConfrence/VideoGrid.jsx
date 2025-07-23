import React from "react";
import { VideoTile } from "./VideoTile";

export const VideoGrid = ({
  participants,
  currentUser,
  settings,
  onRemoveParticipant,
  onMuteParticipant,
}) => {
  // Check if anyone is sharing their screen
  const screenSharingParticipant = participants.find(p => p.isScreenSharing);

  const getGridLayout = () => {
    const count = participants.length;
    
    if (screenSharingParticipant) {
      // When someone is sharing screen
      const otherParticipants = participants.filter(p => !p.isScreenSharing);
      const otherCount = otherParticipants.length;
      
      return {
        gridClass: 'grid-cols-2 yehhai-new',
        NewextraClass: "flex ",
        screenShareClass: 'lg:col-span-3  ',
        itemClass: 'aspect-video',
        isScreenSharing: true
      };
    }
    
    // Normal layouts when no one is sharing screen
    if (count === 1) {
      return {
        gridClass: 'grid-cols-1 grid-rows-1',
        itemClass: 'aspect-video max-h-full',
        isScreenSharing: false
      };
    }
    
    if (count === 2) {
      return {
        gridClass: 'grid-cols-2 grid-rows-1',
        itemClass: 'aspect-video',
        isScreenSharing: false
      };
    }
    
    if (count === 3) {
      return {
        gridClass: 'grid-cols-3 grid-rows-3',
        itemClass: 'aspect-video',
        isScreenSharing: false
      };
    }
    
    if (count === 4) {
      return {
        gridClass: 'grid-cols-2 grid-rows-2',
        itemClass: 'aspect-video',
        isScreenSharing: false
      };
    }
    
    if (count <= 6) {
      return {
        gridClass: 'grid-cols-3 grid-rows-2',
        itemClass: 'aspect-video',
        isScreenSharing: false
      };
    }
    
    if (count <= 9) {
      return {
        gridClass: 'grid-cols-3 grid-rows-3',
        itemClass: 'aspect-video',
        isScreenSharing: false
      };
    }
    
    // For more than 9 participants
    return {
      gridClass: 'grid-cols-4 grid-rows-3',
      itemClass: 'aspect-video',
      isScreenSharing: false
    };
  };
  const { gridClass, itemClass, screenShareClass, isScreenSharing,NewextraClass } = getGridLayout();
  const hola = false
  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className={`grid  gap-3 h-full w-full auto-rows-fr`}>

    {

          participants.map((participant) => (
            <VideoTile
              key={participant.username}
              participant={participant}
              currentUser={currentUser}
              settings={settings}
              isCurrentUser={participant.id === currentUser.id}
              onRemove={currentUser.isHost ? onRemoveParticipant : undefined}
              onMuteParticipant={currentUser.isHost ? onMuteParticipant : undefined}
              className={itemClass}
            />
          ))
    }
    </div>
    </div>
  );
};
