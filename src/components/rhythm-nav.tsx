
import { CalendarIcon, BookOpen, PieChart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-4",
        isActive ? "text-rhythm-primary" : "text-gray-500 hover:text-gray-700"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

const AddButton = () => {
  return (
    <Link
      to="/track"
      className="flex items-center justify-center rounded-full bg-rhythm-primary text-white w-14 h-14 shadow-lg transform -translate-y-4"
    >
      <Plus size={24} />
    </Link>
  );
};

export function RhythmNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around z-50">
      <NavItem
        icon={<PieChart size={20} />}
        label="Cycle"
        to="/"
        isActive={path === "/"}
      />
      <NavItem
        icon={<CalendarIcon size={20} />}
        label="Calendar"
        to="/calendar"
        isActive={path === "/calendar"}
      />
      <div className="flex-1 flex justify-center">
        <AddButton />
      </div>
      <NavItem
        icon={<PieChart size={20} />}
        label="Analysis"
        to="/analysis"
        isActive={path === "/analysis"}
      />
      <NavItem
        icon={<BookOpen size={20} />}
        label="Content"
        to="/content"
        isActive={path === "/content"}
      />
    </div>
  );
}
