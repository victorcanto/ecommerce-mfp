import React, { useEffect, useRef } from 'react';
import { mount } from 'dashboard/DashboardApp';

// Generic Integration

export default function DashboardApp() {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}
