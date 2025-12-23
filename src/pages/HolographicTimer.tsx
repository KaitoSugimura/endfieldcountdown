import './HolographicTimer.css';

interface HolographicTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HolographicTimer({
  days,
  hours,
  minutes,
  seconds,
}: HolographicTimerProps) {
  return (
    <div className="holographic-timer">
      <div className="timer-panel">
        <div className="timer-display">
          <div className="timer-value days-value">
            {String(days).padStart(2, '0')}
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-value hours-value">
            {String(hours).padStart(2, '0')}
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-value minutes-value">
            {String(minutes).padStart(2, '0')}
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-value seconds-value">
            {String(seconds).padStart(2, '0')}
          </div>
        </div>
        <div className="timer-scanlines"></div>
      </div>
    </div>
  );
}
