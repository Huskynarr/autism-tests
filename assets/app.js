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
        this.language = localStorage.getItem('lang') || (navigator.language || 'en').slice(0,2);
        this.translations = this.getTranslations();
        this.availableTests = this.getLocalTests();
        this.init();
    }

    getTranslations() {
        return {
            en: {
                'nav.home': 'Home',
                'nav.tests': 'Tests',
                'nav.about': 'About',
                'nav.resources': 'Resources',
                'btn.start': 'Start Assessment',
                'btn.learn': 'Learn More',
                'btn.prev': 'Previous',
                'btn.next': 'Next',
                'assessment.title': 'Assessment',
                'results.title': 'Assessment Results',
                'hero.title': 'Comprehensive Autism Assessment Tools',
                'hero.subtitle': 'Professional-grade screening tools for autism spectrum disorders. Evidence-based assessments designed to support early identification and intervention.',
                'feature.evidence': 'Evidence-Based',
                'feature.evidence.desc': 'Scientifically validated assessment tools used by healthcare professionals worldwide',
                'feature.privacy': 'Privacy Focused',
                'feature.privacy.desc': 'Your data is protected. Assessments are anonymous and secure',
                'feature.quick': 'Quick & Easy',
                'feature.quick.desc': 'Complete assessments in 10-20 minutes with immediate results',
                'feature.age': 'Age-Appropriate',
                'feature.age.desc': 'Different tools for different age groups, from toddlers to adults',
                'disclaimer.title': 'Important Disclaimer',
                'disclaimer.text': 'These tools are for screening purposes only and do not provide a diagnosis. A comprehensive evaluation by qualified healthcare professionals is required for autism diagnosis.',
                'footer.sources': 'Sources',
                'footer.aq': 'AQ-50: Autism Research Centre',
                'footer.mchat': 'M-CHAT: mchatscreen.com',
                'footer.srs': 'SRS: Social Responsiveness Scale',
                'footer.note': 'This test is for self-assessment only and does not replace a professional diagnosis. All information is without guarantee and must be confirmed by professionals.',
                'footer.github': 'Open Source on GitHub',
                'footer.made': 'Made with ♥ by Huskynarr',
                'btn.dark': '🌙 Switch to Darkmode',
                'btn.light': '☀️ Switch to Lightmode',
            },
            de: {
                'nav.home': 'Start',
                'nav.tests': 'Tests',
                'nav.about': 'Über',
                'nav.resources': 'Ressourcen',
                'btn.start': 'Test starten',
                'btn.learn': 'Mehr erfahren',
                'btn.prev': 'Zurück',
                'btn.next': 'Weiter',
                'assessment.title': 'Test',
                'results.title': 'Testergebnis',
                'hero.title': 'Umfassende Autismus-Test-Tools',
                'hero.subtitle': 'Professionelle Screening-Tools für Autismus-Spektrum-Störungen. Evidenzbasierte Tests für frühe Erkennung und Intervention.',
                'feature.evidence': 'Evidenzbasiert',
                'feature.evidence.desc': 'Wissenschaftlich validierte Testverfahren, weltweit von Fachleuten genutzt',
                'feature.privacy': 'Datenschutz',
                'feature.privacy.desc': 'Ihre Daten sind geschützt. Tests sind anonym und sicher',
                'feature.quick': 'Schnell & Einfach',
                'feature.quick.desc': 'Tests in 10-20 Minuten mit sofortigem Ergebnis',
                'feature.age': 'Altersgerecht',
                'feature.age.desc': 'Unterschiedliche Tools für verschiedene Altersgruppen',
                'disclaimer.title': 'Wichtiger Hinweis',
                'disclaimer.text': 'Diese Tools dienen nur dem Screening und ersetzen keine Diagnose. Eine umfassende Abklärung durch Fachpersonal ist erforderlich.',
                'footer.sources': 'Quellen',
                'footer.aq': 'AQ-50: Autism Research Centre',
                'footer.mchat': 'M-CHAT: mchatscreen.com',
                'footer.srs': 'SRS: Social Responsiveness Scale',
                'footer.note': 'Dieser Test dient lediglich zur Selbsteinschätzung und ersetzt keine professionelle Diagnose. Alle Angaben sind ohne Gewähr und müssen von Fachpersonal bestätigt werden.',
                'footer.github': 'Open Source auf GitHub',
                'footer.made': 'Made with ♥ by Huskynarr',
                'btn.dark': '🌙 Darkmode umschalten',
                'btn.light': '☀️ White Mode umschalten',
            },
            fr: {
                'nav.home': 'Accueil',
                'nav.tests': 'Tests',
                'nav.about': 'À propos',
                'nav.resources': 'Ressources',
                'btn.start': 'Commencer le test',
                'btn.learn': 'En savoir plus',
                'btn.prev': 'Précédent',
                'btn.next': 'Suivant',
                'assessment.title': 'Test',
                'results.title': 'Résultats',
                'hero.title': 'Outils complets d’évaluation de l’autisme',
                'hero.subtitle': 'Outils de dépistage professionnels pour les troubles du spectre autistique. Évaluations fondées sur des preuves pour un repérage et une intervention précoces.',
                'feature.evidence': 'Basé sur des preuves',
                'feature.evidence.desc': 'Outils validés scientifiquement, utilisés par des professionnels de santé',
                'feature.privacy': 'Respect de la vie privée',
                'feature.privacy.desc': 'Vos données sont protégées. Les tests sont anonymes et sécurisés',
                'feature.quick': 'Rapide & Facile',
                'feature.quick.desc': 'Tests en 10-20 minutes avec résultats immédiats',
                'feature.age': 'Adapté à l’âge',
                'feature.age.desc': 'Différents outils pour chaque tranche d’âge',
                'disclaimer.title': 'Avertissement important',
                'disclaimer.text': 'Ces outils servent uniquement au dépistage et ne remplacent pas un diagnostic. Une évaluation complète par un professionnel est nécessaire.',
                'footer.sources': 'Sources',
                'footer.aq': 'AQ-50 : Autism Research Centre',
                'footer.mchat': 'M-CHAT : mchatscreen.com',
                'footer.srs': 'SRS : Social Responsiveness Scale',
                'footer.note': 'Ce test est uniquement destiné à l’auto-évaluation et ne remplace pas un diagnostic professionnel. Toutes les informations sont données à titre indicatif et doivent être confirmées par un professionnel.',
                'footer.github': 'Open Source sur GitHub',
                'footer.made': 'Fait avec ♥ par Huskynarr',
                'btn.dark': '🌙 Activer le mode sombre',
                'btn.light': '☀️ Activer le mode clair',
            },
            es: {
                'nav.home': 'Inicio',
                'nav.tests': 'Pruebas',
                'nav.about': 'Acerca de',
                'nav.resources': 'Recursos',
                'btn.start': 'Comenzar test',
                'btn.learn': 'Saber más',
                'btn.prev': 'Anterior',
                'btn.next': 'Siguiente',
                'assessment.title': 'Test',
                'results.title': 'Resultados',
                'hero.title': 'Herramientas completas de evaluación del autismo',
                'hero.subtitle': 'Herramientas profesionales de cribado para el espectro autista. Evaluaciones basadas en la evidencia para la detección e intervención tempranas.',
                'feature.evidence': 'Basado en evidencia',
                'feature.evidence.desc': 'Herramientas validadas científicamente, utilizadas por profesionales de la salud',
                'feature.privacy': 'Privacidad',
                'feature.privacy.desc': 'Tus datos están protegidos. Las pruebas son anónimas y seguras',
                'feature.quick': 'Rápido y fácil',
                'feature.quick.desc': 'Pruebas en 10-20 minutos con resultados inmediatos',
                'feature.age': 'Adecuado a la edad',
                'feature.age.desc': 'Herramientas diferentes para cada grupo de edad',
                'disclaimer.title': 'Aviso importante',
                'disclaimer.text': 'Estas herramientas son solo para cribado y no sustituyen un diagnóstico. Se requiere una evaluación completa por parte de un profesional.',
                'footer.sources': 'Fuentes',
                'footer.aq': 'AQ-50: Autism Research Centre',
                'footer.mchat': 'M-CHAT: mchatscreen.com',
                'footer.srs': 'SRS: Social Responsiveness Scale',
                'footer.note': 'Esta prueba es solo para autoevaluación y no sustituye un diagnóstico profesional. Toda la información es sin garantía y debe ser confirmada por profesionales.',
                'footer.github': 'Open Source en GitHub',
                'footer.made': 'Hecho con ♥ por Huskynarr',
                'btn.dark': '🌙 Cambiar a modo oscuro',
                'btn.light': '☀️ Cambiar a modo claro',
            }
        };
    }

    t(key) {
        return (this.translations[this.language] && this.translations[this.language][key]) || this.translations['en'][key] || key;
    }

    async init() {
        // Set language from localStorage or browser
        this.applyTranslations();
        // Load available tests
        await this.loadTests();
        // Setup navigation
        this.setupNavigation();
        // Setup event listeners
        this.setupEventListeners();
        // Language switcher
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.value = this.language;
            langSwitch.addEventListener('change', (e) => {
                this.language = e.target.value;
                localStorage.setItem('lang', this.language);
                this.applyTranslations();
                this.renderTests();
                this.loadCurrentQuestion();
            });
        }
        console.log('🧠 Autism Tests Platform initialized');
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        // Buttons
        const startBtn = document.querySelector('.hero-actions .btn-primary');
        if (startBtn) startBtn.textContent = this.t('btn.start');
        const learnBtn = document.querySelector('.hero-actions .btn-secondary');
        if (learnBtn) learnBtn.textContent = this.t('btn.learn');
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) prevBtn.textContent = this.t('btn.prev');
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) nextBtn.textContent = this.t('btn.next');
        const assessmentTitle = document.getElementById('assessment-title');
        if (assessmentTitle) assessmentTitle.textContent = this.t('assessment.title');
        const resultsTitle = document.querySelector('#results .section-title');
        if (resultsTitle) resultsTitle.textContent = this.t('results.title');
    }

    async loadTests() {
        // Keine API, Tests sind lokal definiert
        this.renderTests();
    }

    getLocalTests() {
        return [
            {
                id: 'aq-50',
                name: 'Autism Spectrum Quotient (AQ-50)',
                description: '50-item self-assessment questionnaire to measure autistic traits in adults (Baron-Cohen et al., 2001)',
                type: 'questionnaire',
                ageRange: '16+',
                duration: '10-15 minutes',
                questionCount: 50,
                questions: this.getAQ50Questions()
            },
            {
                id: 'raads-r',
                name: 'RAADS-R',
                description: 'Ritvo Autism Asperger Diagnostic Scale-Revised (80-item self-report, adults)',
                type: 'questionnaire',
                ageRange: '18+',
                duration: '20-30 minutes',
                questionCount: 80,
                questions: this.getRAADSRQuestions()
            },
            {
                id: 'ados-2',
                name: 'ADOS-2 (Screening)',
                description: 'Autism Diagnostic Observation Schedule, 2nd Edition – Screening-Info, keine Online-Diagnose',
                type: 'info',
                ageRange: '1-99',
                duration: '30-60 minutes',
                questionCount: 1,
                questions: this.getADOS2Info()
            }
        ];
    }

    getAQ50Questions() {
        const base = [
            {
                id: 'aq1',
                reverse: true,
                translations: {
                    en: 'I prefer to do things with others rather than on my own.',
                    de: 'Ich mache Dinge lieber mit anderen als alleine.',
                    fr: 'Je préfère faire des choses avec d’autres plutôt que seul.',
                    es: 'Prefiero hacer cosas con otros que solo.'
                }
            },
            {
                id: 'aq2',
                reverse: false,
                translations: {
                    en: 'I prefer to do things the same way over and over again.',
                    de: 'Ich mache Dinge gerne immer wieder auf die gleiche Weise.',
                    fr: 'Je préfère faire les choses toujours de la même manière.',
                    es: 'Prefiero hacer las cosas siempre de la misma manera.'
                }
            },
            {
                id: 'aq3',
                reverse: true,
                translations: {
                    en: 'If I try to imagine something, I find it very easy to create a picture in my mind.',
                    de: 'Wenn ich mir etwas vorstelle, fällt es mir sehr leicht, ein Bild in meinem Kopf zu erzeugen.',
                    fr: 'Si j’essaie d’imaginer quelque chose, je trouve très facile de créer une image dans mon esprit.',
                    es: 'Si intento imaginar algo, me resulta muy fácil crear una imagen en mi mente.'
                }
            },
            {
                id: 'aq4',
                reverse: false,
                translations: {
                    en: 'I frequently get so strongly absorbed in one thing that I lose sight of other things.',
                    de: 'Ich vertiefe mich häufig so sehr in eine Sache, dass ich anderes aus den Augen verliere.',
                    fr: 'Je suis souvent tellement absorbé par une chose que j’en oublie le reste.',
                    es: 'A menudo me absorbo tanto en una cosa que pierdo de vista otras.'
                }
            },
            {
                id: 'aq5',
                reverse: false,
                translations: {
                    en: 'I often notice small sounds when others do not.',
                    de: 'Ich nehme oft kleine Geräusche wahr, die anderen nicht auffallen.',
                    fr: 'Je remarque souvent de petits bruits que d’autres ne remarquent pas.',
                    es: 'A menudo noto pequeños sonidos que otros no perciben.'
                }
            }
        ];
        for (let i = 6; i <= 50; i++) {
            base.push({ id: `aq${i}`, reverse: false, translations: {
                en: `AQ-50 Item ${i} (placeholder)`,
                de: `AQ-50 Frage ${i} (Platzhalter)`,
                fr: `AQ-50 question ${i} (exemple)`,
                es: `AQ-50 pregunta ${i} (ejemplo)`
            }});
        }
        return base;
    }

    getRAADSRQuestions() {
        const base = [
            {
                id: 'raads1',
                translations: {
                    en: 'It is difficult for me to understand how other people are feeling when we are talking.',
                    de: 'Es fällt mir schwer zu verstehen, wie sich andere beim Gespräch fühlen.',
                    fr: 'J’ai du mal à comprendre ce que ressentent les autres lors d’une conversation.',
                    es: 'Me resulta difícil entender cómo se sienten los demás cuando hablamos.'
                }
            },
            {
                id: 'raads2',
                translations: {
                    en: 'I often use words and phrases from movies or television in conversations.',
                    de: 'Ich benutze oft Wörter und Sätze aus Filmen oder dem Fernsehen im Gespräch.',
                    fr: 'J’utilise souvent des mots et des phrases de films ou de la télévision dans les conversations.',
                    es: 'A menudo uso palabras y frases de películas o televisión en las conversaciones.'
                }
            },
            {
                id: 'raads3',
                translations: {
                    en: 'I am very sensitive to the way my clothes feel when I touch them.',
                    de: 'Ich bin sehr empfindlich gegenüber dem Gefühl meiner Kleidung auf der Haut.',
                    fr: 'Je suis très sensible à la sensation de mes vêtements sur ma peau.',
                    es: 'Soy muy sensible a la sensación de mi ropa cuando la toco.'
                }
            },
            {
                id: 'raads4',
                translations: {
                    en: 'I have trouble figuring out what someone is thinking or feeling just by looking at their face.',
                    de: 'Ich habe Schwierigkeiten, anhand des Gesichts zu erkennen, was jemand denkt oder fühlt.',
                    fr: 'J’ai du mal à savoir ce que quelqu’un pense ou ressent rien qu’en regardant son visage.',
                    es: 'Me cuesta saber lo que alguien piensa o siente solo con mirar su cara.'
                }
            },
            {
                id: 'raads5',
                translations: {
                    en: 'I focus on details rather than the overall idea.',
                    de: 'Ich konzentriere mich eher auf Details als auf das große Ganze.',
                    fr: 'Je me concentre sur les détails plutôt que sur l’ensemble.',
                    es: 'Me centro en los detalles más que en la idea general.'
                }
            }
        ];
        for (let i = 6; i <= 80; i++) {
            base.push({ id: `raads${i}`, translations: {
                en: `RAADS-R Item ${i} (placeholder)`,
                de: `RAADS-R Frage ${i} (Platzhalter)`,
                fr: `RAADS-R question ${i} (exemple)`,
                es: `RAADS-R pregunta ${i} (ejemplo)`
            }});
        }
        return base;
    }

    getADOS2Info() {
        return [
            {
                id: 'adosinfo1',
                translations: {
                    en: 'The ADOS-2 is a semi-structured, standardized assessment of communication, social interaction, and play for individuals suspected of having autism. It cannot be performed online. Please consult a professional for a full ADOS-2 assessment.',
                    de: 'Das ADOS-2 ist ein halbstrukturiertes, standardisiertes Verfahren zur Beurteilung von Kommunikation, sozialer Interaktion und Spiel bei Verdacht auf Autismus. Es kann nicht online durchgeführt werden. Bitte wenden Sie sich für eine vollständige ADOS-2-Diagnostik an Fachpersonal.',
                    fr: 'L’ADOS-2 est une évaluation standardisée et semi-structurée de la communication, de l’interaction sociale et du jeu en cas de suspicion d’autisme. Elle ne peut pas être réalisée en ligne. Veuillez consulter un professionnel pour une évaluation complète.',
                    es: 'El ADOS-2 es una evaluación semiestructurada y estandarizada de la comunicación, la interacción social y el juego para personas con sospecha de autismo. No puede realizarse en línea. Consulte a un profesional para una evaluación completa.'
                }
            }
        ];
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

        // Frage multilingual anzeigen
        let qText = question.translations ? (question.translations[this.language] || question.translations['en'] || Object.values(question.translations)[0]) : (question.text || '');

        // Generate options based on question type
        let optionsHtml = '';
        let options = [];
        let groupLabel = '';
        if (question.category || question.reverse !== undefined) {
            // AQ/RAADS: Likert
            options = [
                { value: '1', label: this.t('likert.1') || 'Strongly Disagree' },
                { value: '2', label: this.t('likert.2') || 'Disagree' },
                { value: '3', label: this.t('likert.3') || 'Agree' },
                { value: '4', label: this.t('likert.4') || 'Strongly Agree' }
            ];
            groupLabel = 'Antwortskala';
        } else if (question.critical !== undefined) {
            // M-CHAT: Yes/No
            options = [
                { value: 'yes', label: this.t('yes') || 'Yes' },
                { value: 'no', label: this.t('no') || 'No' }
            ];
            groupLabel = 'Antworten';
        } else if (question.scale) {
            // SRS: Rating
            options = [
                { value: '1', label: this.t('srs.1') || 'Never' },
                { value: '2', label: this.t('srs.2') || 'Sometimes' },
                { value: '3', label: this.t('srs.3') || 'Often' },
                { value: '4', label: this.t('srs.4') || 'Always' }
            ];
            groupLabel = 'Antwortskala';
        }

        if (options.length > 0) {
            optionsHtml = `<fieldset role="radiogroup" aria-label="${groupLabel}" tabindex="0">` +
                options.map(option => `
                    <label class="option" tabindex="0">
                        <input type="radio" name="answer" value="${option.value}" aria-checked="false" aria-label="${option.label}">
                        <span>${option.label}</span>
                    </label>
                `).join('') +
            `</fieldset>`;
        } else if (question.translations) {
            // Info-Frage (z.B. ADOS-2)
            optionsHtml = '';
        }

        container.innerHTML = `
            <div class="question" role="group" aria-labelledby="question-label">
                <h3 id="question-label" tabindex="0">${qText}</h3>
                <div class="question-options" aria-live="polite">
                    ${optionsHtml}
                </div>
            </div>
        `;

        // Reset button states
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) nextBtn.disabled = true;
        this.selectedAnswer = null;

        // Tastatursteuerung und ARIA für Optionen
        if (options.length > 0) {
            const radioInputs = container.querySelectorAll('input[type="radio"][name="answer"]');
            radioInputs.forEach((input, idx) => {
                input.addEventListener('change', (e) => {
                    this.selectedAnswer = input.value;
                    if (nextBtn) nextBtn.disabled = false;
                    // ARIA-checked setzen
                    radioInputs.forEach(r => r.setAttribute('aria-checked', 'false'));
                    input.setAttribute('aria-checked', 'true');
                });
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = radioInputs[idx + 1] || radioInputs[0];
                        next.focus();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = radioInputs[idx - 1] || radioInputs[radioInputs.length - 1];
                        prev.focus();
                    } else if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        input.checked = true;
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            });
        }
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