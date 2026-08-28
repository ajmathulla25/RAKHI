import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { festiveSynth } from '../utils/audioSynth';
import { RakhiType } from '../types';

interface SkeuoRakhiProps {
  recipientName: string;
  senderName: string;
  rakhiType?: RakhiType;
  onTieSuccess?: () => void;
}

export const SkeuoRakhi: React.FC<SkeuoRakhiProps> = ({
  recipientName,
  senderName,
  rakhiType = 'royal-kundan',
  onTieSuccess,
}) => {
  const [isTied, setIsTied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTieRakhi = () => {
    setIsTied(true);
    festiveSynth.playFestiveChord();

    // Trigger golden celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a51d45', '#e85d83', '#d6a83c', '#ffd700', '#ffffff'],
    });

    if (onTieSuccess) onTieSuccess();
  };

  return (
    <div className="text-center my-4 position-relative">
      {/* 3D Skeuomorphic Rakhi Stage */}
      <div 
        className="d-inline-flex flex-column align-items-center justify-content-center position-relative py-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Silk Threads (Left and Right braided cords with golden tassels) */}
        <div className="rakhi-stage-wrapper position-relative d-flex align-items-center justify-content-center">
          {/* Left Silk Thread */}
          <div className="silk-thread-left" />

          {/* Center Medallion (Skeuomorphic Masterpiece) */}
          <div 
            onClick={handleTieRakhi}
            className={`skeuo-rakhi-medallion ${rakhiType} ${isTied ? 'tied' : ''} ${isHovered ? 'hovered' : ''}`}
            title="Click to perform the Sacred Rakhi Tying Ceremony"
            role="button"
            tabIndex={0}
          >
            {/* Outer Golden Scalloped Bezel */}
            <div className="rakhi-outer-gold-ring">
              {/* Pearl & Ruby Studded Border */}
              <div className="rakhi-bead-circle">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="rakhi-ruby-gem"
                    style={{ transform: `rotate(${i * 30}deg) translateY(-54px)` }}
                  />
                ))}
              </div>

              {/* Inner Crimson Velvet Disc with Golden Sunburst */}
              <div className="rakhi-inner-velvet">
                <div className="rakhi-gold-filigree" />
                <div className="rakhi-center-emblem">
                  {rakhiType === 'sacred-rudraksha' ? 'ॐ' : rakhiType === 'floral-peacock' ? '🦚' : '卐'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Silk Thread */}
          <div className="silk-thread-right" />
        </div>

        {/* Tactile Ceremony Call-To-Action */}
        <div className="mt-4">
          {!isTied ? (
            <button
              onClick={handleTieRakhi}
              className="btn-skeuo-gold d-inline-flex align-items-center gap-2 px-4 py-2"
              id="tie-rakhi-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>Tie Rakhi on {recipientName}&apos;s Wrist ✨</span>
            </button>
          ) : (
            <div className="skeuo-blessing-badge d-inline-flex align-items-center gap-2 px-4 py-2 animate-bounce-short">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span className="font-semibold text-crimson-900">
                Rakhi Tied with Love by {senderName} ❤️
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
