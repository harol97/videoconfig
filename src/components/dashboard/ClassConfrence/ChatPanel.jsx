import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Users, Hand, Paperclip, Download, FileText, Image, Video, Music, Archive } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const ChatPanel = ({
  isOpen,
  onClose,
  messages,
  participants,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() || selectedFile) {
      onSendMessage(newMessage.trim() || '', selectedFile || undefined);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText className="w-4 h-4" />;
    return <Archive className="w-4 h-4" />;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDownload = (attachment) => {
    // In a real app, this would download the actual file
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    link.click();
  };

  if (!isOpen) return null;

  return (
    // <div className="w-80 bg-dark border-start border-secondary d-flex flex-column h-100">
    //   {/* Header */}
    //   <div className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
    //     <div className="d-flex align-items-center gap-2">
    //       <Tooltip content="Participants" hint="View all meeting participants">
    //         <Users className="text-muted" size={20} />
    //       </Tooltip>
    //       <h3 className="text-white fw-medium m-0">Chat & Participants</h3>
    //     </div>
    //     <Tooltip content="Close chat" hint="Close the chat panel">
    //       <button
    //         onClick={onClose}
    //         className="btn btn-sm btn-outline-secondary"
    //       >
    //         <X className="text-muted" size={20} />
    //       </button>
    //     </Tooltip>
    //   </div>

    //   {/* Participants List */}
    //   <div className="p-3 border-bottom border-secondary">
    //     <h4 className="text-light small fw-medium mb-3">
    //       Participants ({participants.length})
    //     </h4>
    //     <div className="d-flex flex-column gap-2">
    //       {participants.map((participant) => (
    //         <div key={participant.id} className="d-flex align-items-center gap-3">
    //           <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
    //             {participant.name.split(' ').map(n => n[0]).join('')}
    //           </div>
    //           <div className="flex-grow-1 text-truncate">
    //             <p className="text-white small m-0 text-truncate">
    //               {participant.name}
    //               {participant.id === 'user-1' && ' (You)'}
    //             </p>
    //             {participant.isHost && (
    //               <p className="text-primary small m-0">Host</p>
    //             )}
    //           </div>
    //           <div className="d-flex align-items-center gap-1">
    //             {participant.isHandRaised && (
    //               <Tooltip content="Hand raised" hint="This participant wants to speak">
    //                 <Hand className="text-warning animate-bounce" size={16} />
    //               </Tooltip>
    //             )}
    //             {participant.isMuted && (
    //               <Tooltip content="Muted" hint="Microphone is off">
    //                 <div className="rounded-circle bg-danger" style={{width: '8px', height: '8px'}} />
    //               </Tooltip>
    //             )}
    //             {!participant.isCameraOn && (
    //               <Tooltip content="Camera off" hint="Video is disabled">
    //                 <div className="rounded-circle bg-secondary" style={{width: '8px', height: '8px'}} />
    //               </Tooltip>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Messages */}
    //   <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3">
    //     {messages.map((message) => (
    //       <div key={message.id} className="group">
    //         {message.type === 'system' ? (
    //           <div className="text-center">
    //             <p className="text-muted small bg-secondary rounded-pill px-3 py-1 d-inline-block">
    //               {message.message}
    //             </p>
    //           </div>
    //         ) : (
    //           <div className="d-flex flex-column gap-1">
    //             <div className="d-flex align-items-center gap-2">
    //               <p className="text-light small fw-medium">
    //                 {message.participantName}
    //               </p>
    //               <p className="text-muted small">
    //                 {formatTime(message.timestamp)}
    //               </p>
    //             </div>
    //             <div className="bg-secondary rounded p-3">
    //               {message.message && (
    //                 <p className="text-white small mb-2">{message.message}</p>
    //               )}
    //               {message.attachment && (
    //                 <div className="bg-dark rounded p-3 border border-secondary">
    //                   <div className="d-flex align-items-center justify-content-between">
    //                     <div className="d-flex align-items-center gap-3">
    //                       <div className="text-primary">
    //                         {getFileIcon(message.attachment.type)}
    //                       </div>
    //                       <div className="flex-grow-1 text-truncate">
    //                         <p className="text-white small fw-medium text-truncate">
    //                           {message.attachment.name}
    //                         </p>
    //                         <p className="text-muted small">
    //                           {formatFileSize(message.attachment.size)}
    //                         </p>
    //                       </div>
    //                     </div>
    //                     <Tooltip content="Download" hint="Download this file">
    //                       <button
    //                         onClick={() => handleDownload(message.attachment)}
    //                         className="btn btn-sm btn-link p-0"
    //                       >
    //                         <Download className="text-light" size={16} />
    //                       </button>
    //                     </Tooltip>
    //                   </div>
    //                   {message.attachment.thumbnailUrl && message.attachment.type.startsWith('image/') && (
    //                     <div className="mt-2">
    //                       <img
    //                         src={message.attachment.thumbnailUrl}
    //                         alt={message.attachment.name}
    //                         className="img-fluid rounded cursor-pointer hover-opacity-75"
    //                         style={{maxHeight: '128px'}}
    //                         onClick={() => window.open(message.attachment.url, '_blank')}
    //                       />
    //                     </div>
    //                   )}
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //     <div ref={messagesEndRef} />
    //   </div>

    //   {/* File Preview */}
    //   {selectedFile && (
    //     <div className="p-3 border-top border-secondary bg-secondary">
    //       <div className="d-flex align-items-center justify-content-between bg-dark rounded p-3">
    //         <div className="d-flex align-items-center gap-3">
    //           <div className="text-primary">
    //             {getFileIcon(selectedFile.type)}
    //           </div>
    //           <div className="flex-grow-1 text-truncate">
    //             <p className="text-white small fw-medium text-truncate">
    //               {selectedFile.name}
    //             </p>
    //             <p className="text-muted small">
    //               {formatFileSize(selectedFile.size)}
    //             </p>
    //           </div>
    //         </div>
    //         <Tooltip content="Remove file" hint="Remove the selected file">
    //           <button
    //             onClick={removeSelectedFile}
    //             className="btn btn-sm btn-link p-0"
    //           >
    //             <X className="text-light" size={16} />
    //           </button>
    //         </Tooltip>
    //       </div>
    //     </div>
    //   )}

    //   {/* Message Input */}
    //   <form onSubmit={handleSendMessage} className="p-3 border-top border-secondary">
    //     <div className="d-flex gap-2">
    //       <input
    //         type="file"
    //         ref={fileInputRef}
    //         onChange={handleFileSelect}
    //         className="d-none"
    //         accept="*/*"
    //       />
    //       <Tooltip content="Attach file" hint="Attach a file to your message">
    //         <button
    //           type="button"
    //           onClick={() => fileInputRef.current?.click()}
    //           className="btn btn-secondary p-2 rounded"
    //         >
    //           <Paperclip className="text-light" size={16} />
    //         </button>
    //       </Tooltip>
    //       <input
    //         type="text"
    //         value={newMessage}
    //         onChange={(e) => setNewMessage(e.target.value)}
    //         placeholder={selectedFile ? "Add a message..." : "Type a message..."}
    //         className="form-control form-control-sm bg-dark text-white"
    //       />
    //       <Tooltip content="Send message" hint="Send your message to all participants">
    //         <button
    //           type="submit"
    //           disabled={!newMessage.trim() && !selectedFile}
    //           className="btn btn-primary p-2 rounded"
    //         >
    //           <Send className="text-white" size={16} />
    //         </button>
    //       </Tooltip>
    //     </div>
    //   </form>
    // </div>
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tooltip content="Participants" hint="View all meeting participants">
            <Users className="w-5 h-5 text-gray-400" />
          </Tooltip>
          <h3 className="text-white font-medium">Chat & Participants</h3>
        </div>
        <Tooltip content="Close chat" hint="Close the chat panel">
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </Tooltip>
      </div>

      {/* Participants List */}
      <div className="p-4 border-b border-gray-700">
        <h4 className="text-gray-300 text-sm font-medium mb-3">
          Participants ({participants.length})
        </h4>
        <div className="space-y-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {participant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">
                  {participant.name}
                  {participant.id === 'user-1' && ' (You)'}
                </p>
                {participant.isHost && (
                  <p className="text-blue-400 text-xs">Host</p>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {participant.isHandRaised && (
                  <Tooltip content="Hand raised" hint="This participant wants to speak">
                    <Hand className="w-4 h-4 text-yellow-400 animate-bounce" />
                  </Tooltip>
                )}
                {participant.isMuted && (
                  <Tooltip content="Muted" hint="Microphone is off">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                  </Tooltip>
                )}
                {!participant.isCameraOn && (
                  <Tooltip content="Camera off" hint="Video is disabled">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="group">
            {message.type === 'system' ? (
              <div className="text-center">
                <p className="text-gray-400 text-xs bg-gray-800 rounded-md px-3 py-1 inline-block">
                  {message.message}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-gray-300 text-xs font-medium">
                    {message.participantName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  {message.message && (
                    <p className="text-white text-sm mb-2">{message.message}</p>
                  )}
                  {message.attachment && (
                    <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-400">
                            {getFileIcon(message.attachment.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {message.attachment.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {formatFileSize(message.attachment.size)}
                            </p>
                          </div>
                        </div>
                        <Tooltip content="Download" hint="Download this file">
                          <button
                            onClick={() => handleDownload(message.attachment)}
                            className="p-1 rounded hover:bg-gray-600 transition-colors"
                          >
                            <Download className="w-4 h-4 text-gray-300" />
                          </button>
                        </Tooltip>
                      </div>
                      {message.attachment.thumbnailUrl && message.attachment.type.startsWith('image/') && (
                        <div className="mt-2">
                          <img
                            src={message.attachment.thumbnailUrl}
                            alt={message.attachment.name}
                            className="max-w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                            // onClick={() => window.open(message.attachment!.url, '_blank')}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="text-blue-400">
                {getFileIcon(selectedFile.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Tooltip content="Remove file" hint="Remove the selected file">
              <button
                onClick={removeSelectedFile}
                className="p-1 rounded hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
          <Tooltip content="Attach file" hint="Attach a file to your message">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <Paperclip className="w-4 h-4 text-gray-300" />
            </button>
          </Tooltip>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={selectedFile ? "Add a message..." : "Type a message..."}
            className="flex-1 bg-gray-800 text-white rounded-lg !pl-4  py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Tooltip content="Send message" hint="Send your message to all participants">
            <button
              type="submit"
              disabled={!newMessage.trim() && !selectedFile}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};