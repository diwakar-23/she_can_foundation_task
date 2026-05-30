import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ onLogout }) => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('https://she-can-backend-wexr.onrender.com/api/submissions' , {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setSubmissions(data.data);
        } else {
          setError(data.message || 'Failed to authorize session');
          if (response.status === 401) onLogout(); // Automatically clear if token expired
        }
      } catch (err) {
        setError('Error establishing server link.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [onLogout]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">She Can Foundation Form Form Submissions</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>

      {loading && <p className="text-center text-gray-500 py-10">Loading submissions data...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!loading && !error && submissions.length === 0 && (
        <p className="text-center text-gray-400 py-10">No submissions found in database yet.</p>
      )}

      {!loading && !error && submissions.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-700">Email</th>
                <th className="p-4 font-semibold text-gray-700">Message</th>
                <th className="p-4 font-semibold text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {submissions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{sub.name}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{sub.email}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate" title={sub.message}>{sub.message}</td>
                  <td className="p-4 text-gray-400 whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;