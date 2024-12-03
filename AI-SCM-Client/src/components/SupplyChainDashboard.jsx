import { useState, useCallback } from 'react';
import RealTimeTracking from './RealTimeTracking';
import InventoryManagement from './InventoryManagement';
import LogisticsOptimization from './LogisticsOptimization';
import DemandForecasting from './DemandForecasting';

const tabs = [
  { id: 'tracking', label: 'Real-Time Tracking', component: RealTimeTracking },
  { id: 'inventory', label: 'Inventory Management', component: InventoryManagement },
  { id: 'logistics', label: 'Logistics Optimization', component: LogisticsOptimization },
  { id: 'forecasting', label: 'Demand Forecasting', component: DemandForecasting },
];

export default function SupplyChainDashboard() {
  const [activeTab, setActiveTab] = useState('tracking');

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || null;

  return (
    <div className="container mx-auto p-4 bg-yellow-200 min-h-screen">
      <h1 className="text-5xl font-bold mb-6 text-black uppercase tracking-wider">
        AI-Powered Supply Chain Platform
      </h1>
      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 mr-2 text-lg font-bold uppercase ${
              activeTab === tab.id
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-200'
            } border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {ActiveComponent && <ActiveComponent />} {/* Render dynamically as a proper component */}
      </div>
    </div>
  );
}
