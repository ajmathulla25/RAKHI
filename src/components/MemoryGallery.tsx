import React, { useState } from 'react';
import { Camera, ImagePlus, Sparkles, Heart, Trash2, Maximize2, X } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { LazyImage } from './LazyImage';
import { festiveSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface MemoryGalleryProps {
  photos: MemoryPhoto[];
  onAddPhotos: (newPhotos: MemoryPhoto[]) => void;
  onRemovePhoto: (id: string) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onAddPhotos,
  onRemovePhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<'warm' | 'sepia' | 'original'>('warm');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newPhotoList: MemoryPhoto[] = [];
    const files: File[] = Array.from(e.target.files);

    files.forEach((file: File, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotoList.push({
            id: `photo-${Date.now()}-${index}`,
            url: event.target.result as string,
            title: file.name.replace(/\.[^/.]+$/, ''),
            caption: 'Our Golden Memory Together ❤️',
            rotation: (Math.random() - 0.5) * 6,
          });

          if (newPhotoList.length === files.length) {
            onAddPhotos(newPhotoList);
            festiveSynth.playFestiveChord();
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container my-5" id="memories">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          {/* Leather-Bound Skeuomorphic Photo Album */}
          <div className="skeuo-leather-album p-4 p-md-5 position-relative">
            {/* Album Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center gap-2 skeuo-pill-badge mb-3">
                <Camera className="w-4 h-4 text-crimson-800" />
                <span>Sibling Time Capsule</span>
              </div>

              <h2 className="font-serif-royal fs-1 text-crimson-900 mb-2">
                Our Little Universe 📸
              </h2>
              <p className="text-muted-crimson max-w-lg mx-auto">
                Handpicked moments, laughter, childhood adventures, and unbreakable bonds.
              </p>

              {/* Photo Filter Toggles */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                  onClick={() => setActiveFilter('warm')}
                  className={`btn-skeuo-tab ${activeFilter === 'warm' ? 'active' : ''}`}
                >
                  ✨ Golden Warmth
                </button>
                <button
                  onClick={() => setActiveFilter('sepia')}
                  className={`btn-skeuo-tab ${activeFilter === 'sepia' ? 'active' : ''}`}
                >
                  📜 Vintage Sepia
                </button>
                <button
                  onClick={() => setActiveFilter('original')}
                  className={`btn-skeuo-tab ${activeFilter === 'original' ? 'active' : ''}`}
                >
                  🎨 Vivid Original
                </button>
              </div>
            </div>

            {/* Polaroid Photo Grid with Lazy Loading & Bootstrap Grid */}
            <div className="row g-4 justify-content-center">
              {photos.map((photo, index) => (
                <div key={photo.id} className="col-12 col-sm-6 col-lg-4">
                  <div
                    className={`skeuo-polaroid-frame filter-${activeFilter}`}
                    style={{
                      transform: `rotate(${photo.rotation ?? (index % 2 === 0 ? -2 : 2)}deg)`,
                    }}
                  >
                    {/* Brass Mounting Corners */}
                    <div className="brass-photo-corner top-left" />
                    <div className="brass-photo-corner top-right" />
                    <div className="brass-photo-corner bottom-left" />
                    <div className="brass-photo-corner bottom-right" />

                    {/* Lazy Loaded Image */}
                    <div
                      className="polaroid-image-container cursor-pointer"
                      onClick={() => {
                        setSelectedPhoto(photo);
                        festiveSynth.playChime(523.25, 'triangle', 0.5);
                      }}
                      title="Click to zoom memory"
                    >
                      <LazyImage
                        src={photo.url}
                        alt={photo.title}
                        aspectRatio="1/1"
                        className="rounded-1"
                      />
                      <div className="polaroid-zoom-overlay">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Handwritten Caption */}
                    <div className="polaroid-caption d-flex justify-content-between align-items-center mt-2 px-1">
                      <span className="font-handwritten text-amber-950 fw-semibold fs-5 text-truncate">
                        {photo.caption || photo.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePhoto(photo.id);
                        }}
                        className="btn-trash-subtle"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4 text-danger opacity-75 hover-opacity-100" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Memory Polaroid Card */}
              <div className="col-12 col-sm-6 col-lg-4">
                <label className="skeuo-polaroid-frame add-card d-flex flex-column align-items-center justify-content-center cursor-pointer h-100 min-h-64">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="d-none"
                    onChange={handleFileUpload}
                  />
                  <div className="skeuo-circle-icon-btn mb-3">
                    <ImagePlus className="w-8 h-8 text-amber-800" />
                  </div>
                  <span className="font-serif fw-bold text-crimson-900 fs-5">
                    Add Your Memories
                  </span>
                  <span className="text-muted-crimson small text-center px-3 mt-1">
                    Upload photos with your sibling to personalize this album
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="skeuo-lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="skeuo-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="lightbox-close-btn"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="lightbox-img"
            />
            <div className="lightbox-caption mt-3 text-center">
              <h4 className="font-serif-royal text-warning fs-4 mb-1">
                {selectedPhoto.title}
              </h4>
              <p className="text-light mb-0 font-serif fs-5">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
