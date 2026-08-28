import React from 'react';
import { Settings, Sparkles, Share2, Copy, Wand2, RefreshCw } from 'lucide-react';
import { AppGiftData, RakhiType } from '../types';
import { festiveSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface CustomizeSectionProps {
  giftData: AppGiftData;
  onChangeData: (updater: (prev: AppGiftData) => AppGiftData) => void;
  onToast: (msg: string) => void;
}

const WISHES_PRESETS = [
  '“No matter how much we grow, argue, laugh or go our separate ways, you will always have a special place in my heart. Happy Raksha Bandhan! ❤️”',
  '“May the holy thread of Rakhi protect you from all evil, bring boundless smiles, and remind you that you always have a protector in me. Happy Rakhi!”',
  '“From sharing secret chocolates to fighting over the TV remote, every childhood memory with you is pure gold. Love you forever!”',
  '“Having a sibling like you is having a best friend for life. Thank you for always believing in me even when I doubted myself.”',
];

export const CustomizeSection: React.FC<CustomizeSectionProps> = ({
  giftData,
  onChangeData,
  onToast,
}) => {
  const handleRandomWish = () => {
    const randomWish = WISHES_PRESETS[Math.floor(Math.random() * WISHES_PRESETS.length)];
    onChangeData((prev) => ({ ...prev, mainMessage: randomWish }));
    festiveSynth.playChime(659.25, 'triangle', 0.6);
    onToast('✨ Applied heartfelt Rakhi wish!');
  };

  const handleShare = async () => {
    festiveSynth.playFestiveChord();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Raksha Bandhan, ${giftData.recipientName}! ❤️`,
          text: `I made a special digital Rakhi gift for you with love from ${giftData.senderName}! Open it:`,
          url: window.location.href,
        });
        onToast('Gift shared successfully! ❤️');
      } catch {
        // user cancelled
      }
    } else {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        onToast('✨ Gift link copied to clipboard! Send it to your sibling ❤️');
      }
    }
  };

  return (
    <div className="container my-5" id="customize">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="skeuo-card-parchment p-4 p-md-5 position-relative">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
                <Settings className="w-4 h-4 text-crimson-800" />
                <span>Handcrafted Studio</span>
              </div>
              <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
                Personalize Your Gift ✨
              </h2>
              <p className="text-muted-crimson max-w-lg mx-auto">
                Customize every name, greeting, surprise voucher, and Rakhi design in real-time.
              </p>
            </div>

            {/* Customization Form Grid */}
            <div className="row g-4">
              {/* Recipient Name */}
              <div className="col-12 col-md-6">
                <div className="skeuo-input-group">
                  <label className="skeuo-label">Sibling / Recipient Name</label>
                  <input
                    type="text"
                    className="skeuo-input form-control"
                    placeholder="e.g. Priya / Rahul"
                    value={giftData.recipientName}
                    onChange={(e) =>
                      onChangeData((prev) => ({ ...prev, recipientName: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Sender Name */}
              <div className="col-12 col-md-6">
                <div className="skeuo-input-group">
                  <label className="skeuo-label">Your Name (Sender)</label>
                  <input
                    type="text"
                    className="skeuo-input form-control"
                    placeholder="e.g. Ajmath"
                    value={giftData.senderName}
                    onChange={(e) =>
                      onChangeData((prev) => ({ ...prev, senderName: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Rakhi Design Selector */}
              <div className="col-12">
                <label className="skeuo-label mb-2">Select Artisanal Rakhi Design</label>
                <div className="d-flex flex-wrap gap-2">
                  {[
                    { id: 'royal-kundan', label: '👑 Royal Kundan & Ruby' },
                    { id: 'sacred-rudraksha', label: '📿 Sacred Rudraksha & Om' },
                    { id: 'floral-peacock', label: '🦚 Floral Peacock Gem' },
                    { id: 'golden-zari', label: '✨ Golden Zari Filigree' },
                  ].map((rakhi) => (
                    <button
                      key={rakhi.id}
                      type="button"
                      onClick={() => {
                        onChangeData((prev) => ({
                          ...prev,
                          selectedRakhi: rakhi.id as RakhiType,
                        }));
                        festiveSynth.playChime(587.33, 'sine', 0.4);
                      }}
                      className={`btn-skeuo-tab ${
                        giftData.selectedRakhi === rakhi.id ? 'active' : ''
                      }`}
                    >
                      {rakhi.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heartfelt Quote / Main Message */}
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="skeuo-label">Heartfelt Quote / Greeting</label>
                  <button
                    type="button"
                    onClick={handleRandomWish}
                    className="btn btn-sm btn-link text-crimson-800 text-decoration-none d-inline-flex align-items-center gap-1 p-0"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Inspiration Presets</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  className="skeuo-textarea form-control"
                  placeholder="Write your personal message..."
                  value={giftData.mainMessage}
                  onChange={(e) =>
                    onChangeData((prev) => ({ ...prev, mainMessage: e.target.value }))
                  }
                />
              </div>

              {/* Secret Gift Box Surprise Note */}
              <div className="col-12 col-md-6">
                <div className="skeuo-input-group">
                  <label className="skeuo-label">Gift Box Surprise Note</label>
                  <textarea
                    rows={3}
                    className="skeuo-textarea form-control"
                    placeholder="Hidden message inside 3D gift box..."
                    value={giftData.giftSurpriseMessage}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        giftSurpriseMessage: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Secret Parchment Letter */}
              <div className="col-12 col-md-6">
                <div className="skeuo-input-group">
                  <label className="skeuo-label">Wax Sealed Secret Letter</label>
                  <textarea
                    rows={3}
                    className="skeuo-textarea form-control"
                    placeholder="Message hidden inside wax-sealed envelope..."
                    value={giftData.secretLetter}
                    onChange={(e) =>
                      onChangeData((prev) => ({
                        ...prev,
                        secretLetter: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-4 pt-3 border-top border-amber-200">
              <button
                onClick={handleShare}
                className="btn-skeuo-gold d-inline-flex align-items-center gap-2 px-5 py-3 shadow-lg"
                id="share-gift-action-btn"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>Update & Share Gift ↗</span>
              </button>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  festiveSynth.playFestiveChord();
                  confetti({ particleCount: 80, spread: 80 });
                }}
                className="btn-skeuo-wood d-inline-flex align-items-center gap-2 px-4 py-3"
              >
                <RefreshCw className="w-4 h-4 text-crimson-900" />
                <span>Preview From Top ↺</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
