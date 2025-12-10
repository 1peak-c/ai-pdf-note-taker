import { Sidebar } from "lucide-react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}