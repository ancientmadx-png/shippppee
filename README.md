# STORIUM - Decentralized Cloud Storage Platform

A revolutionary decentralized cloud storage application built on Ethereum blockchain technology with stunning 3D visuals. STORIUM enables users to upload, store, and share any type of file using IPFS (InterPlanetary File System) and smart contracts with granular access control and a modern, intuitive interface.

## 🎯 Project Overview

STORIUM represents the next generation of cloud storage, combining the security of blockchain technology with the permanence of distributed storage and immersive 3D experiences. Unlike traditional cloud storage services, STORIUM gives users complete control over their data while ensuring permanent availability through IPFS.

### Key Value Propositions
- **True Ownership**: Files are owned by users, not platforms
- **Permanent Storage**: Files stored on IPFS cannot be deleted by third parties
- **Transparent Access Control**: All permissions managed through smart contracts
- **Censorship Resistant**: No central authority can remove or block files
- **Global Accessibility**: Access files from anywhere in the world
- **Immersive 3D Interface**: Beautiful Spline-powered 3D landing experience

## 🌟 Features

- **Universal File Support:** Upload any file type - images, documents, videos, audio, and more
- **Decentralized Storage:** Files stored on IPFS for permanent, censorship-resistant storage
- **Smart Contract Access Control:** Blockchain-based permissions and ownership management
- **3D Landing Experience:** Interactive Spline 3D scene on landing page
- **Modern Interface:** Sleek golden/black themed design with glassmorphism effects
- **File Management:** Search, filter, and organize your files with ease
- **Secure Sharing:** Grant or revoke access to specific users through smart contracts
- **Real-time Updates:** Live file previews and status updates
- **Custom Cursor Effects:** Interactive mouse tracking with wave animations
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices
- **AI Chatbot:** Built-in AI assistant to help users understand the platform

## 🏗️ Architecture Overview

### Frontend Architecture
```
src/
├── components/
│   ├── LandingPage.jsx      # Entry point with 3D Spline scene
│   ├── SplineScene.jsx      # 3D interactive background
│   ├── ConnectWallet.jsx    # Wallet connection interface
│   ├── Header.jsx           # Navigation and user info
│   ├── FileUpload.jsx       # File upload with metadata
│   ├── FileManager.jsx      # Personal file management
│   ├── SharedFiles.jsx      # View files shared with you
│   ├── PublicExplorer.jsx   # Browse public files
│   ├── ShareManager.jsx     # Access control management
│   ├── ArrowAnimation.jsx   # Smooth page transitions
│   └── ChatBot.jsx          # AI assistant
├── App.jsx                  # Main application logic
└── main.jsx                 # React entry point
```

### Smart Contract Architecture
```
contracts/
└── GlobalStorage.sol        # Core storage contract
```

### Technology Stack
- **Frontend**: React 18 with Vite build system
- **3D Graphics**: Spline for interactive 3D scenes
- **Blockchain**: Ethereum (Sepolia testnet)
- **Storage**: IPFS via Pinata gateway
- **Web3**: Ethers.js v5 for blockchain interactions
- **Styling**: Custom CSS with glassmorphism design
- **Mobile**: Fully responsive design with touch optimization

## 🛠️ Technologies Used

- **React 18:** Modern front-end framework with hooks
- **Spline:** Interactive 3D scenes and animations
- **Solidity:** Smart contract for file ownership and access control
- **IPFS:** Decentralized file storage via Pinata gateway
- **Ethereum:** Sepolia testnet for smart contract deployment
- **Ethers.js:** Web3 library for blockchain interactions
- **Vite:** Fast development build tool with HMR
- **SCSS/CSS:** Advanced styling with mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Sepolia testnet ETH (get from faucet)
- Pinata account for IPFS access

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd storium
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_SECRET_KEY=your_pinata_secret_key
   VITE_PINATA_JWT=your_pinata_jwt_token
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application

### Smart Contract Setup

The application uses a pre-deployed smart contract on Sepolia testnet. If you want to deploy your own:

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Copy the contract code from `contracts/GlobalStorage.sol`
3. Compile and deploy to Sepolia testnet
4. Update the contract address in `src/App.jsx`

## 📱 Mobile Experience

STORIUM is fully optimized for mobile devices with:

- **Touch-friendly Interface**: Large touch targets and gesture support
- **Responsive Grid Layouts**: Adaptive file grids for all screen sizes
- **Mobile Navigation**: Bottom navigation bar on mobile devices
- **Optimized File Upload**: Drag & drop with mobile file picker support
- **Touch Gestures**: Swipe and tap interactions
- **Mobile-first CSS**: Optimized performance on mobile devices
- **Viewport Optimization**: Perfect scaling across all device sizes

### Mobile-Specific Features

- Bottom navigation tabs for easy thumb navigation
- Collapsible sections to save screen space
- Touch-optimized file cards and buttons
- Mobile-friendly modals and overlays
- Optimized font sizes and spacing
- Fast loading with mobile-optimized assets

## 🎮 3D Interactive Experience

The landing page features a stunning 3D scene powered by Spline:

- **Interactive 3D Environment**: Engaging visual experience
- **Smooth Animations**: Fluid transitions and hover effects
- **Performance Optimized**: Efficient loading and rendering
- **Mobile Compatible**: Works seamlessly on mobile devices
- **Custom Cursor**: Interactive mouse tracking with golden effects

## 🔧 Smart Contract Deep Dive

### Core Data Structures

#### FileInfo Struct
```solidity
struct FileInfo {
    string fileName;        // Original filename
    string fileType;        // Categorized type (image/document/video/audio/other)
    string ipfsHash;        // IPFS content identifier
    uint256 fileSize;       // File size in bytes
    uint256 uploadTime;     // Block timestamp
    address owner;          // File owner's wallet address
    bool isPublic;          // Public visibility flag
    string description;     // Optional metadata
    string[] tags;          // Searchable tags
}
```

### Key Contract Functions

- `addFile()` - Upload new files to IPFS and blockchain
- `getMyFiles()` - Retrieve user's uploaded files
- `getPublicFiles()` - Browse community shared files
- `getUserFiles()` - Access files shared by specific users
- `allow()/disallow()` - Grant/revoke file access permissions
- `grantFileAccess()/revokeFileAccess()` - Selective file sharing

## 📱 Usage

### Getting Started
1. **Enter STORIUM:** Experience the 3D landing page and click enter
2. **Connect Wallet:** Install MetaMask and connect to Sepolia testnet
3. **Upload Files:** Drag and drop or browse to select any file type
4. **Manage Files:** View, search, and organize your uploaded files
5. **Share Access:** Grant specific users access to your files
6. **Explore Public Files:** Browse files shared by the community
7. **Get Help:** Use the AI chatbot for assistance

### File Management
- **Search:** Find files by name, description, or tags
- **Filter:** Filter by file type (images, documents, videos, etc.)
- **Sort:** Organize by date, name, or file size
- **Preview:** View images, videos, and documents directly
- **Download:** Download files directly from IPFS
- **Share:** Grant access to specific users or make public

### Mobile Usage
- **Touch Navigation:** Use bottom tabs for easy navigation
- **File Upload:** Tap to select files or use camera on mobile
- **Gesture Support:** Swipe and tap for intuitive interaction
- **Responsive Design:** Optimized for all screen sizes

## 🔐 Security Features

- **Smart Contract Security:** Solidity-based access control
- **Decentralized Storage:** Files stored on IPFS, not centralized servers
- **Wallet Authentication:** MetaMask integration for secure user authentication
- **Immutable Records:** Blockchain ensures tamper-proof file records
- **Access Verification:** Cryptographic proof of file access rights
- **No Single Point of Failure:** Distributed architecture

## 🌐 Network Configuration

### Sepolia Testnet
- **Chain ID:** 11155111 (0xaa36a7)
- **RPC URL:** https://sepolia.infura.io/v3/
- **Block Explorer:** https://sepolia.etherscan.io/
- **Faucet:** Get test ETH from Sepolia faucets

## 🎨 Design Features

### Visual Design
- **Golden Theme:** Sophisticated golden/black color scheme
- **Glassmorphism:** Semi-transparent panels with blur effects
- **3D Landing:** Interactive Spline-powered 3D scene
- **Custom Cursor:** Interactive mouse tracking with wave animations
- **Smooth Animations:** Hover effects and micro-interactions
- **Mobile-First:** Responsive design for all devices

### User Experience
- **Intuitive Navigation:** Clear tab-based navigation
- **File Previews:** Image thumbnails and file type indicators
- **Loading States:** Visual feedback during operations
- **Error Handling:** User-friendly error messages
- **AI Assistant:** Built-in chatbot for help and guidance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# The project includes netlify.toml configuration
# Simply connect your repository to Netlify
```

### Deploy to Vercel
```bash
# The project includes vercel.json configuration
# Connect your repository to Vercel for automatic deployment
```

## 🧪 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables
```env
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
VITE_PINATA_JWT=your_pinata_jwt_token
```

## 🤖 AI Assistant

STORIUM includes a built-in AI chatbot that can help with:
- Understanding blockchain technology
- File upload and sharing processes
- Troubleshooting common issues
- MetaMask setup and configuration
- Smart contract interactions

## 🔮 Future Enhancements

### Planned Features
- **Multi-chain Support:** Polygon, BSC, and other networks
- **File Encryption:** Client-side encryption before IPFS upload
- **Folder Organization:** Hierarchical file structure
- **File Versioning:** Track file history and changes
- **Collaborative Editing:** Real-time collaborative features
- **Mobile App:** React Native mobile application
- **Advanced 3D Scenes:** More interactive Spline experiences

### Scalability Improvements
- **Layer 2 Integration:** Lower gas costs with L2 solutions
- **IPFS Clustering:** Multiple IPFS providers for redundancy
- **Caching Layer:** Improved performance with caching
- **Progressive Web App:** PWA features for mobile

## 🆘 Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure MetaMask is installed and unlocked
   - Switch to Sepolia testnet
   - Refresh the page and reconnect

2. **File Upload Failures**
   - Check Pinata API credentials
   - Ensure sufficient Sepolia ETH for gas fees
   - Verify file size limits

3. **3D Scene Not Loading**
   - Check internet connection
   - Ensure WebGL is supported in your browser
   - Try refreshing the page

4. **Mobile Issues**
   - Ensure you're using a modern mobile browser
   - Check that JavaScript is enabled
   - Try clearing browser cache

## 📄 License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on Sepolia testnet
5. Submit a pull request

## 📞 Support

For support and questions:
- Open an issue in the repository
- Use the built-in AI chatbot
- Check the troubleshooting section

---

**Created by Lies_Of_Code** - Revolutionizing decentralized storage with blockchain technology and immersive 3D experiences.

*Experience the future of file storage with STORIUM - where your data meets the blockchain in a beautiful, secure, and decentralized way.*