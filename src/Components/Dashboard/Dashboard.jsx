import React from "react";
import "./Dashboard.css";
import CustomNavbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";

const Dashboard = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <CustomNavbar />
            <Hero />
            <Footer />
        </div>
    );

}

export default Dashboard;