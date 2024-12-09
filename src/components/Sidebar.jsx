import { NavLink } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="h-full w-fit flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/286.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?name=User&background=ede9fe&color=a78bfa&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {user ? (
              <div className="leading-4">
                <h4 className="font-semibold">{user.email}</h4>
                <button
                  onClick={logout}
                  className="text-xs text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="text-xs text-blue-500 hover:underline"
              >
                Login/Register
              </button>
            )}
            <MoreVertical size={20} className="cursor-pointer" />
          </div>
        </div>
      </nav>

      {isModalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
    </aside>
  );
}

export function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1 font-bold rounded-md cursor-pointer transition-colors group ${
            isActive
              ? "bg-gradient-to-tr from-teal-100 to-violet-200 text-violet-800"
              : "hover:bg-violet-50 text-gray-600"
          }`
        }
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-violet-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </NavLink>
    </li>
  );
}
