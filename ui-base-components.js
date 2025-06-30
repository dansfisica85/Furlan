import { levelNames, levelColors } from './data.js';

export class UIComponents {
    constructor() {
        this.initializeElements();
    }

    initializeElements() {
        // Sections
        this.introSection = document.getElementById('intro-section');
        this.questionSection = document.getElementById('question-section');
        this.resultsSection = document.getElementById('results-section');
        
        // Buttons
        this.startButton = document.getElementById('start-game');
        this.prevButton = document.getElementById('prev-question');
        this.nextButton = document.getElementById('next-question');
        this.restartButton = document.getElementById('restart-game');
        this.shareButton = document.getElementById('share-results');
        
        // Question elements
        this.questionText = document.getElementById('question-text');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.currentLevelName = document.getElementById('current-level-name');
        this.levelColorBar = document.getElementById('level-color-bar');
        this.progressFill = document.getElementById('progress-fill');
        this.radioButtons = document.querySelectorAll('input[name="answer"]');
        
        // Results elements
        this.interpretationsContainer = document.getElementById('interpretations');
    }

    getElements() {
        return {
            startButton: this.startButton,
            prevButton: this.prevButton,
            nextButton: this.nextButton,
            restartButton: this.restartButton,
            shareButton: this.shareButton,
            radioButtons: this.radioButtons,
        };
    }

    showSection(sectionId) {
        const currentSection = document.querySelector('.game-section.active');
        const newSection = document.getElementById(sectionId);
        
        if (currentSection) {
            currentSection.classList.add('slide-out-left');
            setTimeout(() => {
                currentSection.classList.remove('active', 'slide-out-left');
            }, 300);
        }
        
        setTimeout(() => {
            newSection.classList.add('slide-in-right');
            newSection.classList.add('active');
            setTimeout(() => {
                newSection.classList.remove('slide-in-right');
            }, 50);
        }, 300);
    }

    updateQuestionDisplay(index, questions, previousAnswerValue) {
        const question = questions[index];
        
        // Question entrance animation
        this.questionText.style.transform = 'translateY(20px) scale(0.8)';
        this.questionText.style.opacity = '0';
        
        setTimeout(() => {
            this.questionText.textContent = question.text;
            this.questionText.style.transform = 'translateY(0) scale(1)';
            this.questionText.style.opacity = '1';
        }, 200);
        
        this.currentQuestionSpan.textContent = index + 1;
        const progress = ((index + 1) / questions.length) * 100;
        this.progressFill.style.width = progress + '%';
        
        this.currentLevelName.textContent = levelNames[question.level];
        this.levelColorBar.style.backgroundColor = levelColors[question.level];
        
        // Answer options animation
        this.radioButtons.forEach((radio, i) => {
            radio.checked = false;
            const option = radio.closest('.answer-option');
            option.style.transform = 'translateX(-50px) scale(0.8)';
            option.style.opacity = '0';
            
            setTimeout(() => {
                option.style.transform = 'translateX(0) scale(1)';
                option.style.opacity = '1';
            }, 150 + (i * 100));
        });
        
        if (previousAnswerValue) {
            setTimeout(() => {
                const radio = document.querySelector(`input[name="answer"][value="${previousAnswerValue}"]`);
                if (radio) {
                    radio.checked = true;
                }
                this.updateNextButtonState(index, questions.length);
            }, 600);
        }
        
        this.prevButton.disabled = index === 0;
        this.updateNextButtonState(index, questions.length);
    }

    updateNextButtonState(currentIndex, totalQuestions) {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        this.nextButton.disabled = !selectedAnswer;
        
        if (selectedAnswer) {
            this.nextButton.style.animation = 'mario-btn-power 0.5s ease-out';
        }
        
        if (currentIndex === totalQuestions - 1 && selectedAnswer) {
            this.nextButton.textContent = 'Ver Resultados ';
            this.nextButton.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        } else {
            this.nextButton.textContent = 'Prxima ';
        }
    }

    resetResults() {
        for (let level = 1; level <= 5; level++) {
            const fillElement = document.getElementById(`level-${level}-fill`);
            const percentageElement = document.getElementById(`level-${level}-percentage`);
            if(fillElement) fillElement.style.width = '0%';
            if(percentageElement) percentageElement.textContent = '0%';
        }
        if(this.interpretationsContainer) this.interpretationsContainer.innerHTML = '';
    }
}