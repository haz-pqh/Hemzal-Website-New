// Pre-load custom audio instance for minimal latency
const crunchAudio = typeof window !== 'undefined' ? new Audio('/0830.mp3') : null;

export function playCrunchSound() {
  if (!crunchAudio) return;

  try {
    // Cloning allows overlapping sound triggers on rapid clicks
    const sound = crunchAudio.cloneNode() as HTMLAudioElement;
    sound.volume = 0.6;
    sound.play().catch(() => {
      // Browser autoplay policy suppression fallback
    });
  } catch {
    // Ignore runtime audio errors
  }
}

export function playPopSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore audio context errors
  }
}
