// src/components/SessionTimer.jsx
import { useEffect, useState } from 'react';
import useStore from '../store';

const SessionTimer = () => {
  const session = useStore((state) => state.session);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (session.isLoggedIn && session.expiry) {
      const updateTimer = () => {
        const now = Date.now();
        const difference = session.expiry - now;
        setTimeLeft(difference > 0 ? difference : 0);
      };

      updateTimer();
      const timerId = setInterval(updateTimer, 1000);

      return () => clearInterval(timerId);
    }
  }, [session.expiry]); // Dependencia solo de session.expiry

  // Convertir milisegundos a minutos y segundos
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!session.isLoggedIn) return null;

  return (
    <div className="session-timer">
      <p>Tiempo restante de sesión: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default SessionTimer;
