/**
 * Autism Tests Platform - Frontend JavaScript
 * Handles user interface interactions and API communication
 */

class AutismTestsApp {
    constructor() {
        this.currentSection = 'home';
        this.currentSession = null;
        this.currentQuestion = 0;
        this.selectedAnswer = null;
        this.availableTests = [];
        
        this.init();
    }

    async init() {
        // Load available tests
        await this.loadTests();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('🧠 Autism Tests Platform initialized');
    }

    async loadTests() {
        try {
            const response = await fetch('/api/tests');
            this.availableTests = await response.json();
            this.renderTests();
        } catch (error) {
            console.error('Failed to load tests:', error);
            this.showError('Failed to load available tests');
        }
    }

    renderTests() {
        const container = document.getElementById('tests-container');
        if (!container) return;

        container.innerHTML = this.availableTests.map(test => `
            <div class="test-card">
                <h3>${test.name}</h3>
                <p>${test.description}</p>
                <div class="test-meta">
                    <span>👥 Age: ${test.ageRange}</span>
                    <span>⏱️ Duration: ${test.duration}</span>
                    <span>❓ Questions: ${test.questionCount}</span>
                    <span>📋 Type: ${test.type.replace('_', ' ')}</span>
                </div>
                <button class="btn btn-primary" onclick="app.startTest('${test.id}')">
                    Start ${test.name}
                </button>
            </div>
        `).join('');
    }

    setupNavigation() {
        // Setup navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
            });
        });
    }

    setupEventListeners() {
        // Handle question option selection
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name === 'answer') {
                this.selectedAnswer = e.target.value;
                document.getElementById('next-btn').disabled = false;
                
                // Update visual selection
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                e.target.closest('.option').classList.add('selected');
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    async startTest(testId) {
        try {
            // Start assessment session
            const response = await fetch('/api/assessment/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    testId: testId,
                    participantInfo: {},
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                })
            });

            const result = await response.json();
            this.currentSession = result.sessionId;
            
            // Load first question
            await this.loadCurrentQuestion();
            
            // Show assessment section
            this.showSection('assessment');
            
        } catch (error) {
            console.error('Failed to start test:', error);
            this.showError('Failed to start assessment');
        }
    }

    async loadCurrentQuestion() {
        if (!this.currentSession) return;

        try {
            const response = await fetch(`/api/assessment/${this.currentSession}`);
            const session = await response.json();
            
            if (session.error) {
                this.showError(session.error);
                return;
            }

            // Update assessment UI
            document.getElementById('assessment-title').textContent = session.testInfo.name;
            document.getElementById('progress-text').textContent = 
                `Question ${session.progress.currentQuestion} of ${session.progress.totalQuestions}`;
            
            const progressFill = document.getElementById('progress-fill');
            progressFill.style.width = `${session.progress.percentage}%`;

            // Check if assessment is complete
            if (session.canSubmit && !session.currentQuestion) {
                await this.showResults();
                return;
            }

            // Render current question
            this.renderQuestion(session.currentQuestion);
            
        } catch (error) {
            console.error('Failed to load question:', error);
            this.showError('Failed to load question');
        }
    }

    renderQuestion(question) {
        const container = document.getElementById('question-container');
        if (!container || !question) return;

        // Generate options based on question type
        let optionsHtml = '';
        
        if (question.category) {
            // AQ-style questions (Likert scale)
            const options = [
                { value: '1', label: 'Strongly Disagree' },
                { value: '2', label: 'Disagree' },
                { value: '3', label: 'Agree' },
                { value: '4', label: 'Strongly Agree' }
            ];
            
            optionsHtml = options.map(option => `
                <label class="option">
                    <input type="radio" name="answer" value="${option.value}">
                    ${option.label}
                </label>
            `).join('');
            
        } else if (question.critical !== undefined) {
            // M-CHAT style questions (Yes/No)
            const options = [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ];
            
            optionsHtml = options.map(option => `
                <label class="option">
                    <input type="radio" name="answer" value="${option.value}">
                    ${option.label}
                </label>
            `).join('');
            
        } else if (question.scale) {
            // SRS style questions (Rating scale)
            const options = [
                { value: '1', label: 'Never' },
                { value: '2', label: 'Sometimes' },
                { value: '3', label: 'Often' },
                { value: '4', label: 'Always' }
            ];
            
            optionsHtml = options.map(option => `
                <label class="option">
                    <input type="radio" name="answer" value="${option.value}">
                    ${option.label}
                </label>
            `).join('');
        }

        container.innerHTML = `
            <div class="question">
                <h3>${question.text}</h3>
                <div class="question-options">
                    ${optionsHtml}
                </div>
            </div>
        `;

        // Reset button states
        document.getElementById('next-btn').disabled = true;
        this.selectedAnswer = null;
    }

    async nextQuestion() {
        if (!this.selectedAnswer || !this.currentSession) return;

        try {
            const response = await fetch(`/api/assessment/${this.currentSession}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: this.selectedAnswer
                })
            });

            const result = await response.json();
            
            if (result.error) {
                this.showError(result.error);
                return;
            }

            if (result.completed) {
                await this.showResults();
            } else {
                // Load next question
                await this.loadCurrentQuestion();
            }
            
        } catch (error) {
            console.error('Failed to submit answer:', error);
            this.showError('Failed to submit answer');
        }
    }

    async showResults() {
        try {
            const response = await fetch(`/api/assessment/${this.currentSession}`);
            const session = await response.json();
            
            // Show results section
            this.showSection('results');
            
            // Render results
            this.renderResults(session);
            
        } catch (error) {
            console.error('Failed to load results:', error);
            this.showError('Failed to load results');
        }
    }

    renderResults(session) {
        const container = document.getElementById('results-content');
        if (!container) return;

        const results = session.results || {};
        const testInfo = session.testInfo || {};

        let scoreHtml = '';
        if (results.totalScore !== undefined) {
            scoreHtml = `
                <div class="result-score">
                    <div class="score-value">${results.totalScore}/${results.maxScore || '?'}</div>
                    <div class="score-label">Total Score</div>
                </div>
            `;
        } else if (results.riskFactors !== undefined) {
            scoreHtml = `
                <div class="result-score">
                    <div class="score-value">${results.riskFactors}</div>
                    <div class="score-label">Risk Factors Identified</div>
                </div>
            `;
        } else if (results.tScore !== undefined) {
            scoreHtml = `
                <div class="result-score">
                    <div class="score-value">${results.tScore}</div>
                    <div class="score-label">T-Score</div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="result-card">
                <h3>${testInfo.name} Results</h3>
                ${scoreHtml}
                
                <div class="interpretation">
                    <h4>Interpretation</h4>
                    <p>${results.interpretation || 'Results processed successfully'}</p>
                    ${results.recommendation ? `<p><strong>Recommendation:</strong> ${results.recommendation}</p>` : ''}
                </div>

                <div class="recommendations">
                    <h4>Next Steps</h4>
                    <ul>
                        <li>📋 This screening is not a diagnostic tool</li>
                        <li>👨‍⚕️ Consult with a healthcare professional for comprehensive evaluation</li>
                        <li>📚 Learn more about autism spectrum disorders</li>
                        <li>🤝 Connect with support resources in your area</li>
                    </ul>
                </div>

                <div style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="app.startNewAssessment()">
                        Take Another Assessment
                    </button>
                    <button class="btn btn-secondary" onclick="app.showSection('resources')">
                        View Resources
                    </button>
                </div>
            </div>
        `;
    }

    startNewAssessment() {
        this.currentSession = null;
        this.currentQuestion = 0;
        this.selectedAnswer = null;
        this.showSection('tests');
    }

    showError(message) {
        // Simple error display - could be enhanced with a proper notification system
        alert(`Error: ${message}`);
    }

    previousQuestion() {
        // Placeholder for previous question functionality
        // Could be implemented to allow going back in assessment
        console.log('Previous question functionality would be implemented here');
    }
}

// Global functions for HTML onclick handlers
function showSection(sectionId) {
    if (window.app) {
        window.app.showSection(sectionId);
    }
}

function nextQuestion() {
    if (window.app) {
        window.app.nextQuestion();
    }
}

function previousQuestion() {
    if (window.app) {
        window.app.previousQuestion();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AutismTestsApp();
});

// Health check function
async function checkHealth() {
    try {
        const response = await fetch('/api/health');
        const health = await response.json();
        console.log('Platform health:', health);
        return health;
    } catch (error) {
        console.error('Health check failed:', error);
        return null;
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutismTestsApp, checkHealth };
}