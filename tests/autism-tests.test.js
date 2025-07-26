/**
 * Test Suite for Autism Tests Platform
 * Tests core functionality of the assessment system
 */

const AutismAssessment = require('../src/assessment/AutismAssessment');
const TestEngine = require('../src/core/TestEngine');

describe('Autism Tests Platform', () => {
    let testEngine;
    let assessment;

    beforeEach(() => {
        testEngine = new TestEngine();
        assessment = new AutismAssessment();
    });

    describe('TestEngine', () => {
        test('should initialize with default tests', () => {
            const tests = testEngine.getAvailableTests();
            expect(tests.length).toBeGreaterThan(0);
            expect(tests[0]).toHaveProperty('id');
            expect(tests[0]).toHaveProperty('name');
            expect(tests[0]).toHaveProperty('description');
        });

        test('should return AQ test details', () => {
            const aqTest = testEngine.getTest('aq-test');
            expect(aqTest).toBeDefined();
            expect(aqTest.name).toBe('Autism Spectrum Quotient (AQ)');
            expect(aqTest.questions.length).toBeGreaterThan(0);
        });

        test('should return M-CHAT test details', () => {
            const mchatTest = testEngine.getTest('m-chat');
            expect(mchatTest).toBeDefined();
            expect(mchatTest.name).toBe('Modified Checklist for Autism in Toddlers (M-CHAT)');
            expect(mchatTest.ageRange).toBe('16-30 months');
        });

        test('should calculate AQ score correctly', () => {
            const answers = [
                { value: '4', questionId: 'aq1' },
                { value: '3', questionId: 'aq2' },
                { value: '2', questionId: 'aq3' },
                { value: '4', questionId: 'aq4' },
                { value: '3', questionId: 'aq5' }
            ];

            const score = testEngine.calculateScore('aq-test', answers);
            expect(score).toHaveProperty('totalScore');
            expect(score).toHaveProperty('interpretation');
            expect(typeof score.totalScore).toBe('number');
        });

        test('should calculate M-CHAT score correctly', () => {
            const answers = [
                { value: 'yes', questionId: 'mc1', critical: false },
                { value: 'no', questionId: 'mc2', critical: true },
                { value: 'yes', questionId: 'mc3', critical: false }
            ];

            const score = testEngine.calculateScore('m-chat', answers);
            expect(score).toHaveProperty('riskFactors');
            expect(score).toHaveProperty('criticalItems');
            expect(score).toHaveProperty('recommendation');
        });
    });

    describe('AutismAssessment', () => {
        test('should start a new assessment session', () => {
            const sessionId = assessment.startSession({
                testId: 'aq-test',
                participantInfo: { age: 25 }
            });

            expect(sessionId).toBeDefined();
            expect(typeof sessionId).toBe('string');
        });

        test('should retrieve session information', () => {
            const sessionId = assessment.startSession({ testId: 'aq-test' });
            const session = assessment.getSession(sessionId);

            expect(session).toBeDefined();
            expect(session.sessionId).toBe(sessionId);
            expect(session.testInfo).toHaveProperty('id', 'aq-test');
            expect(session.progress).toHaveProperty('currentQuestion', 1);
            expect(session.currentQuestion).toBeDefined();
        });

        test('should handle answer submission', () => {
            const sessionId = assessment.startSession({ testId: 'aq-test' });
            const result = assessment.submitAnswer(sessionId, { value: '3' });

            expect(result).toHaveProperty('success', true);
            expect(result).toHaveProperty('nextQuestion');
        });

        test('should complete assessment when all questions answered', () => {
            const sessionId = assessment.startSession({ testId: 'aq-test' });
            const test = testEngine.getTest('aq-test');
            
            // Answer all questions
            for (let i = 0; i < test.questions.length; i++) {
                const result = assessment.submitAnswer(sessionId, { value: '3' });
                if (i === test.questions.length - 1) {
                    expect(result).toHaveProperty('completed', true);
                    expect(result).toHaveProperty('results');
                }
            }
        });

        test('should generate session statistics', () => {
            assessment.startSession({ testId: 'aq-test' });
            assessment.startSession({ testId: 'm-chat' });
            
            const stats = assessment.getSessionStats();
            expect(stats.totalSessions).toBe(2);
            expect(stats.activeSessions).toBe(2);
            expect(stats.testDistribution).toHaveProperty('aq-test', 1);
            expect(stats.testDistribution).toHaveProperty('m-chat', 1);
        });

        test('should handle invalid session requests', () => {
            const result = assessment.submitAnswer('invalid-session', { value: '3' });
            expect(result).toHaveProperty('error');
        });

        test('should generate recommendations based on results', () => {
            const results = {
                interpretation: 'High likelihood of autism spectrum traits',
                totalScore: 35
            };
            
            const recommendations = assessment.generateRecommendations(results);
            expect(Array.isArray(recommendations)).toBe(true);
            expect(recommendations.length).toBeGreaterThan(0);
            expect(recommendations[0]).toHaveProperty('type');
            expect(recommendations[0]).toHaveProperty('priority');
            expect(recommendations[0]).toHaveProperty('text');
        });
    });

    describe('Integration Tests', () => {
        test('should complete full AQ assessment workflow', () => {
            // Start session
            const sessionId = assessment.startSession({ testId: 'aq-test' });
            expect(sessionId).toBeDefined();

            // Get initial session state
            const session = assessment.getSession(sessionId);
            expect(session.progress.currentQuestion).toBe(1);

            // Answer all questions
            const test = testEngine.getTest('aq-test');
            for (let i = 0; i < test.questions.length; i++) {
                const result = assessment.submitAnswer(sessionId, { value: '3' });
                expect(result.success).toBe(true);
            }

            // Check final results
            const results = assessment.getResults(sessionId);
            expect(results).toHaveProperty('results');
            expect(results).toHaveProperty('recommendations');
        });

        test('should complete full M-CHAT assessment workflow', () => {
            const sessionId = assessment.startSession({ testId: 'm-chat' });
            const test = testEngine.getTest('m-chat');
            
            // Answer all questions with 'no' to trigger risk factors
            for (let i = 0; i < test.questions.length; i++) {
                assessment.submitAnswer(sessionId, { value: 'no' });
            }

            const results = assessment.getResults(sessionId);
            expect(results.results.riskFactors).toBeGreaterThan(0);
        });
    });
});