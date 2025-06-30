import { UIComponents } from './ui-base-components.js';
import { UIEffects } from './ui-effects.js';
import { UIResults } from './ui-results.js';

export class UIManager {
    constructor() {
        this.components = new UIComponents();
        this.effects = new UIEffects();
        this.results = new UIResults();
        
        /* @tweakable GitHub integration UI feedback messages */
        this.githubMessages = {
            success: 'Resultados enviados para o repositório GitHub com sucesso!',
            error: 'Erro ao enviar para o GitHub. Usando compartilhamento padrão.',
            uploading: 'Enviando resultados para o repositório...'
        };
    }

    getElements() {
        return this.components.getElements();
    }

    showSection(sectionId) {
        this.components.showSection(sectionId);
        this.effects.showSoundEffect(this.effects.soundEffects.jump);
    }
    
    updateQuestionDisplay(index, questions, previousAnswerValue) {
        this.components.updateQuestionDisplay(index, questions, previousAnswerValue);
        
        // Add Mario-style progress celebration
        const progress = ((index + 1) / questions.length) * 100;
        if (progress % 20 === 0) {
            this.effects.showSoundEffect(this.effects.soundEffects.powerUp);
        }
        
        // Add coin collection sound effect after answer options animation
        setTimeout(() => {
            this.effects.showSoundEffect(this.effects.soundEffects.coin);
        }, 150 + (this.components.radioButtons.length * 100));
        
        if (previousAnswerValue) {
            setTimeout(() => {
                const radio = document.querySelector(`input[name="answer"][value="${previousAnswerValue}"]`);
                if (radio) {
                    this.effects.createPowerUpEffect(radio.closest('.answer-option'));
                }
            }, 600);
        }
    }

    updateNextButtonState(currentIndex, totalQuestions) {
        this.components.updateNextButtonState(currentIndex, totalQuestions);
    }

    showLevelTransition(newLevel, callback) {
        this.effects.showLevelTransition(newLevel, callback);
    }

    displayPyramidVisualization(results) {
        this.results.displayPyramidVisualization(results);
    }
    
    displayInterpretations(results) {
        this.results.displayInterpretations(results);
    }
    
    resetResults() {
        this.components.resetResults();
    }
    
    showGitHubUploadFeedback(status, message) {
        return this.results.showGitHubUploadFeedback(status, message);
    }
}