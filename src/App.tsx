import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Mail, Camera, Radio, Settings, Share2, Compass, Award } from 'lucide-react';
import { AppGiftData, MemoryPhoto } from './types';
import { SkeuoRakhi } from './components/SkeuoRakhi';
import { PujaThali } from './components/PujaThali';
import { SkeuoGiftBox } from './components/SkeuoGiftBox';
import { WaxSealLetter } from './components/WaxSealLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { CassettePlayer } from './components/CassettePlayer';
import { CustomizeSection } from './components/CustomizeSection';
import { FestiveParticles } from './components/FestiveParticles';
import { festiveSynth } from './utils/audioSynth';
import confetti from 'canvas-confetti';

const INITIAL_PHOTOS: MemoryPhoto[] = [
  {
    id: 'p-1',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    title: 'Our Best Childhood Adventures',
    caption: 'Endless laughter & secret missions ✨',
    rotation: -3,
  },
  {
    id: 'p-2',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    title: 'Forever Together',
    caption: 'Growing up side by side ❤️',
    rotation: 2,
  },
  {
    id: 'p-3',
    url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=600&q=80',
    title: 'Festive Celebrations',
    caption: 'Sweet moments & golden smiles 🌸',
    rotation: -1,
  },
];

export default function App() {
  const [giftData, setGiftData] = useState<AppGiftData>(() => {
    // Check localStorage for persisted edits
    const saved = localStorage.getItem('rakhi_gift_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      recipientName: 'My Favorite Person',
      senderName: 'Your Favorite Sibling',
      relationship: 'Sibling',
      heroHeadline: 'Happy Raksha Bandhan ❤️',
      heroSubtitle:
        'A handcrafted digital surprise filled with memories, laughter, sacred promises, and lifelong love.',
      mainMessage:
        '“No matter how much we grow, argue, laugh or go our separate ways, you will always have a special place in my heart. Happy Raksha Bandhan! ❤️”',
      giftSurpriseTitle: 'You are the Greatest Gift! ✨',
      giftSurpriseMessage:
        'You make life brighter, funnier, and so much warmer. Keep smiling, keep dreaming, and remember that I will always have your back unconditionally.',
      secretLetter:
        "Thank you for every laugh, every inside joke, every midnight conversation, and every moment we've shared. I may not say it every day, but I'm incredibly blessed to have you in my life. This Rakhi carries my eternal promise of love, protection, and cheerleading for you!",
      selectedRakhi: 'royal-kundan',
      photos: INITIAL_PHOTOS,
      promises: [
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
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('rakhi_gift_data', JSON.stringify(giftData));
    } catch {
      // ignore
    }
  }, [giftData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGiftFromHero = () => {
    festiveSynth.playFestiveChord();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#a51d45', '#e85d83', '#d6a83c', '#ffd700'],
    });
    scrollTo('surprise');
  };

  return (
    <div className="position-relative min-vh-100 pb-5">
      {/* Dynamic Festive Canvas Particles with Debounced Resize */}
      <FestiveParticles />

      {/* Floating Skeuomorphic Navbar */}
      <header className="position-fixed top-0 start-50 translate-middle-x z-3 w-100 px-3 pt-3" style={{ maxWidth: '1100px' }}>
        <nav className="skeuo-navbar d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span className="font-serif-royal fs-3 text-crimson-900 fw-bold d-flex align-items-center gap-1">
              Rakhi <span className="text-amber-600">♥</span>
            </span>
            <span className="d-none d-sm-inline-block px-3 py-1 rounded-full border border-danger-subtle text-xs font-bold text-crimson-900 bg-white/70 shadow-sm uppercase tracking-widest">
              August 2026
            </span>
          </div>

          <div className="d-none d-md-flex align-items-center gap-2">
            <a href="#message" className="nav-link-skeuo">Message</a>
            <a href="#thali" className="nav-link-skeuo">Aarti Thali</a>
            <a href="#memories" className="nav-link-skeuo">Memories</a>
            <a href="#surprise" className="nav-link-skeuo">Surprise</a>
            <a href="#letter" className="nav-link-skeuo">Letter</a>
            <a href="#customize" className="nav-link-skeuo">Customize</a>
          </div>

          <button
            onClick={() => scrollTo('customize')}
            className="btn-skeuo-crimson btn-sm px-3.5 py-1.5 d-inline-flex align-items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Personalize</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center justify-content-center text-center pt-5 mt-4 position-relative">
        <div className="container position-relative z-1 pt-5">
          <div className="skeuo-pill-badge mb-3">
            <Sparkles className="w-3.5 h-3.5 text-crimson-800" />
            <span>A digital gift for you</span>
          </div>

          <h1 className="font-serif-royal display-1 text-crimson-900 mb-2 letter-spacing-tight">
            {giftData.heroHeadline}
          </h1>

          <div className="font-serif-royal fs-2 text-amber-900 mb-3 fw-semibold">
            Dear {giftData.recipientName}
          </div>

          <p className="lead text-muted-crimson max-w-xl mx-auto mb-4 font-serif fs-5">
            {giftData.heroSubtitle}
          </p>

          {/* Skeuomorphic 3D Rakhi Component */}
          <SkeuoRakhi
            recipientName={giftData.recipientName}
            senderName={giftData.senderName}
            rakhiType={giftData.selectedRakhi}
            onTieSuccess={() => showToast(`Rakhi tied on ${giftData.recipientName}'s wrist! ❤️`)}
          />

          {/* Hero Action Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
            <button
              onClick={handleOpenGiftFromHero}
              className="btn-skeuo-crimson px-4 py-3 d-inline-flex align-items-center gap-2"
              id="hero-open-gift-btn"
            >
              <Gift className="w-4 h-4" />
              <span>Open Gift 🎁</span>
            </button>

            <button
              onClick={() => scrollTo('message')}
              className="btn-skeuo-wood px-4 py-3 d-inline-flex align-items-center gap-2"
            >
              <Mail className="w-4 h-4 text-crimson-900" />
              <span>Message 💌</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Heartfelt Quote & Sibling Blessing */}
      <section id="message" className="py-5 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="skeuo-card-parchment p-4 p-md-5 text-center position-relative">
                <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
                  <Heart className="w-4 h-4 text-crimson-800" />
                  <span>From the Depths of the Heart</span>
                </div>

                <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
                  A Message From My Heart
                </h2>
                <p className="text-muted-crimson max-w-md mx-auto mb-4">
                  Some bonds don’t need an explanation. They simply need to be celebrated every single day.
                </p>

                <div className="skeuo-inset-parchment p-4 p-md-5 my-4">
                  <div className="font-serif fs-3 text-amber-950 fst-italic line-relaxed max-w-3xl mx-auto">
                    {giftData.mainMessage}
                  </div>
                  <div className="mt-4 pt-3 border-top border-amber-200 d-inline-block text-muted-crimson font-serif">
                    With all my love & lifelong blessings, <br />
                    <strong className="text-crimson-900 fs-4">{giftData.senderName}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Brass Puja Thali Rituals */}
      <div id="thali">
        <PujaThali
          recipientName={giftData.recipientName}
          senderName={giftData.senderName}
        />
      </div>

      {/* Section 3: Leather Memory Album with Lazy Loading */}
      <MemoryGallery
        photos={giftData.photos}
        onAddPhotos={(newPhotos) => {
          setGiftData((prev) => ({ ...prev, photos: [...newPhotos, ...prev.photos] }));
          showToast('Added memory photos to your album! 📸');
        }}
        onRemovePhoto={(id) => {
          setGiftData((prev) => ({
            ...prev,
            photos: prev.photos.filter((p) => p.id !== id),
          }));
          showToast('Photo removed');
        }}
      />

      {/* Section 4: 3D Velvet Gift Box & Sibling Vouchers */}
      <SkeuoGiftBox
        recipientName={giftData.recipientName}
        senderName={giftData.senderName}
        surpriseTitle={giftData.giftSurpriseTitle}
        surpriseMessage={giftData.giftSurpriseMessage}
        promises={giftData.promises}
      />

      {/* Section 5: Secret Wax Seal Letter */}
      <WaxSealLetter
        recipientName={giftData.recipientName}
        senderName={giftData.senderName}
        letterContent={giftData.secretLetter}
      />

      {/* Section 6: Retro Wooden Cassette Player with Synthesizer */}
      <CassettePlayer onToast={showToast} />

      {/* Section 7: Live Customization & Sharing Dashboard */}
      <CustomizeSection
        giftData={giftData}
        onChangeData={setGiftData}
        onToast={showToast}
      />

      {/* Grand Finale Section */}
      <section className="py-5 text-center position-relative">
        <div className="container">
          <div className="skeuo-card-parchment p-4 p-md-5 max-w-4xl mx-auto position-relative">
            <span className="skeuo-pill-badge mb-3 d-inline-block">
              Forever & Always
            </span>
            <h2 className="font-serif-royal display-4 text-crimson-900 mb-3">
              You are not just my sibling,<br />
              you are my forever friend ❤️
            </h2>
            <p className="text-muted-crimson font-serif fs-5 max-w-lg mx-auto mb-4">
              May our bond grow stronger with each passing year, filled with peace, laughter, and endless triumphs.
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  festiveSynth.playFestiveChord();
                  confetti({
                    particleCount: 120,
                    spread: 100,
                    origin: { y: 0.4 },
                  });
                }}
                className="btn-skeuo-crimson px-4 py-3 d-inline-flex align-items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Replay Our Celebration ↻</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-top border-white/50 bg-white/20 backdrop-blur-sm mt-5">
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-crimson-900/70 mb-0">
          Made with love for Raksha Bandhan • 2026 • © FestiveDesigns
        </p>
      </footer>

      {/* Tactile Toast Notification */}
      <div className={`skeuo-toast ${toastMessage ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
}
