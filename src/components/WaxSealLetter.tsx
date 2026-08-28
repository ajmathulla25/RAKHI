import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { festiveSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface WaxSealLetterProps {
  recipientName: string;
  senderName: string;
  letterContent: string;
}

export const WaxSealLetter: React.FC<WaxSealLetterProps> = ({
  recipientName,
  senderName,
  letterContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setSealCracked(true);
      festiveSynth.playWaxSealCrack();
      setTimeout(() => {
        setIsOpen(true);
        festiveSynth.playFestiveChord();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a51d45', '#e85d83', '#d6a83c', '#ffd700'],
        });
      }, 300);
    } else {
      setIsOpen(false);
      setSealCracked(false);
    }
  };

  return (
    <div className="container my-5" id="letter">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="skeuo-card-parchment p-4 p-md-5 text-center position-relative">
            <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
              <Mail className="w-4 h-4 text-crimson-800" />
              <span>Personal Sibling Epistle</span>
            </div>

            <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
              A Confidential Letter 💌
            </h2>
            <p className="text-muted-crimson max-w-lg mx-auto mb-4">
              {isOpen
                ? 'Your secret letter has been unlocked.'
                : 'Click the crimson wax seal to break the envelope and read the letter.'}
            </p>

            {/* Vintage Skeuomorphic Envelope Container */}
            <div className="d-flex justify-content-center my-4">
              <div
                className={`skeuo-envelope-box ${isOpen ? 'envelope-open' : ''} ${
                  sealCracked ? 'seal-cracking' : ''
                }`}
                onClick={handleOpenLetter}
                role="button"
                tabIndex={0}
                title={isOpen ? 'Click to fold letter back' : 'Break wax seal to open'}
              >
                {/* Envelope Body & Flaps */}
                <div className="envelope-back-sheet" />

                {/* Sliding Handwritten Parchment Letter */}
                <div className={`envelope-parchment-letter ${isOpen ? 'letter-slid-out' : ''}`}>
                  <div className="letter-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <span className="font-serif fw-bold text-crimson-900 fs-5">
                      To My Dearest {recipientName},
                    </span>
                    <span className="font-serif text-muted-crimson small fst-italic">
                      Raksha Bandhan
                    </span>
                  </div>

                  <div className="letter-body-text font-serif text-amber-950 text-start line-relaxed">
                    {letterContent}
                  </div>

                  <div className="letter-footer text-end mt-4 pt-2 border-top">
                    <span className="text-muted-crimson small fst-italic">Forever with love,</span>
                    <div className="font-serif-royal text-crimson-900 fw-bold fs-5">
                      {senderName} ❤️
                    </div>
                  </div>
                </div>

                {/* Envelope Front Flaps */}
                <div className="envelope-front-flaps" />
                <div className="envelope-top-flap" />

                {/* 3D Wax Seal with Emblem */}
                <div className={`skeuo-wax-seal ${sealCracked ? 'cracked' : ''}`}>
                  <span className="seal-emblem">❤️</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={handleOpenLetter}
                className="btn-skeuo-wood d-inline-flex align-items-center gap-2 px-4 py-2"
                id="toggle-letter-btn"
              >
                <span>{isOpen ? 'Close Envelope ✉️' : 'Break Seal & Read Letter 📜'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
