import React from 'react';
import VideoPreview from './VideoPreview';

export default function VideoComparison({ leftFile, rightFile, leftSrc, rightSrc }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 16 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '6px 0', color: '#1e293b' }}>Original</h4>
        <VideoPreview file={leftFile} src={leftSrc} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '6px 0', color: '#1e293b' }}>Comparison</h4>
        <VideoPreview file={rightFile} src={rightSrc} />
      </div>
    </div>
  );
}
