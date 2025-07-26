/**
 * Autism Assessment - Session Management
 * Handles assessment sessions and progress tracking
 */

// Session ID generation utility
const TestEngine = require('../core/TestEngine');

class AutismAssessment {
    constructor() {
        this.sessions = new Map();
        this.testEngine = new TestEngine();
    }

    startSession(options = {}) {
        const sessionId = this.generateSessionId();
        const session = {
            id: sessionId,
            testId: options.testId || 'aq-test',
            participantInfo: options.participantInfo || {},
            currentQuestionIndex: 0,
            answers: [],
            startTime: new Date(),
            status: 'active',
            metadata: {
                userAgent: options.userAgent,
                language: options.language || 'en',
                timezone: options.timezone
            }
        };

        this.sessions.set(sessionId, session);
        return sessionId;
    }

    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return null;

        const test = this.testEngine.getTest(session.testId);
        const totalQuestions = test ? test.questions.length : 0;
        const currentQuestion = test ? test.questions[session.currentQuestionIndex] : null;

        return {
            sessionId: session.id,
            testInfo: {
                id: session.testId,
                name: test?.name,
                description: test?.description,
                type: test?.type
            },
            progress: {
                currentQuestion: session.currentQuestionIndex + 1,
                totalQuestions,
                percentage: totalQuestions > 0 ? Math.round((session.currentQuestionIndex / totalQuestions) * 100) : 0
            },
            currentQuestion,
            status: session.status,
            canSubmit: session.currentQuestionIndex >= totalQuestions
        };
    }

    submitAnswer(sessionId, answerData) {
        const session = this.sessions.get(sessionId);
        if (!session || session.status !== 'active') {
            return { error: 'Invalid or inactive session' };
        }

        const test = this.testEngine.getTest(session.testId);
        if (!test) {
            return { error: 'Test not found' };
        }

        // Validate answer
        const currentQuestion = test.questions[session.currentQuestionIndex];
        if (!currentQuestion) {
            return { error: 'No more questions available' };
        }

        // Store the answer
        const answer = {
            questionId: currentQuestion.id,
            value: answerData.value,
            timestamp: new Date(),
            questionIndex: session.currentQuestionIndex
        };

        session.answers.push(answer);
        session.currentQuestionIndex++;

        // Check if assessment is complete
        if (session.currentQuestionIndex >= test.questions.length) {
            return this.completeAssessment(sessionId);
        }

        // Return next question
        const nextQuestion = test.questions[session.currentQuestionIndex];
        return {
            success: true,
            nextQuestion,
            progress: {
                currentQuestion: session.currentQuestionIndex + 1,
                totalQuestions: test.questions.length,
                percentage: Math.round((session.currentQuestionIndex / test.questions.length) * 100)
            }
        };
    }

    completeAssessment(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return { error: 'Session not found' };

        session.status = 'completed';
        session.endTime = new Date();
        session.duration = session.endTime - session.startTime;

        // Calculate results
        const results = this.testEngine.calculateScore(session.testId, session.answers);
        session.results = results;

        return {
            success: true,
            completed: true,
            results: results,
            sessionSummary: {
                testId: session.testId,
                duration: Math.round(session.duration / 1000 / 60), // minutes
                questionsAnswered: session.answers.length,
                completedAt: session.endTime
            }
        };
    }

    getResults(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return null;

        if (session.status !== 'completed') {
            return { error: 'Assessment not completed yet' };
        }

        return {
            sessionId,
            results: session.results,
            testInfo: this.testEngine.getTest(session.testId),
            sessionSummary: {
                startTime: session.startTime,
                endTime: session.endTime,
                duration: session.duration,
                answersCount: session.answers.length
            },
            recommendations: this.generateRecommendations(session.results)
        };
    }

    generateRecommendations(results) {
        const recommendations = [];

        // General recommendations based on results
        if (results.interpretation && results.interpretation.includes('High')) {
            recommendations.push({
                type: 'professional_consultation',
                priority: 'high',
                text: 'Consider consulting with a healthcare professional for comprehensive evaluation'
            });
            recommendations.push({
                type: 'support_resources',
                priority: 'medium',
                text: 'Explore autism support groups and resources in your area'
            });
        }

        if (results.interpretation && results.interpretation.includes('Moderate')) {
            recommendations.push({
                type: 'follow_up',
                priority: 'medium',
                text: 'Consider follow-up assessment or consultation with a specialist'
            });
        }

        recommendations.push({
            type: 'disclaimer',
            priority: 'high',
            text: 'This screening is not a diagnostic tool. Professional evaluation is required for diagnosis'
        });

        return recommendations;
    }

    generateSessionId() {
        // Generate a simple session ID for demo purposes
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    }

    // Cleanup old sessions (should be called periodically)
    cleanupOldSessions(maxAgeHours = 24) {
        const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000));
        
        for (const [sessionId, session] of this.sessions) {
            if (session.startTime < cutoffTime) {
                this.sessions.delete(sessionId);
            }
        }
    }

    getSessionStats() {
        const stats = {
            totalSessions: this.sessions.size,
            activeSessions: 0,
            completedSessions: 0,
            testDistribution: {}
        };

        for (const session of this.sessions.values()) {
            if (session.status === 'active') stats.activeSessions++;
            if (session.status === 'completed') stats.completedSessions++;
            
            stats.testDistribution[session.testId] = (stats.testDistribution[session.testId] || 0) + 1;
        }

        return stats;
    }
}

module.exports = AutismAssessment;