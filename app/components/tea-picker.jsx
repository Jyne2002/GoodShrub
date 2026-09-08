'use client';

import { useEffect, useState } from 'react';

export default function TeaPicker({ teas }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % teas.length);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, teas.length]);

  return (
    <fieldset className="tea-picker">
      <legend className="visually-hidden">Choose a tea</legend>
      {teas.map((tea, index) => (
        <label key={tea.id} className={`tea-choice choice-${tea.id}`}>
          <input
            type="radio"
            id={tea.id}
            name="tea"
            value={tea.id}
            checked={activeIndex === index}
            onChange={() => setActiveIndex(index)}
            aria-label={tea.name}
          />
          <span className="tea-swatch" aria-hidden="true" />
        </label>
      ))}
    </fieldset>
  );
}
