import React, { useState } from 'react';
import { Gift, Sparkles, Check, Heart, Ticket, PartyPopper } from 'lucide-react';
import { festiveSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import { SiblingPromise } from '../types';

interface SkeuoGiftBoxProps {
  recipientName: string;
  senderName: string;
  surpriseTitle?: string;
  surpriseMessage?: string;
  promises?: SiblingPromise[];
}

export const SkeuoGiftBox: React.FC<SkeuoGiftBoxProps> = ({
  recipientName,
  senderName,
  surpriseTitle = 'A Box Full of Smiles & Promises ✨',
  surpriseMessage = 'You are one of the greatest blessings in my life. Through all our silly fights, secret jokes, and shared memories, you remain my anchor.',
  promises = [
    {
      id: 'p1',
      title: 'Free Food / Treat Pass 🍕',
      icon: '🍕',
      desc: 'Valid anytime you are craving your favorite meal or midnight snack.',
    },
    {
      id: 'p2',
      title: 'Emergency Secret Keeper 🤫',
      icon: '🛡️',
      desc: '100% confidential. No questions asked, no snitching to parents.',
    },
    {
      id: 'p3',
      title: 'Win Any Argument Pass 🏆',
      icon: '✨',
      desc: 'Play this card and I will unconditionally admit you were right.',
    },
    {
      id: 'p4',
      title: 'Lifetime Protector & Cheerleader 🌟',
      icon: '❤️',
      desc: 'I will always stand by you, celebrate your wins, and support your dreams.',
    },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [redeemedPromises, setRedeemedPromises] = useState<Record<string, boolean>>({});

  const handleToggleBox = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      festiveSynth.playFestiveChord();
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a51d45', '#e85d83', '#d6a83c', '#ffd700'],
      });
    } else {
      festiveSynth.playChime(392.0, 'triangle', 0.5);
    }
  };

  const handleRedeemPromise = (id: string) => {
    setRedeemedPromises((prev) => ({ ...prev, [id]: !prev[id] }));
    festiveSynth.playChime(880.0, 'sine', 0.8);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="container my-5" id="surprise">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="skeuo-card-parchment p-4 p-md-5 text-center position-relative">
            <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
              <Gift className="w-4 h-4 text-crimson-800" />
              <span>Special Unboxing Experience</span>
            </div>

            <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
              The Royal Gift Treasure
            </h2>
            <p className="text-muted-crimson max-w-lg mx-auto mb-4">
              Tap the crimson velvet box to unlatch the satin ribbon and discover your custom sibling coupons.
            </p>

            {/* 3D Skeuomorphic Velvet Box with Gold Latch */}
            <div className="d-flex justify-content-center my-4">
              <div
                className={`skeuo-velvet-giftbox cursor-pointer ${isOpen ? 'open' : ''}`}
                onClick={handleToggleBox}
                title={isOpen ? 'Click to close the gift box' : 'Click to open the gift box!'}
                role="button"
                tabIndex={0}
              >
                {/* 3D Box Lid */}
                <div className="giftbox-lid">
                  <div className="giftbox-lid-ribbon-horizontal" />
                  <div className="giftbox-lid-ribbon-vertical" />
                  <div className="giftbox-gold-bow">🎀</div>
                </div>

                {/* 3D Box Body */}
                <div className="giftbox-body">
                  <div className="giftbox-body-ribbon-horizontal" />
                  <div className="giftbox-body-ribbon-vertical" />
                  <div className="giftbox-metallic-clasp">
                    <span className="clasp-gem" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={handleToggleBox}
                className="btn-skeuo-crimson d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                <PartyPopper className="w-4 h-4" />
                <span>{isOpen ? 'Close Gift Box 🎁' : 'Unbox Your Surprise 🎁'}</span>
              </button>
            </div>

            {/* Revealed Content Section */}
            {isOpen && (
              <div className="mt-5 text-start animate-fade-in-up">
                {/* Heartfelt Note Parchment */}
                <div className="skeuo-inset-parchment p-4 mb-4 text-center">
                  <h3 className="font-serif-royal text-crimson-900 fs-3 mb-2">
                    {surpriseTitle}
                  </h3>
                  <p className="font-serif fs-5 text-amber-950 max-w-2xl mx-auto line-relaxed">
                    &ldquo;{surpriseMessage}&rdquo;
                  </p>
                  <div className="mt-3 text-muted-crimson font-serif fw-semibold">
                    Always by your side, <br />
                    <span className="text-crimson-900 fs-4">{senderName} ❤️</span>
                  </div>
                </div>

                {/* Sibling Promise Voucher Cards */}
                <div className="text-center mb-3">
                  <h4 className="font-serif-royal text-crimson-900 fs-4 d-inline-flex align-items-center gap-2">
                    <Ticket className="w-5 h-5 text-amber-700" />
                    <span>Your Lifetime Sibling Vouchers</span>
                  </h4>
                  <p className="text-muted-crimson small">
                    Click any voucher to redeem your sibling promise.
                  </p>
                </div>

                <div className="row g-3">
                  {promises.map((promise) => {
                    const isRedeemed = redeemedPromises[promise.id];
                    return (
                      <div key={promise.id} className="col-12 col-md-6">
                        <div
                          onClick={() => handleRedeemPromise(promise.id)}
                          className={`skeuo-voucher-card p-3 d-flex align-items-center justify-content-between gap-3 cursor-pointer ${
                            isRedeemed ? 'redeemed' : ''
                          }`}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span className="fs-2">{promise.icon}</span>
                            <div>
                              <div className="fw-bold text-amber-950 font-serif fs-5">
                                {promise.title}
                              </div>
                              <div className="text-muted-crimson small">
                                {promise.desc}
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            {isRedeemed ? (
                              <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                                <Check className="w-4 h-4" /> Redeemed
                              </span>
                            ) : (
                              <span className="skeuo-voucher-stamp">
                                CLAIM
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
