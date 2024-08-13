import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaCog } from 'react-icons/fa';
import Navbar from './Navbar';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchBookings();
    fetchUsers();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      setError('Error deleting booking');
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
  };

  const handleUpdateBooking = async () => {
    try {
      await axios.put(`http://localhost:9000/api/bookings/${editingBooking.id}`, editingBooking);
      setBookings(bookings.map(booking => (booking.id === editingBooking.id ? editingBooking : booking)));
      setEditingBooking(null);
    } catch (error) {
      setError('Error updating booking');
    }
  };

  if (loading) return <p className="text-center text-xl font-semibold text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-xl font-semibold text-red-600">{error}</p>;

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <div className="w-64 bg-black text-white shadow-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <ul className="mt-8 space-y-2">
            <li
              className={`hover:bg-gray-600 ${activeTab === 'overview' ? 'bg-gray-600' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <a href="#" className="flex items-center p-4 text-white transition duration-200 ease-in-out transform hover:scale-105">
                <FaTachometerAlt className="mr-3 text-2xl" />
                <span className="text-lg font-bold">Dashboard</span>
              </a>
            </li>
            <li
              className={`hover:bg-gray-600 ${activeTab === 'users' ? 'bg-gray-600' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <a href="#" className="flex items-center p-4 text-white transition duration-200 ease-in-out transform hover:scale-105">
                <FaUsers className="mr-3 text-2xl" />
                <span className="text-lg font-bold">Users</span>
              </a>
            </li>
            <li
              className={`hover:bg-gray-600 ${activeTab === 'events' ? 'bg-gray-600' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <a href="#" className="flex items-center p-4 text-white transition duration-200 ease-in-out transform hover:scale-105">
                <FaCalendarAlt className="mr-3 text-2xl" />
                <span className="text-lg font-bold">Events</span>
              </a>
            </li>
            <li
              className={`hover:bg-gray-600 ${activeTab === 'settings' ? 'bg-gray-600' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <a href="/" className="flex items-center p-4 text-white transition duration-200 ease-in-out transform hover:scale-105">
                <FaCog className="mr-3 text-2xl" />
                <span className="text-lg font-bold">Logout</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          {activeTab === 'overview' && (
            <>
              <h2 className="text-5xl font-bold mb-8 text-gray-800">Overview</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Total Users</h3>
                  <p className="text-4xl font-bold text-blue-600">{users.length}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Total Events</h3>
                  <p className="text-4xl font-bold text-green-600">{bookings.length}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Revenue</h3>
                  <p className="text-4xl font-bold text-yellow-600">Rs 800000</p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Venues Booked</h3>
                  <p className="text-4xl font-bold text-green-600">{bookings.length}</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'events' && (
            <>
              <h2 className="text-5xl font-bold mb-8 text-gray-800">Events</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Total Events: {bookings.length}</h3>
                </div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Venue</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Message</th>
                      <th className="px-10 py-3 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-800 mr-4"
                            onClick={() => handleEditBooking(booking)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {editingBooking && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateBooking(); }}>
                      
                      
                      <div className="mb-4">
                        <label className="block text-gray-700">Date:</label>
                        <input
                          type="date"
                          value={editingBooking.date}
                          onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Venue:</label>
                        <input
                          type="text"
                          value={editingBooking.venue}
                          onChange={(e) => setEditingBooking({ ...editingBooking, venue: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700">Message:</label>
                        <textarea
                          value={editingBooking.message}
                          onChange={(e) => setEditingBooking({ ...editingBooking, message: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingBooking(null)}
                          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-4"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'users' && (
            <>
              <h2 className="text-5xl font-bold mb-8 text-gray-800">Users</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                    <tr>
                     <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">NAME</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">EMAIL</th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"></th>
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
