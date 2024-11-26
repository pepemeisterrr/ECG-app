import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BarChart3, Boxes, LayoutDashboard, LifeBuoy, Package, Receipt, Settings, UserCircle } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";

function Dashboard() {
  return <div>Dashboard Content</div>;
}

function Statistics() {
  return <div>Statistics Content</div>;
}

function Users() {
  return <div>Users Content</div>;
}

function Inventory() {
  return <div>Inventory Content</div>;
}

function Orders() {
  return <div>Orders Content</div>;
}

function Billings() {
  return <div>Billings Content</div>;
}

function SettingsPage() {
  return <div>Settings Content</div>;
}

function Help() {
  return <div>Help Content</div>;
}

export default function App() {
  const routes = [
    { path: "/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard", alert: false },
    { path: "/statistics", icon: <BarChart3 size={20} />, text: "Statistics", active: true },
    { path: "/users", icon: <UserCircle size={20} />, text: "Users", alert: false },
    { path: "/inventory", icon: <Boxes size={20} />, text: "Inventory", alert: false },
    { path: "/orders", icon: <Package size={20} />, text: "Orders", alert: true },
    { path: "/billings", icon: <Receipt size={20} />, text: "Billings", alert: false },
    { path: "/settings", icon: <Settings size={20} />, text: "Settings", alert: false },
    { path: "/help", icon: <LifeBuoy size={20} />, text: "Help", alert: false },
  ];

  return (
    <Router>
      <main className="App">
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
        <div className="p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/inventory" element={<Inventory />} />
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
