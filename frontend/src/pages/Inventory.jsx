import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getInventory, addItem, updateItem, deleteItem } from "../services/api";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0 });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchInventory();
    }
  }, [user, navigate]);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getInventory(token);
      setItems(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return;

    try {
      const token = localStorage.getItem("token");
      await addItem(newItem, token);
      setNewItem({ name: "", quantity: 0 });
      fetchInventory();
    } catch (error) {
      console.error("Gagal menambah barang:", error);
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return;

    try {
      const token = localStorage.getItem("token");
      await updateItem(editItem.id, editItem, token);
      setEditItem(null);
      fetchInventory();
    } catch (error) {
      console.error("Gagal mengedit barang:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!user || user.role !== "admin") return;

    try {
      const token = localStorage.getItem("token");
      await deleteItem(id, token);
      fetchInventory();
    } catch (error) {
      console.error("Gagal menghapus barang:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      {/* Form Tambah Barang (Hanya untuk Admin) */}
      {user?.role === "admin" && (
        <form onSubmit={handleAddItem} className="mb-4">
          <input
            type="text"
            placeholder="Nama Barang"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <input
            type="number"
            placeholder="Jumlah"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className="border p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </form>
      )}

      {/* Tabel Inventory */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama Barang</th>
            <th className="border p-2">Jumlah</th>
            {user?.role === "admin" && <th className="border p-2">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              {user?.role === "admin" && (
                <td className="border p-2">
                  <button
                    onClick={() => setEditItem(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Edit Barang */}
      {editItem && (
        <form onSubmit={handleEditItem} className="mt-4">
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) =>
              setEditItem({ ...editItem, quantity: e.target.value })
            }
            className="border p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </form>
      )}
    </div>
  );
};

export default Inventory;
