import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css'; // Create this file for custom arrow styles

export const Tooltip = ({
  content,
  hint,
  children,
  position = 'top',
  delay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'tooltip-box top';
      case 'bottom':
        return 'tooltip-box bottom';
      case 'left':
        return 'tooltip-box left';
      case 'right':
        return 'tooltip-box right';
      default:
        return 'tooltip-box top';
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={getPositionClasses()}>
          <div className="tooltip-content bg-dark text-white border border-secondary rounded p-2 small shadow">
            <div>{content}</div>
            {/* {hint && <div className="text-muted mt-1">{hint}</div>} */}
          </div>
          <div className={`tooltip-arrow ${position}`} />
        </div>
      )}
    </div>
  );
};
