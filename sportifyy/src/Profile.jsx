import React, { useState, useEffect, useRef } from "react";
import BottomNavigation from "./BottomNavigation";
import PositionDropdown from "./PositionDropdown";
import CirclePercentageChart from "./CirclePercentageChart";

export default function ProfilePage({ currentPage, setCurrentPage }) {
    const [user, setUser] = useState(null);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [activities, setActivities] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        try {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                const storedUser = JSON.parse(storedUserData);
                const firstName = storedUser.name?.split(" ")[0] || storedUser.name || "User";

                const userWithDefaults = {
                    name: "",
                    firstName: "User",
                    level: 1,
                    badges: 0,
                    favoriteSport: "Basketball",
                    avatar: "/avatar.png",
                    ...storedUser,
                    firstName,
                };
                setUser(userWithDefaults);
            } else {
                setCurrentPage("Sign in");
            }

            const savedAnalysis = JSON.parse(localStorage.getItem("sportsifyAnalysis")) || [];
            setAnalysisHistory(savedAnalysis);

            const activityList = savedAnalysis.map(
                entry => `✅ Analysis completed: ${entry.filename || "Unknown File"}`
            );
            setActivities(activityList);

        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    }, [setCurrentPage]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            try {
                const updatedUser = { ...user, avatar: reader.result };
                setUser(updatedUser);
                localStorage.setItem("userData", JSON.stringify(updatedUser));
            } catch (error) {
                console.error("Error saving avatar:", error);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDownloadReport = () => {
        if (!user) return;

        let report = `
🏀 Sportify Player Report
---------------------------
Name: ${user.firstName || "User"}
Level: ${user.level || 1}
Favorite Sport: ${user.favoriteSport || "Basketball"}
Generated: ${new Date().toLocaleString()}

🧠 AI Basketball Analysis History
`;

        if (analysisHistory.length === 0) {
            report += "\nNo analysis data yet.\n";
        } else {
            analysisHistory.forEach((entry, index) => {
                report += `
${index + 1}. File: ${entry.filename || "Unknown"}
   Timestamp: ${entry.timestamp || "Unknown"}
   Shots: ${entry.shots || 0}, Passes: ${entry.passes || 0}, Scores: ${entry.scores || 0}
`;
            });
        }

        const blob = new Blob([report], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${user.firstName || "Sportify"}_Report.txt`;
        link.click();
    };

    if (!user)
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

    // ⭐ NEW: Dynamic performance score
    const totalActivities = activities.length;
    const performanceScore = Math.min(100, Math.max(5, (totalActivities / 20) * 100));

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #d5e2ebff, #fdfeffff, #cce4f5ff)",
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
                    onClick={() => fileInputRef.current?.click()}
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

                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#000000ff", marginTop: "12px" }}>
                    {user.firstName}
                </h2>

                <p style={{ color: "#000", marginTop: "4px", fontWeight: 500 }}>
                    Level {user.level} • {user.favoriteSport?.toUpperCase() || "SPORT"} Fan
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
                    <h3 style={{ fontSize: "18px", color: "#000", fontWeight: "700" }}>{user.badges}</h3>
                    <p style={{ fontSize: "14px", color: "#000" }}>Badges</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "18px", color: "#000", fontWeight: "700" }}>{totalActivities}</h3>
                    <p style={{ fontSize: "14px", color: "#000" }}>Activities</p>
                </div>
            </div>

            {/* ⭐ Performance Overview */}
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "25px",
                margin: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center"
            }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "20px" }}>
                    Performance Overview
                </h3>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CirclePercentageChart percentage={Math.round(performanceScore)} size={150} strokeWidth={12} />
                </div>

                <p style={{ marginTop: "12px", color: "#475569" }}>
                    Based on your last {totalActivities} activities
                </p>
            </div>

            <PositionDropdown />

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
                                <strong>{entry.filename || "Unknown File"}</strong> — {entry.timestamp || "Unknown Time"}<br />
                                Shots: {entry.shots || 0}, Passes: {entry.passes || 0}, Scores: {entry.scores || 0}
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
