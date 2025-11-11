import React, { useState, useEffect, useRef } from "react";
import BottomNavigation from "./BottomNavigation";

export default function ProfilePage({ currentPage, setCurrentPage }) {
    const [user, setUser] = useState(null);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [activities, setActivities] = useState([]);
    const fileInputRef = useRef(null);

    // Load user info and AI analysis data
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser) {
            const firstName = storedUser.name?.split(" ")[0] || storedUser.name;
            setUser({ ...storedUser, firstName });
        } else {
            setCurrentPage("Sign in");
        }

        const savedAnalysis = JSON.parse(localStorage.getItem("sportsifyAnalysis")) || [];
        setAnalysisHistory(savedAnalysis);

        const activityList = savedAnalysis.map(
            entry => `✅ Analysis completed: ${entry.filename}`
        );
        setActivities(activityList);
    }, [setCurrentPage]);

    // Avatar upload handler
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = { ...user, avatar: reader.result };
            setUser(updatedUser);
            localStorage.setItem("userData", JSON.stringify(updatedUser));
        };
        reader.readAsDataURL(file);
    };

    const handleDownloadReport = () => {
        if (!user) return;

        let report = `
🏀 Sportify Player Report
---------------------------
Name: ${user.firstName}
Level: ${user.level}
Favorite Sport: ${user.favoriteSport}
Generated: ${new Date().toLocaleString()}

🧠 AI Basketball Analysis History
`;

        if (analysisHistory.length === 0) {
            report += "\nNo analysis data yet.\n";
        } else {
            analysisHistory.forEach((entry, index) => {
                report += `
${index + 1}. File: ${entry.filename}
   Timestamp: ${entry.timestamp}
   Shots: ${entry.shots}, Passes: ${entry.passes}, Scores: ${entry.scores}
`;
            });
        }

        const blob = new Blob([report], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${user.firstName}_Sportify_Report.txt`;
        link.click();
    };

    if (!user)
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f4c75, #3282b8, #bbe1fa)",
                paddingTop: "60px",
                paddingBottom: "120px",
                width: "100%",
                maxWidth: "1024px",
                margin: "0 auto",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            {/* Profile Header */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
                <div
                    style={{ position: "relative", width: "110px", height: "110px", cursor: "pointer" }}
                    onClick={() => fileInputRef.current.click()}
                >
                    <img
                        src={user.avatar || "/avatar.png"}
                        alt="Profile Avatar"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            border: "4px solid #2563eb",
                            objectFit: "cover",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                    />
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginTop: "12px" }}>
                    {user.firstName}
                </h2>
                <p style={{ color: "#dbeafe", marginTop: "4px", fontWeight: 500 }}>
                    Level {user.level} - {user.favoriteSport?.toUpperCase() || "SPORT"} Fan
                </p>

                <button
                    onClick={handleDownloadReport}
                    style={{
                        marginTop: "16px",
                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        color: "white",
                        border: "none",
                        borderRadius: "16px",
                        padding: "12px 28px",
                        fontSize: "15px",
                        cursor: "pointer",
                        fontWeight: "600",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        transition: "all 0.3s ease",
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                    📊 Download Most Recent Report
                </button>
            </div>

            {/* Stats & Badges */}
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px",
                padding: "20px",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>{user.badges}</h3>
                    <p style={{ fontSize: "14px", color: "#dbeafe" }}>Badges</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>{activities.length}</h3>
                    <p style={{ fontSize: "14px", color: "#dbeafe" }}>Activities</p>
                </div>
            </div>

            {/* AI Analysis Section */}
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
                margin: "0 20px 20px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "12px" }}>
                    🧠 AI Basketball Analysis History
                </h3>
                {analysisHistory.length === 0 ? (
                    <p style={{ color: "#64748b", fontSize: "14px" }}>No analysis data yet.</p>
                ) : (
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {analysisHistory.map((entry, i) => (
                            <li key={i} style={{
                                padding: "10px",
                                marginBottom: "10px",
                                backgroundColor: "#f1f5f9",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }}>
                                <strong>{entry.filename}</strong> — {entry.timestamp}<br />
                                Shots: {entry.shots}, Passes: {entry.passes}, Scores: {entry.scores}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Recent Activity Section */}
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "20px",
                margin: "0 20px 20px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "12px" }}>
                    Recent Activity
                </h3>
                <ul style={{ listStyle: "none", paddingLeft: 0, color: "#475569", fontSize: "14px" }}>
                    {activities.length > 0 ? (
                        activities.map((a, i) => <li key={i}>{a}</li>)
                    ) : (
                        <li>No activity yet.</li>
                    )}
                </ul>
            </div>

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
