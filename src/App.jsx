import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (eventDate) {
      const intervalId = setInterval(() => {
        const eventTime = new Date(eventDate).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = eventTime - currentTime;

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown('Event has passed');
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [eventDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName && eventDate) {
      setCountdown('Calculating...');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Event Countdown Timer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Event Name"
          className="w-full p-2 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Start Countdown
        </button>
      </form>
      {countdown && (
        <div className="text-2xl bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">{eventName}</h2>
          <p>{countdown}</p>
        </div>
      )}
    </div>
  );
}

export default App;
