# 🚀 NexHire - Interview Confidence Hub

Your AI-powered interview preparation platform with advanced features for interview success.

## ✨ Features

### 🔥 Advanced AI Features
- **⭐ STAR Coach** - Get AI feedback on behavioral questions
- **📄 Resume Analysis Pro** - ATS scoring and optimization
- **🎯 JD Matcher** - Match resume against job descriptions
- **📝 Interview Cheat Sheet** - Generate 1-page prep sheets
- **💰 Salary Negotiation Simulator** - Practice salary negotiations
- **🎥 Video Interview with 2D AI Avatar** - Practice with realistic avatar

### 📚 Core Training Features
- **🎤 Voice Interview** - Real-time voice recognition practice
- **🧠 AI Coach** - Personalized coaching and tips
- **🎬 Video Interview** - Record and review your performance
- **📋 Quiz** - Test your knowledge on interview topics
- **📊 Performance Tracker** - Track your improvement over time

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 4.2
- **Icons**: Lucide React
- **AI**: Google Gemini API (free tier)
- **Build**: Vite 5.4
- **State Management**: React Hooks + localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key (free from [aistudio.google.com](https://aistudio.google.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manikanta-devs/interview-confidence-hub.git
cd interview-confidence-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8084/`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🌐 Deployment

### GitHub Pages (Automatic with Actions)
The app is automatically deployed to GitHub Pages on every push to main. 

Check `.github/workflows/deploy.yml` for the deployment configuration.

**Live at**: [nexhire.app](https://nexhire.app)

### Manual Deployment Options

#### Vercel (Recommended for React)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
src/
├── pages/           # Page components
├── components/      # Reusable components
├── services/        # API and utility services
│   ├── unifiedAPI.ts     # Centralized Gemini API
│   ├── resumeParser.ts   # Resume parsing
│   └── defaultResponses.ts # Fallback mock data
├── config/          # Configuration files
│   └── appTheme.ts   # Design system
├── styles/          # Global styles
└── main.jsx         # Entry point
```

## 🔑 API Integration

The app uses a **single Gemini API key** from `.env` for all features:

```typescript
// Automatically loaded from GEMINI_API_KEY
const result = await unifiedAPIService.coachSTARAnswer(userAnswer, role);
```

All API calls include:
- ✅ **Automatic caching** - Reduces duplicate calls
- ✅ **Rate limiting** - 500ms between requests
- ✅ **Error handling** - Structured responses
- ✅ **Fallback responses** - Mock data when API fails

## 📊 Real Data

The dashboard displays real activity data from localStorage:
- Interview practice count
- Questions answered
- Skills learned
- Day streak

## 🎨 Design System

Unified theme with:
- **Colors**: Indigo → Cyan → Purple gradient
- **Typography**: Professional sans-serif
- **Spacing**: 12px base unit
- **Animations**: Smooth transitions
- **Accessibility**: WCAG compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 💬 Support

- Issues: [GitHub Issues](https://github.com/manikanta-devs/interview-confidence-hub/issues)
- Discussions: [GitHub Discussions](https://github.com/manikanta-devs/interview-confidence-hub/discussions)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time interview feedback
- [ ] Interview recording and playback
- [ ] Group practice sessions
- [ ] Interview question database
- [ ] Custom company interview prep
- [ ] LinkedIn integration
- [ ] Company rating and reviews

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Lucide React for icons
- Tailwind CSS for styling
- React community for amazing tools

---

Made with ❤️ for interview success

**Get your dream job! 🚀**
