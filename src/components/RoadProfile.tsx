import React, { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useLanguage } from '../context/LanguageContext';
import { Activity, AlertTriangle, BarChart, Car, Table, X } from 'lucide-react';

// 模拟路面病害数据 - 在杭州区域范围内随机分布
const roadDefects = [
  {
    id: 1,
    position: [119.649506, 29.089524],
    type: '裂缝',
    severity: '轻微',
    area: '2.5m²',
    lastInspection: '2024-03-01'
  },
  {
    id: 2,
    position: [119.652506, 29.092524],
    type: '坑洞',
    severity: '中等',
    area: '1.2m²',
    lastInspection: '2024-03-05'
  },
  {
    id: 3,
    position: [119.645506, 29.088524],
    type: '车辙',
    severity: '严重',
    area: '5.0m²',
    lastInspection: '2024-03-10'
  },
  {
    id: 4,
    position: [119.648506, 29.085524],
    type: '龟裂',
    severity: '中等',
    area: '3.8m²',
    lastInspection: '2024-03-12'
  },
  {
    id: 5,
    position: [119.651506, 29.087524],
    type: '沉陷',
    severity: '严重',
    area: '4.2m²',
    lastInspection: '2024-03-15'
  },
  {
    id: 6,
    position: [119.647506, 29.091524],
    type: '松散',
    severity: '轻微',
    area: '1.8m²',
    lastInspection: '2024-03-18'
  }
];

interface DefectReportModalProps {
  defect: typeof roadDefects[0] | null;
  onClose: () => void;
  onSubmit: (phone: string, notes: string) => void;
}

const DefectReportModal: React.FC<DefectReportModalProps> = ({ defect, onClose, onSubmit }) => {
  const { language } = useLanguage();
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!defect) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phone, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'zh' ? '路面病害报告' : 'Road Defect Report'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* 病害信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '病害类型' : 'Defect Type'}
                </label>
                <input
                  type="text"
                  value={defect.type}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '严重程度' : 'Severity'}
                </label>
                <input
                  type="text"
                  value={defect.severity}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '面积' : 'Area'}
                </label>
                <input
                  type="text"
                  value={defect.area}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'zh' ? '检查日期' : 'Inspection Date'}
                </label>
                <input
                  type="text"
                  value={defect.lastInspection}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '坐标' : 'Coordinates'}
              </label>
              <input
                type="text"
                value={defect.position.join(', ')}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            {/* 联系电话 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '联系电话' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'zh' ? '请输入联系电话' : 'Enter phone number'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* 备注 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'zh' ? '备注' : 'Notes'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'zh' ? '请输入备注信息' : 'Enter notes'}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {language === 'zh' ? '发送' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RoadProfile: React.FC = () => {
  const { t, language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const infoWindow = useRef<any>(null);
  const [showTable, setShowTable] = useState(false);
  const [hoveredDefect, setHoveredDefect] = useState<number | null>(null);
  const [selectedDefect, setSelectedDefect] = useState<typeof roadDefects[0] | null>(null);

  useEffect(() => {
    AMapLoader.load({
      key: '1bf26ce046313c381a3f49e6ce15190a',
      version: '2.0',
      plugins: ['AMap.PolyEditor', 'AMap.Scale', 'AMap.ToolBar', 'AMap.InfoWindow']
    }).then((AMap) => {
      if (mapRef.current && !mapInstance.current) {
        const map = new AMap.Map(mapRef.current, {
          zoom: 14,
          center: [119.649506, 29.089524],
          viewMode: '3D'
        });

        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());

        infoWindow.current = new AMap.InfoWindow({
          isCustom: true,
          autoMove: true,
          offset: new AMap.Pixel(0, -20)
        });

        // 创建路线
        const path = roadDefects.map(defect => defect.position);
        const polyline = new AMap.Polyline({
          path: path,
          strokeColor: '#3B82F6',
          strokeWeight: 4,
          strokeOpacity: 0.6,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5]
        });

        // 为每个病害点创建标记
        roadDefects.forEach((defect) => {
          // 根据严重程度设置不同的颜色
          let markerColor = '#4ADE80'; // 轻微 - 绿色
          if (defect.severity === '中等') {
            markerColor = '#FBBF24'; // 中等 - 黄色
          } else if (defect.severity === '严重') {
            markerColor = '#EF4444'; // 严重 - 红色
          }

          const marker = new AMap.Marker({
            position: defect.position,
            icon: new AMap.Icon({
              size: new AMap.Size(16, 16),
              image: `data:image/svg+xml;base64,${btoa(`<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" fill="${markerColor}" stroke="white" stroke-width="2"/></svg>`)}`,
              imageSize: new AMap.Size(16, 16)
            }),
            offset: new AMap.Pixel(-8, -8),
            title: defect.type,
            cursor: 'pointer'
          });

          marker.on('mouseover', () => {
            setShowTable(true);
            setHoveredDefect(defect.id);
            const content = `
              <div class="bg-white p-4 rounded-lg shadow-lg min-w-[200px]">
                <h3 class="font-semibold text-gray-800 mb-2">${language === 'zh' ? '路面病害信息' : 'Road Defect Info'}</h3>
                <div class="space-y-1">
                  <p class="text-sm"><span class="text-gray-600">${language === 'zh' ? '病害类型' : 'Type'}:</span> ${defect.type}</p>
                  <p class="text-sm"><span class="text-gray-600">${language === 'zh' ? '严重程度' : 'Severity'}:</span> 
                    <span style="color: ${markerColor}">${defect.severity}</span>
                  </p>
                  <p class="text-sm"><span class="text-gray-600">${language === 'zh' ? '病害面积' : 'Area'}:</span> ${defect.area}</p>
                  <p class="text-sm"><span class="text-gray-600">${language === 'zh' ? '最近检查' : 'Last Inspection'}:</span> ${defect.lastInspection}</p>
                  <p class="text-sm"><span class="text-gray-600">${language === 'zh' ? '坐标' : 'Coordinates'}:</span> ${defect.position.join(', ')}</p>
                </div>
              </div>
            `;
            infoWindow.current.setContent(content);
            infoWindow.current.open(map, defect.position);
          });

          marker.on('mouseout', () => {
            setHoveredDefect(null);
            infoWindow.current.close();
          });

          marker.on('click', () => {
            setSelectedDefect(defect);
          });

          map.add(marker);
        });

        map.add(polyline);
        mapInstance.current = map;

        // 添加地图鼠标移入事件
        map.on('mouseover', () => {
          setShowTable(true);
        });

        // 添加地图鼠标移出事件
        map.on('mouseout', () => {
          if (!hoveredDefect) {
            setShowTable(false);
          }
        });
      }
    }).catch(e => {
      console.error('高德地图加载失败：', e);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [language, hoveredDefect]);

  const handleReportSubmit = (phone: string, notes: string) => {
    // 这里可以添加实际的提交逻辑
    console.log('Report submitted:', { defect: selectedDefect, phone, notes });
    alert(language === 'zh' ? '发送成功！' : 'Report sent successfully!');
    setSelectedDefect(null);
  };

  const renderIndicator = (label: string, value: string | number, color: string) => (
    <div className="flex justify-between items-center border-b border-gray-100 py-2">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('roadProfile')}</h1>
        <p className="text-gray-600 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div ref={mapRef} className="w-full h-[400px] rounded-lg" />
            
            {/* 病害数据表格 */}
            <div className={`mt-4 overflow-hidden transition-all duration-300 ${showTable ? 'max-h-[500px]' : 'max-h-0'}`}>
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <Table className="w-5 h-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'zh' ? '路面病害数据' : 'Road Defects Data'}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          {language === 'zh' ? '病害类型' : 'Type'}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          {language === 'zh' ? '严重程度' : 'Severity'}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          {language === 'zh' ? '面积' : 'Area'}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          {language === 'zh' ? '检查日期' : 'Inspection Date'}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          {language === 'zh' ? '坐标' : 'Coordinates'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roadDefects.map((defect) => (
                        <tr 
                          key={defect.id}
                          className={`border-t border-gray-200 hover:bg-gray-50 ${
                            hoveredDefect === defect.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.severity}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.area}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{defect.lastInspection}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {defect.position.join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{t('roadDetails')}</h2>
            <div className="space-y-3">
              {renderIndicator(t('roadName'), 'G318', 'text-gray-800')}
              {renderIndicator(t('roadLength'), '5.2 km', 'text-gray-800')}
              {renderIndicator(t('roadType'), t('highway'), 'text-gray-800')}
              {renderIndicator(t('lanes'), '4', 'text-gray-800')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Performance Indicators */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">{t('performance')}</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator(t('pci'), '92/100', 'text-green-600')}
            {renderIndicator(t('rqi'), '88/100', 'text-green-600')}
            {renderIndicator(t('pqi'), '90/100', 'text-green-600')}
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">{t('maintenance')}</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator(t('maintenanceCost'), '¥250,000', 'text-gray-800')}
            {renderIndicator(t('repairFrequency'), '2/year', 'text-gray-800')}
            {renderIndicator(t('nextMaintenance'), '2024-05-15', 'text-blue-600')}
          </div>
        </div>

        {/* Traffic Volume */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Car className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">{t('trafficVolume')}</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator(t('dailyTraffic'), '45,000', 'text-gray-800')}
            {renderIndicator(t('peakHourVolume'), '3,200', 'text-gray-800')}
            {renderIndicator(t('truckPercentage'), '15%', 'text-gray-800')}
          </div>
        </div>

        {/* Specification Indicators */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BarChart className="w-5 h-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">{t('specifications')}</h2>
          </div>
          <div className="space-y-3">
            {renderIndicator(t('rdi'), '95/100', 'text-green-600')}
            {renderIndicator(t('sri'), '87/100', 'text-green-600')}
            {renderIndicator(t('pssi'), '93/100', 'text-green-600')}
            {renderIndicator(t('pwi'), '89/100', 'text-green-600')}
          </div>
        </div>
      </div>

      {selectedDefect && (
        <DefectReportModal
          defect={selectedDefect}
          onClose={() => setSelectedDefect(null)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
};

export default RoadProfile;