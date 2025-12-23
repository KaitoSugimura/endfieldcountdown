import { useEffect, useState } from 'react';
import './Countdown.css';
import PerspectiveGrid from './PerspectiveGrid';
import HolographicTimer from './HolographicTimer';

// Release date for Arknights Endfield
const RELEASE_DATE = '2026-01-22T00:00:00Z';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [audio] = useState<HTMLAudioElement>(() => {
    const newAudio = new Audio('/mainTheme.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.5;
    return newAudio;
  });

  useEffect(() => {
    // Try to play audio on mount
    audio.play().catch(() => {
      // Audio blocked by browser - will need user interaction
    });

    // Add click listener to unmute/play audio if autoplay was blocked
    const handleUserInteraction = () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Still blocked
        });
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    const calculateTimeRemaining = () => {
      const releaseDate = new Date(RELEASE_DATE).getTime();
      const now = new Date().getTime();
      const distance = releaseDate - now;

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [audio]);

  return (
    <div className="countdown-container">
      <PerspectiveGrid />
      <div className="countdown-content">
        <div>

        
        <div className="countdown-header-container">

        <div className="countdown-header">
          <h1 className="countdown-title">ARKNIGHTS ENDFIELD</h1>
          <p className="countdown-subtitle">Count Down</p>
        </div>
        </div>
</div>
        <div className="countdown-timer">
          <HolographicTimer 
            days={timeRemaining.days}
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          />
        </div>

        <div className="countdown-footer">
          <p className="release-date">January 22, 2025</p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="bg-elements">
        <div className="element element-1"></div>
        <div className="element element-2"></div>
        <div className="element element-3"></div>
      </div>
    </div>
  );
}
