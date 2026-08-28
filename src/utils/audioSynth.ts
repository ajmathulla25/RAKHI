/**
 * Web Audio API festive acoustic chime & flute synthesizer
 * Provides instant soothing Indian classical ambient music without requiring external asset files.
 */

class FestiveAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]; // C major / Raag Bilawal notes
  private noteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChime(freq = 523.25, type: OscillatorType = 'sine', duration = 1.2) {
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Slight pitch vibrato for sitar/flute warmth
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, this.ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  public playFestiveChord() {
    this.initContext();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C-E-G-C
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 'triangle', 1.8);
      }, idx * 120);
    });
  }

  public playPujaBell() {
    this.initContext();
    if (!this.ctx) return;
    [1046.5, 2093.0, 3135.96].forEach((f) => {
      this.playChime(f, 'sine', 2.5);
    });
  }

  public playWaxSealCrack() {
    this.initContext();
    if (!this.ctx) return;
    try {
      // White noise burst for wax seal break
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch {
      // fallback
    }
  }

  public toggleAmbientMelody(onStatusChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isPlaying) {
      if (this.timerId) clearInterval(this.timerId);
      this.isPlaying = false;
      if (onStatusChange) onStatusChange(false);
      return false;
    } else {
      this.isPlaying = true;
      if (onStatusChange) onStatusChange(true);

      const playMelodyStep = () => {
        const raagSequence = [0, 2, 4, 3, 5, 4, 2, 1, 0, 4, 5, 7, 5, 4, 2, 0];
        const note = this.scale[raagSequence[this.noteIndex % raagSequence.length] % this.scale.length];
        this.playChime(note, 'triangle', 1.4);

        // Tanpura drone on root note every 4 beats
        if (this.noteIndex % 4 === 0) {
          this.playChime(130.81, 'sine', 3.0); // low C drone
        }

        this.noteIndex++;
      };

      playMelodyStep();
      this.timerId = setInterval(playMelodyStep, 650);
      return true;
    }
  }

  public stop() {
    if (this.timerId) clearInterval(this.timerId);
    this.isPlaying = false;
  }
}

export const festiveSynth = new FestiveAudioSynth();
