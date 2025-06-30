export function playTransitionSound() {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Mario-style jump sound
    oscillator.frequency.value = 523; // C5
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

export function playLevelUpSound() {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);
    gainNode.connect(audioContext.destination);

    // Mario-style power-up sound sequence
    const notes = [659, 784, 1047, 1319, 1568]; // E, G, C, E, G
    notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        oscillator.start(audioContext.currentTime + i * 0.12);
        oscillator.stop(audioContext.currentTime + i * 0.12 + 0.1);
    });
}

export function playCoinSound() {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Mario-style coin collection sound
    oscillator.frequency.value = 988; // B5
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

export function playFireworkSound() {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
    gainNode.connect(audioContext.destination);
    
    // Mario-style firework sound
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.8);
    oscillator.connect(gainNode);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
}