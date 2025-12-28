import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import orderService from '../../services/orderService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await orderService.deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5cd9aa] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
          <p className="text-gray-600 mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-gray-800">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{order.firstName} {order.lastName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.city}, {order.province}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(order.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-mono font-bold text-gray-800">#{selectedOrder.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">First Name</p>
                  <p className="font-medium text-gray-800">{selectedOrder.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Name</p>
                  <p className="font-medium text-gray-800">{selectedOrder.lastName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium text-gray-800">{selectedOrder.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-medium text-gray-800">{selectedOrder.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="font-medium text-gray-800">
                  {new Date(selectedOrder.dateOfBirth).toLocaleDateString('vi-VN')}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="font-medium text-gray-800">{selectedOrder.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">City</p>
                  <p className="font-medium text-gray-800">{selectedOrder.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Province</p>
                  <p className="font-medium text-gray-800">{selectedOrder.province}</p>
                </div>
              </div>

              {selectedOrder.involvement && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Involvement</p>
                  <p className="font-medium text-gray-800">{selectedOrder.involvement}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-medium text-gray-800">{formatDate(selectedOrder.createdAt)}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default OrderManagement;