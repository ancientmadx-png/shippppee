import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './SharedFiles.css'

const SharedFiles = ({ contract, account }) => {
  const [sharedFiles, setSharedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewingAddress, setViewingAddress] = useState('')
  const [inputAddress, setInputAddress] = useState('')
  const [currentOwner, setCurrentOwner] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': return '🖼️'
      case 'document': return '📄'
      case 'video': return '🎥'
      case 'audio': return '🎵'
      default: return '📁'
    }
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const viewSharedFiles = async () => {
    if (!inputAddress.trim()) {
      alert('Please enter a valid address')
      return
    }

    if (!ethers.utils.isAddress(inputAddress)) {
      alert('Please enter a valid Ethereum address')
      return
    }

    setLoading(true)
    try {
      const fileData = await contract.getUserFiles(inputAddress)
      
      const formattedFiles = fileData.map((file, index) => ({
        id: index,
        fileName: file.fileName,
        fileType: file.fileType,
        ipfsHash: file.ipfsHash,
        fileSize: parseInt(file.fileSize.toString()),
        uploadTime: new Date(parseInt(file.uploadTime.toString()) * 1000),
        owner: file.owner,
        isPublic: file.isPublic,
        description: file.description,
        tags: file.tags,
        url: `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`
      }))
      
      setSharedFiles(formattedFiles)
      setViewingAddress(inputAddress)
      setCurrentOwner(inputAddress)
      setSearchTag('') // Reset search when loading new files
    } catch (error) {
      console.error('Error fetching shared files:', error)
      if (error.message.includes('Access denied')) {
        alert('Access denied: This user has not granted you permission to view their files')
      } else {
        alert('Failed to load shared files. Please check the address and try again.')
      }
      setSharedFiles([])
    } finally {
      setLoading(false)
    }
  }

  const clearView = () => {
    setSharedFiles([])
    setViewingAddress('')
    setCurrentOwner('')
    setInputAddress('')
    setSearchTag('')
  }

  // Filter files based on search tag
  const filteredFiles = sharedFiles.filter(file =>
    searchTag.trim() === '' || 
    (file.tags && file.tags.some(tag => 
      tag.toLowerCase().includes(searchTag.toLowerCase())
    ))
  )

  return (
    <div className="shared-files">
      <div className="shared-header">
        <div className="header-content">
          <div className="header-icon">👥</div>
          <div>
            <h2>Shared Files</h2>
            <p className="shared-description">
              View files shared with you by other users
            </p>
          </div>
        </div>
      </div>

      <div className="access-controls">
        <input
          type="text"
          className="address-input"
          placeholder="Enter wallet address of file owner (0x...)"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <button 
          className="view-shared-btn"
          onClick={viewSharedFiles}
          disabled={loading || !inputAddress.trim()}
        >
          {loading ? (
            <>
              <div className="btn-spinner"></div>
              Loading...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              View Files
            </>
          )}
        </button>
      </div>

      {viewingAddress && (
        <div className="current-viewing">
          <span className="viewing-icon">👁️</span>
          <span className="viewing-text">Viewing files from:</span>
          <span className="viewing-address">{formatAddress(viewingAddress)}</span>
          <button className="clear-view-btn" onClick={clearView}>
            Clear
          </button>
        </div>
      )}

      {viewingAddress && (
        <div className="search-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by tag..."
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="loading-shared">
          <div className="quantum-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
          <p>Loading shared files...</p>
        </div>
      ) : (
        <div className="files-grid">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-header">
                  <div className="file-type-info">
                    <span className="file-type-icon">{getFileIcon(file.fileType)}</span>
                    <span className="file-type-badge">{file.fileType}</span>
                  </div>
                  <div className="shared-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2"/>
                      <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Shared
                  </div>
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
                    <svg width="16" height="16" viewBox="0 0 24, 24" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            ))
          ) : viewingAddress ? (
            <div className="no-shared-files">
              <div className="no-shared-icon">📂</div>
              <h3>{searchTag ? 'No files match the search tag' : 'No accessible files'}</h3>
              <p>
                {searchTag 
                  ? `No files found with tag "${searchTag}". Try a different tag.`
                  : 'This user hasn\'t shared any files with you, or they don\'t have any files uploaded yet.'
                }
              </p>
            </div>
          ) : (
            <div className="no-shared-files">
              <div className="no-shared-icon">👥</div>
              <h3>Enter an address to view shared files</h3>
              <p>
                Enter the wallet address of someone who has granted you access to their files.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SharedFiles