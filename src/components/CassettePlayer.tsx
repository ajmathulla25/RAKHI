import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Upload, Play, Pause, Radio } from 'lucide-react';
import { festiveSynth } from '../utils/audioSynth';

interface CassettePlayerProps {
  onToast: (msg: string) => void;
}

export const CassettePlayer: React.FC<CassettePlayerProps> = ({ onToast }) => {
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [isPlayingCustom, setIsPlayingCustom] = useState(false);
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleSynthMusic = () => {
    if (isPlayingCustom && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingCustom(false);
    }

    const state = festiveSynth.toggleAmbientMelody((playing) => {
      setIsPlayingSynth(playing);
    });

    if (state) {
      onToast('🎵 Playing festive Sitar & Chimes acoustic melody');
    } else {
      onToast('Audio paused');
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isPlayingSynth) {
      festiveSynth.stop();
      setIsPlayingSynth(false);
    }

    const fileUrl = URL.createObjectURL(file);
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = fileUrl;
    audioRef.current.loop = true;
    audioRef.current.play().then(() => {
      setIsPlayingCustom(true);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      onToast(`🎵 Playing custom track: ${file.name}`);
    }).catch(() => {
      onToast('Click play to start custom music');
    });
  };

  const handleToggleCustomMusic = () => {
    if (!audioRef.current || !audioRef.current.src) {
      onToast('Upload an audio file or play the built-in festive acoustic tune! 🎵');
      return;
    }

    if (audioRef.current.paused) {
      if (isPlayingSynth) {
        festiveSynth.stop();
        setIsPlayingSynth(false);
      }
      audioRef.current.play();
      setIsPlayingCustom(true);
      onToast('Playing custom song 🎵');
    } else {
      audioRef.current.pause();
      setIsPlayingCustom(false);
      onToast('Music paused');
    }
  };

  const isAnyPlaying = isPlayingSynth || isPlayingCustom;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Skeuomorphic Wooden Cassette Player */}
          <div className="skeuo-wood-deck p-4 p-md-5 position-relative">
            {/* Top Deck Brand Plaque */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <Radio className="w-5 h-5 text-amber-800" />
                <span className="font-serif-royal fw-bold text-amber-950 fs-5 letter-spacing-wide">
                  RAKHI HARMONY • STEREO 2026
                </span>
              </div>
              <div className="skeuo-led-light-green" title="Power On" />
            </div>

            {/* Cassette Tape Bay */}
            <div className="skeuo-cassette-bay p-3 mb-4 d-flex align-items-center justify-content-between">
              {/* Left Spool */}
              <div className={`cassette-spool ${isAnyPlaying ? 'spinning' : ''}`}>
                <div className="spool-teeth" />
              </div>

              {/* Center Tape Window & Label */}
              <div className="cassette-label-plate text-center px-3 py-2 flex-grow-1 mx-3">
                <span className="badge bg-danger-subtle text-danger mb-1 font-monospace">
                  SIDE A • 90 MIN
                </span>
                <div className="fw-bold font-serif text-amber-950 text-truncate fs-6">
                  {customTrackName || 'Festive Sitar & Shehnai Raga ✨'}
                </div>
                <div className="small text-muted-crimson font-serif fst-italic">
                  {isPlayingSynth
                    ? 'Synthesizing Live Acoustic Melodies'
                    : isPlayingCustom
                    ? 'Playing Custom Track'
                    : 'Deck Ready • Press Play'}
                </div>
              </div>

              {/* Right Spool */}
              <div className={`cassette-spool ${isAnyPlaying ? 'spinning' : ''}`}>
                <div className="spool-teeth" />
              </div>
            </div>

            {/* VU Meter & Equalizer */}
            <div className="skeuo-vu-meter-panel p-2 mb-4 d-flex align-items-center justify-content-center gap-1">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`vu-meter-bar ${isAnyPlaying ? 'active' : ''}`}
                  style={{
                    animationDelay: `${(idx % 5) * 0.12}s`,
                    height: isAnyPlaying ? `${Math.sin(idx) * 16 + 20}px` : '4px',
                  }}
                />
              ))}
            </div>

            {/* Chrome Tactile Push Buttons */}
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
              {/* Play / Pause Built-in Sitar */}
              <button
                onClick={handleToggleSynthMusic}
                className={`btn-skeuo-chrome d-inline-flex align-items-center gap-2 ${
                  isPlayingSynth ? 'active-pressed' : ''
                }`}
                id="toggle-synth-audio-btn"
              >
                {isPlayingSynth ? (
                  <>
                    <Pause className="w-4 h-4 text-danger" />
                    <span>Pause Raga</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-amber-900" />
                    <span>Play Festive Raga 🪕</span>
                  </>
                )}
              </button>

              {/* Upload Custom Audio */}
              <label className="btn-skeuo-chrome d-inline-flex align-items-center gap-2 cursor-pointer mb-0">
                <input
                  type="file"
                  accept="audio/*"
                  className="d-none"
                  onChange={handleCustomAudioUpload}
                />
                <Upload className="w-4 h-4 text-amber-900" />
                <span>Upload Sibling Song 🎵</span>
              </label>

              {/* Custom Track Playback if loaded */}
              {customTrackName && (
                <button
                  onClick={handleToggleCustomMusic}
                  className={`btn-skeuo-chrome d-inline-flex align-items-center gap-2 ${
                    isPlayingCustom ? 'active-pressed' : ''
                  }`}
                >
                  {isPlayingCustom ? (
                    <>
                      <Pause className="w-4 h-4 text-danger" />
                      <span>Pause Custom</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-amber-900" />
                      <span>Play Custom</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
