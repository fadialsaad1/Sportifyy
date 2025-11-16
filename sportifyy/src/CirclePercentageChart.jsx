import React from "react";

export default function CirclePercentageChart({ percentage = 0, size = 120, strokeWidth = 12 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <div style={{ width: size, height: size, position: "relative" }}>
            <svg width={size} height={size}>
                {/* Background circle */}
                <circle
                    stroke="#e2e8f0"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />

                {/* Progress circle */}
                <circle
                    stroke="#2563eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
            </svg>

            {/* Percentage text */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#1e293b",
                }}
            >
                {percentage}%
            </div>
        </div>
    );
}
