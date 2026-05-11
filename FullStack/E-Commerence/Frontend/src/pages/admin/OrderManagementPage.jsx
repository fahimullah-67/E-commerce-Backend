import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AuthContext } from '../../context/AuthContext';
import { authRequest } from '../../utils/api';
import { CubeIcon } from '@heroicons/react/24/outline';

const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrderManagementPage = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create Admin API instance (needs token)
  const adminApi = authRequest(token);

  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint: GET /api/orders/admin (Protected)
      const res = await adminApi.get("/orders/admin");
      setOrders(res.data);
    } catch (err) {
      // Error handling for 403, 500, etc.
      const errMsg =
        err.response?.data?.message ||
        "Failed to load orders. Check server/admin status.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Endpoint: PUT /api/orders/:id (Protected)
      await adminApi.put(`orders/${orderId}`, { status: newStatus });

      // Optimistically update the local state to avoid refetching
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(`Failed to update order status.`);
    }
  };

  useEffect(() => {
    // Only run fetch if we have a token (user context is loaded)
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return <div className="text-center py-20">Loading All Orders...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3 flex items-center">
          <CubeIcon className="w-8 h-8 mr-2 text-indigo-600" /> Order
          Fulfillment Management
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
          {orders.length === 0 ? (
            <p>No orders have been placed yet.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ...{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* 🚨 FIX: Convert ObjectId to String before slicing 🚨 */}
                      ...{String(order.userId).slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                      {/* 🚨 FIX: Use totalPrice (your updated schema field) 🚨 */}
                      ${order.totalPrice ? order.totalPrice.toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="p-1 border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderManagementPage;