import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";

export default function HomePage({ currentPage, setCurrentPage }) {
    const todayIndex = new Date().getDay(); // 0 = Sunday .. 6 = Saturday
    const [selectedDay, setSelectedDay] = useState(todayIndex);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [snapshotStats, setSnapshotStats] = useState({
        techniqueScore: '8.9',
        overallRating: '92',
        accuracy: '87%',
        shotsMade: '54'
    });

    // dailySnapshots holds a snapshot for each day of the week (0-6)
    const [dailySnapshots, setDailySnapshots] = useState(() => {
        // generate random snapshots for the week; current day will be replaced with saved snapshot if any
        const rand = () => {
            const shots = Math.floor(Math.random() * 30) + 1;
            const scores = Math.floor(Math.random() * Math.max(1, shots));
            const technique = Math.max(4, Math.min(10, (shots / 10) + Math.round(scores / 2)));
            const overall = Math.min(100, Math.round(scores * 8 + Math.random() * 20));
            const acc = shots > 0 ? `${Math.round((scores / shots) * 100)}%` : '0%';
            return {
                techniqueScore: technique.toFixed(1),
                overallRating: overall,
                accuracy: acc,
                shotsMade: shots
            };
        };

        const arr = Array.from({ length: 7 }, () => rand());

        try {
            const saved = localStorage.getItem('sportsifySnapshot');
            if (saved) {
                const parsed = JSON.parse(saved);
                arr[todayIndex] = {
                    techniqueScore: parsed.techniqueScore ?? arr[todayIndex].techniqueScore,
                    overallRating: parsed.overallRating ?? arr[todayIndex].overallRating,
                    accuracy: parsed.accuracy ?? arr[todayIndex].accuracy,
                    shotsMade: parsed.shotsMade ?? arr[todayIndex].shotsMade
                };
            }
        } catch (e) {
            // ignore
        }

        return arr;
    });

    useEffect(() => {
        // listen for snapshot updates triggered by the analyzer
        const onSnapshot = (e) => {
            const snap = (e && e.detail) ? e.detail : null;
            if (snap) {
                setDailySnapshots(prev => {
                    const copy = [...prev];
                    copy[todayIndex] = {
                        techniqueScore: snap.techniqueScore,
                        overallRating: snap.overallRating,
                        accuracy: snap.accuracy,
                        shotsMade: snap.shotsMade
                    };
                    return copy;
                });

                // if currently viewing today, update the snapshotStats shown
                if (selectedDay === todayIndex) {
                    setSnapshotStats({
                        techniqueScore: snap.techniqueScore,
                        overallRating: snap.overallRating,
                        accuracy: snap.accuracy,
                        shotsMade: snap.shotsMade
                    });
                }
            }
        };

        window.addEventListener('sportsify:snapshot-updated', onSnapshot);
        return () => window.removeEventListener('sportsify:snapshot-updated', onSnapshot);
    }, [selectedDay, todayIndex]);

    // Week labels (S M T W T F S)
    const week = [
        { day: 'S', date: '' },
        { day: 'M', date: '' },
        { day: 'T', date: '' },
        { day: 'W', date: '' },
        { day: 'T', date: '' },
        { day: 'F', date: '' },
        { day: 'S', date: '' }
    ];

    const handlePlayVideo = () => setShowVideoPlayer(true);
    const handleCloseVideo = () => setShowVideoPlayer(false);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #d5e2ebff, #fdfeffff, #cce4f5ff)",
            paddingTop: "60px",
            paddingBottom: "120px",
            width: "100%",
            maxWidth: "1024px",
            margin: "0 auto",
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Top right icons */}
            <div style={{
                position: "fixed",
                top: "16px",
                right: "16px",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "14px"
            }}>
                <img src="/notification_icon.png" alt="Notifications" style={{ width: "88px", height: "88px" }} />
                <img
                    src="/plus_button_icon.png"
                    alt="Add"
                    style={{ width: "88px", height: "88px", cursor: "pointer" }}
                    onClick={() => setCurrentPage("Basketball Analysis")}
                />
            </div>

            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                marginBottom: "24px"
            }}>
                <img src="/app_icon.png" alt="Sportifyy" style={{ width: "40px", height: "40px" }} />
                <h1 style={{ fontSize: "24px", fontWeight: "700", marginLeft: "16px", color: "#000000ff" }}>Sportify</h1>
            </div>

            {/* Goal Card */}
            <div style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "16px 24px",
                margin: "0 20px 24px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <span style={{ fontSize: "14px", color: "#64748b", marginRight: "6px" }}>Goal:</span>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>Basketball Shot</span>
                </div>
                <img src="/basketball_icon.png" alt="Basketball" style={{ width: "32px", height: "32px" }} />
            </div>

            {/* Calendar */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                margin: "0 20px 34px 20px",
                padding: "12px",
                borderRadius: "16px",
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0"
            }}>
                <button style={{ background: "transparent", border: "none", fontSize: "16px", color: "#64748b", cursor: "pointer" }}>&lt;</button>
                <div style={{ display: "flex", gap: "4px" }}>
                    {week.map((item, i) => (
                        <button key={i} onClick={() => setSelectedDay(i)}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px 12px",
                                borderRadius: "12px",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: selectedDay === i ? "#0f4c75" : "transparent",
                                color: selectedDay === i ? "white" : "#64748b",
                                minWidth: "40px"
                            }}
                        >
                            <span style={{ fontSize: "11px", marginBottom: "2px" }}>{item.day}</span>
                            <span style={{ fontSize: "13px", fontWeight: "600" }}>{item.date}</span>
                        </button>
                    ))}
                </div>
                <button style={{ background: "transparent", border: "none", fontSize: "16px", color: "#64748b", cursor: "pointer" }}>&gt;</button>
            </div>

            {/* Stat Cards */}
            <div style={{
                display: "flex",
                gap: "16px",
                margin: "0 20px 24px 20px",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                {[
                    { title: "Technique Score", value: dailySnapshots[selectedDay]?.techniqueScore ?? snapshotStats.techniqueScore, subtitle: "/10", color: "#8b5cf6" },
                    { title: "Overall Rating", value: dailySnapshots[selectedDay]?.overallRating ?? snapshotStats.overallRating, subtitle: "★", color: "#10b981" },
                    { title: "Accuracy", value: dailySnapshots[selectedDay]?.accuracy ?? snapshotStats.accuracy, subtitle: "", color: "#3b82f6" },
                    { title: "Shots Made", value: dailySnapshots[selectedDay]?.shotsMade ?? snapshotStats.shotsMade, subtitle: "🏀", color: "#f97316" }
                ].map((card, i) => (
                    <div key={i} style={{
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        padding: "14px",
                        width: "165px",
                        height: "110px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                    }}>
                        <div>
                            <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>{card.title}</p>
                            <h3 style={{ fontSize: "26px", fontWeight: "bold", color: "#1e293b", margin: "0" }}>{card.value}</h3>
                            {card.subtitle && <p style={{ fontSize: "13px", color: "#64748b" }}>{card.subtitle}</p>}
                        </div>
                        <div style={{ height: "4px", borderRadius: "2px", backgroundColor: card.color }} />
                    </div>
                ))}
            </div>

            {/* Last Practice  */}
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "16px 24px",
                margin: "0 20px 24px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer"
            }} onClick={handlePlayVideo}>
                <div style={{ width: "80px", height: "60px", borderRadius: "12px", overflow: "hidden" }}>
                    <img src="/last_video_thumbnail.png" alt="Last practice" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#1e293b", lineHeight: "1.5" }}>
                    Your shooting accuracy improved by 5% since last week! Keep it up!
                </p>
            </div>

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {/* Video Modal */}
            {showVideoPlayer && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.9)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2000,
                    padding: "20px"
                }} onClick={handleCloseVideo}>
                    <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
                        <button onClick={handleCloseVideo} style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "rgba(255,255,255,0.9)",
                            border: "none",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#1e293b",
                            zIndex: 2001
                        }}>×</button>
                        <video width="100%" height="auto" controls autoPlay style={{ borderRadius: "12px" }}>
                            <source src="/basketballshot_video.mp4" type="video/mp4" />
                            <source src="/basketballshot_video.webm" type="video/webm" />
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
}
