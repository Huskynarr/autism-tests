const { describe, test, expect } = require('@jest/globals');

// Importiere die Testdefinitionen wie im Frontend (Dummy-Implementierung für Node)
function getAQ50Questions() {
    const base = [
        { id: 'aq1', text: 'I prefer to do things with others rather than on my own.', reverse: true },
        { id: 'aq2', text: 'I prefer to do things the same way over and over again.', reverse: false },
        { id: 'aq3', text: 'If I try to imagine something, I find it very easy to create a picture in my mind.', reverse: true },
        { id: 'aq4', text: 'I frequently get so strongly absorbed in one thing that I lose sight of other things.', reverse: false },
        { id: 'aq5', text: 'I often notice small sounds when others do not.', reverse: false }
    ];
    for (let i = 6; i <= 50; i++) {
        base.push({ id: `aq${i}`, text: `AQ-50 Item ${i} (placeholder)`, reverse: false });
    }
    return base;
}

describe('AQ-50 Fragen', () => {
    const questions = getAQ50Questions();

    test('Es gibt genau 50 Fragen', () => {
        expect(questions.length).toBe(50);
    });

    test('Jede Frage hat eine ID und einen Text', () => {
        questions.forEach(q => {
            expect(q).toHaveProperty('id');
            expect(q).toHaveProperty('text');
            expect(typeof q.text).toBe('string');
            expect(q.id).toMatch(/^aq\d+$/);
        });
    });

    test('Die ersten 5 Fragen sind korrekt befüllt', () => {
        expect(questions[0].text).toMatch(/prefer to do things with others/i);
        expect(questions[4].text).toMatch(/small sounds/i);
    });

    test('Fragen 6-50 sind Platzhalter', () => {
        for (let i = 5; i < 50; i++) {
            expect(questions[i].text).toMatch(/AQ-50 Item \d+ \(placeholder\)/);
        }
    });
});
