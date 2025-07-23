import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Folder, 
  FolderOpen, 
  FileText, 
  Search, 
  Edit3, 
  Trash2, 
  Save, 
  MoreVertical,
  Calendar,
  Tag,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { Tooltip } from './Tooltip';

export const NotesPanel = ({
  isOpen,
  onClose,
  folders,
  articles,
  onCreateFolder,
  onUpdateFolder,
  onDeleteFolder,
  onCreateArticle,
  onUpdateArticle,
  onDeleteArticle,
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#3B82F6');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTags, setArticleTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showFolderMenu, setShowFolderMenu] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [editFolderColor, setEditFolderColor] = useState('');

  const textareaRef = useRef(null);

  const folderColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  const selectedFolder = folders.find(f => f.id === selectedFolderId);
  const selectedArticle = articles.find(a => a.id === selectedArticleId);
  const folderArticles = articles.filter(a => a.folderId === selectedFolderId);

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = folderArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [articleContent]);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim(), newFolderColor);
      setNewFolderName('');
      setNewFolderColor('#3B82F6');
      setIsCreatingFolder(false);
    }
  };

  const handleUpdateFolder = () => {
    if (editingFolderId && editFolderName.trim()) {
      onUpdateFolder(editingFolderId, editFolderName.trim(), editFolderColor);
      setEditingFolderId(null);
      setEditFolderName('');
      setEditFolderColor('');
      setShowFolderMenu(null);
    }
  };

  const handleDeleteFolder = (folderId) => {
    if (confirm('Are you sure you want to delete this folder and all its articles?')) {
      onDeleteFolder(folderId);
      if (selectedFolderId === folderId) {
        setSelectedFolderId('');
        setSelectedArticleId('');
      }
      setShowFolderMenu(null);
    }
  };

  const handleCreateArticle = () => {
    if (articleTitle.trim() && selectedFolderId) {
      onCreateArticle(articleTitle.trim(), articleContent, selectedFolderId, articleTags);
      setArticleTitle('');
      setArticleContent('');
      setArticleTags([]);
      setIsCreatingArticle(false);
    }
  };

  const handleUpdateArticle = () => {
    if (selectedArticleId && articleTitle.trim()) {
      onUpdateArticle(selectedArticleId, articleTitle.trim(), articleContent, articleTags);
      setIsEditingArticle(false);
    }
  };

  const handleDeleteArticle = (articleId) => {
    if (confirm('Are you sure you want to delete this article?')) {
      onDeleteArticle(articleId);
      if (selectedArticleId === articleId) {
        setSelectedArticleId('');
      }
    }
  };

  const handleSelectArticle = (article) => {
    setSelectedArticleId(article.id);
    setArticleTitle(article.title);
    setArticleContent(article.content);
    setArticleTags(article.tags);
    setIsEditingArticle(false);
    setIsCreatingArticle(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !articleTags.includes(newTag.trim())) {
      setArticleTags([...articleTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setArticleTags(articleTags.filter(tag => tag !== tagToRemove));
  };

  const handleCopyArticle = async (article) => {
    try {
      await navigator.clipboard.writeText(`${article.title}\n\n${article.content}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy article:', error);
    }
  };

  const handleDownloadArticle = (article) => {
    const content = `${article.title}\n\n${article.content}\n\nTags: ${article.tags.join(', ')}\nCreated: ${article.createdAt.toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const startEditingFolder = (folder) => {
    setEditingFolderId(folder.id);
    setEditFolderName(folder.name);
    setEditFolderColor(folder.color);
    setShowFolderMenu(null);
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Tooltip content="Meeting Notes" hint="Take and organize meeting notes">
            <FileText className="w-5 h-5 text-gray-400" />
          </Tooltip>
          <h3 className="text-white font-medium">Meeting Notes</h3>
        </div>
        <Tooltip content="Close notes" hint="Close the notes panel">
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </Tooltip>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <div className="relative">
          <Tooltip content="Search" hint="Search through notes and folders">
            <Search className="absolute left-3 pl-20 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </Tooltip>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Folders Section */}
      <div className="border-b border-gray-700 flex-shrink-0">
        {/* Folder Header */}
        <div className="p-3 flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">Folders</span>
          <Tooltip content="Create folder" hint="Create a new folder to organize notes">
            <button
              onClick={() => setIsCreatingFolder(true)}
              className="p-1 rounded hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </Tooltip>
        </div>

        {/* Create Folder Form */}
        {isCreatingFolder && (
          <div className="px-3 pb-3 space-y-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full bg-gray-800 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex space-x-1">
              {folderColors.map((color) => (
                <Tooltip key={color} content="Color" hint="Choose folder color">
                  <button
                    onClick={() => setNewFolderColor(color)}
                    className={`w-4 h-4 rounded-full border-2 ${
                      newFolderColor === color ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                </Tooltip>
              ))}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={handleCreateFolder}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 text-xs transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreatingFolder(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white rounded px-2 py-1 text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Folders Grid */}
        <div className="p-3 pt-0">
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {filteredFolders.map((folder) => (
              <div key={folder.id} className="relative">
                {editingFolderId === folder.id ? (
                  <div className="bg-gray-800 rounded-lg p-2 space-y-2">
                    <input
                      type="text"
                      value={editFolderName}
                      onChange={(e) => setEditFolderName(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-1">
                      {folderColors.map((color) => (
                        <Tooltip key={color} content="Color" hint="Choose folder color">
                          <button
                            onClick={() => setEditFolderColor(color)}
                            className={`w-3 h-3 rounded-full border ${
                              editFolderColor === color ? 'border-white' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        </Tooltip>
                      ))}
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={handleUpdateFolder}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-xs transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingFolderId(null)}
                        className="flex-1 bg-gray-600 hover:bg-gray-500 text-white rounded px-2 py-1 text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors group ${
                      selectedFolderId === folder.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedFolderId(folder.id);
                      setSelectedArticleId('');
                      setIsCreatingArticle(false);
                      setIsEditingArticle(false);
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Tooltip 
                          content={selectedFolderId === folder.id ? "Open folder" : "Closed folder"} 
                          hint={`${folder.name} folder`}
                        >
                          {selectedFolderId === folder.id ? (
                            <FolderOpen className="w-4 h-4 flex-shrink-0" style={{ color: folder.color }} />
                          ) : (
                            <Folder className="w-4 h-4 flex-shrink-0" style={{ color: folder.color }} />
                          )}
                        </Tooltip>
                        <span className="text-white text-xs font-medium truncate">{folder.name}</span>
                      </div>
                      <div className="relative">
                        <Tooltip content="Folder options" hint="Edit or delete folder">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowFolderMenu(showFolderMenu === folder.id ? null : folder.id);
                            }}
                            className="p-1 rounded hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="w-3 h-3 text-gray-400" />
                          </button>
                        </Tooltip>
                        
                        {showFolderMenu === folder.id && (
                          <div className="absolute right-0 top-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[100px]">
                            <Tooltip content="Edit folder" hint="Rename folder or change color">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingFolder(folder);
                                }}
                                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                            </Tooltip>
                            <Tooltip content="Delete folder" hint="Permanently delete folder and all notes">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFolder(folder.id);
                                }}
                                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-gray-700 flex items-center space-x-2"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {articles.filter(a => a.folderId === folder.id).length} notes
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {!selectedFolderId ? (
          // No folder selected
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Folder className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Select a folder to view notes</p>
              <p className="text-gray-500 text-xs">Create folders to organize your meeting notes</p>
            </div>
          </div>
        ) : !selectedArticleId && !isCreatingArticle ? (
          // Folder selected, show articles list
          <div className="flex-1 flex flex-col min-h-0">
            {/* Articles Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Tooltip content="Current folder" hint={`Notes in ${selectedFolder?.name}`}>
                  <Folder className="w-4 h-4" style={{ color: selectedFolder?.color }} />
                </Tooltip>
                <span className="text-white font-medium">{selectedFolder?.name}</span>
                <span className="text-gray-400 text-sm">({folderArticles.length})</span>
              </div>
              <Tooltip content="New note" hint="Create a new note in this folder">
                <button
                  onClick={() => setIsCreatingArticle(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Note</span>
                </button>
              </Tooltip>
            </div>

            {/* Articles List */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-2">
                    {searchTerm ? 'No matching notes found' : 'No notes in this folder'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {searchTerm ? 'Try a different search term' : 'Create your first note to get started'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors group"
                      onClick={() => handleSelectArticle(article)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm truncate flex-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip content="Copy note" hint="Copy note content to clipboard">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyArticle(article);
                              }}
                              className="p-1 rounded hover:bg-gray-700 transition-colors"
                            >
                              {copiedId === article.id ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-400" />
                              )}
                            </button>
                          </Tooltip>
                          <Tooltip content="Download note" hint="Download note as text file">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadArticle(article);
                              }}
                              className="p-1 rounded hover:bg-gray-700 transition-colors"
                            >
                              <Download className="w-3 h-3 text-gray-400" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Delete note" hint="Permanently delete this note">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteArticle(article.id);
                              }}
                              className="p-1 rounded hover:bg-gray-700 transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                        {article.content.substring(0, 100)}...
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Tooltip content="Last updated" hint="When this note was last modified">
                            <Calendar className="w-3 h-3 text-gray-500" />
                          </Tooltip>
                          <span className="text-gray-500 text-xs">
                            {formatDate(article.updatedAt)}
                          </span>
                        </div>
                        
                        {article.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Tooltip content="Tags" hint="Note tags for organization">
                              <Tag className="w-3 h-3 text-gray-500" />
                            </Tooltip>
                            <span className="text-gray-500 text-xs">
                              {article.tags.length} tag{article.tags.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Article editor
          <div className="flex-1 flex flex-col min-h-0">
            {/* Editor Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Tooltip content="Back to folder" hint="Return to folder view">
                  <button
                    onClick={() => {
                      setSelectedArticleId('');
                      setIsCreatingArticle(false);
                      setIsEditingArticle(false);
                      setArticleTitle('');
                      setArticleContent('');
                      setArticleTags([]);
                    }}
                    className="p-1 rounded hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </Tooltip>
                <span className="text-gray-300 text-sm">
                  {isCreatingArticle ? 'New Note' : selectedArticle?.title}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedArticleId && !isEditingArticle && (
                  <Tooltip content="Edit note" hint="Edit this note">
                    <button
                      onClick={() => setIsEditingArticle(true)}
                      className="bg-gray-600 hover:bg-gray-500 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </Tooltip>
                )}
                
                {(isCreatingArticle || isEditingArticle) && (
                  <Tooltip content="Save note" hint="Save changes to this note">
                    <button
                      onClick={isCreatingArticle ? handleCreateArticle : handleUpdateArticle}
                      disabled={!articleTitle.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {isCreatingArticle || isEditingArticle ? (
                <div className="space-y-4 h-full flex flex-col">
                  {/* Title Input */}
                  <input
                    type="text"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                  />

                  {/* Tags */}
                  <div className="space-y-2 flex-shrink-0">
                    <label className="text-gray-300 text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {articleTags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <Tooltip content="Remove tag" hint="Remove this tag">
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:bg-blue-700 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Tooltip>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add tag..."
                        className="flex-1 bg-gray-800 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Tooltip content="Add tag" hint="Add a tag to organize this note">
                        <button
                          onClick={handleAddTag}
                          disabled={!newTag.trim()}
                          className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded px-3 py-1 text-sm transition-colors"
                        >
                          Add
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <div className="flex-1 min-h-0">
                    <textarea
                      ref={textareaRef}
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                      placeholder="Start writing your note..."
                      className="w-full h-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[300px]"
                    />
                  </div>
                </div>
              ) : (
                // View mode
                selectedArticle && (
                  <div className="space-y-4">
                    <h1 className="text-white text-xl font-semibold">{selectedArticle.title}</h1>
                    
                    {selectedArticle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-gray-400 text-sm flex items-center space-x-4">
                      <span>Created: {formatDate(selectedArticle.createdAt)}</span>
                      <span>Updated: {formatDate(selectedArticle.updatedAt)}</span>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedArticle.content}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};