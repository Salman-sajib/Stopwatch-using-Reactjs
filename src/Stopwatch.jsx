import { useState, useEffect, useRef } from 'react';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // hours = string(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <>
      <h1 className='font-serif text-5xl font-semibold mb-20 text-indigo-200'>
        Stopwatch
      </h1>
      <div className='flex flex-col items-center p-7 border rounded-lg'>
        <div className='font-mono text-5xl text-indigo-200 mb-10'>
          {formatTime()}
        </div>
        <div className='flex items-center gap-2'>
          <button
            className='bg-green-500 text-lg rounded px-5 py-2'
            onClick={start}
          >
            Start
          </button>
          <button
            className='bg-indigo-500 text-lg rounded px-5 py-2'
            onClick={stop}
          >
            Stop
          </button>
          <button
            className='bg-rose-500 text-lg rounded px-5 py-2'
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
