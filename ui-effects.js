import { levelColors } from './data.js';

export class UIEffects {
    constructor() {
        this.soundEffects = {
            coin: '🪙',
            powerUp: '🍄',
            jump: '⭐',
            complete: '🏆'
        };
    }

    showSoundEffect(emoji) {
        const soundEffect = document.createElement('div');
        soundEffect.textContent = emoji;
        soundEffect.className = 'mario-sound-effect';
        
        document.body.appendChild(soundEffect);
        
        setTimeout(() => {
            if (document.body.contains(soundEffect)) {
                document.body.removeChild(soundEffect);
            }
        }, 1000);
    }

    createPowerUpEffect(element) {
        const powerUp = document.createElement('div');
        powerUp.textContent = '🍄';
        powerUp.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            z-index: 1000;
            animation: mario-power-up-float 1s ease-out forwards;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(powerUp);
        
        setTimeout(() => {
            if (element.contains(powerUp)) {
                element.removeChild(powerUp);
            }
        }, 1000);
    }

    createFloatingCoin(element) {
        const coin = document.createElement('div');
        coin.textContent = '🪙';
        coin.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            font-size: 1.5rem;
            z-index: 1001;
            animation: mario-coin-float 2s ease-out forwards;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(coin);
        
        setTimeout(() => {
            if (element.contains(coin)) {
                element.removeChild(coin);
            }
        }, 2000);
    }

    createSparkleEffect(element) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    top: ${Math.random() * 40 - 20}px;
                    left: ${Math.random() * 200 - 100}px;
                    font-size: 1.2rem;
                    z-index: 1002;
                    animation: mario-sparkle-burst 1s ease-out forwards;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.appendChild(sparkle);
                
                setTimeout(() => {
                    if (element.contains(sparkle)) {
                        element.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 200);
        }
    }

    createFireworksEffect() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.textContent = '🎆';
                firework.style.cssText = `
                    position: fixed;
                    top: ${Math.random() * 50 + 20}%;
                    left: ${Math.random() * 80 + 10}%;
                    font-size: 3rem;
                    z-index: 1003;
                    animation: mario-firework-burst 2s ease-out forwards;
                    pointer-events: none;
                `;
                
                document.body.appendChild(firework);
                
                setTimeout(() => {
                    if (document.body.contains(firework)) {
                        document.body.removeChild(firework);
                    }
                }, 2000);
            }, i * 400);
        }
    }

    showLevelTransition(newLevel, callback) {
        const questionContainer = document.querySelector('.question-container');
        questionContainer.classList.add('question-transition');
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, ${levelColors[newLevel]}, ${this.adjustColor(levelColors[newLevel], -30)});
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 1000; animation: mario-level-entrance 0.6s ease-out; color: white;
            text-shadow: 3px 3px 0px #000; font-family: 'Courier New', monospace;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center; transform: scale(0); animation: mario-level-popup 0.8s 0.3s ease-out forwards;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎮</div>
                <h2 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: bold; animation: mario-title-glow 1s infinite ease-in-out;">NÍVEL ${newLevel}</h2>
                <h3 style="font-size: 2rem; margin-bottom: 2rem; animation: mario-subtitle-bounce 1s infinite ease-in-out;">${this.getLevelName(newLevel)}</h3>
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
                    <span style="font-size: 2rem; animation: mario-coin-spin 1s infinite linear;">🪙</span>
                    <div style="width: 250px; height: 25px; background: rgba(0,0,0,0.3); border: 3px solid #000; position: relative; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #FFD700, #FFA500); width: 0%; animation: mario-level-fill 1.5s 0.8s ease-out forwards; position: relative;">
                            <div style="position: absolute; top: 0; right: 0; width: 30px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8)); animation: mario-shine-sweep 1.5s 0.8s ease-out;"></div>
                        </div>
                    </div>
                    <span style="font-size: 2rem; animation: mario-star-twinkle 1s infinite ease-in-out;">⭐</span>
                </div>
                <div style="font-size: 1.5rem; font-weight: bold;">LEVEL UP! 🎉</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.showSoundEffect('🍄');
        
        setTimeout(() => {
            overlay.style.animation = 'fadeOut 0.6s ease-in-out forwards';
            setTimeout(() => {
                document.body.removeChild(overlay);
                questionContainer.classList.remove('question-transition');
                callback();
            }, 600);
        }, 3000);
    }

    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, c => ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2));
    }

    getLevelName(level) {
        const names = {
            1: "Necessidades Fisiológicas",
            2: "Necessidades de Segurança", 
            3: "Necessidades Sociais",
            4: "Necessidades de Estima",
            5: "Necessidades de Autorrealização"
        };
        return names[level];
    }
}