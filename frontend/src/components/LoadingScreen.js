import { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ text = 'Loading...', complete = false }) => {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    let active = true;
    let timerId;

    const tick = () => {
      if (!active) {
        return;
      }

      setProgress((current) => {
        if (complete) {
          return 100;
        }

        if (current >= 92) {
          return 92;
        }

        const next = current + Math.max(1, Math.round((100 - current) * 0.08));
        return Math.min(next, 92);
      });

      timerId = window.setTimeout(tick, 140);
    };

    tick();

    return () => {
      active = false;
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [complete]);

  useEffect(() => {
    if (complete) {
      setProgress(100);
    }
  }, [complete]);

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-screen__shell">
        <div className="loading-screen__label">{text}</div>
        <div className="loading-screen__bar" aria-hidden="true">
          <div className="loading-screen__fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-screen__percent">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;