import React, { useEffect, useRef } from 'react';
import { useDebouncedResize } from '../hooks/useDebouncedResize';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: 'petal' | 'sparkle' | 'diya-ember' | 'gold-dust';
  color: string;
}

export const FestiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useDebouncedResize(200);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    const particleCount = windowSize.width < 768 ? 25 : 45;
    const particles: Particle[] = [];

    const colors = {
      petal: ['#e63956', '#ff758c', '#ff8fa3', '#e0284f'],
      gold: ['#f4c430', '#ffd700', '#dfaa22', '#ffea75'],
      ember: ['#ff9933', '#ff5722', '#ffb74d'],
    };

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      let type: Particle['type'] = 'petal';
      let color = colors.petal[Math.floor(Math.random() * colors.petal.length)];

      if (typeRand < 0.4) {
        type = 'petal';
        color = colors.petal[Math.floor(Math.random() * colors.petal.length)];
      } else if (typeRand < 0.75) {
        type = 'gold-dust';
        color = colors.gold[Math.floor(Math.random() * colors.gold.length)];
      } else {
        type = 'sparkle';
        color = '#ffffff';
      }

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'petal' ? Math.random() * 8 + 5 : Math.random() * 4 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.25,
        type,
        color,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          // Draw soft flower petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'gold-dust') {
          // Draw sparkling golden star/circle
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffd700';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw 4-point sparkle star
          ctx.fillStyle = '#fff9d6';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#fff';
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size * 0.4, 0);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size * 0.4, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
