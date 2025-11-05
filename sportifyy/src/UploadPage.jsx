import React, { useState } from "react";

export default function UploadPage({ setCurrentPage }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Simulate upload process
    const handleUpload = () => {
        if (!selectedFile) return alert("Please select a file first.");
        setUploading(true);

        setTimeout(() => {
            setUploading(false);
            alert(`✅ ${selectedFile.name} uploaded successfully!`);
            setSelectedFile(null);
        }, 2000);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            {/* Header */}
            <h1
                style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    marginBottom: "20px",
                }}
            >
                Upload Your Video
            </h1>

            {/* Upload box */}
            <div
                style={{
                    backgroundColor: "white",
                    border: "2px dashed #94a3b8",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "400px",
                    height: "220px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "0.2s ease",
                    marginBottom: "24px",
                }}
                onClick={() => document.getElementById("fileInput").click()}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#1e293b")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#94a3b8")
                }
            >
                <input
                    id="fileInput"
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                {selectedFile ? (
                    <>
                        <p
                            style={{
                                color: "#0f172a",
                                fontSize: "14px",
                                marginBottom: "8px",
                            }}
                        >
                            {selectedFile.name}
                        </p>
                        <p style={{ color: "#64748b", fontSize: "12px" }}>
                            Click again to change file
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            src="/upload_icon.png"
                            alt="Upload"
                            style={{ width: "48px", height: "48px", marginBottom: "8px" }}
                        />
                        <p style={{ color: "#64748b", fontSize: "14px" }}>
                            Click to upload your training video
                        </p>
                    </>
                )}
            </div>

            {/* Upload button */}
            <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                    backgroundColor: uploading ? "#94a3b8" : "#0f172a",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    cursor: uploading ? "not-allowed" : "pointer",
                    transition: "0.2s ease",
                    fontSize: "14px",
                    fontWeight: "500",
                }}
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>

            {/* Back button */}
            <button
                onClick={() => setCurrentPage("Home")}
                style={{
                    marginTop: "30px",
                    backgroundColor: "transparent",
                    color: "#1e293b",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "8px 18px",
                    cursor: "pointer",
                    fontSize: "13px",
                }}
            >
                ← Back to Home
            </button>
        </div>
    );
}
