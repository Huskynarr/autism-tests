# 🧠 Autism Tests Platform

A comprehensive web-based platform for autism spectrum disorder (ASD) assessment and screening tools. This platform provides evidence-based assessment instruments designed to support early identification and intervention.

## ⚠️ Important Disclaimer

**This platform is for screening and educational purposes only and does not provide medical diagnosis.** A comprehensive evaluation by qualified healthcare professionals is required for autism diagnosis. These tools should be used as part of a broader assessment process.

## 🌟 Features

- **Multiple Assessment Tools**: AQ (Autism Spectrum Quotient), M-CHAT (Modified Checklist for Autism in Toddlers), SRS (Social Responsiveness Scale)
- **Age-Appropriate Testing**: Different tools for different age groups from toddlers to adults
- **Interactive Web Interface**: User-friendly, accessible design
- **Real-time Results**: Immediate scoring and interpretation
- **Privacy-Focused**: Anonymous assessments with secure data handling
- **Mobile-Responsive**: Works on desktop, tablet, and mobile devices
- **Professional-Grade**: Based on scientifically validated instruments

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Huskynarr/autism-tests.git
   cd autism-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📚 Available Assessment Tools

### 1. Autism Spectrum Quotient (AQ)
- **Target Age**: 16+ years (adults)
- **Duration**: 10-15 minutes
- **Type**: Self-assessment questionnaire
- **Purpose**: Measures autistic traits in adults
- **Scoring**: 50 questions, Likert scale responses

### 2. Modified Checklist for Autism in Toddlers (M-CHAT)
- **Target Age**: 16-30 months
- **Duration**: 5-10 minutes
- **Type**: Parent/caregiver checklist
- **Purpose**: Early screening for autism in toddlers
- **Scoring**: 23 yes/no questions with critical items

### 3. Social Responsiveness Scale (SRS)
- **Target Age**: 4-18 years
- **Duration**: 15-20 minutes
- **Type**: Rating scale
- **Purpose**: Measures social impairments associated with autism
- **Scoring**: 65 items with T-score normalization

## 🛠️ Development

### Project Structure

```
autism-tests/
├── src/
│   ├── core/
│   │   └── TestEngine.js          # Core testing functionality
│   ├── assessment/
│   │   └── AutismAssessment.js    # Session management
│   └── index.js                   # Main application entry
├── public/
│   └── index.html                 # Web interface
├── assets/
│   ├── styles.css                 # Styling
│   └── app.js                     # Frontend JavaScript
├── tests/
│   └── autism-tests.test.js       # Test suite
├── docs/                          # Documentation
├── package.json                   # Project configuration
└── README.md                      # This file
```

### Available Scripts

- **`npm start`** - Start the production server
- **`npm run dev`** - Start development server with hot reload
- **`npm test`** - Run the test suite
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run lint`** - Run ESLint code analysis
- **`npm run build`** - Build the project

### API Endpoints

#### Health Check
```
GET /api/health
```
Returns platform health status.

#### Get Available Tests
```
GET /api/tests
```
Returns list of available assessment tools.

#### Start Assessment
```
POST /api/assessment/start
Content-Type: application/json

{
  "testId": "aq-test",
  "participantInfo": {},
  "userAgent": "...",
  "language": "en",
  "timezone": "UTC"
}
```

#### Get Session Status
```
GET /api/assessment/{sessionId}
```

#### Submit Answer
```
POST /api/assessment/{sessionId}/answer
Content-Type: application/json

{
  "value": "3"
}
```

## 🧪 Testing

The platform includes comprehensive tests covering:

- **Unit Tests**: Core functionality testing
- **Integration Tests**: Full workflow testing
- **API Tests**: Endpoint validation
- **Assessment Logic**: Scoring algorithm verification

Run tests with:
```bash
npm test
```

For continuous testing during development:
```bash
npm run test:watch
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key
LOG_LEVEL=info
```

### ESLint Configuration

The project uses ESLint for code quality. Configuration is in `.eslintrc.js`:

```javascript
module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'error',
        'prefer-const': 'error'
    }
};
```

## 📖 Clinical Background

### Scientific Basis

All assessment tools included in this platform are based on peer-reviewed research:

- **AQ**: Baron-Cohen, S., et al. (2001). The Autism-Spectrum Quotient (AQ)
- **M-CHAT**: Robins, D. L., et al. (2001). The Modified Checklist for Autism in Toddlers
- **SRS**: Constantino, J. N., & Gruber, C. P. (2005). Social Responsiveness Scale

### Interpretation Guidelines

Results are provided with appropriate context and limitations:

- Screening tools identify potential risk factors
- Professional evaluation is always recommended
- Cultural and linguistic factors should be considered
- No single tool provides definitive diagnosis

## 🔐 Privacy & Security

- **Anonymous Assessments**: No personal identifying information required
- **Session-Based**: Temporary session storage only
- **Data Protection**: No long-term data storage
- **Secure Communication**: HTTPS in production
- **Compliance**: Designed with healthcare privacy standards in mind

## 🌍 Accessibility

The platform is designed to be accessible to all users:

- **WCAG 2.1 AA Compliance**: Meets web accessibility standards
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast displays
- **Mobile Friendly**: Responsive design for all devices

## 🤝 Contributing

We welcome contributions to improve the platform:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Maintain clinical accuracy

## 📋 Roadmap

### Planned Features

- [ ] Additional assessment tools (ADOS, ADI-R adaptations)
- [ ] Multi-language support
- [ ] Professional dashboard for clinicians
- [ ] Data export capabilities
- [ ] Advanced analytics and reporting
- [ ] Integration with healthcare systems

### Version History

- **v1.0.0** - Initial release with AQ, M-CHAT, and SRS tools
- **v0.9.0** - Beta testing and refinement
- **v0.8.0** - Core assessment engine development

## 📞 Support & Resources

### Getting Help

- **Documentation**: See `/docs` directory
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

### Professional Resources

- **Autism Organizations**: Links to reputable autism organizations
- **Clinical Guidelines**: Professional diagnostic criteria
- **Research Papers**: Scientific literature references
- **Training Materials**: Educational resources for professionals

### Community Resources

- **Support Groups**: Family and individual support networks
- **Educational Materials**: Understanding autism spectrum disorders
- **Advocacy Groups**: Autism rights and advocacy organizations

## ⚖️ Legal & Ethics

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Ethical Considerations

- **Informed Consent**: Clear explanations of tool limitations
- **Cultural Sensitivity**: Awareness of cultural factors in assessment
- **Professional Boundaries**: Clear distinction between screening and diagnosis
- **Research Ethics**: Responsible use of validated instruments

### Citation

If you use this platform in research or clinical practice, please cite:

```
Autism Tests Platform (2024). Open-source autism screening tools.
GitHub repository: https://github.com/Huskynarr/autism-tests
```

## 📊 Technical Specifications

### System Requirements

- **Node.js**: 14.x or higher
- **Memory**: 512MB RAM minimum
- **Storage**: 100MB available space
- **Browser**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)

### Performance

- **Load Time**: <3 seconds initial load
- **Assessment Duration**: 5-20 minutes depending on tool
- **Concurrent Users**: Scalable to 1000+ simultaneous users
- **Availability**: 99.9% uptime target

### Security

- **Data Encryption**: TLS 1.3 in transit
- **Session Management**: Secure session handling
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting protection

---

## 🙏 Acknowledgments

- **Research Community**: Scientists who developed these assessment tools
- **Autism Community**: Individuals and families who participate in research
- **Healthcare Professionals**: Clinicians who provide feedback and validation
- **Open Source Contributors**: Developers who contribute to the codebase

---

**Built with ❤️ for the autism community**

For questions, support, or collaboration opportunities, please reach out through GitHub Issues or Discussions.