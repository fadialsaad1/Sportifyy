import React, { useState } from "react";
import { motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";

export default function HomePage({ currentPage, setCurrentPage }) {
    const [selectedDay, setSelectedDay] = useState(1);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);

    const handlePlayVideo = () => setShowVideoPlayer(true);
    const handleCloseVideo = () => setShowVideoPlayer(false);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f4c75, #3282b8, #bbe1fa)",
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
                <h1 style={{ fontSize: "24px", fontWeight: "600", marginLeft: "16px", color: "#fff" }}>Sportify</h1>
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
                    {[{ day: 'S', date: 14 }, { day: 'M', date: 15 }, { day: 'T', date: 16 }, { day: 'W', date: 17 }, { day: 'T', date: 18 }, { day: 'F', date: 19 }, { day: 'S', date: 20 }]
                        .map((item, i) => (
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
                    { title: "Technique Score", value: "8.9", subtitle: "/10", color: "#8b5cf6" },
                    { title: "Overall Rating", value: "92", subtitle: "★", color: "#10b981" },
                    { title: "Accuracy", value: "87%", subtitle: "", color: "#3b82f6" },
                    { title: "Shots Made", value: "54", subtitle: "🏀", color: "#f97316" }
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

            {/* Last Practice */}
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
