import React, { useState } from "react";
import HomePage from "./Home";
import ProgressPage from "./Progress";
import PracticePage from "./Practice";
import ProfilePage from "./Profile";
import UploadPage from "./UploadPage";
import Login from "./Login";
import BasketballAnalyzer from "./BasketballAnalyzer";

export default function App() {
    const [currentPage, setCurrentPage] = useState('Sign in');

    const renderPage = () => {
        switch(currentPage) {
            case 'Home':
                return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Progress':
                return <ProgressPage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Practice':
                return <PracticePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Profile':
                return <ProfilePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Upload':
                return <UploadPage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case 'Basketball Analysis':
                return <BasketballAnalyzer currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            case "Sign in":
                return <Login currentPage={currentPage} setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
}