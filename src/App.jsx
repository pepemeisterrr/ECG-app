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

import Graph from "./components/Graph"

import React from "react";

function Dashboard() {
  return (
    <Graph/>
  )
}

function Statistics() {
  return (
    <div className="py-2 px-3 my-1">
      <span className="overflow-hidden transition-all font-semibold text-xl">
        ECG Data<br/>
        Тут будет история данных
      </span>
    </div>
  )
}

function Users() {
  return (
    <div className="py-2 px-3 my-1 bg-gradient-to-tl rounded-md from-grviolet to-grblue">
      <span className="overflow-hidden transition-all font-bold text-xl">Literally me</span>
      <img
        src="https://sun9-72.userapi.com/impg/KsWXGvkp8JHlN6wF3prxbPz_yXUeFUvP4aVErA/75o0LiTS8Z0.jpg?size=604x604&quality=95&sign=81d759d9cd34c75ea52495a8417d191a&type=album"
        className="py-5"
      />
      </div>
  )
}

function GithubPage() {
  return <div className="py-2 px-3 my-1">
    <span className="overflow-hidden transition-all font-semibold text-xl">Here is the <a href="https://github.com/pepemeisterrr/ECG-app" target="_blank" rel="noopener noreferrer" className="text-sky-500 font-semibold hover:text-orange-600 underline">
      GitHub repository
      </a> for the ECG app.</span>
    <img
      src="https://sun9-28.userapi.com/impg/nnhBsh3xvDXJ80iaAA5lEVnkOoZBu6n8X7aauQ/hQJjXE_0AmE.jpg?size=820x780&quality=96&sign=fdb5732484f4e261c5fc7701ab1985c4&type=album"
      className="py-5"
    />
  </div>;
}

function Orders() {
  return (
     <div>Бесполезный раздел #1
  <img
    src="https://sun1-21.userapi.com/impg/wqqmG3QfZsv7PBQ6_cjJeiuCxVKM1eXcBVMqXA/gw8kcLBUI-o.jpg?size=1200x1200&quality=96&sign=7a06046d3a0f9db9d8362d1e61fa8199&type=album"
    className="py-5"
  />
  </div>
  )
}

function Billings() {
  return <div>Бесполезный раздел #2
  <img
    src="https://sun1-90.userapi.com/impg/KJ8gAnkE9DnSHLaDmUg9Xts9G7kFbd280AorNA/-EuDeS2GiBE.jpg?size=1280x1180&quality=96&sign=a22ba3fe44472e104a0d37f649baa4ac&type=album"
    className="py-5"
  />
  </div>;
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
    <div className="flex flex-col justify-center items-center bg-gray-900 h-screen text-white">
      <p className="mb-4">Click below to watch the video:</p>
      <a
        href="https://vk.com/video-205643632_456240226"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
      >
        Watch Video
      </a>
    </div>
  );
}

export default function App() {
  const routes = [
    { path: "/dashboard", icon: <Activity size={20} />, text: "Dashboard", alert: false },
    { path: "/statistics", icon: <ChartArea size={20} />, text: "Statistics", active: true },
    { path: "/users", icon: <UserCircle size={20} />, text: "Users", alert: false },
    { path: "/github", icon: <GithubIcon className="w-5 h-5" size={20} />, text: "Github", alert: false },
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
            <SidebarItem
              key={path}
              icon={icon}
              text={text}
              alert={alert}
              to={path}
            />
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
