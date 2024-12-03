import { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const initialInventory = [
  { id: 1, name: 'Product A', inStock: 500, reorderPoint: 100 },
  { id: 2, name: 'Product B', inStock: 750, reorderPoint: 150 },
  { id: 3, name: 'Product C', inStock: 300, reorderPoint: 75 },
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory);
  const [newItem, setNewItem] = useState({ name: '', inStock: 0, reorderPoint: 0 });
  const [editingId, setEditingId] = useState(null);

  const addItem = useCallback(() => {
    if (newItem.name && newItem.inStock >= 0 && newItem.reorderPoint >= 0) {
      setInventory(prev => [...prev, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', inStock: 0, reorderPoint: 0 });
    }
  }, [newItem]);

  const updateItem = useCallback((id, field, value) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  const deleteItem = useCallback((id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  }, []);

  const startEditing = useCallback((id) => {
    setEditingId(id);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingId(null);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase">Inventory Management</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2 uppercase">Add New Item</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Product Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border-2 border-black p-2"
          />
          <input
            type="number"
            placeholder="In Stock"
            value={newItem.inStock}
            onChange={(e) => setNewItem({ ...newItem, inStock: parseInt(e.target.value) })}
            className="border-2 border-black p-2"
          />
          <input
            type="number"
            placeholder="Reorder Point"
            value={newItem.reorderPoint}
            onChange={(e) => setNewItem({ ...newItem, reorderPoint: parseInt(e.target.value) })}
            className="border-2 border-black p-2"
          />
          <button
            onClick={addItem}
            className="bg-black text-white px-4 py-2 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2 uppercase">Inventory List</h3>
        <table className="w-full border-collapse border-4 border-black">
          <thead>
            <tr className="bg-black text-white uppercase">
              <th className="border-2 border-black p-2">Product</th>
              <th className="border-2 border-black p-2">In Stock</th>
              <th className="border-2 border-black p-2">Reorder Point</th>
              <th className="border-2 border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="even:bg-yellow-100">
                <td className="border-2 border-black p-2">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="border-2 border-black p-1 w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="border-2 border-black p-2">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={item.inStock}
                      onChange={(e) => updateItem(item.id, 'inStock', parseInt(e.target.value))}
                      className="border-2 border-black p-1 w-full"
                    />
                  ) : (
                    item.inStock
                  )}
                </td>
                <td className="border-2 border-black p-2">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={item.reorderPoint}
                      onChange={(e) => updateItem(item.id, 'reorderPoint', parseInt(e.target.value))}
                      className="border-2 border-black p-1 w-full"
                    />
                  ) : (
                    item.reorderPoint
                  )}
                </td>
                <td className="border-2 border-black p-2">
                  {editingId === item.id ? (
                    <button
                      onClick={stopEditing}
                      className="bg-green-500 text-white px-2 py-1 font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(item.id)}
                      className="bg-blue-500 text-white px-2 py-1 font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2 uppercase">Inventory Chart</h3>
        <div className="border-4 border-black p-4 bg-white">
          <BarChart width={800} height={400} data={inventory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inStock" fill="#8884d8" />
            <Bar dataKey="reorderPoint" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
