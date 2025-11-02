import React from "react";
import { motion } from "framer-motion";
import { Settings, Home, TrendingUp, FileText, Dumbbell } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center p-6">
            <motion.div
                className="mt-10 bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md text-center border border-slate-700"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.img
                    src="https://i.pravatar.cc/150"
                    alt="Profile"
                    className="w-28 h-28 rounded-full mx-auto shadow-lg border-4 border-sky-400"
                    whileHover={{ scale: 1.05 }}
                />
                <h2 className="mt-4 text-2xl font-bold tracking-wide">Fadi Al-Saad</h2>
                <p className="text-sky-400 mt-1 text-sm font-medium">Sportify Member</p>
                <button className="mt-5 bg-sky-500 hover:bg-sky-600 transition-all text-white px-4 py-2 rounded-lg shadow-md">
                    Edit Profile
                </button>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
                {[
                    { icon: Dumbbell, label: "Workouts", value: "12" },
                    { icon: TrendingUp, label: "Progress", value: "78%" },
                    { icon: FileText, label: "Reports", value: "5" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="bg-slate-800/50 p-4 rounded-xl text-center hover:bg-sky-600/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <item.icon className="mx-auto mb-2 text-sky-400" size={26} />
                        <h3 className="text-lg font-semibold">{item.value}</h3>
                        <p className="text-sm text-slate-300">{item.label}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="fixed bottom-4 bg-slate-800/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg flex justify-between items-center gap-8 border border-slate-700"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
            >
                {[
                    { icon: Home, label: "Home" },
                    { icon: TrendingUp, label: "Progress" },
                    { icon: FileText, label: "Reports" },
                    { icon: Dumbbell, label: "Practice" },
                    { icon: Settings, label: "Settings" },
                ].map((item, i) => (
                    <motion.button
                        key={i}
                        className="flex flex-col items-center text-slate-300 hover:text-sky-400 transition-all"
                        whileHover={{ scale: 1.15 }}
                    >
                        <item.icon size={22} />
                        <span className="text-xs mt-1">{item.label}</span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}