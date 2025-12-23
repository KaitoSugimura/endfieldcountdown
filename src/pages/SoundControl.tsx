import { useState } from 'react';
import './SoundControl.css';

interface SoundControlProps {
  audio: HTMLAudioElement | null;
}

export default function SoundControl({ audio }: SoundControlProps) {
  const [volume, setVolume] = useState(audio?.volume ?? 0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="sound-control">
      <label htmlFor="volume-slider" className="sound-label">
        Volume
      </label>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="sound-slider"
      />
      <span className="sound-value">{Math.round(volume * 100)}%</span>
    </div>
  );
}
