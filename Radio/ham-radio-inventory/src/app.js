import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Radio, PoundSterling, Calendar, Hash, Smartphone, Wifi, Zap, ScanLine, Mic, Plug } from 'lucide-react';

const HamRadioInventory = () => {
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: 'Icom IC-7300',
      category: 'Transceiver',
      frequency: 'HF + 6M',
      power: '100W',
      serialNumber: 'IC73001234',
      purchaseDate: '2023-05-15',
      purchasePrice: 1299.00,
      currentValue: 900.00,
      condition: 'Excellent',
      notes: 'HF + 6M SDR transceiver with waterfall display, includes original box and manual'
    },
    {
      id: 2,
      name: 'Diamond X-50A',
      category: 'Antenna',
      frequency: 'VHF/UHF',
      power: 'N/A',
      serialNumber: 'DX50-789',
      purchaseDate: '2023-03-20',
      purchasePrice: 72.99,
      currentValue: 60.00,
      condition: 'Good',
      notes: 'Dual-band vertical antenna, mounted on roof'
    },
    {
      id: 3,
      name: 'Icom ID-52E Plus 60th Anniversary Edition',
      category: 'Handheld',
      frequency: 'VHF/UHF D-STAR',
      power: '5W',
      serialNumber: 'ID52-60-5678',
      purchaseDate: '2024-01-10',
      purchasePrice: 449.00,
      currentValue: 420.00,
      condition: 'Excellent',
      notes: 'Limited edition 60th anniversary D-STAR handheld with GPS, Bluetooth, includes special packaging'
    },
    {
      id: 4,
      name: 'Kenwood TS-2000',
      category: 'Transceiver',
      frequency: 'HF/VHF/UHF',
      power: '100W HF/6M/2M, 50W 70cm',
      serialNumber: 'TS2000-9876',
      purchaseDate: '2022-08-15',
      purchasePrice: 1450.00,
      currentValue: 400.00,
      condition: 'Very Good',
      notes: 'All-mode multi-band transceiver with satellite capability, includes original accessories'
    },
    {
      id: 5,
      name: 'Quansheng UV-K5(8) Orange',
      category: 'Handheld',
      frequency: 'VHF/UHF',
      power: '5W',
      serialNumber: 'QS-UV5-OR01',
      purchaseDate: '2023-11-20',
      purchasePrice: 28.50,
      currentValue: 25.00,
      condition: 'Excellent',
      notes: 'Orange version, firmware hackable, includes programming cable'
    },
    {
      id: 6,
      name: 'Quansheng UV-K5(8) Clear',
      category: 'Handheld',
      frequency: 'VHF/UHF',
      power: '5W',
      serialNumber: 'QS-UV5-CL02',
      purchaseDate: '2024-02-05',
      purchasePrice: 32.00,
      currentValue: 28.00,
      condition: 'Excellent',
      notes: 'Clear transparent case version, custom firmware installed'
    },
    {
      id: 7,
      name: 'Uniden Bearcat UBC125XLT',
      category: 'Scanner',
      frequency: '25-956MHz',
      power: 'N/A',
      serialNumber: 'UBC125-4567',
      purchaseDate: '2023-06-12',
      purchasePrice: 89.99,
      currentValue: 75.00,
      condition: 'Good',
      notes: 'Handheld scanner with close call, includes belt clip and earphone'
    },
    {
      id: 8,
      name: 'Alinco DM-330MV',
      category: 'Power Supply',
      frequency: 'N/A',
      power: '30A @ 13.8V',
      serialNumber: 'DM330-8901',
      purchaseDate: '2023-04-28',
      purchasePrice: 139.99,
      currentValue: 120.00,
      condition: 'Very Good',
      notes: 'Switching power supply with variable voltage, includes power cable and fuse'
    },
    {
      id: 9,
      name: 'Hustler 6-BTV',
      category: 'Antenna',
      frequency: '6-80M',
      power: '1500W',
      serialNumber: 'H6BTV-2345',
      purchaseDate: '2022-09-10',
      purchasePrice: 189.00,
      currentValue: 160.00,
      condition: 'Good',
      notes: 'Vertical HF antenna with trap design, includes radial kit and manual'
    },
    {
      id: 10,
      name: 'Motorola GM360',
      category: 'Gateway',
      frequency: 'VHF',
      power: '25W',
      serialNumber: 'GM360-1234',
      purchaseDate: '2023-07-18',
      purchasePrice: 75.00,
      currentValue: 65.00,
      condition: 'Good',
      notes: 'VHF mobile radio converted for gateway/repeater use, includes programming cable'
    },
    {
      id: 11,
      name: 'Raspberry Pi 4B',
      category: 'Gateway',
      frequency: 'N/A',
      power: '5V 3A',
      serialNumber: 'RPI4B-5678',
      purchaseDate: '2023-09-05',
      purchasePrice: 89.99,
      currentValue: 75.00,
      condition: 'Excellent',
      notes: '8GB RAM model with case, SD card, used for digital mode gateway and logging'
    },
    {
      id: 12,
      name: 'HP DL360 PSU',
      category: 'Gateway',
      frequency: 'N/A',
      power: '800W @ 12V',
      serialNumber: 'HPDL360-9012',
      purchaseDate: '2022-11-30',
      purchasePrice: 45.00,
      currentValue: 35.00,
      condition: 'Very Good',
      notes: 'Server PSU modified for 12V DC output, high efficiency for gateway power'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Transceiver',
    frequency: '',
    power: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    condition: 'Excellent',
    notes: ''
  });

  const categories = ['Transceiver', 'Handheld', 'Scanner', 'Gateway', 'Antenna', 'Amplifier', 'SWR Meter', 'Tuner', 'Microphone', 'Power Supply', 'Computer Interface', 'Other'];
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    const newItem = {
      ...formData,
      id: editingId || Date.now(),
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      currentValue: parseFloat(formData.currentValue) || 0
    };

    if (editingId) {
      setEquipment(prev => prev.map(item => item.id === editingId ? newItem : item));
      setEditingId(null);
    } else {
      setEquipment(prev => [...prev, newItem]);
    }

    setFormData({
      name: '',
      category: 'Transceiver',
      frequency: '',
      power: '',
      serialNumber: '',
      purchaseDate: '',
      purchasePrice: '',
      currentValue: '',
      condition: 'Excellent',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      frequency: item.frequency,
      power: item.power,
      serialNumber: item.serialNumber,
      purchaseDate: item.purchaseDate,
      purchasePrice: item.purchasePrice.toString(),
      currentValue: item.currentValue.toString(),
      condition: item.condition,
      notes: item.notes
    });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setEquipment(prev => prev.filter(item => item.id !== id));
    }
  };

  const totalPurchaseValue = equipment.reduce((sum, item) => sum + item.purchasePrice, 0);
  const totalCurrentValue = equipment.reduce((sum, item) => sum + item.currentValue, 0);

  // Group equipment by category
  const groupedEquipment = equipment.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  // Get appropriate icon for category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Transceiver':
        return <Radio className="h-5 w-5 text-blue-400" />;
      case 'Handheld':
        return <Smartphone className="h-5 w-5 text-green-400" />;
      case 'Gateway':
        return <Wifi className="h-5 w-5 text-purple-400" />;
      case 'Antenna':
        return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'Power Supply':
        return <Plug className="h-5 w-5 text-red-400" />;
      case 'Scanner':
        return <ScanLine className="h-5 w-5 text-orange-400" />;
      case 'Microphone':
        return <Mic className="h-5 w-5 text-pink-400" />;
      default:
        return <Radio className="h-5 w-5 text-gray-400" />;
    }
  };

  // Sort categories in a logical order
  const categoryOrder = ['Transceiver', 'Handheld', 'Gateway', 'Antenna', 'Power Supply', 'Scanner', 'Amplifier', 'SWR Meter', 'Tuner', 'Microphone', 'Computer Interface', 'Other'];
  const sortedCategories = categoryOrder.filter(cat => groupedEquipment[cat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radio className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Amateur Radio Equipment Inventory</h1>
                <p className="text-blue-200">Track your ham radio gear and values</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Equipment</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Hash className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-white/60 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-white">{equipment.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <PoundSterling className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-white/60 text-sm">Purchase Value</p>
                <p className="text-2xl font-bold text-white">£{totalPurchaseValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <PoundSterling className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-white/60 text-sm">Current Value</p>
                <p className="text-2xl font-bold text-white">£{totalCurrentValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Equipment' : 'Add New Equipment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Equipment Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Yaesu FT-991A"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Frequency Range</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., HF/VHF/UHF"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Power Rating</label>
                <input
                  type="text"
                  name="power"
                  value={formData.power}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 100W"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Serial Number</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Serial number"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Purchase Price (£)</label>
                <input
                  type="number"
                  step="0.01"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Current Value (£)</label>
                <input
                  type="number"
                  step="0.01"
                  name="currentValue"
                  value={formData.currentValue}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {conditions.map(cond => (
                    <option key={cond} value={cond} className="bg-slate-800">{cond}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-white/80 text-sm font-medium mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes, accessories, modifications, etc."
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex space-x-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingId ? 'Update Equipment' : 'Add Equipment'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    setFormData({
                      name: '',
                      category: 'Transceiver',
                      frequency: '',
                      power: '',
                      serialNumber: '',
                      purchaseDate: '',
                      purchasePrice: '',
                      currentValue: '',
                      condition: 'Excellent',
                      notes: ''
                    });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Equipment List */}
        <div className="space-y-6">
          {sortedCategories.map(category => (
            <div key={category} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/20 bg-white/5">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                  <span className="text-sm font-normal text-white/60">
                    ({groupedEquipment[category].length} item{groupedEquipment[category].length !== 1 ? 's' : ''})
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-4 text-white/80 font-medium">Equipment</th>
                      <th className="text-left p-4 text-white/80 font-medium">Frequency</th>
                      <th className="text-left p-4 text-white/80 font-medium">Power</th>
                      <th className="text-left p-4 text-white/80 font-medium">Serial #</th>
                      <th className="text-left p-4 text-white/80 font-medium">Purchase Price</th>
                      <th className="text-left p-4 text-white/80 font-medium">Current Value</th>
                      <th className="text-left p-4 text-white/80 font-medium">Condition</th>
                      <th className="text-left p-4 text-white/80 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedEquipment[category].map((item) => (
                      <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <div>
                            <div className="text-white font-medium">{item.name}</div>
                            {item.notes && (
                              <details className="mt-1">
                                <summary className="text-white/40 text-xs cursor-pointer hover:text-white/60 transition-colors">
                                  Show notes
                                </summary>
                                <div className="text-white/60 text-sm mt-1 pl-2 border-l-2 border-white/20">
                                  {item.notes}
                                </div>
                              </details>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white/80">{item.frequency}</td>
                        <td className="p-4 text-white/80">{item.power}</td>
                        <td className="p-4 text-white/60 text-sm">{item.serialNumber}</td>
                        <td className="p-4 text-white/80">£{item.purchasePrice.toFixed(2)}</td>
                        <td className="p-4 text-white/80">£{item.currentValue.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.condition === 'Excellent' ? 'bg-green-500/20 text-green-300' :
                            item.condition === 'Very Good' ? 'bg-blue-500/20 text-blue-300' :
                            item.condition === 'Good' ? 'bg-yellow-500/20 text-yellow-300' :
                            item.condition === 'Fair' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {item.condition}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-400 hover:text-blue-300 p-1"
                              title="Edit"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          
          {equipment.length === 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
              <Radio className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No equipment added yet. Click "Add Equipment" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamRadioInventory;