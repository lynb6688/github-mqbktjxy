import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoadProfile from './components/RoadProfile';
import RoadCondition from './components/RoadCondition';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'roadProfile':
        return <RoadProfile />;
      case 'roadCondition':
        return <RoadCondition />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {renderPage()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;