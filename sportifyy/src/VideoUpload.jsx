import React, { useState } from "react";

const VideoUpload = ({ onVideoSelect }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      if (onVideoSelect) onVideoSelect(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      if (onVideoSelect) onVideoSelect(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-400 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        id="video-upload"
      />

      <label
        htmlFor="video-upload"
        className="cursor-pointer text-center text-gray-700"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="mb-2 text-lg font-semibold">
          {videoFile ? videoFile.name : "Click or Drag & Drop your video here"}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: MP4, MOV, AVI, WEBM
        </p>

        <button
          type="button"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Select Video
        </button>
      </label>

      {videoURL && (
        <div className="mt-6 w-full flex flex-col items-center">
          <video
            src={videoURL}
            controls
            className="rounded-lg shadow-lg w-full max-w-md"
          />
          <p className="mt-2 text-gray-600 text-sm">Preview</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
