import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FolderOpen, Brain } from 'lucide-react';
import DefectDetection from './road-condition/DefectDetection';
import DetectionResults from './road-condition/DetectionResults';
import DetectionReport from './road-condition/DetectionReport';

const RoadCondition: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('detection');

  const renderContent = () => {
    switch (activeTab) {
      case 'detection':
        return <DefectDetection />;
      case 'results':
        return <DetectionResults />;
      case 'report':
        return <DetectionReport />;
      default:
        return <DefectDetection />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('roadCondition')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      {/* 子功能菜单 */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('detection')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'detection'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'zh' ? '病害检测' : 'Defect Detection'}
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'zh' ? '检测结果' : 'Detection Results'}
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'report'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'zh' ? '检测报表' : 'Detection Report'}
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default RoadCondition;