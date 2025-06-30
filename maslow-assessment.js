// Maslow Assessment Game
import { questions, levelNames, levelColors, interpretations } from './data.js';
import * as audio from './audio.js';
import { UIManager } from './ui.js';

class MaslowAssessment {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.results = {};
        this.isTransitioning = false;
        this.score = 0; // Mario-style scoring system
        
        // Data from external module
        this.questions = questions;
        this.levelNames = levelNames;
        this.levelColors = levelColors;
        this.interpretations = interpretations;
        
        this.ui = new UIManager();
        
        /* @tweakable GitHub repository owner/username */
        this.githubOwner = 'your-username';
        
        /* @tweakable GitHub repository name */
        this.githubRepo = 'maslow-results';
        
        /* @tweakable GitHub personal access token (should be set in environment) */
        this.githubToken = 'your-github-token';
        
        this.setupEventListeners();
        this.initializeMarioEffects();
    }
    
    initializeMarioEffects() {
        // Add Mario-style background elements
        this.createFloatingElements();
        
        // Add coin collection sound when radio buttons are selected
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name === 'answer') {
                audio.playCoinSound();
                this.score += parseInt(e.target.value) * 10;
                this.ui.createPowerUpEffect(e.target.closest('.answer-option'));
                this.updateScoreDisplay();
            }
        });
    }
    
    createFloatingElements() {
        // Create floating coins and power-ups in background
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.createFloatingCoin();
            }
        }, 2000);
        
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval
                this.createFloatingPowerUp();
            }
        }, 3000);
    }
    
    createFloatingCoin() {
        const coin = document.createElement('div');
        coin.textContent = '🪙';
        coin.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            font-size: 2rem;
            z-index: -1;
            animation: mario-coin-fall 5s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(coin);
        
        setTimeout(() => {
            if (document.body.contains(coin)) {
                document.body.removeChild(coin);
            }
        }, 5000);
    }
    
    createFloatingPowerUp() {
        const powerUp = document.createElement('div');
        const powerUps = ['🍄', '🌟', '🔥', '❄️'];
        powerUp.textContent = powerUps[Math.floor(Math.random() * powerUps.length)];
        powerUp.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh;
            left: -50px;
            font-size: 2rem;
            z-index: -1;
            animation: mario-powerup-float 8s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(powerUp);
        
        setTimeout(() => {
            if (document.body.contains(powerUp)) {
                document.body.removeChild(powerUp);
            }
        }, 8000);
    }
    
    updateScoreDisplay() {
        // Update score display in header
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${this.score}`;
            scoreDisplay.style.animation = 'mario-score-bounce 0.3s ease-out';
        }
    }
    
    setupEventListeners() {
        const elements = this.ui.getElements();
        elements.startButton.addEventListener('click', () => this.startAssessment());
        elements.prevButton.addEventListener('click', () => this.previousQuestion());
        elements.nextButton.addEventListener('click', () => this.nextQuestion());
        elements.restartButton.addEventListener('click', () => this.restartAssessment());
        elements.shareButton.addEventListener('click', () => this.shareResults());
        
        elements.radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.ui.updateNextButtonState(this.currentQuestionIndex, this.questions.length);
                
                // Mario-style button activation
                const nextBtn = elements.nextButton;
                if (!nextBtn.disabled) {
                    nextBtn.style.animation = 'mario-btn-power 0.5s ease-out';
                    nextBtn.style.background = 'linear-gradient(135deg, #00D800, #32CD32)';
                }
            });
        });
    }
    
    startAssessment() {
        this.score = 0;
        this.ui.showSection('question-section');
        this.displayQuestion(0);
        audio.playTransitionSound();
        
        // Add Mario-style start celebration
        this.ui.showSoundEffect('🎮');
        this.createStartCelebration();
    }
    
    createStartCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; animation: mario-start-celebration 2s ease-out forwards; pointer-events: none;">
                <div style="font-size: 4rem; text-align: center; color: #FFD700; text-shadow: 3px 3px 0px #000;">
                    🎮 START! 🎮
                </div>
                <div style="font-size: 2rem; text-align: center; color: #FFF; text-shadow: 2px 2px 0px #000; margin-top: 1rem;">
                    Let's-a-go!
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (document.body.contains(celebration)) {
                document.body.removeChild(celebration);
            }
        }, 2000);
    }
    
    displayQuestion(index) {
        if (this.isTransitioning) return;
        
        this.currentQuestionIndex = index;
        const question = this.questions[index];
        const previousQuestion = this.questions[index - 1];
        
        const isNewLevel = !previousQuestion || previousQuestion.level !== question.level;
        
        if (isNewLevel && index > 0) {
            this.isTransitioning = true;
            this.ui.showLevelTransition(question.level, () => {
                this.isTransitioning = false;
                this.ui.updateQuestionDisplay(index, this.questions, this.answers[index]);
                
                // Mario-style level bonus
                this.score += 50;
                this.updateScoreDisplay();
            });
        } else {
            this.ui.updateQuestionDisplay(index, this.questions, this.answers[index]);
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.saveCurrentAnswer();
            this.displayQuestion(this.currentQuestionIndex - 1);
            audio.playTransitionSound();
        }
    }
    
    nextQuestion() {
        if (!this.saveCurrentAnswer()) return;
        
        // Mario-style question completion celebration
        this.ui.showSoundEffect('✅');
        audio.playCoinSound();
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.displayQuestion(this.currentQuestionIndex + 1);
            audio.playTransitionSound();
        } else {
            this.calculateResults();
            this.showResults();
            this.createFinalCelebration();
        }
    }
    
    createFinalCelebration() {
        // Mario-style game completion celebration
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                audio.playFireworkSound();
                this.ui.createFireworksEffect();
            }, i * 200);
        }
        
        // Final score bonus
        this.score += 200;
        this.updateScoreDisplay();
        
        // Victory fanfare
        setTimeout(() => {
            this.ui.showSoundEffect('🏆');
        }, 1000);
    }
    
    saveCurrentAnswer() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            this.answers[this.currentQuestionIndex] = parseInt(selectedAnswer.value);
            return true;
        }
        return false;
    }
    
    calculateResults() {
        const levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        
        this.questions.forEach((question, index) => {
            const answer = this.answers[index] || 1;
            levelScores[question.level] += answer;
            levelCounts[question.level]++;
        });
        
        this.results = {};
        for (let level = 1; level <= 5; level++) {
            const maxScore = levelCounts[level] * 5;
            const percentage = Math.round((levelScores[level] / maxScore) * 100);
            this.results[level] = {
                score: levelScores[level],
                maxScore: maxScore,
                percentage: percentage
            };
        }
    }
    
    showResults() {
        this.ui.showSection('results-section');
        this.ui.displayPyramidVisualization(this.results);
        this.ui.displayInterpretations(this.results);
        audio.playTransitionSound();
        
        // Add final score display
        const resultsContainer = document.querySelector('.results-container');
        const scoreDisplay = document.createElement('div');
        scoreDisplay.style.cssText = `
            text-align: center;
            font-size: 2rem;
            color: #FFD700;
            text-shadow: 3px 3px 0px #000;
            margin: 2rem 0;
            animation: mario-final-score 2s ease-out;
        `;
        scoreDisplay.innerHTML = `🏆 FINAL SCORE: ${this.score} 🏆`;
        resultsContainer.prepend(scoreDisplay);
    }
    
    restartAssessment() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.results = {};
        this.score = 0;
        this.ui.showSection('intro-section');
        this.ui.resetResults();
        audio.playTransitionSound();
        
        // Mario-style restart effect
        this.ui.showSoundEffect('🔄');
    }
    
    async shareResults() {
        const text = `Acabei de descobrir minha Pirâmide de Maslow! 
Fisiológicas: ${this.results[1].percentage}%
Segurança: ${this.results[2].percentage}%
Sociais: ${this.results[3].percentage}%
Estima: ${this.results[4].percentage}%
Autorrealização: ${this.results[5].percentage}%

Faça sua avaliação também!`;
        
        try {
            // Try to send to GitHub repository first
            await this.sendToGitHub();
            
            if (navigator.share) {
                navigator.share({
                    title: 'Minha Pirâmide de Maslow',
                    text: text
                });
            } else {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Resultados enviados para o repositório e copiados para a área de transferência!');
                });
            }
        } catch (error) {
            console.error('Erro ao enviar para o GitHub:', error);
            
            // Fallback to normal sharing
            if (navigator.share) {
                navigator.share({
                    title: 'Minha Pirâmide de Maslow',
                    text: text
                });
            } else {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Resultados copiados para a área de transferência!');
                });
            }
        }
    }
    
    async sendToGitHub() {
        const timestamp = new Date().toISOString();
        const fileName = `maslow-result-${timestamp.replace(/[:.]/g, '-')}.json`;
        
        const resultData = {
            timestamp: timestamp,
            results: this.results,
            answers: this.answers,
            questions: this.questions.map((q, index) => ({
                level: q.level,
                text: q.text,
                answer: this.answers[index] || 0
            })),
            summary: {
                fisiologicas: this.results[1].percentage,
                seguranca: this.results[2].percentage,
                sociais: this.results[3].percentage,
                estima: this.results[4].percentage,
                autorrealizacao: this.results[5].percentage
            }
        };
        
        const content = btoa(JSON.stringify(resultData, null, 2));
        
        const response = await fetch(`https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/contents/results/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${this.githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Adicionar resultado da avaliação de Maslow - ${timestamp}`,
                content: content,
                branch: 'main'
            })
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('Resultado enviado para o GitHub:', result.content.html_url);
        
        return result;
    }
}

// Add Mario-style CSS animations
if (!document.getElementById('mario-game-animations')) {
    const style = document.createElement('style');
    style.id = 'mario-game-animations';
    style.textContent = `
        @keyframes mario-coin-fall {
            0% { transform: translateY(-50px) rotateY(0deg); }
            100% { transform: translateY(100vh) rotateY(360deg); }
        }
        @keyframes mario-powerup-float {
            0% { transform: translateX(-50px) translateY(0); }
            50% { transform: translateX(50vw) translateY(-20px); }
            100% { transform: translateX(100vw) translateY(0); }
        }
        @keyframes mario-start-celebration {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes mario-score-bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        @keyframes mario-final-score {
            0% { transform: translateY(50px) scale(0); opacity: 0; }
            50% { transform: translateY(0) scale(1.2); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the assessment when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MaslowAssessment();
});