import { invoke } from '@tauri-apps/api/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChartArea, Activity, LifeBuoy, Package, Receipt, Settings, UserCircle } from "lucide-react";
import GithubIcon from "./assets/github.svg?react";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import UserForm from './components/UserForm';
import Graph from "./components/Graph"
import FAQ from "./components/FAQ"
import React, { useState } from "react";

function Dashboard() {
  return (
    <Graph/>
  )

}

function Statistics() {
  return <div>Statistics Content</div>;
}

function Users() {
  return (
    <UserForm/>
  )
}


function GithubPage() {
  return <div>Github Page</div>;
}

function Orders() {
  return <div>Orders Content</div>;
}

function Billings() {
  return <div>Billings Content</div>;
}

function SettingsPage() {
  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      <iframe src="https://vk.com/video_ext.php?oid=236589834&id=456239450&hd=1&autoplay=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
    </div>
  );
}

function Help() {

  return (
    <FAQ/>

    /*<div className="flex flex-col justify-center items-center bg-gray-900 h-screen text-white">
      <p className="mb-4">Click below to watch the video:</p>
      <a
        href="https://vk.com/video-205643632_456240226"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
      >
        Watch Video
      </a>
    </div>*/
  );

}

export default function App() {
  const routes = [
    { path: "/dashboard", icon: <Activity size={20} />, text: "Dashboard", alert: false },
    { path: "/statistics", icon: <ChartArea size={20} />, text: "Statistics", alert: false },
    { path: "/users", icon: <UserCircle size={20} />, text: "Users", alert: false },
    { path: "/github", icon: <GithubIcon className="w-5 h-5" />, text: "Github", alert: false },
    { path: "/orders", icon: <Package size={20} />, text: "Orders", alert: true },
    { path: "/billings", icon: <Receipt size={20} />, text: "Billings", alert: false },
    { path: "/settings", icon: <Settings size={20} />, text: "Settings", alert: false },
    { path: "/help", icon: <LifeBuoy size={20} />, text: "Help", alert: false },
  ];

  return (
    <Router>
      <main className="App flex">
        <Sidebar>
          {routes.map(({ path, icon, text, alert }) => (
            <SidebarItem key={path} icon={icon} text={text} alert={alert} to={path} />
          ))}
        </Sidebar>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/github" element={<GithubPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/billings" element={<Billings />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}
