/**
 * Test Engine - Core testing functionality
 * Manages different types of autism assessment tests
 */

class TestEngine {
    constructor() {
        this.tests = new Map();
        this.initializeDefaultTests();
    }

    initializeDefaultTests() {
        // Autism Spectrum Quotient (AQ) Test
        this.registerTest({
            id: 'aq-test',
            name: 'Autism Spectrum Quotient (AQ)',
            description: 'A self-assessment questionnaire to measure autistic traits in adults',
            type: 'questionnaire',
            ageRange: '16+',
            duration: '10-15 minutes',
            questions: this.getAQQuestions()
        });

        // Modified Checklist for Autism in Toddlers (M-CHAT)
        this.registerTest({
            id: 'm-chat',
            name: 'Modified Checklist for Autism in Toddlers (M-CHAT)',
            description: 'Screening tool for autism in children aged 16-30 months',
            type: 'checklist',
            ageRange: '16-30 months',
            duration: '5-10 minutes',
            questions: this.getMChatQuestions()
        });

        // Social Responsiveness Scale
        this.registerTest({
            id: 'srs',
            name: 'Social Responsiveness Scale',
            description: 'Measures social impairments associated with autism',
            type: 'rating_scale',
            ageRange: '4-18 years',
            duration: '15-20 minutes',
            questions: this.getSRSQuestions()
        });
    }

    registerTest(testDefinition) {
        this.tests.set(testDefinition.id, testDefinition);
    }

    getAvailableTests() {
        return Array.from(this.tests.values()).map(test => ({
            id: test.id,
            name: test.name,
            description: test.description,
            type: test.type,
            ageRange: test.ageRange,
            duration: test.duration,
            questionCount: test.questions.length
        }));
    }

    getTest(testId) {
        return this.tests.get(testId);
    }

    getAQQuestions() {
        return [
            {
                id: 'aq1',
                text: 'I prefer to do things with others rather than on my own.',
                category: 'social_skills',
                reverse: true
            },
            {
                id: 'aq2',
                text: 'I prefer to do things the same way over and over again.',
                category: 'attention_switching',
                reverse: false
            },
            {
                id: 'aq3',
                text: 'If I try to imagine something, I find it very easy to create a picture in my mind.',
                category: 'imagination',
                reverse: true
            },
            {
                id: 'aq4',
                text: 'I frequently get so strongly absorbed in one thing that I lose sight of other things.',
                category: 'attention_to_detail',
                reverse: false
            },
            {
                id: 'aq5',
                text: 'I often notice small sounds when others do not.',
                category: 'attention_to_detail',
                reverse: false
            }
            // Note: Real AQ test has 50 questions, this is a sample
        ];
    }

    getMChatQuestions() {
        return [
            {
                id: 'mc1',
                text: 'Does your child enjoy being swung, bounced on your knee, etc.?',
                category: 'social_interest',
                critical: false
            },
            {
                id: 'mc2',
                text: 'Does your child take an interest in other children?',
                category: 'social_interest',
                critical: true
            },
            {
                id: 'mc3',
                text: 'Does your child like climbing on things, such as up stairs?',
                category: 'physical_development',
                critical: false
            },
            {
                id: 'mc4',
                text: 'Does your child enjoy peek-a-boo/hide-and-seek?',
                category: 'social_play',
                critical: false
            },
            {
                id: 'mc5',
                text: 'Does your child ever pretend, for example, to talk on the phone or take care of dolls, or pretend other things?',
                category: 'pretend_play',
                critical: true
            }
            // Note: Real M-CHAT has 23 questions, this is a sample
        ];
    }

    getSRSQuestions() {
        return [
            {
                id: 'srs1',
                text: 'Is aware of what others are thinking or feeling',
                category: 'social_awareness',
                scale: 'never_sometimes_often_always'
            },
            {
                id: 'srs2',
                text: 'Has difficulty relating to peers',
                category: 'social_communication',
                scale: 'never_sometimes_often_always'
            },
            {
                id: 'srs3',
                text: 'Shows unusual sensory interests',
                category: 'autistic_mannerisms',
                scale: 'never_sometimes_often_always'
            }
            // Note: Real SRS has 65 questions, this is a sample
        ];
    }

    calculateScore(testId, answers) {
        const test = this.getTest(testId);
        if (!test) return null;

        switch (test.type) {
        case 'questionnaire':
            return this.calculateAQScore(answers);
        case 'checklist':
            return this.calculateMChatScore(answers);
        case 'rating_scale':
            return this.calculateSRSScore(answers);
        default:
            return null;
        }
    }

    calculateAQScore(answers) {
        let score = 0;
        // Simplified scoring logic
        answers.forEach(answer => {
            if (answer.value >= 3) score += 1; // Agree/Strongly Agree
        });
        
        return {
            totalScore: score,
            maxScore: answers.length,
            interpretation: this.interpretAQScore(score),
            details: 'Score based on agreement with autistic traits'
        };
    }

    calculateMChatScore(answers) {
        let riskFactors = 0;
        let criticalItems = 0;
        
        answers.forEach(answer => {
            if (answer.value === 'no') {
                riskFactors++;
                if (answer.critical) criticalItems++;
            }
        });

        return {
            riskFactors,
            criticalItems,
            interpretation: this.interpretMChatScore(riskFactors, criticalItems),
            recommendation: riskFactors >= 3 ? 'Further evaluation recommended' : 'Low risk'
        };
    }

    calculateSRSScore(answers) {
        let totalScore = 0;
        answers.forEach(answer => {
            totalScore += parseInt(answer.value) || 0;
        });

        return {
            totalScore,
            tScore: Math.round(totalScore * 1.5 + 50), // Simplified T-score calculation
            interpretation: this.interpretSRSScore(totalScore),
            severity: totalScore > 40 ? 'Moderate-Severe' : totalScore > 20 ? 'Mild-Moderate' : 'Minimal'
        };
    }

    interpretAQScore(score) {
        if (score >= 32) return 'High likelihood of autism spectrum traits';
        if (score >= 26) return 'Moderate likelihood of autism spectrum traits';
        return 'Low likelihood of autism spectrum traits';
    }

    interpretMChatScore(riskFactors, criticalItems) {
        if (criticalItems >= 2 || riskFactors >= 3) {
            return 'High risk - Professional evaluation strongly recommended';
        }
        if (riskFactors >= 1) {
            return 'Some risk - Consider follow-up assessment';
        }
        return 'Low risk - Typical development indicated';
    }

    interpretSRSScore(score) {
        if (score > 40) return 'Significant social impairments consistent with autism';
        if (score > 20) return 'Mild to moderate social impairments';
        return 'Minimal social impairments';
    }
}

module.exports = TestEngine;