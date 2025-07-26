/**
 * Autism Tests Platform - Main Entry Point
 * A comprehensive platform for autism assessment and testing tools
 */

const express = require('express');
const path = require('path');
const AutismAssessment = require('./assessment/AutismAssessment');
const TestEngine = require('./core/TestEngine');

class AutismTestsPlatform {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.testEngine = new TestEngine();
        this.assessment = new AutismAssessment();
        
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use('/assets', express.static(path.join(__dirname, '../assets')));
    }

    setupRoutes() {
        // Main routes
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // API routes
        this.app.get('/api/tests', (req, res) => {
            res.json(this.testEngine.getAvailableTests());
        });

        this.app.post('/api/assessment/start', (req, res) => {
            const sessionId = this.assessment.startSession(req.body);
            res.json({ sessionId, message: 'Assessment session started' });
        });

        this.app.get('/api/assessment/:sessionId', (req, res) => {
            const session = this.assessment.getSession(req.params.sessionId);
            res.json(session);
        });

        this.app.post('/api/assessment/:sessionId/answer', (req, res) => {
            const result = this.assessment.submitAnswer(req.params.sessionId, req.body);
            res.json(result);
        });

        this.app.get('/api/health', (req, res) => {
            res.json({ 
                status: 'healthy', 
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            // eslint-disable-next-line no-console
            console.log(`🧠 Autism Tests Platform running on port ${this.port}`);
            // eslint-disable-next-line no-console
            console.log(`📊 Available tests: ${this.testEngine.getAvailableTests().length}`);
            // eslint-disable-next-line no-console
            console.log(`🌐 Access at: http://localhost:${this.port}`);
        });
    }
}

// Initialize and start the platform
if (require.main === module) {
    const platform = new AutismTestsPlatform();
    platform.start();
}

module.exports = AutismTestsPlatform;