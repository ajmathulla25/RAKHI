import React, { useState } from 'react';
import { Sparkles, Bell, Flame, Cookie, Award } from 'lucide-react';
import { festiveSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface PujaThaliProps {
  recipientName: string;
  senderName: string;
}

export const PujaThali: React.FC<PujaThaliProps> = ({ recipientName, senderName }) => {
  const [diyaLit, setDiyaLit] = useState(true);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [sweetOffered, setSweetOffered] = useState(false);
  const [isDoingAarti, setIsDoingAarti] = useState(false);
  const [activeStepMessage, setActiveStepMessage] = useState<string>(
    'Perform the auspicious Raksha Bandhan rituals on the handcrafted brass thali'
  );

  const handleLightDiya = () => {
    setDiyaLit(!diyaLit);
    festiveSynth.playChime(659.25, 'sine', 1.0);
    setActiveStepMessage(diyaLit ? 'The sacred flame is resting.' : 'The sacred Diya is glowing with warmth and positivity! ✨');
  };

  const handleApplyTilak = () => {
    setTilakApplied(true);
    festiveSynth.playChime(783.99, 'sine', 1.2);
    setActiveStepMessage(`Auspicious Roli-Kumkum & Akshat Tilak applied on ${recipientName}'s forehead 🔴✨`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleOfferSweet = () => {
    setSweetOffered(true);
    festiveSynth.playFestiveChord();
    setActiveStepMessage(`Offered traditional Kaju Katli & Besan Ladoo to sweeten the bond! 🍬`);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  const handleRingBell = () => {
    festiveSynth.playPujaBell();
    setActiveStepMessage('🔔 The auspicious puja bell echoes peace, longevity, and joy.');
  };

  const handlePerformAarti = () => {
    setIsDoingAarti(true);
    festiveSynth.playPujaBell();
    setTimeout(() => festiveSynth.playFestiveChord(), 400);

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff9933', '#ffd700', '#a51d45', '#ffffff'],
    });

    setActiveStepMessage(`✨ Aarti performed with love! May ${recipientName} be blessed with happiness and prosperity.`);
    setTimeout(() => setIsDoingAarti(false), 3000);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="skeuo-card-parchment p-4 p-md-5 text-center position-relative">
            {/* Header Section */}
            <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Auspicious Rakhi Puja Ritual</span>
            </div>
            
            <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
              The Sacred Aarti Thali
            </h2>
            <p className="text-muted-crimson max-w-lg mx-auto mb-4">
              Touch the items on the handcrafted brass plate to perform the timeless Raksha Bandhan rituals.
            </p>

            {/* Brass Thali Centerpiece */}
            <div className="d-flex justify-content-center my-4">
              <div 
                className={`skeuo-brass-thali position-relative ${isDoingAarti ? 'aarti-waving' : ''}`}
                id="brass-puja-thali"
              >
                {/* Brass Plate Embossed Rings */}
                <div className="thali-mandala-engraving" />

                {/* 1. Center Sacred Diya Lamp */}
                <div 
                  className="thali-item diya-position cursor-pointer"
                  onClick={handleLightDiya}
                  title="Click to Light the Diya"
                  role="button"
                >
                  <div className="skeuo-clay-diya">
                    {diyaLit && (
                      <div className="diya-flame-wrapper">
                        <div className="diya-flame-glow" />
                        <div className="diya-flame-core" />
                      </div>
                    )}
                  </div>
                  <span className="thali-item-label">Sacred Diya</span>
                </div>

                {/* 2. Kumkum & Chawal Bowl */}
                <div 
                  className="thali-item kumkum-position cursor-pointer"
                  onClick={handleApplyTilak}
                  title="Click to Apply Auspicious Tilak"
                  role="button"
                >
                  <div className="skeuo-brass-vati">
                    <div className="kumkum-powder">
                      <div className="akshat-grains" />
                    </div>
                  </div>
                  <span className="thali-item-label">Roli & Akshat</span>
                </div>

                {/* 3. Traditional Sweets (Kaju Katli & Ladoo) */}
                <div 
                  className="thali-item sweets-position cursor-pointer"
                  onClick={handleOfferSweet}
                  title="Click to Offer Festive Sweets"
                  role="button"
                >
                  <div className="skeuo-mithai-box">
                    <div className="kaju-katli-diamond" />
                    <div className="besan-ladoo-sphere" />
                  </div>
                  <span className="thali-item-label">Mithai Prasaad</span>
                </div>

                {/* 4. Puja Bell */}
                <div 
                  className="thali-item bell-position cursor-pointer"
                  onClick={handleRingBell}
                  title="Click to Ring the Mandir Bell"
                  role="button"
                >
                  <div className="skeuo-brass-bell">
                    <div className="bell-clapper" />
                  </div>
                  <span className="thali-item-label">Puja Ghanti</span>
                </div>

                {/* Center Om Emblem in Floral Petals */}
                <div className="thali-center-flower">
                  <span className="thali-center-om">ॐ</span>
                </div>
              </div>
            </div>

            {/* Interactive Feedback Message Banner */}
            <div className="skeuo-status-plaque my-3 py-2 px-3 d-inline-block">
              <span className="font-serif text-amber-950 fw-medium">
                {activeStepMessage}
              </span>
            </div>

            {/* Interactive Action Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <button 
                onClick={handleApplyTilak}
                className="btn-skeuo-wood d-inline-flex align-items-center gap-2"
                id="apply-tilak-btn"
              >
                <div className="w-3 h-3 rounded-circle bg-danger" />
                <span>Apply Tilak</span>
              </button>

              <button 
                onClick={handleOfferSweet}
                className="btn-skeuo-wood d-inline-flex align-items-center gap-2"
                id="offer-sweet-btn"
              >
                <Cookie className="w-4 h-4 text-warning" />
                <span>Feed Sweet</span>
              </button>

              <button 
                onClick={handleRingBell}
                className="btn-skeuo-wood d-inline-flex align-items-center gap-2"
                id="ring-bell-btn"
              >
                <Bell className="w-4 h-4 text-amber-800" />
                <span>Ring Ghanti 🔔</span>
              </button>

              <button 
                onClick={handlePerformAarti}
                className="btn-skeuo-crimson d-inline-flex align-items-center gap-2"
                id="perform-aarti-btn"
              >
                <Flame className="w-4 h-4 text-warning" />
                <span>Perform Complete Aarti ✨</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
