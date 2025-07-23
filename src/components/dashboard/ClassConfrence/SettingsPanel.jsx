import React, { useState, useRef } from 'react';
import { X, Upload, Check, Trash2, Camera, Bluetooth as Blur, Image as ImageIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';
import {useMicrophonesInfo} from './microphone-hooks';
import {useVideoCamerasInfo} from './camera-hooks';

export const SettingsPanel = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  setAudio,
  setVideo
}) => {
  const [activeTab, setActiveTab] = useState('background');
  const fileInputRef = useRef(null);
  const microphones = useMicrophonesInfo()
  const cameras = useVideoCamerasInfo()

  const defaultBackgrounds = [
    {
      id: 'none',
      name: 'None',
      type: 'none',
    },
    {
      id: 'blur',
      name: 'Blur',
      type: 'blur',
    },
    {
      id: 'office',
      name: 'Modern Office',
      type: 'image',
      url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=150&h=100&fit=crop',
    },
    {
      id: 'library',
      name: 'Library',
      type: 'image',
      url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=150&h=100&fit=crop',
    },
    {
      id: 'nature',
      name: 'Nature View',
      type: 'image',
      url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?w=150&h=100&fit=crop',
    },
    {
      id: 'city',
      name: 'City Skyline',
      type: 'image',
      url: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
      thumbnail: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?w=150&h=100&fit=crop',
    },
  ];

  const handleBackgroundSelect = (background) => {
    onUpdateSettings({
      ...settings,
      selectedBackground: background,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      const url = URL.createObjectURL(file);
      const newBackground = {
        id: `custom-${Date.now()}`,
        name: file.name.split('.')[0],
        type: 'image',
        url,
        thumbnail: url,
      };

      const updatedSettings = {
        ...settings,
        customBackgrounds: [...settings.customBackgrounds, newBackground],
        selectedBackground: newBackground,
      };

      onUpdateSettings(updatedSettings);
    }
  };

  const handleRemoveCustomBackground = (backgroundId) => {
    const backgroundToRemove = settings.customBackgrounds.find(bg => bg.id === backgroundId);
    if (backgroundToRemove?.url) {
      URL.revokeObjectURL(backgroundToRemove.url);
    }

    const updatedCustomBackgrounds = settings.customBackgrounds.filter(bg => bg.id !== backgroundId);
    let updatedSelectedBackground = settings.selectedBackground;

    // If the removed background was selected, switch to 'none'
    if (settings.selectedBackground.id === backgroundId) {
      updatedSelectedBackground = defaultBackgrounds[0]; // 'none'
    }

    onUpdateSettings({
      ...settings,
      customBackgrounds: updatedCustomBackgrounds,
      selectedBackground: updatedSelectedBackground,
    });
  };

  const getBackgroundIcon = (type) => {
    switch (type) {
      case 'none':
        return <Camera className="w-5 h-5" />;
      case 'blur':
        return <Blur className="w-5 h-5" />;
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      default:
        return <Camera className="w-5 h-5" />;
    }
  };

  const allBackgrounds = [...defaultBackgrounds, ...settings.customBackgrounds];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">Settings</h2>
          <Tooltip content="Close settings" hint="Close the settings panel">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </Tooltip>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex p-3">
            {[
              { id: 'background', label: 'Background' },
              { id: 'audio', label: 'Audio' },
              { id: 'video', label: 'Video' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'background' && (
            <div className="gap-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Virtual Background</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Choose a background for your video. This will replace your actual background during the call.
                </p>

                {/* Background Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {allBackgrounds.map((background) => (
                    <div
                      key={background.id}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        settings.selectedBackground.id === background.id
                          ? 'border-blue-500 ring-2 ring-blue-500/20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => handleBackgroundSelect(background)}
                    >
                      <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                        {background.type === 'none' && (
                          <div className="text-gray-400">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-xs">No Background</p>
                          </div>
                        )}
                        {background.type === 'blur' && (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-white">
                              <Blur className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-xs">Blur Effect</p>
                            </div>
                          </div>
                        )}
                        {background.type === 'image' && background.thumbnail && (
                          <img
                            src={background.thumbnail}
                            alt={background.name}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Selection indicator */}
                        {settings.selectedBackground.id === background.id && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <div className="bg-blue-500 rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Remove button for custom backgrounds */}
                        {background.type === 'image' && settings.customBackgrounds.some(bg => bg.id === background.id) && (
                          <Tooltip content="Remove background" hint="Delete this custom background">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCustomBackground(background.id);
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3 text-white" />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                      <div className="p-3 bg-gray-800">
                        <p className="text-white text-sm font-medium truncate">{background.name}</p>
                      </div>
                    </div>
                  ))}

                  {/* Upload new background */}
                  <Tooltip content="Upload background" hint="Upload a custom background image">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg cursor-pointer transition-colors flex flex-col items-center justify-center bg-gray-800/50"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-400 text-xs text-center px-2">
                        Upload Custom Background
                      </p>
                    </div>
                  </Tooltip>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white text-sm font-medium mb-2">Tips:</h4>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Use images with 16:9 aspect ratio for best results</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Supported formats: JPG, PNG, GIF</li>
                    <li>• For best performance, use well-lit environments</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Audio Settings</h3>
                <div className="gap-x-4">
                  <div>
                    <label className="d-block text-gray-300 text-sm font-medium mb-2">
                      Microphone
                    </label>
                    <select
                      onChange={(event) => {
                        const value = event.target.value
                        const audio = microphones.find(mi => mi.deviceId === value)
                        if(!audio) return
                        setAudio(audio)
                      }}
                      className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option></option>
                      {microphones.map(microphone => <option key={microphone.deviceId} value={microphone.deviceId}>{microphone.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="d-block text-gray-300 text-sm font-medium mb-2">
                      Speaker
                    </label>
                    <select className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Default - Built-in Speakers</option>
                      <option>External Headphones</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Noise Cancellation</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 mt-4 py-1 rounded text-sm transition-colors">
                      Enabled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Video Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="d-block text-gray-300 text-sm font-medium mb-2">
                      Camera
                    </label>
                    <select
                      onChange={(event) => {
                        const value = event.target.value
                        const audio = cameras.find(mi => mi.deviceId === value)
                        if(!audio) return
                        setVideo(audio)
                      }}
                      className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option></option>
                      {cameras.map(camera => <option key={camera.deviceId} value={camera.deviceId}>{camera.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="d-block text-gray-300 text-sm font-medium mb-2">
                      Video Quality
                    </label>
                    <select className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Auto (Recommended)</option>
                      <option>720p HD</option>
                      <option>1080p Full HD</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Mirror Video</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors">
                      Enabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">HD Video</span>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded text-sm transition-colors">
                      Disabled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
