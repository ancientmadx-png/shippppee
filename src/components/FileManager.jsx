import React, { useState, useEffect } from "react";
import "./FileManager.css";

const FileManager = ({ contract, account }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterType, setFilterType] = useState("all");

  const getFiles = async () => {
    setLoading(true);
    try {
      const fileData = await contract.getMyFiles();
      
      const formattedFiles = fileData.map((file, index) => ({
        id: index,
        fileName: file.fileName,
        fileType: file.fileType,
        fileSize: parseInt(file.fileSize.toString()),
        uploadTime: new Date(parseInt(file.uploadTime.toString()) * 1000),
        isPublic: file.isPublic,
        description: file.description,
        tags: file.tags,
        ipfsHash: file.ipfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`
      }));
      
      setFiles(formattedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': return '🖼️';
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const filteredAndSortedFiles = files
    .filter(file => {
      const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (file.tags && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesType = filterType === 'all' || file.fileType === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest': return a.uploadTime - b.uploadTime;
        case 'name': return a.fileName.localeCompare(b.fileName);
        case 'size': return b.fileSize - a.fileSize;
        default: return b.uploadTime - a.uploadTime;
      }
    });

  useEffect(() => {
    if (account && contract) {
      getFiles();
    }
  }, [account, contract]);

  return (
    <>
      <div className="file-manager">
        <div className="manager-header">
          <div className="header-content">
            <div className="header-icon">📁</div>
            <div>
              <h2>My Files</h2>
              <p className="manager-description">
                Manage your files stored on the blockchain
              </p>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search files, descriptions, or tags..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="size">Size (Large to Small)</option>
            </select>
          </div>

          <div className="file-actions-bar">
            <button className="refresh-btn" onClick={getFiles}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 21v-5h5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-files">
            <div className="quantum-loader">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
            </div>
            <p>Loading your files...</p>
          </div>
        ) : (
          <>
            <div className="files-stats">
              <span className="files-count">{filteredAndSortedFiles.length} files</span>
              <span className="total-size">
                Total: {formatFileSize(filteredAndSortedFiles.reduce((sum, file) => sum + file.fileSize, 0))}
              </span>
            </div>
            
            <div className="files-grid">
              {filteredAndSortedFiles.length > 0 ? (
                filteredAndSortedFiles.map((file) => (
                  <div key={file.id} className="file-card">
                    <div className="file-header">
                      <span className="file-type-icon">{getFileIcon(file.fileType)}</span>
                      <span className="file-type-badge">{file.fileType}</span>
                      <span className={`visibility-badge ${file.isPublic ? 'public' : 'private'}`}>
                        {file.isPublic ? '🌐 Public' : '🔒 Private'}
                      </span>
                    </div>
                    
                    <div className="file-content">
                      {file.fileType === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.fileName}
                          className="file-thumbnail"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : file.fileType === 'video' ? (
                        <video 
                          src={file.url}
                          className="file-thumbnail"
                          controls
                          preload="metadata"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : file.fileType === 'audio' ? (
                        <div className="audio-preview">
                          <audio 
                            src={file.url}
                            controls
                            preload="metadata"
                            style={{ width: '100%' }}
                          />
                          <div className="audio-icon">🎵</div>
                        </div>
                      ) : file.fileType === 'document' && file.fileName.toLowerCase().endsWith('.pdf') ? (
                        <iframe
                          src={file.url}
                          className="file-thumbnail"
                          title={file.fileName}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : (
                        <div className="file-placeholder">
                          <span className="placeholder-icon">{getFileIcon(file.fileType)}</span>
                        </div>
                      )}
                      <div className="file-placeholder" style={{ display: 'none' }}>
                        <span className="placeholder-icon">{getFileIcon(file.fileType)}</span>
                      </div>
                    </div>
                    
                    <div className="file-info">
                      <h3 className="file-title" title={file.fileName}>
                        {file.fileName}
                      </h3>
                      <div className="file-meta-info">
                        {file.description && (
                          <p className="file-description">{file.description}</p>
                        )}
                        <div className="file-meta">
                          <span className="file-size">{formatFileSize(file.fileSize)}</span>
                          <span className="file-date">{file.uploadTime.toLocaleDateString()}</span>
                        </div>
                        {file.tags && file.tags.length > 0 && (
                          <div className="file-tags">
                            {file.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                            {file.tags.length > 3 && (
                              <span className="tag-more">+{file.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="file-actions">
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn view-btn"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        View
                      </a>
                      <a 
                        href={file.url} 
                        download={file.fileName}
                        className="action-btn download-btn"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-files">
                  <div className="no-files-icon">📁</div>
                  <h3>No files uploaded yet</h3>
                  <p>
                    {searchTerm || filterType !== 'all' 
                      ? "No files match your search criteria"
                      : "Upload your first file to get started"
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FileManager;