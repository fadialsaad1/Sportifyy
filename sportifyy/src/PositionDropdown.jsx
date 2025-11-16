import React, { useState, useEffect } from "react";

export default function PositionDropdown() {
    const [position, setPosition] = useState("");
    const [user, setUser] = useState(null);

    const positions = [
        { value: "Point Guard", tips: "Focus on court vision, passing, and ball-handling. Improve decision-making and leadership." },
        { value: "Shooting Guard", tips: "Develop shooting accuracy, off-ball movement, and learn to create your own shot." },
        { value: "Small Forward", tips: "Become versatile—strong driving, perimeter defense, and all-around scoring." },
        { value: "Power Forward", tips: "Work on rebounding, post moves, strength, and mid-range consistency." },
        { value: "Center", tips: "Focus on rim protection, footwork, rebounding, and post scoring." }
    ];

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            if (parsed.basketballPosition) {
                setPosition(parsed.basketballPosition);
            }
        }
    }, []);

    const handleChange = (e) => {
        const newPosition = e.target.value;
        setPosition(newPosition);

        const raw = localStorage.getItem("userData");
        if (raw) {
            const parsed = JSON.parse(raw);
            const updated = { ...parsed, basketballPosition: newPosition };
            localStorage.setItem("userData", JSON.stringify(updated));
            setUser(updated);
        }
    };

    const getTips = () => {
        const item = positions.find(p => p.value === position);
        return item ? item.tips : "";
    };

    if (!user) return null;

    return (
        <div
            style={{
                margin: "20px",
                padding: "22px",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "26px", marginRight: "12px" }}>🏀</span>
                <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1e293b" }}>
                        Basketball Position
                    </h3>
                    {position && (
                        <span style={{ fontSize: "13px", color: "#64748b" }}>
                            Current: <strong>{position}</strong>
                        </span>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            <select
                value={position}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    fontSize: "14px",
                    color: "#1e293b",
                    fontWeight: "500",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    transition: "0.2s",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
                onBlur={(e) => (e.target.style.border = "1px solid #cbd5e1")}
            >
                <option value="">Select Your Position</option>
                {positions.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                        {pos.value}
                    </option>
                ))}
            </select>

            {/* Tips Box */}
            {position && getTips() && (
                <div
                    style={{
                        marginTop: "18px",
                        padding: "14px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "12px",
                        borderLeft: "4px solid #2563eb",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#334155",
                            lineHeight: "1.5"
                        }}
                    >
                        💡 <strong>Tips for {position}:</strong> {getTips()}
                    </p>
                </div>
            )}
        </div>
    );
}
