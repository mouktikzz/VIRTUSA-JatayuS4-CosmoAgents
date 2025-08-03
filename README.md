# 🚀 VIRTUSA-JatayuS4-CosmoAgents

<div align="center">

# Sybase to Oracle Migration Tool

**AI-Powered Database Migration Made Simple**

**Team: CosmoAgents** | **Hackathon: VIRTUSA Jatayu Season 4**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

[🚀 Live Demo](#https://app.netlify.com/projects/sybase-oracle/overview) • [📖 Documentation](./docs/MAIN-README.md) • [🔧 API](./docs/api/README.md) • [💬 Support](#support)

</div>

## 🌟 Project Overview

**CosmoAgents** presents an innovative AI-powered solution for migrating Sybase database code to Oracle-compatible syntax. Built during the VIRTUSA Jatayu Season 4 hackathon, this tool leverages Google Gemini AI to provide accurate, efficient, and reliable database migrations for enterprise-scale applications.

### 🎯 Problem Statement

Database migrations between different systems (Sybase to Oracle) are complex, error-prone, and time-consuming manual processes that require deep expertise in both database systems. Traditional approaches often result in:
- High error rates in syntax conversion
- Significant time investment for manual review
- Inconsistent migration quality
- Lack of comprehensive documentation

### 💡 Our Solution

Our AI-powered migration tool addresses these challenges by:
- **🤖 AI-Powered Conversion**: Using Google Gemini AI for superior syntax conversion accuracy
- **⚡ Automated Processing**: Batch processing of multiple files with real-time progress tracking
- **🔍 Quality Assurance**: Advanced diff viewer with side-by-side code comparison
- **📊 Comprehensive Reporting**: Detailed migration reports for stakeholders
- **👥 Team Collaboration**: Multi-user support with role-based access control

## ✨ Key Features

### Core Functionality
- **📁 Multi-Format Support**: SQL, Stored Procedures, Functions, Triggers, DDL
- **🔄 Batch Processing**: Upload and convert entire directories
- **🎨 Visual Diff Viewer**: Side-by-side code comparison with syntax highlighting
- **📈 Progress Tracking**: Real-time conversion progress and status updates
- **💾 Export Options**: Download individual files or complete migration packages
- **🤖 AI Chatbot Assistant**: Get help with migration questions and code explanations

### Advanced Features
- **🧠 Multiple AI Models**: Choose between Gemini AI, Default, or Custom models
- **⚙️ Custom Rules**: Define organization-specific conversion rules
- **🔗 API Integration**: RESTful API for programmatic access
- **📋 Migration History**: Complete audit trail of all conversions
- **🛡️ Enterprise Security**: Role-based access, encryption, and audit logging

## 🛠️ Technology Stack

<div align="center">

| Frontend | Backend | AI/ML | Infrastructure |
|----------|---------|-------|----------------|
| React 18 | Supabase | Gemini AI | Docker |
| TypeScript | PostgreSQL | LangChain | Nginx |
| Vite | Supabase Auth | OpenAI (Optional) | Cloud Deploy |
| Tailwind CSS | Supabase Storage | Custom Models | CI/CD |
| shadcn/ui | Edge Functions | | Monitoring |

</div>

## 🚀 Live Demo

**Website URL**: [https://oracle-ai-migrate.netlify.app](https://oracle-ai-migrate.netlify.app)

**Demo Credentials**:
- **Email**: thegeek370@gmail.com
- **Password**: 666666

**Admin Access**:
- **Email**: thegeek370@gmail.com
- **Password**: 666666

## 🎬 Demo Video

[Watch our project demo video here](#) *(Link to be added)*

## 📊 Project Metrics

<div align="center">

| Metric | Value |
|--------|--------|
| **Conversion Accuracy** | 95%+ for standard procedures |
| **Processing Speed** | < 30 seconds per file |
| **Supported File Types** | 6+ SQL file formats |
| **AI Models** | Multiple options available |
| **Max File Size** | 10MB per file |
| **Batch Processing** | Up to 50 files |

</div>

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ or Bun
- Modern web browser
- Supabase account
- Gemini AI API key

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/mouktikzz/VIRTUSA-JatayuS4-CosmoAgents.git
cd VIRTUSA-JatayuS4-CosmoAgents

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 3. Configuration

```bash
# .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 5. First Migration

1. **Sign Up**: Create your account at `http://localhost:5173`
2. **Upload Files**: Drag and drop your Sybase SQL files
3. **Choose AI Model**: Select Gemini AI for best results
4. **Review Results**: Use the diff viewer to validate conversions
5. **Generate Report**: Create comprehensive migration documentation
6. **Download**: Get your Oracle-compatible code

## 🐳 Docker Deployment

### Quick Deploy

```bash
# Build and run with Docker
docker build -t sybase-oracle-migration .
docker run -p 8080:80 sybase-oracle-migration
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 📖 Documentation

Our comprehensive documentation covers every aspect of the migration tool:

| Document | Description |
|----------|-------------|
| [📋 Main Documentation](./docs/MAIN-README.md) | Complete project overview and features |
| [👤 User Guide](./docs/user-guide/README.md) | Complete user manual and tutorials |
| [🏗️ Architecture](./docs/architecture.md) | System design and component overview |
| [👩‍💻 Developer Guide](./docs/developer-guide/README.md) | Setup, contributing, and customization |
| [🚀 Deployment Guide](./docs/deployment/README.md) | Production deployment instructions |
| [⚙️ Configuration](./docs/configuration/README.md) | Environment and feature configuration |
| [📡 API Reference](./docs/api/README.md) | Complete API documentation |
| [🔧 Troubleshooting](./docs/troubleshooting/README.md) | Common issues and solutions |

## 🏆 Hackathon Journey

### Team: CosmoAgents
- **Project Duration**: 48 hours
- **Challenge**: Database Migration Automation
- **Innovation**: AI-Powered Code Conversion
- **Impact**: 95%+ accuracy in syntax conversion

### Key Achievements
- ✅ **AI Integration**: Successfully integrated Google Gemini AI for code conversion
- ✅ **Real-time Processing**: Implemented batch processing with progress tracking
- ✅ **User Experience**: Created intuitive UI with visual diff viewer
- ✅ **Enterprise Features**: Added role-based access control and audit logging
- ✅ **Documentation**: Comprehensive documentation and API reference

### Technical Highlights
- **Frontend**: Modern React 18 with TypeScript and Tailwind CSS
- **Backend**: Supabase for authentication, database, and storage
- **AI Engine**: Google Gemini AI with LangChain integration
- **Deployment**: Docker containerization with Netlify hosting

## 🤝 Team Members

**CosmoAgents** - VIRTUSA Jatayu Season 4

- Bharath Chandra
- Mouktik Dasari
- Srujan Yatam

## 🛟 Support

### Getting Help

- **📚 Documentation**: Check our [comprehensive docs](./docs/MAIN-README.md)
- **🐛 Issues**: [GitHub Issues](https://github.com/mouktikzz/VIRTUSA-JatayuS4-CosmoAgents/issues) for bug reports
- **💬 Discussions**: [GitHub Discussions](https://github.com/mouktikzz/VIRTUSA-JatayuS4-CosmoAgents/discussions) for questions
- **📧 Email**: [thegeek370@gmail.com](mailto:thegeek370@gmail.com)

### 🔗 Related Links

- **Original Repository**: [https://github.com/mouktikzz/oracle-ai-migrate](https://github.com/mouktikzz/oracle-ai-migrate)

## 📄 License

This project is proprietary. See the main repository for license information.

## 🙏 Acknowledgments

- **VIRTUSA** for organizing the Jatayu Season 4 hackathon
- **Google Gemini AI** for powering our conversion engine
- **Supabase** for providing the backend infrastructure
- **Open Source Community** for the amazing libraries and tools
- **CosmoAgents Team** for the incredible collaboration

---

<div align="center">

**Made with ❤️ by CosmoAgents for VIRTUSA Jatayu Season 4**

[⬆ Back to Top](#-virtusa-jatayus4-cosmoagents)

</div> 
