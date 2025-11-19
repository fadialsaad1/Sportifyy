import React, { useEffect, useState } from 'react';

export default function ComparisonPanel() {
  const [frames, setFrames] = useState([]);
  const [latestEntry, setLatestEntry] = useState(null);

  // Use a simple static thumbnail from the public folder when earliest frame is missing
  const placeholderEarliest = '/last_video_thumbnail.png';

  const loadFrames = () => {
    try {
      const raw = localStorage.getItem('sportsifyAnalysisFrames');
      const parsed = raw ? JSON.parse(raw) : [];
      setFrames(parsed || []);
      if (parsed && parsed.length > 0) {
        setLatestEntry(parsed[parsed.length - 1]);
      } else {
        setLatestEntry(null);
      }
    } catch (e) {
      setFrames([]);
      setLatestEntry(null);
    }
  };

  useEffect(() => {
    loadFrames();

    const onStorage = (e) => {
      if (e.key === 'sportsifyAnalysisFrames') loadFrames();
    };
    window.addEventListener('storage', onStorage);

    // Poll every second to simulate "constantly updates latest frame"
    const interval = setInterval(loadFrames, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Choose earliest frame from first entry and latest frame from latestEntry
  // Use the stored earliest frame when available; otherwise fall back to the latest frame if available,
  // otherwise use the static thumbnail. This ensures the left slot is never blank.
  const earliest = (frames && frames.length > 0)
    ? (frames[0].earliestFrame || (latestEntry ? latestEntry.latestFrame : placeholderEarliest))
    : placeholderEarliest;
  const latest = latestEntry ? latestEntry.latestFrame : null;

  const earliestDate = frames && frames.length > 0 ? (frames[0].timestampISO ? new Date(frames[0].timestampISO).toLocaleDateString('en-US') : '') : '';
  const latestDate = latestEntry && latestEntry.timestampISO ? new Date(latestEntry.timestampISO).toLocaleDateString('en-US') : '';

  return (
    <div style={{
      background: 'white',
      borderRadius: 16,
      padding: 16,
      boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
      margin: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#1e293b' }}>Shot Comparison</h3>
        <small style={{ color: '#64748b' }}>Earliest vs Latest (updates live)</small>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ height: 180, borderRadius: 12, overflow: 'hidden', background: '#f1f5f9' }}>
            {earliest ? (
              <img
                src={earliest}
                alt="Earliest frame"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  try {
                    // If loading fails, first try the static placeholder
                    if (e.currentTarget.src !== placeholderEarliest) {
                      e.currentTarget.src = placeholderEarliest;
                      return;
                    }
                  } catch (err) {}
                  // Final fallback: inline SVG so it's always visible
                  e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect fill="%23f1f5f9" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="28" font-family="Arial,sans-serif">Earliest (placeholder)</text></svg>';
                }}
              />
            ) : (
              <div style={{ padding: 24, color: '#94a3b8' }}>No earliest frame</div>
            )}
          </div>
          <div style={{ marginTop: 8, color: '#1f2937', fontWeight: 600 }}>{earliestDate || 'Earliest Key Frame'}</div>
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ height: 180, borderRadius: 12, overflow: 'hidden', background: '#f1f5f9' }}>
            {latest ? (
              <img src={latest} alt="Latest frame" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ padding: 24, color: '#94a3b8' }}>No latest frame</div>
            )}
          </div>
          <div style={{ marginTop: 8, color: '#1f2937', fontWeight: 600 }}>{latestDate || 'Latest Key Frame'}</div>
        </div>
      </div>
    </div>
  );
}
