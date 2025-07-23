import React from 'react';
import { X, Circle, AlertTriangle, Download, Clock } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const RecordingStopModal = ({
  isOpen,
  onClose,
  onConfirmStop,
  recordingDuration,
}) => {
  if (!isOpen) return null;

  return (
    // <div className="modal show d-block bg-dark bg-opacity-75" tabIndex="-1" style={{zIndex: 1050}}>
    //   <div className="modal-dialog modal-dialog-centered">
    //     <div className="modal-content bg-dark border border-secondary">
    //       {/* Header */}
    //       <div className="modal-header border-bottom border-secondary">
    //         <div className="d-flex align-items-center gap-3">
    //           <div className="p-2 bg-danger bg-opacity-20 rounded-circle">
    //             <Circle className="text-danger" size={20} fill="currentColor" />
    //           </div>
    //           <h2 className="modal-title text-white m-0">Stop Recording</h2>
    //         </div>
    //         <Tooltip content="Close" hint="Cancel and continue recording">
    //           <button
    //             onClick={onClose}
    //             className="btn-close btn-close-white"
    //           />
    //         </Tooltip>
    //       </div>

    //       {/* Content */}
    //       <div className="modal-body">
    //         {/* Warning */}
    //         <div className="alert alert-warning bg-warning bg-opacity-10 border border-warning border-opacity-50 d-flex align-items-start gap-3 mb-4">
    //           <AlertTriangle className="text-warning mt-1" size={20} />
    //           <div>
    //             <h3 className="alert-heading text-warning small fw-bold mb-1">Recording in Progress</h3>
    //             <p className="text-light small mb-0">
    //               You are about to stop the meeting recording. This action cannot be undone.
    //             </p>
    //           </div>
    //         </div>

    //         {/* Recording Info */}
    //         <div className="card bg-secondary mb-4">
    //           <div className="card-body">
    //             <div className="d-flex justify-content-between align-items-center mb-3">
    //               <span className="text-light small">Recording Duration</span>
    //               <div className="d-flex align-items-center gap-2">
    //                 <Clock className="text-primary" size={16} />
    //                 <span className="text-white fw-bold">{recordingDuration}</span>
    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between align-items-center">
    //               <span className="text-light small">Status</span>
    //               <div className="d-flex align-items-center gap-2">
    //                 <Circle className="text-danger" size={12} fill="currentColor" />
    //                 <span className="text-danger fw-bold">Recording</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* What happens next */}
    //         <div className="card bg-secondary">
    //           <div className="card-body">
    //             <h4 className="text-white small fw-bold mb-3">What happens when you stop:</h4>
    //             <ul className="list-unstyled text-light small mb-0">
    //               <li className="d-flex align-items-center gap-2 mb-2">
    //                 <div className="rounded-circle bg-primary" style={{width: '6px', height: '6px'}} />
    //                 <span>Recording will be processed and saved</span>
    //               </li>
    //               <li className="d-flex align-items-center gap-2 mb-2">
    //                 <div className="rounded-circle bg-primary" style={{width: '6px', height: '6px'}} />
    //                 <span>Download link will be available shortly</span>
    //               </li>
    //               <li className="d-flex align-items-center gap-2">
    //                 <div className="rounded-circle bg-primary" style={{width: '6px', height: '6px'}} />
    //                 <span>All participants will be notified</span>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Footer */}
    //       <div className="modal-footer border-top border-secondary d-flex gap-3">
    //         <button
    //           onClick={onClose}
    //           className="btn btn-secondary flex-grow-1"
    //         >
    //           Continue Recording
    //         </button>
    //         <button
    //           onClick={onConfirmStop}
    //           className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2"
    //         >
    //           <Circle size={16} fill="currentColor" />
    //           <span>Stop Recording</span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-md mx-4 border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600/20 rounded-full">
              <Circle className="w-5 h-5 text-red-400 fill-current" />
            </div>
            <h2 className="text-white text-xl font-semibold">Stop Recording</h2>
          </div>
          <Tooltip content="Close" hint="Cancel and continue recording">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </Tooltip>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Warning */}
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-medium text-sm mb-1">Recording in Progress</h3>
              <p className="text-gray-300 text-sm">
                You are about to stop the meeting recording. This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Recording Info */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Recording Duration</span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">{recordingDuration}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Status</span>
              <div className="flex items-center space-x-2">
                <Circle className="w-3 h-3 text-red-400 fill-current animate-pulse" />
                <span className="text-red-400 font-medium">Recording</span>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium text-sm mb-2">What happens when you stop:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span>Recording will be processed and saved</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span>Download link will be available shortly</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span>All participants will be notified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Continue Recording
          </button>
          <button
            onClick={onConfirmStop}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Circle className="w-4 h-4 fill-current" />
            <span>Stop Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
};