import { useState, useCallback, useEffect } from 'react';

export const useVideoConference = () => {
  const [state, setState] = useState({
    participants: [
      {
        id: 'user-1',
        name: 'You',
        isHost: true,
        isMuted: false,
        isCameraOn: true,
        isScreenSharing: false,
        isHandRaised: false,
        isControllingScreen: false,
        isAllowingControl: false,
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        isHost: false,
        isMuted: false,
        isCameraOn: true,
        isScreenSharing: false,
        isHandRaised: false,
        isControllingScreen: false,
        isAllowingControl: false,
      },
      {
        id: 'user-3',
        name: 'Mike Chen',
        isHost: false,
        isMuted: true,
        isCameraOn: false,
        isScreenSharing: false,
        isHandRaised: true,
        isControllingScreen: false,
        isAllowingControl: false,
      },
      {
        id: 'user-4',
        name: 'Emily Davis',
        isHost: false,
        isMuted: false,
        isCameraOn: true,
        isScreenSharing: false,
        isHandRaised: false,
        isControllingScreen: false,
        isAllowingControl: false,
      },
    ],
    currentUser: {
      id: 'user-1',
      name: 'You',
      isHost: true,
      isMuted: false,
      isCameraOn: true,
      isScreenSharing: false,
      isHandRaised: false,
      isControllingScreen: false,
      isAllowingControl: false,
    },
    chatMessages: [
      {
        id: 'msg-1',
        participantId: 'system',
        participantName: 'System',
        message: 'Welcome to the meeting!',
        timestamp: new Date(Date.now() - 300000),
        type: 'system',
      },
      {
        id: 'msg-2',
        participantId: 'user-2',
        participantName: 'Sarah Johnson',
        message: 'Hello everyone! Can you see my screen?',
        timestamp: new Date(Date.now() - 240000),
        type: 'message',
      },
      {
        id: 'msg-3',
        participantId: 'user-3',
        participantName: 'Mike Chen',
        message: 'Yes, looks good! Thanks for presenting.',
        timestamp: new Date(Date.now() - 180000),
        type: 'message',
      },
      {
        id: 'msg-4',
        participantId: 'user-2',
        participantName: 'Sarah Johnson',
        message: 'Here are the quarterly reports',
        timestamp: new Date(Date.now() - 120000),
        type: 'message',
        attachment: {
          id: 'att-1',
          name: 'Q4-Report-2024.pdf',
          size: 2048576,
          type: 'application/pdf',
          url: 'https://example.com/files/Q4-Report-2024.pdf',
        },
      },
      {
        id: 'msg-5',
        participantId: 'user-4',
        participantName: 'Emily Davis',
        message: 'Great work on the design mockups!',
        timestamp: new Date(Date.now() - 60000),
        type: 'message',
        attachment: {
          id: 'att-2',
          name: 'design-mockup.png',
          size: 1536000,
          type: 'image/png',
          url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
          thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=300&h=200&fit=crop',
        },
      },
    ],
    transcriptionEntries: [
      {
        id: 'trans-1',
        participantId: 'user-2',
        participantName: 'Sarah Johnson',
        text: 'Good morning everyone, thank you for joining today\'s standup meeting.',
        timestamp: new Date(Date.now() - 300000),
        confidence: 0.95,
        isFinal: true,
      },
      {
        id: 'trans-2',
        participantId: 'user-1',
        participantName: 'You',
        text: 'Thanks Sarah. Let\'s start with our progress updates from yesterday.',
        timestamp: new Date(Date.now() - 280000),
        confidence: 0.92,
        isFinal: true,
      },
      {
        id: 'trans-3',
        participantId: 'user-3',
        participantName: 'Mike Chen',
        text: 'I completed the user authentication module and started working on the dashboard components.',
        timestamp: new Date(Date.now() - 260000),
        confidence: 0.88,
        isFinal: true,
      },
      {
        id: 'trans-4',
        participantId: 'user-4',
        participantName: 'Emily Davis',
        text: 'The design system is now ready and I\'ve shared the Figma files with the team.',
        timestamp: new Date(Date.now() - 240000),
        confidence: 0.94,
        isFinal: true,
      },
      {
        id: 'trans-5',
        participantId: 'user-2',
        participantName: 'Sarah Johnson',
        text: 'Great progress everyone. Are there any blockers we need to discuss?',
        timestamp: new Date(Date.now() - 220000),
        confidence: 0.91,
        isFinal: true,
      },
      {
        id: 'trans-6',
        participantId: 'user-3',
        participantName: 'Mike Chen',
        text: 'I need clarification on the API endpoints for the user profile section.',
        timestamp: new Date(Date.now() - 200000),
        confidence: 0.87,
        isFinal: true,
      },
      {
        id: 'trans-7',
        participantId: 'user-1',
        participantName: 'You',
        text: 'I can help with that after the meeting. Let\'s schedule a quick sync.',
        timestamp: new Date(Date.now() - 180000),
        confidence: 0.93,
        isFinal: true,
      },
      {
        id: 'trans-8',
        participantId: 'user-4',
        participantName: 'Emily Davis',
        text: 'The client feedback on the mockups was very positive. They want to proceed with the current design direction.',
        timestamp: new Date(Date.now() - 160000),
        confidence: 0.89,
        isFinal: true,
      },
      {
        id: 'trans-9',
        participantId: 'user-2',
        participantName: 'Sarah Johnson',
        text: 'That\'s excellent news! Let\'s make sure we stay on track for the sprint deadline.',
        timestamp: new Date(Date.now() - 140000),
        confidence: 0.96,
        isFinal: true,
      },
      {
        id: 'trans-10',
        participantId: 'user-1',
        participantName: 'You',
        text: 'I think we should also discuss the testing strategy for the new features.',
        timestamp: new Date(Date.now() - 120000),
        confidence: 0.85,
        isFinal: true,
      },
    ],
    transcriptionSummary: null,
    isChatOpen: false,
    isTranscriptionOpen: false,
    isNotesOpen: false,
    isRecording: false,
    meetingStartTime: new Date(Date.now() - 900000),
    settings: {
      selectedBackground: {
        id: 'none',
        name: 'None',
        type: 'none',
      },
      customBackgrounds: [],
      isTranscriptionEnabled: true,
      transcriptionLanguage: 'en-US',
    },
    pendingControlRequests: [],
    noteFolders: [
      {
        id: 'folder-1',
        name: 'Meeting Notes',
        color: '#3B82F6',
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000),
      },
      {
        id: 'folder-2',
        name: 'Action Items',
        color: '#10B981',
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 7200000),
      },
      {
        id: 'folder-3',
        name: 'Project Ideas',
        color: '#F59E0B',
        createdAt: new Date(Date.now() - 259200000),
        updatedAt: new Date(Date.now() - 10800000),
      },
    ],
    noteArticles: [
      {
        id: 'article-1',
        title: 'Daily Standup - Sprint Planning',
        content: `# Sprint Planning Discussion

## Key Points Discussed:
- User authentication module completion
- Dashboard components progress
- Design system finalization
- Client feedback on mockups

## Next Steps:
- Schedule API endpoints sync with Mike
- Proceed with approved design direction
- Plan testing strategy for new features
- Maintain sprint timeline

## Blockers:
- API endpoint clarification needed for user profile section

## Team Feedback:
- Positive client response on design mockups
- Good progress across all work streams
- Team collaboration is effective`,
        folderId: 'folder-1',
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 1800000),
        tags: ['standup', 'sprint-planning', 'progress'],
      },
      {
        id: 'article-2',
        title: 'API Endpoints Documentation',
        content: `# API Endpoints for User Profile

## Required Endpoints:
1. GET /api/user/profile - Retrieve user profile data
2. PUT /api/user/profile - Update user profile
3. POST /api/user/avatar - Upload profile avatar
4. DELETE /api/user/account - Delete user account

## Authentication:
- Bearer token required for all endpoints
- Token validation middleware needed

## Response Format:
- JSON format with consistent error handling
- Include pagination for list endpoints

## Security Considerations:
- Input validation on all fields
- Rate limiting implementation
- CORS configuration`,
        folderId: 'folder-1',
        createdAt: new Date(Date.now() - 7200000),
        updatedAt: new Date(Date.now() - 3600000),
        tags: ['api', 'documentation', 'backend'],
      },
      {
        id: 'article-3',
        title: 'Testing Strategy Follow-up',
        content: `# Testing Strategy for New Features

## Testing Approach:
- Unit tests for all new components
- Integration tests for API endpoints
- E2E tests for critical user flows
- Performance testing for dashboard

## Tools & Framework:
- Jest for unit testing
- Cypress for E2E testing
- React Testing Library for component tests
- Lighthouse for performance audits

## Coverage Goals:
- 90% code coverage minimum
- All critical paths tested
- Error scenarios covered

## Timeline:
- Week 1: Unit tests implementation
- Week 2: Integration tests
- Week 3: E2E tests and performance testing`,
        folderId: 'folder-2',
        createdAt: new Date(Date.now() - 10800000),
        updatedAt: new Date(Date.now() - 5400000),
        tags: ['testing', 'strategy', 'qa'],
      },
      {
        id: 'article-4',
        title: 'Mobile App Concept',
        content: `# Mobile Application Ideas

## Core Features:
- Real-time video conferencing
- Screen sharing capabilities
- Chat and file sharing
- Meeting notes and transcription
- Calendar integration

## Technical Stack:
- React Native for cross-platform development
- WebRTC for video/audio
- Socket.io for real-time communication
- Firebase for backend services

## Unique Selling Points:
- AI-powered meeting summaries
- Smart note-taking with voice recognition
- Seamless desktop-mobile sync
- Advanced collaboration tools

## Market Research:
- Competitor analysis needed
- User survey for feature validation
- Technical feasibility study`,
        folderId: 'folder-3',
        createdAt: new Date(Date.now() - 14400000),
        updatedAt: new Date(Date.now() - 7200000),
        tags: ['mobile', 'concept', 'product-idea'],
      },
    ],
  });

  const [screenStream, setScreenStream] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRemoteControlOpen, setIsRemoteControlOpen] = useState(false);
  const [showRecordingStopModal, setShowRecordingStopModal] = useState(false);

  // Simulate live transcription
  useEffect(() => {
    if (!state.settings.isTranscriptionEnabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const speakers = state.participants.filter(p => !p.isMuted);
        if (speakers.length === 0) return;

        const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
        const sampleTexts = [
          "I think we should consider this approach for better performance.",
          "The integration with the third-party API is working smoothly now.",
          "We might need to adjust the timeline based on the new requirements.",
          "The user feedback has been very positive so far.",
          "Let's make sure we document this process for future reference.",
          "I'll follow up with the stakeholders after this meeting.",
          "The deployment went smoothly yesterday evening.",
          "We should schedule a code review session next week.",
        ];

        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        const confidence = 0.8 + Math.random() * 0.2;

        const newEntry = {
          id: `trans-${Date.now()}-${Math.random()}`,
          participantId: randomSpeaker.id,
          participantName: randomSpeaker.name,
          text: randomText,
          timestamp: new Date(),
          confidence,
          isFinal: Math.random() > 0.3,
        };

        setState(prev => ({
          ...prev,
          transcriptionEntries: [...prev.transcriptionEntries, newEntry],
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [state.settings.isTranscriptionEnabled, state.participants]);

  const toggleMute = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser, isMuted: !prev.currentUser.isMuted },
      participants: prev.participants.map(p =>
        p.id === prev.currentUser.id ? { ...p, isMuted: !p.isMuted } : p
      ),
    }));
  }, []);

  const toggleCamera = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser, isCameraOn: !prev.currentUser.isCameraOn },
      participants: prev.participants.map(p =>
        p.id === prev.currentUser.id ? { ...p, isCameraOn: !p.isCameraOn } : p
      ),
    }));
  }, []);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (state.currentUser.isScreenSharing) {
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
          setScreenStream(null);
        }

        setState(prev => ({
          ...prev,
          currentUser: { ...prev.currentUser, isScreenSharing: false },
          participants: prev.participants.map(p =>
            p.id === prev.currentUser.id ? { ...p, isScreenSharing: false } : p
          ),
        }));

        const stopShareMessage = {
          id: `msg-${Date.now()}`,
          participantId: 'system',
          participantName: 'System',
          message: `${state.currentUser.name} stopped presenting`,
          timestamp: new Date(),
          type: 'system',
        };

        setState(prev => ({
          ...prev,
          chatMessages: [...prev.chatMessages, stopShareMessage],
        }));
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            mediaSource: 'screen',
          },
          audio: true,
        });

        setScreenStream(stream);

        setState(prev => ({
          ...prev,
          currentUser: { ...prev.currentUser, isScreenSharing: true },
          participants: prev.participants.map(p =>
            p.id === prev.currentUser.id ? { ...p, isScreenSharing: true } : p
          ),
        }));

        const startShareMessage = {
          id: `msg-${Date.now()}`,
          participantId: 'system',
          participantName: 'System',
          message: `${state.currentUser.name} started presenting`,
          timestamp: new Date(),
          type: 'system',
        };

        setState(prev => ({
          ...prev,
          chatMessages: [...prev.chatMessages, startShareMessage],
        }));

        stream.getVideoTracks()[0].addEventListener('ended', () => {
          setScreenStream(null);
          setState(prev => ({
            ...prev,
            currentUser: { ...prev.currentUser, isScreenSharing: false },
            participants: prev.participants.map(p =>
              p.id === prev.currentUser.id ? { ...p, isScreenSharing: false } : p
            ),
          }));

          const endShareMessage = {
            id: `msg-${Date.now()}`,
            participantId: 'system',
            participantName: 'System',
            message: `${state.currentUser.name} stopped presenting`,
            timestamp: new Date(),
            type: 'system',
          };

          setState(prev => ({
            ...prev,
            chatMessages: [...prev.chatMessages, endShareMessage],
          }));
        });
      }
    } catch (error) {
      console.error('Error accessing screen share:', error);
    }
  }, [state.currentUser.isScreenSharing, state.currentUser.name, screenStream]);

  const toggleHandRaise = useCallback(() => {
    const newHandRaisedState = !state.currentUser.isHandRaised;
    
    setState(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser, isHandRaised: newHandRaisedState },
      participants: prev.participants.map(p =>
        p.id === prev.currentUser.id ? { ...p, isHandRaised: newHandRaisedState } : p
      ),
    }));

    const handRaiseMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${state.currentUser.name} ${newHandRaisedState ? 'raised their hand' : 'lowered their hand'}`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, handRaiseMessage],
    }));
  }, [state.currentUser.isHandRaised, state.currentUser.name]);

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isChatOpen: !prev.isChatOpen }));
  }, []);

  const toggleTranscription = useCallback(() => {
    setState(prev => ({ ...prev, isTranscriptionOpen: !prev.isTranscriptionOpen }));
  }, []);

  const toggleNotes = useCallback(() => {
    setState(prev => ({ ...prev, isNotesOpen: !prev.isNotesOpen }));
  }, []);

  const toggleRecording = useCallback(() => {
    if (state.isRecording) {
      setShowRecordingStopModal(true);
    } else {
      setState(prev => ({ ...prev, isRecording: true }));
      
      const startRecordingMessage = {
        id: `msg-${Date.now()}`,
        participantId: 'system',
        participantName: 'System',
        message: 'Recording started',
        timestamp: new Date(),
        type: 'system',
      };

      setState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, startRecordingMessage],
      }));
    }
  }, [state.isRecording]);

  const confirmStopRecording = useCallback(() => {
    setState(prev => ({ ...prev, isRecording: false }));
    setShowRecordingStopModal(false);
    
    const stopRecordingMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: 'Recording stopped and saved',
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, stopRecordingMessage],
    }));
  }, []);

  const cancelStopRecording = useCallback(() => {
    setShowRecordingStopModal(false);
  }, []);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen(prev => !prev);
  }, []);

  const toggleRemoteControl = useCallback(() => {
    setIsRemoteControlOpen(prev => !prev);
  }, []);

  const toggleTranscriptionEnabled = useCallback(() => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        isTranscriptionEnabled: !prev.settings.isTranscriptionEnabled,
      },
    }));
  }, []);

  const updateTranscriptionLanguage = useCallback((language) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        transcriptionLanguage: language,
      },
    }));
  }, []);

  const generateSummary = useCallback(() => {
    if (state.transcriptionEntries.length === 0) return;

    setState(prev => ({
      ...prev,
      transcriptionSummary: {
        id: `summary-${Date.now()}`,
        title: 'Meeting Summary',
        content: '',
        keyPoints: [],
        actionItems: [],
        participants: [],
        duration: '',
        timestamp: new Date(),
        isGenerating: true,
      },
    }));

    setTimeout(() => {
      const participantNames = [...new Set(state.transcriptionEntries.map(entry => entry.participantName))];
      const meetingDuration = Math.floor((Date.now() - state.meetingStartTime.getTime()) / 60000);
      
      const summary = {
        id: `summary-${Date.now()}`,
        title: 'Daily Standup Meeting Summary',
        content: 'The team conducted their daily standup meeting to discuss progress updates, share accomplishments, and identify any blockers. The meeting covered progress on user authentication, dashboard components, design system completion, and positive client feedback on mockups. The team demonstrated good collaboration and clear communication about project status and next steps.',
        keyPoints: [
          'User authentication module has been completed successfully',
          'Dashboard components development is in progress',
          'Design system is ready and Figma files have been shared',
          'Client provided positive feedback on design mockups',
          'Team is on track for sprint deadline',
          'API endpoint clarification needed for user profile section',
          'Testing strategy discussion scheduled for new features'
        ],
        actionItems: [
          'Schedule sync session for API endpoints clarification',
          'Proceed with current design direction based on client approval',
          'Document the development process for future reference',
          'Follow up with stakeholders after the meeting',
          'Schedule code review session for next week',
          'Finalize testing strategy for new features'
        ],
        participants: participantNames,
        duration: `${meetingDuration} minutes`,
        timestamp: new Date(),
        isGenerating: false,
      };

      setState(prev => ({
        ...prev,
        transcriptionSummary: summary,
      }));

      const summaryMessage = {
        id: `msg-${Date.now()}`,
        participantId: 'system',
        participantName: 'System',
        message: 'Meeting summary has been generated and is available in the transcription panel',
        timestamp: new Date(),
        type: 'system',
      };

      setState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, summaryMessage],
      }));
    }, 3000);
  }, [state.transcriptionEntries, state.meetingStartTime]);

  const updateSettings = useCallback((newSettings) => {
    setState(prev => ({
      ...prev,
      settings: newSettings,
    }));
  }, []);

  const createFileAttachment = (file) => {
    const url = URL.createObjectURL(file);
    const attachment = {
      id: `att-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url,
    };

    if (file.type.startsWith('image/')) {
      attachment.thumbnailUrl = url;
    }

    return attachment;
  };

  const sendMessage = useCallback((message, file) => {
    const attachment = file ? createFileAttachment(file) : undefined;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      participantId: state.currentUser.id,
      participantName: state.currentUser.name,
      message,
      timestamp: new Date(),
      type: 'message',
      attachment,
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMessage],
    }));
  }, [state.currentUser.id, state.currentUser.name]);

  const addParticipant = useCallback((name) => {
    const newParticipant = {
      id: `user-${Date.now()}`,
      name,
      isHost: false,
      isMuted: false,
      isCameraOn: Math.random() > 0.3,
      isScreenSharing: false,
      isHandRaised: false,
      isControllingScreen: false,
      isAllowingControl: false,
    };

    const joinMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${name} joined the meeting`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
      chatMessages: [...prev.chatMessages, joinMessage],
    }));
  }, []);

  const removeParticipant = useCallback((participantId) => {
    const participant = state.participants.find(p => p.id === participantId);
    if (!participant || participant.id === state.currentUser.id) return;

    const leaveMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${participant.name} left the meeting`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== participantId),
      chatMessages: [...prev.chatMessages, leaveMessage],
    }));
  }, [state.participants, state.currentUser.id]);

  const muteParticipant = useCallback((participantId) => {
    const participant = state.participants.find(p => p.id === participantId);
    if (!participant || participant.id === state.currentUser.id) return;

    setState(prev => ({
      ...prev,
      participants: prev.participants.map(p =>
        p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
      ),
    }));

    const muteMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${participant.name} was ${participant.isMuted ? 'unmuted' : 'muted'} by the host`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, muteMessage],
    }));
  }, [state.participants, state.currentUser.id]);

  const lowerAllHands = useCallback(() => {
    const raisedHands = state.participants.filter(p => p.isHandRaised);
    
    if (raisedHands.length === 0) return;

    setState(prev => ({
      ...prev,
      participants: prev.participants.map(p => ({ ...p, isHandRaised: false })),
      currentUser: { ...prev.currentUser, isHandRaised: false },
    }));

    const lowerHandsMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: 'All hands have been lowered',
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, lowerHandsMessage],
    }));
  }, [state.participants]);

  const requestRemoteControl = useCallback((targetId) => {
    const target = state.participants.find(p => p.id === targetId);
    if (!target) return;

    const newRequest = {
      id: `req-${Date.now()}`,
      requesterId: state.currentUser.id,
      requesterName: state.currentUser.name,
      targetId,
      targetName: target.name,
      timestamp: new Date(),
      status: 'pending',
    };

    setState(prev => ({
      ...prev,
      pendingControlRequests: [...prev.pendingControlRequests, newRequest],
    }));

    const requestMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${state.currentUser.name} requested control of ${target.name}'s screen`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, requestMessage],
    }));
  }, [state.currentUser, state.participants]);

  const approveRemoteControl = useCallback((requestId) => {
    const request = state.pendingControlRequests.find(r => r.id === requestId);
    if (!request) return;

    setState(prev => ({
      ...prev,
      participants: prev.participants.map(p => {
        if (p.id === request.requesterId) {
          return { ...p, isControllingScreen: true };
        }
        if (p.id === request.targetId) {
          return { ...p, isAllowingControl: true };
        }
        return p;
      }),
      currentUser: prev.currentUser.id === request.requesterId 
        ? { ...prev.currentUser, isControllingScreen: true }
        : prev.currentUser.id === request.targetId
        ? { ...prev.currentUser, isAllowingControl: true }
        : prev.currentUser,
      pendingControlRequests: prev.pendingControlRequests.filter(r => r.id !== requestId),
    }));

    const approveMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${request.targetName} granted control to ${request.requesterName}`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, approveMessage],
    }));
  }, [state.pendingControlRequests]);

  const denyRemoteControl = useCallback((requestId) => {
    const request = state.pendingControlRequests.find(r => r.id === requestId);
    if (!request) return;

    setState(prev => ({
      ...prev,
      pendingControlRequests: prev.pendingControlRequests.filter(r => r.id !== requestId),
    }));

    const denyMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `${request.targetName} denied control request from ${request.requesterName}`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, denyMessage],
    }));
  }, [state.pendingControlRequests]);

  const stopRemoteControl = useCallback(() => {
    const controllingParticipant = state.participants.find(p => p.isControllingScreen);
    const allowingParticipant = state.participants.find(p => p.isAllowingControl);

    if (!controllingParticipant || !allowingParticipant) return;

    setState(prev => ({
      ...prev,
      participants: prev.participants.map(p => ({
        ...p,
        isControllingScreen: false,
        isAllowingControl: false,
      })),
      currentUser: {
        ...prev.currentUser,
        isControllingScreen: false,
        isAllowingControl: false,
      },
    }));

    const stopMessage = {
      id: `msg-${Date.now()}`,
      participantId: 'system',
      participantName: 'System',
      message: `Remote control session ended between ${controllingParticipant.name} and ${allowingParticipant.name}`,
      timestamp: new Date(),
      type: 'system',
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, stopMessage],
    }));
  }, [state.participants]);

  // Notes management functions
  const createFolder = useCallback((name, color) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      noteFolders: [...prev.noteFolders, newFolder],
    }));
  }, []);

  const updateFolder = useCallback((id, name, color) => {
    setState(prev => ({
      ...prev,
      noteFolders: prev.noteFolders.map(folder =>
        folder.id === id
          ? { ...folder, name, color, updatedAt: new Date() }
          : folder
      ),
    }));
  }, []);

  const deleteFolder = useCallback((id) => {
    setState(prev => ({
      ...prev,
      noteFolders: prev.noteFolders.filter(folder => folder.id !== id),
      noteArticles: prev.noteArticles.filter(article => article.folderId !== id),
    }));
  }, []);

  const createArticle = useCallback((title, content, folderId, tags) => {
    const newArticle = {
      id: `article-${Date.now()}`,
      title,
      content,
      folderId,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      noteArticles: [...prev.noteArticles, newArticle],
      noteFolders: prev.noteFolders.map(folder =>
        folder.id === folderId
          ? { ...folder, updatedAt: new Date() }
          : folder
      ),
    }));
  }, []);

  const updateArticle = useCallback((id, title, content, tags) => {
    setState(prev => ({
      ...prev,
      noteArticles: prev.noteArticles.map(article =>
        article.id === id
          ? { ...article, title, content, tags, updatedAt: new Date() }
          : article
      ),
    }));
  }, []);

  const deleteArticle = useCallback((id) => {
    setState(prev => ({
      ...prev,
      noteArticles: prev.noteArticles.filter(article => article.id !== id),
    }));
  }, []);

  // Cleanup screen stream on unmount
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [screenStream]);

  return {
    ...state,
    isSettingsOpen,
    isRemoteControlOpen,
    showRecordingStopModal,
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
    toggleTranscriptionEnabled,
    updateTranscriptionLanguage,
    generateSummary,
    updateSettings,
    sendMessage,
    addParticipant,
    removeParticipant,
    muteParticipant,
    lowerAllHands,
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
  };
};