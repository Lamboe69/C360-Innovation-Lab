import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let frameId;

    function handleMouseMove(event) {
      mx = event.clientX;
      my = event.clientY;
    }

    function animate() {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      frameId = requestAnimationFrame(animate);
    }

    function handlePointerEnter() {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-28%,-18%) scale(1.18)';
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ringRef.current.style.borderColor = 'rgba(245,166,35,0.9)';
      }
    }

    function handlePointerLeave() {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-28%,-18%) scale(1)';
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
        ringRef.current.style.borderColor = 'rgba(245,166,35,0.5)';
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a,button,input,label').forEach(element => {
      element.addEventListener('mouseenter', handlePointerEnter);
      element.addEventListener('mouseleave', handlePointerLeave);
    });
    frameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a,button,input,label').forEach(element => {
        element.removeEventListener('mouseenter', handlePointerEnter);
        element.removeEventListener('mouseleave', handlePointerLeave);
      });
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div className="cursor cursor-hand" ref={cursorRef} aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          <path
            d="M12 3.8c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v9.1l.8-.8c.8-.8 2.2-.8 3 0 .3.3.5.7.6 1.1l.7-.7c.8-.8 2.2-.8 3 0 .4.4.6.9.6 1.5.8-.5 1.9-.4 2.6.3.8.8.8 2.1.1 2.9l-5.9 7.2c-1.8 2.2-4.4 3.5-7.2 3.5h-.8c-2.5 0-4.9-1-6.6-2.8l-4.2-4.3c-.9-.9-.9-2.3 0-3.2.8-.8 2-.9 2.9-.3l2.7 1.8V3.8Z"
            fill="currentColor"
          />
          <path
            d="M12 3.8c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v9.1l.8-.8c.8-.8 2.2-.8 3 0 .3.3.5.7.6 1.1l.7-.7c.8-.8 2.2-.8 3 0 .4.4.6.9.6 1.5.8-.5 1.9-.4 2.6.3.8.8.8 2.1.1 2.9l-5.9 7.2c-1.8 2.2-4.4 3.5-7.2 3.5h-.8c-2.5 0-4.9-1-6.6-2.8l-4.2-4.3c-.9-.9-.9-2.3 0-3.2.8-.8 2-.9 2.9-.3l2.7 1.8V3.8Z"
            fill="none"
            stroke="rgba(7,9,15,0.85)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
