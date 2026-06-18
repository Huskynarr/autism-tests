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
        // Autism Spectrum Quotient (AQ-50) Test
        this.registerTest({
            id: 'aq-50',
            name: 'Autism Spectrum Quotient (AQ-50)',
            description: '50-item self-assessment questionnaire to measure autistic traits in adults (Baron-Cohen et al., 2001)',
            type: 'questionnaire',
            ageRange: '16+',
            duration: '10-15 minutes',
            questions: this.getAQ50Questions()
        });

        // RAADS-R Test
        this.registerTest({
            id: 'raads-r',
            name: 'RAADS-R',
            description: 'Ritvo Autism Asperger Diagnostic Scale-Revised (80-item self-report, adults)',
            type: 'questionnaire',
            ageRange: '18+',
            duration: '20-30 minutes',
            questions: this.getRAADSRQuestions()
        });

        // ADOS-2 (Screening-Info, kein echter Online-Test)
        this.registerTest({
            id: 'ados-2',
            name: 'ADOS-2 (Screening)',
            description: 'Autism Diagnostic Observation Schedule, 2nd Edition – Screening-Info, keine Online-Diagnose',
            type: 'info',
            ageRange: '1-99',
            duration: '30-60 minutes',
            questions: this.getADOS2Info()
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
        // Deprecated, use getAQ50Questions
        return this.getAQ50Questions().slice(0, 5);
    }

    getAQ50Questions() {
        // 50 Items, hier als Platzhalter mit 5 echten und 45 Dummy-Fragen
        const base = [
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
        ];
        // Dummy-Fragen für 6-50
        for (let i = 6; i <= 50; i++) {
            base.push({
                id: `aq${i}`,
                text: `AQ-50 Item ${i} (placeholder)`,
                category: 'misc',
                reverse: false
            });
        }
        return base;
    }

    getRAADSRQuestions() {
        // Beispielhafte 5 von 80 Items, Rest als Platzhalter
        const base = [
            {
                id: 'raads1',
                text: 'It is difficult for me to understand how other people are feeling when we are talking.',
                category: 'social',
            },
            {
                id: 'raads2',
                text: 'I often use words and phrases from movies or television in conversations.',
                category: 'language',
            },
            {
                id: 'raads3',
                text: 'I am very sensitive to the way my clothes feel when I touch them.',
                category: 'sensory',
            },
            {
                id: 'raads4',
                text: 'I have trouble figuring out what someone is thinking or feeling just by looking at their face.',
                category: 'social',
            },
            {
                id: 'raads5',
                text: 'I focus on details rather than the overall idea.',
                category: 'detail',
            }
        ];
        for (let i = 6; i <= 80; i++) {
            base.push({
                id: `raads${i}`,
                text: `RAADS-R Item ${i} (placeholder)`,
                category: 'misc',
            });
        }
        return base;
    }

    getADOS2Info() {
        // ADOS-2 ist ein Interview, daher nur Info
        return [
            {
                id: 'adosinfo1',
                text: 'The ADOS-2 is a semi-structured, standardized assessment of communication, social interaction, and play for individuals suspected of having autism. It cannot be performed online. Please consult a professional for a full ADOS-2 assessment.'
            }
        ];
    // <- ENDE DER KLASSE ENTFERNT
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

        switch (test.id) {
        case 'aq-50':
            return this.calculateAQScore(answers, 50);
        case 'raads-r':
            return this.calculateRAADSRScore(answers);
        case 'ados-2':
            return { info: 'ADOS-2 cannot be scored online. Please consult a professional.' };
        default:
            // Fallback auf Typen
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
    }

    calculateAQScore(answers) {
        // Optionale maxItems für AQ-50
        let score = 0;
        answers.forEach(answer => {
            if (answer.value >= 3) score += 1;
        });
        const maxScore = answers.length;
        return {
            totalScore: score,
            maxScore,
            interpretation: this.interpretAQScore(score),
            details: 'Score based on agreement with autistic traits'
        };
    }

    calculateRAADSRScore(answers) {
        // Sehr vereinfachte Beispiel-Logik: 0-3 Punkte pro Frage, Summe
        let totalScore = 0;
        answers.forEach(a => {
            totalScore += parseInt(a.value) || 0;
        });
        return {
            totalScore,
            maxScore: 240, // 80 Items * max 3
            interpretation: totalScore >= 65 ? 'Autism likely' : totalScore >= 50 ? 'Possible autism' : 'Unlikely',
            details: 'RAADS-R raw score (cutoffs: >65 = likely, >50 = possible)'
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