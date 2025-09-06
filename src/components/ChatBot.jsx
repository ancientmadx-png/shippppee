import React, { useState, useEffect, useRef } from 'react'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      setTimeout(() => {
        addBotMessage("👋 Hello! I'm STORIUM AI, your decentralized storage assistant. I can help you understand our blockchain-based file storage system. What would you like to know?")
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: Date.now() }])
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: Date.now() }])
  }

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Technology and Architecture
    if (message.includes('blockchain') || message.includes('technology') || message.includes('how it works')) {
      return "🔗 STORIUM uses Ethereum blockchain technology with smart contracts for file ownership and access control. Files are stored on IPFS (InterPlanetary File System) for decentralized, permanent storage. The smart contract manages permissions, while IPFS ensures your files are distributed across multiple nodes globally."
    }
    
    if (message.includes('ipfs') || message.includes('storage')) {
      return "📁 IPFS (InterPlanetary File System) is a distributed storage network that makes your files permanent and censorship-resistant. When you upload a file, it gets a unique hash and is replicated across multiple nodes. This means your files can't be deleted by any central authority and remain accessible even if some nodes go offline."
    }
    
    if (message.includes('smart contract') || message.includes('contract')) {
      return "📜 Our smart contract (deployed on Sepolia testnet) manages file ownership, access permissions, and metadata. It's like a digital notary that proves who owns what files and who has permission to access them. Every action is recorded on the blockchain for transparency."
    }
    
    // Features and Functionality
    if (message.includes('upload') || message.includes('add file')) {
      return "⬆️ To upload files: 1) Connect your MetaMask wallet, 2) Go to the Upload tab, 3) Drag & drop or select your file, 4) Add description and tags (optional), 5) Choose public or private visibility, 6) Click 'Deploy to Global Network'. Your file will be uploaded to IPFS and recorded on the blockchain!"
    }
    
    if (message.includes('share') || message.includes('access') || message.includes('permission')) {
      return "🤝 STORIUM offers two sharing methods: 1) **General Access** - Grant a user access to ALL your files, 2) **Selective Access** - Share specific files with specific users. Use the Share tab for general access or the file manager's share button for selective sharing. All permissions are managed through smart contracts!"
    }
    
    if (message.includes('public') || message.includes('private')) {
      return "🌐 **Public files** are visible to everyone and appear in the Public Explorer. **Private files** are only accessible to you and users you've specifically granted access to. You can choose visibility when uploading. Public files help build a community knowledge base!"
    }
    
    if (message.includes('file types') || message.includes('supported')) {
      return "📋 STORIUM supports ALL file types! Images (JPG, PNG, GIF), documents (PDF, DOC, TXT), videos (MP4, AVI, MOV), audio (MP3, WAV), and any other file format. The system automatically categorizes files and provides appropriate previews where possible."
    }
    
    // Security and Benefits
    if (message.includes('secure') || message.includes('security') || message.includes('safe')) {
      return "🔒 STORIUM is highly secure: 1) **Blockchain ownership** - Cryptographic proof of file ownership, 2) **Decentralized storage** - No single point of failure, 3) **Immutable records** - All actions permanently recorded, 4) **Wallet authentication** - Only you control your files, 5) **Transparent permissions** - All access rights are publicly verifiable."
    }
    
    if (message.includes('benefit') || message.includes('advantage') || message.includes('why')) {
      return "✨ **Key Benefits**: 1) **True ownership** - You own your files, not a company, 2) **Permanent storage** - Files can't be deleted by third parties, 3) **Global access** - Available anywhere with internet, 4) **Censorship resistant** - No central authority can block access, 5) **Transparent** - All permissions are publicly verifiable, 6) **Cost effective** - Pay once, store forever!"
    }
    
    // Technical Setup
    if (message.includes('metamask') || message.includes('wallet') || message.includes('connect')) {
      return "🦊 You need MetaMask to use STORIUM: 1) Install MetaMask browser extension, 2) Create or import a wallet, 3) Switch to Sepolia testnet, 4) Get test ETH from a Sepolia faucet, 5) Connect to STORIUM. MetaMask acts as your secure login and identity on the blockchain!"
    }
    
    if (message.includes('sepolia') || message.includes('testnet') || message.includes('network')) {
      return "🌐 STORIUM runs on Sepolia testnet (Ethereum's test network). This allows you to try the system without spending real ETH. Get free Sepolia ETH from faucets like sepolia-faucet.pk910.de. The app will help you switch networks automatically!"
    }
    
    if (message.includes('gas') || message.includes('cost') || message.includes('fee')) {
      return "⛽ Gas fees are required for blockchain transactions (uploading, sharing, etc.). On Sepolia testnet, use free test ETH. Typical costs: File upload ~0.001-0.005 ETH, Grant access ~0.0005 ETH. Each transaction is permanent and recorded on the blockchain!"
    }
    
    // Troubleshooting
    if (message.includes('error') || message.includes('problem') || message.includes('not working')) {
      return "🔧 **Common solutions**: 1) Ensure MetaMask is connected to Sepolia testnet, 2) Check you have enough test ETH for gas fees, 3) Refresh the page and reconnect wallet, 4) Make sure you're using a supported browser (Chrome, Firefox, Edge), 5) Check that MetaMask is unlocked. Still having issues? Try clearing browser cache!"
    }
    
    if (message.includes('pinata') || message.includes('api key')) {
      return "🔑 STORIUM uses Pinata for IPFS uploads. The API keys are pre-configured in the application. If you're running your own instance, you'll need to set up a Pinata account and add your API keys to the environment variables."
    }
    
    // General Help
    if (message.includes('help') || message.includes('guide') || message.includes('tutorial')) {
      return "📚 **Quick Start Guide**: 1) Connect MetaMask wallet, 2) Switch to Sepolia testnet, 3) Upload your first file, 4) Try sharing with another address, 5) Explore public files from the community. Check the README for detailed documentation!"
    }
    
    if (message.includes('roadmap') || message.includes('future') || message.includes('coming')) {
      return "🚀 **Coming Soon**: Multi-chain support (Polygon, BSC), file encryption/decryption, folder organization, file versioning, collaborative editing, and mobile app development. STORIUM is actively evolving to become the ultimate decentralized storage solution!"
    }
    
    // Greetings and general
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "👋 Hello! I'm here to help you understand STORIUM's decentralized storage system. Ask me about blockchain technology, file uploading, sharing permissions, or any technical questions!"
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "🙏 You're welcome! I'm always here to help you navigate the decentralized storage world. Feel free to ask anything about STORIUM!"
    }
    
    // Default response
    return "🤔 I'd be happy to help! I can explain STORIUM's blockchain technology, file uploading process, sharing mechanisms, security features, or troubleshoot issues. Try asking about:\n\n• How blockchain storage works\n• Uploading and sharing files\n• MetaMask setup\n• Security benefits\n• Technical troubleshooting\n\nWhat specific aspect interests you?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    addUserMessage(userMessage)
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      setIsTyping(false)
      const response = getAIResponse(userMessage)
      addBotMessage(response)
    }, 1000 + Math.random() * 1000) // 1-2 seconds delay
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickQuestion = (question) => {
    addUserMessage(question)
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      const response = getAIResponse(question)
      addBotMessage(response)
    }, 800)
  }

  const quickQuestions = [
    "How does blockchain storage work?",
    "How do I upload files?",
    "How do I share files with others?",
    "What are the security benefits?",
    "How do I set up MetaMask?"
  ]

  return (
    <div className="chatbot-container">
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-info">
              <h3>STORIUM AI</h3>
              <div className="chatbot-status">
                <div className="status-dot"></div>
                Online & Ready to Help
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className={`message-avatar ${message.type}`}>
                  {message.type === 'bot' ? '🤖' : '👤'}
                </div>
                <div className={`message-content ${message.type}`}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar bot">🤖</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            
            {messages.length === 1 && (
              <div className="quick-questions">
                <p style={{ color: '#ffd700', fontSize: '0.8rem', marginBottom: '8px' }}>
                  💡 Quick questions to get started:
                </p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="quick-question"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                className="message-input"
                placeholder="Ask me about STORIUM's technology, features, or how to use the platform..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                rows={1}
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot