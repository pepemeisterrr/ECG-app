import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChartArea, Activity, LifeBuoy, Package, Receipt, Settings, UserCircle } from "lucide-react";
import GithubIcon from "./assets/github.svg?react";
import { UserProvider } from "./components/UserContext";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import UserForm from './components/UserForm';
import Graph from "./components/Graph"
import FAQ from "./components/FAQ"
import Data from "./components/Data"
import React, { useState } from "react";

function Dashboard() {
  return (
    <Graph/>
  )
}

function Statistics() {
  return (
    <Data/>
  )
}

function Users() {
  return (
    <UserForm/>
  )
}

function GithubPage() {
  return (
  <div className="py-2 px-3 my-1">
   <span className="overflow-hidden transition-all font-semibold text-xl">Here is the <a href="https://github.com/pepemeisterrr/ECG-app" target="_blank" rel="noopener noreferrer" className="text-sky-500 font-semibold hover:text-orange-600 underline">
      GitHub repository
      </a> for the ECG app.</span>
  </div>
  )
}

function Orders() {
  return <div>Orders Content</div>;
}

function Billings() {
  return <div>Billings Content</div>;
}

function SettingsPage() {
  return <div>Settings</div>;
}

function Help() {
  return (
    <FAQ/>
  )
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
    <UserProvider>
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
    </UserProvider>
  );
}
