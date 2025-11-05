
import React, { useRef, useState, useEffect } from 'react';
import { ref as sref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { FiUpload, FiVideo, FiTrash2, FiCopy, FiCheck } from 'react-icons/fi';

export default function ScanPage() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [localVideoURL, setLocalVideoURL] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (mounted && videoRef.current) videoRef.current.srcObject = stream;
      } catch (e) {
        console.warn('Camera not available or permission denied.', e);
      }
    }
    init();
    return () => { mounted = false; const s = videoRef.current?.srcObject; if (s && s.getTracks) s.getTracks().forEach(t => t.stop()); };
  }, []);

  const startRecording = async () => {
    setCopied(false);
    setDownloadURL('');
    recordedChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setLocalVideoURL(url);
        setFile(new File([blob], `sportify_${Date.now()}.webm`, { type: 'video/webm' }));
        const s = videoRef.current.srcObject; if (s && s.getTracks) s.getTracks().forEach(t => t.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Could not access camera or microphone. Check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const handleFileChange = (e) => {
    setCopied(false);
    setDownloadURL('');
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setLocalVideoURL(url);
  };

  const handleReplace = () => {
    if (localVideoURL) URL.revokeObjectURL(localVideoURL);
    setLocalVideoURL(null);
    setFile(null);
    setUploadProgress(0);
    setUploading(false);
    setDownloadURL('');
  };

  const handleUpload = async () => {
    if (!file) return alert('No video selected.');
    setUploading(true);
    setUploadProgress(0);
    const storageRef = sref(storage, `videos/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(percent);
      },
      (error) => {
        console.error('Upload failed', error);
        alert('Upload failed: ' + error.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setUploading(false);
      }
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(downloadURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Scan Page — Video Capture & Upload</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden border">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover bg-black" />
            {!localVideoURL && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white bg-black bg-opacity-40 p-3 rounded">Camera Preview</div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {!recording ? (
              <button onClick={startRecording} className="flex items-center gap-2 px-4 py-2 rounded bg-red-500 text-white hover:opacity-90">
                <FiVideo /> Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-500 text-black hover:opacity-90">
                Stop Recording
              </button>
            )}

            <label className="flex items-center gap-2 px-4 py-2 rounded border cursor-pointer">
              <FiUpload />
              <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
              Upload File
            </label>

            <button onClick={handleReplace} className="flex items-center gap-2 px-3 py-2 rounded border text-sm">
              <FiTrash2 /> Replace
            </button>
          </div>

          <div className="mt-3">
            <div className="text-sm text-gray-600">Selected video:</div>
            {localVideoURL ? (
              <div className="mt-2 border rounded overflow-hidden">
                <video src={localVideoURL} controls className="w-full h-48 object-contain" />
                <div className="p-2 flex items-center justify-between">
                  <div className="text-sm">{file ? file.name : 'Recorded clip'}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { if (localVideoURL) { const a = document.createElement('a'); a.href = localVideoURL; a.download = file?.name || 'clip.webm'; a.click(); } }} className="text-sm px-3 py-1 border rounded">Download</button>
                    <button onClick={handleUpload} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Upload</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-gray-500">No video selected yet. Record a clip or upload a file.</div>
            )}
          </div>

        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg h-64 flex flex-col justify-center items-center bg-gray-50">
            <div className="text-sm text-gray-600">Upload Status</div>
            <div className="w-full mt-4">
              <div className="h-4 bg-gray-200 rounded">
                <div style={{ width: `${uploadProgress}%` }} className="h-4 bg-blue-600 rounded transition-all" />
              </div>
              <div className="mt-2 text-sm">{uploading ? `Uploading... ${uploadProgress}%` : uploadProgress > 0 ? `Uploaded ${uploadProgress}%` : 'No upload yet'}</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <div className="text-sm font-medium mb-2">Uploaded Video</div>
            {downloadURL ? (
              <div className="space-y-2">
                <video src={downloadURL} controls className="w-full h-48 object-contain rounded" />
                <div className="flex items-center gap-2 mt-2">
                  <input className="flex-1 px-3 py-2 border rounded" value={downloadURL} readOnly />
                  <button onClick={handleCopy} className="px-3 py-2 border rounded flex items-center gap-2">
                    {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No uploaded video yet. After upload completes, a playback link will appear here.</div>
            )}
          </div>

          <div className="text-xs text-gray-400">Tip: Use a short clip (5-30s) for faster uploads and AI analysis.</div>
        </div>
      </div>

    </div>
  );
}
