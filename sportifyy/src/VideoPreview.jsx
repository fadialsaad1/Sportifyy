import React, { useEffect, useRef, useState } from "react";

export default function VideoPreview({ file, src = null, posterFallback = null }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoRef = useRef(null);
  const captureAttemptedRef = useRef(false);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setVideoUrl(null);
      };
    } else if (typeof src === "string" && src.length > 0) {
      setVideoUrl(src);
      return () => setVideoUrl(null);
    } else {
      setVideoUrl(null);
    }
  }, [file, src]);

  useEffect(() => {
    if (!videoUrl) {
      setThumbnail(null);
      captureAttemptedRef.current = false;
      return;
    }
    if (captureAttemptedRef.current) return;
    captureAttemptedRef.current = true;

    const tempVideo = document.createElement("video");
    tempVideo.crossOrigin = "anonymous";
    tempVideo.preload = "metadata";
    tempVideo.src = videoUrl;

    const tryCapture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = tempVideo.videoWidth || 320;
      canvas.height = tempVideo.videoHeight || 180;
      const ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setThumbnail(dataURL);
      } catch (e) {
        setThumbnail(null);
      } finally {
        tempVideo.pause();
        tempVideo.src = "";
      }
    };

    const onLoadedMetadata = () => {
      if (tempVideo.duration === 0 || isNaN(tempVideo.duration)) {
        tryCapture();
      } else {
        const seekTime = Math.min(0.05, Math.max(0.01, tempVideo.duration * 0.01));
        const onSeeked = () => {
          tryCapture();
          tempVideo.removeEventListener("seeked", onSeeked);
        };
        tempVideo.addEventListener("seeked", onSeeked);
        tempVideo.currentTime = seekTime;
      }
    };

    const onError = () => {
      setThumbnail(null);
      tempVideo.src = "";
    };

    tempVideo.addEventListener("loadedmetadata", onLoadedMetadata);
    tempVideo.addEventListener("error", onError);

    const fallbackTimer = setTimeout(() => {
      try {
        tryCapture();
      } catch (e) {
        setThumbnail(null);
      }
    }, 1500);

    return () => {
      clearTimeout(fallbackTimer);
      tempVideo.removeEventListener("loadedmetadata", onLoadedMetadata);
      tempVideo.removeEventListener("error", onError);
      tempVideo.pause();
      tempVideo.src = "";
    };
  }, [videoUrl]);

  const handleThumbnailClick = () => {
    if (!videoUrl) return;
    setShowPlayer(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 0);
  };

  const handleClosePlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowPlayer(false);
  };

  const renderThumbnail = () => {
    if (thumbnail) {
      return (
        <div className="vp-thumb" onClick={handleThumbnailClick}>
          <img src={thumbnail} alt="video thumbnail" className="vp-thumb-img" />
          <div className="vp-play-overlay">▶</div>
        </div>
      );
    }

    return (
      <div className="vp-thumb vp-thumb-fallback" onClick={handleThumbnailClick}>
        {posterFallback ? (
          <img src={posterFallback} alt="video poster" className="vp-thumb-img" />
        ) : (
          <div className="vp-fallback-content">
            <div className="vp-file-icon">🎬</div>
            <div className="vp-filename">{file?.name || (videoUrl ? "Preview" : "No video")}</div>
            <div className="vp-play-overlay">▶</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="video-preview-root">
      {videoUrl ? renderThumbnail() : <div className="vp-placeholder">No video selected.</div>}

      {showPlayer && (
        <div className="vp-player-modal">
          <div className="vp-player-container">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              style={{ maxWidth: "100%", borderRadius: 6 }}
            />
            <div className="vp-player-actions">
              <button type="button" onClick={handleClosePlayer}>Close</button>
            </div>
          </div>
          <div className="vp-backdrop" onClick={handleClosePlayer} />
        </div>
      )}
    </div>
  );
}
