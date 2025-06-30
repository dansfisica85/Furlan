export const questions = [
    // Necessidades Fisiológicas (1-6)
    { level: 1, text: "Eu me alimento bem e regularmente." },
    { level: 1, text: "Eu tenho um local seguro e confortável para dormir." },
    { level: 1, text: "Eu consigo descansar o suficiente." },
    { level: 1, text: "Eu me sinto saudável na maior parte do tempo." },
    { level: 1, text: "Eu bebo água em quantidade suficiente." },
    { level: 1, text: "Eu tenho acesso fácil a um banheiro quando preciso." },
    
    // Necessidades de Segurança (7-12)
    { level: 2, text: "Eu me sinto seguro(a) em casa." },
    { level: 2, text: "Eu me sinto seguro(a) na escola/universidade." },
    { level: 2, text: "Eu me preocupo com minha saúde e bem-estar físico." },
    { level: 2, text: "Eu me sinto seguro(a) em relação ao meu futuro financeiro." },
    { level: 2, text: "Eu sinto que sou protegido(a) de perigos ou ameaças." },
    { level: 2, text: "Minha família me proporciona um ambiente estável." },
    
    // Necessidades Sociais (13-18)
    { level: 3, text: "Eu me sinto amado(a) e valorizado(a) pela minha família." },
    { level: 3, text: "Eu tenho amigos com quem posso contar." },
    { level: 3, text: "Eu me sinto parte de um grupo ou comunidade." },
    { level: 3, text: "Eu consigo expressar meus sentimentos para pessoas próximas." },
    { level: 3, text: "Eu me sinto confortável em fazer novas amizades." },
    { level: 3, text: "Eu sinto que sou aceito(a) como sou pelos meus colegas." },
    
    // Necessidades de Estima (19-24)
    { level: 4, text: "Eu me sinto confiante em minhas habilidades." },
    { level: 4, text: "Eu me sinto respeitado(a) pelos meus professores/colegas." },
    { level: 4, text: "Eu recebo reconhecimento pelos meus esforços." },
    { level: 4, text: "Eu me sinto capaz de alcançar meus objetivos." },
    { level: 4, text: "Eu tenho orgulho das minhas conquistas." },
    { level: 4, text: "Eu me sinto valorizado(a) por quem eu sou." },
    
    // Necessidades de Autorrealização (25-30)
    { level: 5, text: "Eu me sinto motivado(a) a aprender coisas novas." },
    { level: 5, text: "Eu busco desenvolver meu potencial ao máximo." },
    { level: 5, text: "Eu me sinto criativo(a) e gosto de expressar minhas ideias." },
    { level: 5, text: "Eu encontro significado e propósito no que faço." },
    { level: 5, text: "Eu me sinto em busca de crescimento pessoal contínuo." },
    { level: 5, text: "Eu me dedico a atividades que me trazem satisfação profunda." }
];

export const levelNames = {
    1: "Necessidades Fisiológicas",
    2: "Necessidades de Segurança", 
    3: "Necessidades Sociais",
    4: "Necessidades de Estima",
    5: "Necessidades de Autorrealização"
};

export const levelColors = {
    1: "#8B0000",
    2: "#FF4500", 
    3: "#FFD700",
    4: "#32CD32",
    5: "#4169E1"
};

export const interpretations = {
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