
import { BarChart3, Boxes, LayoutDashboard, LifeBuoy, Package, Receipt, Settings, UserCircle } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";

export default function App() {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
      />
      <SidebarItem icon={<BarChart3 size={20} /> } text="Statistics" active />
      <SidebarItem icon={<UserCircle size={20} /> } text="Users" />
      <SidebarItem icon={<Boxes size={20} /> } text="Inventory" />
      <SidebarItem icon={<Package size={20} /> } text="Orders" alert/>
      <SidebarItem icon={<Receipt size={20} /> } text="Billings" />
      <hr className="my-3" />
      <SidebarItem icon={<Settings size={20} /> } text="Settings" />
      <SidebarItem icon={<LifeBuoy size={20} /> } text="Help" />
      </Sidebar>
    </main>
  )
}