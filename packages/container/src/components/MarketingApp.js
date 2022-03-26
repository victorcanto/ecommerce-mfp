import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';

// Generic Integration

export function MarketingApp() {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
}
