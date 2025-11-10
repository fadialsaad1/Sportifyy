import React, { useState } from "react";
import BottomNavigation from "./BottomNavigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage({ currentPage, setCurrentPage }) {
    const [showReport, setShowReport] = useState(false);

    // Function to generate and download report
    const handleDownloadReport = () => {
        const reportData = `
🏀 Sportify Player Performance Report
--------------------------------------
Name: Alex
Level: 14 - Basketball Enthusiast

📈 Shooting Accuracy: 88%
🎯 Free Throw This Month: 75%

Recent Activities:
- Completed "Practice Drill 3"
- Joined "Dribbling Masters" Group
--------------------------------------
Generated on: ${new Date().toLocaleString()}
`;
        const blob = new Blob([reportData], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Sportify_Report.txt";
        link.click();
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                paddingTop: '60px',
                paddingBottom: '120px',
                width: '100%',
                maxWidth: '1024px',
                margin: '0 auto',
                position: 'relative'
            }}
        >
            {/* Profile Header */}
            <div
                style={{
                    textAlign: "center",
                    padding: "40px 16px 20px 16px",
                }}
            >
                {/* Avatar */}
                <img
                    src="/avatar.png"
                    alt="Profile Avatar"
                    style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        border: "3px solid #3b82f6",
                        marginBottom: "12px",
                    }}
                />
                <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1e293b" }}>
                    Alex
                </h2>
                <p style={{ color: "#64748b", marginTop: "4px" }}>
                    Level 14 - Basketball Enthusiast
                </p>

                {/* 📊 Report Button */}
                <button
                    onClick={() => setShowReport(true)}
                    style={{
                        marginTop: "12px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontWeight: "500",
                    }}
                >
                    📊 View Reports
                </button>
            </div>

            {/* Stats Row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                    marginBottom: "24px",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>
                        353
                    </h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8" }}>Followers</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>
                        0
                    </h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8" }}>Badges</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>
                        120
                    </h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8" }}>Following</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    margin: "0 20px 20px 20px",
                    padding: "20px",
                }}
            >
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                    Recent Activity
                </h3>
                <ul style={{ marginTop: "10px", color: "#475569", fontSize: "14px" }}>
                    <li>✅ Completed "Practice Drill 3"</li>
                    <li>🏀 Joined "Dribbling Masters" Group</li>
                </ul>
            </div>

            {/* Skills & Progress */}
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    margin: "0 20px",
                    padding: "20px",
                }}
            >
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                    Skills & Progress
                </h3>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "40px",
                        marginTop: "16px",
                    }}
                >
                    {/* Shooting Accuracy */}
                    <div style={{ textAlign: "center" }}>
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                border: "5px solid #22c55e",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto",
                                fontWeight: "600",
                                color: "#16a34a",
                            }}
                        >
                            88%
                        </div>
                        <p style={{ marginTop: "8px", fontSize: "14px", color: "#475569" }}>
                            Shooting Accuracy
                        </p>
                    </div>

                    {/* Free Throw */}
                    <div style={{ textAlign: "center" }}>
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                border: "5px solid #22c55e",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto",
                                fontWeight: "600",
                                color: "#16a34a",
                            }}
                        >
                            75%
                        </div>
                        <p style={{ marginTop: "8px", fontSize: "14px", color: "#475569" }}>
                            Free Throw This Month
                        </p>
                    </div>
                </div>
            </div>

            {/* 📄 Report Modal */}
            <AnimatePresence>
                {showReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "16px",
                                padding: "24px",
                                width: "90%",
                                maxWidth: "400px",
                                textAlign: "center",
                            }}
                        >
                            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>
                                Performance Report
                            </h3>
                            <p style={{ marginTop: "8px", color: "#475569", fontSize: "14px" }}>
                                Shooting Accuracy: 88% <br />
                                Free Throw This Month: 75% <br />
                                Level: 14 - Basketball Enthusiast
                            </p>

                            <div style={{ marginTop: "20px" }}>
                                <button
                                    onClick={handleDownloadReport}
                                    style={{
                                        backgroundColor: "#16a34a",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 20px",
                                        marginRight: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ⬇️ Download Report
                                </button>
                                <button
                                    onClick={() => setShowReport(false)}
                                    style={{
                                        backgroundColor: "#e5e7eb",
                                        color: "#1e293b",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}