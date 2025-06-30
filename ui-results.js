import { levelColors } from './data.js';
import { UIEffects } from './ui-effects.js';

export class UIResults {
    constructor() {
        this.effects = new UIEffects();
    }

    displayPyramidVisualization(results) {
        for (let level = 1; level <= 5; level++) {
            const fillElement = document.getElementById(`level-${level}-fill`);
            const percentageElement = document.getElementById(`level-${level}-percentage`);
            const levelElement = document.querySelector(`.pyramid-level[data-level="${level}"]`);
            
            const percentage = results[level].percentage;
            
            levelElement.onmouseenter = () => {
                levelElement.style.transform = 'scale(1.08)';
                levelElement.style.zIndex = '10';
                levelElement.style.animation = 'mario-level-hover 0.5s ease-out';
                this.effects.createFloatingCoin(levelElement);
            };
            
            levelElement.onmouseleave = () => {
                levelElement.style.transform = 'scale(1)';
                levelElement.style.zIndex = '1';
                levelElement.style.animation = 'mario-level-entrance 0.5s ease-out';
            };
            
            setTimeout(() => {
                fillElement.style.width = percentage + '%';
                fillElement.style.backgroundColor = levelColors[level];
                percentageElement.textContent = percentage + '%';
                
                setTimeout(() => {
                    levelElement.style.animation = 'mario-power-up 0.8s ease-in-out';
                    this.effects.showSoundEffect('🪙');
                    this.effects.createSparkleEffect(levelElement);
                }, 200);
            }, level * 400);
        }
        
        setTimeout(() => {
            this.effects.showSoundEffect('🏆');
            this.effects.createFireworksEffect();
        }, 2500);
    }
    
    displayInterpretations(results) {
        const interpretationsContainer = document.getElementById('interpretations');
        interpretationsContainer.innerHTML = '';
        
        const levelNames = {
            1: "Necessidades Fisiológicas",
            2: "Necessidades de Segurança", 
            3: "Necessidades Sociais",
            4: "Necessidades de Estima",
            5: "Necessidades de Autorrealização"
        };
        
        const interpretations = {
            1: {
                high: "Suas necessidades fisiológicas estão bem atendidas! Você tem acesso adequado a alimentação, água, sono e cuidados básicos de saúde.",
                medium: "Suas necessidades fisiológicas estão parcialmente atendidas. Considere melhorar seus hábitos de alimentação, sono ou cuidados com a saúde.",
                low: "Suas necessidades fisiológicas precisam de atenção. É importante priorizar alimentação adequada, sono suficiente e cuidados básicos de saúde."
            },
            2: {
                high: "Você se sente seguro e protegido em seu ambiente. Sua estabilidade emocional e física está bem estabelecida.",
                medium: "Você sente segurança na maioria das situações, mas ainda há áreas que podem ser fortalecidas para maior tranquilidade.",
                low: "Suas necessidades de segurança precisam ser trabalhadas. Busque ambientes mais seguros e construa uma rede de apoio confiável."
            },
            3: {
                high: "Você tem relacionamentos saudáveis e se sente conectado com outras pessoas. Seu senso de pertencimento é forte.",
                medium: "Você tem alguns relacionamentos importantes, mas pode trabalhar para expandir sua rede social e fortalecer conexões.",
                low: "Suas necessidades sociais precisam de atenção. Procure construir relacionamentos mais próximos e encontrar grupos onde se sinta aceito."
            },
            4: {
                high: "Você tem boa autoestima e confiança em si mesmo. Sente-se valorizado e reconhecido por suas conquistas.",
                medium: "Sua autoestima está em desenvolvimento. Continue trabalhando em suas habilidades e buscando reconhecimento merecido.",
                low: "Suas necessidades de estima precisam ser fortalecidas. Trabalhe na construção da autoconfiança e busque atividades que tragam senso de conquista."
            },
            5: {
                high: "Você está em busca constante de crescimento pessoal e autorrealização. Tem clareza sobre seu propósito e potencial.",
                medium: "Você demonstra interesse em crescimento pessoal, mas pode explorar mais atividades criativas e de desenvolvimento.",
                low: "Suas necessidades de autorrealização estão em estágio inicial. Explore seus talentos, seja mais criativo e busque atividades com propósito."
            }
        };
        
        for (let level = 1; level <= 5; level++) {
            const percentage = results[level].percentage;
            let category;
            
            if (percentage >= 75) category = 'high';
            else if (percentage >= 50) category = 'medium';
            else category = 'low';
            
            const interpretationDiv = document.createElement('div');
            interpretationDiv.className = 'level-interpretation';
            interpretationDiv.innerHTML = `
                <h4 style="color: ${levelColors[level]}">${levelNames[level]} (${percentage}%)</h4>
                <p>${interpretations[level][category]}</p>
            `;
            
            interpretationsContainer.appendChild(interpretationDiv);
        }
    }

    showGitHubUploadFeedback(status, message) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `github-feedback ${status}`;
        feedbackDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        if (status === 'success') {
            feedbackDiv.style.background = 'linear-gradient(135deg, #32CD32, #228B22)';
        } else if (status === 'error') {
            feedbackDiv.style.background = 'linear-gradient(135deg, #DC143C, #B22222)';
        } else if (status === 'uploading') {
            feedbackDiv.style.background = 'linear-gradient(135deg, #4169E1, #1E90FF)';
        }
        
        feedbackDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                ${status === 'uploading' ? '⏳' : status === 'success' ? '✅' : '❌'}
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(feedbackDiv);
        
        if (status !== 'uploading') {
            setTimeout(() => {
                feedbackDiv.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => {
                    if (document.body.contains(feedbackDiv)) {
                        document.body.removeChild(feedbackDiv);
                    }
                }, 300);
            }, 3000);
        }
        
        return feedbackDiv;
    }
}