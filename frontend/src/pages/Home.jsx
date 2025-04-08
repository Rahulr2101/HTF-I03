import { useState } from "react";
import { SimpleSidebar } from "@/components/SimpleSidebar";
import MapView from "@/components/mapComponent";

export default function Home() {
  const [selectedView, setSelectedView] = useState("Models");
  
  // Function to pass to the sidebar to update the selected view
  const handleViewChange = (viewName) => {
    setSelectedView(viewName);
  };

  // Render the appropriate component based on the selected view
  const renderContent = () => {
    switch (selectedView) {
      case "Playground":
        return <div className="p-8"><h1 className="text-3xl font-bold">Playground</h1></div>;
      case "Models":
        return <MapView />;
      case "Documentation":
        return <div className="p-8"><h1 className="text-3xl font-bold">Documentation</h1></div>;
      case "Settings":
        return <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SimpleSidebar onViewChange={handleViewChange} />
      <main className="flex-1 h-full w-full overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}