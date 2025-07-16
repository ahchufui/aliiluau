'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TicketType } from '@/lib/types/ticket';

export default function AdminDashboard() {
  const params = useParams();
  const router = useRouter();
  const { adminPath } = params;
  
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [secretKey, setSecretKey] = useState<string>('');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Form state for adding/editing tickets
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTicket, setCurrentTicket] = useState<TicketType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    order: 0,
    isActive: true
  });
  
  // Check if the admin path is correct
  useEffect(() => {
    const checkAdminPath = async () => {
      try {
        const response = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: adminPath }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.isValid) {
          setIsAuthorized(true);
        } else {
          // Redirect to home page if path is invalid
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying admin path:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminPath();
  }, [adminPath, router]);
  
  // Fetch tickets when authorized and secret key is provided
  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/tickets', {
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      
      const data = await response.json();
      setTickets(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('Failed to load tickets. Please check your admin key.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle secret key submission
  const handleSecretKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets();
  };
  
  // Handle input change for secret key
  const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : (type === 'number' ? parseFloat(value) : value)
    });
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  // Handle edit ticket
  const handleEditTicket = (ticket: TicketType) => {
    setCurrentTicket(ticket);
    setFormData({
      name: ticket.name,
      description: ticket.description,
      price: ticket.price,
      order: ticket.order,
      isActive: ticket.isActive
    });
    setIsEditing(true);
  };
  
  // Handle new ticket
  const handleNewTicket = () => {
    setCurrentTicket(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      order: tickets.length + 1,
      isActive: true
    });
    setIsEditing(true);
  };
  
  // Handle save ticket
  const handleSaveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (currentTicket) {
        // Update existing ticket
        const response = await fetch(`/api/admin/tickets/${currentTicket.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Failed to update ticket');
        }
      } else {
        // Create new ticket
        const response = await fetch('/api/admin/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Failed to create ticket');
        }
        
        const result = await response.json();
        console.log('Created ticket:', result);
      }
      
      // Refresh tickets
      fetchTickets();
      setIsEditing(false);
      setCurrentTicket(null);
    } catch (error) {
      console.error('Error saving ticket:', error);
      setError(`Failed to save ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Handle delete ticket
  const handleDeleteTicket = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }
      
      // Refresh tickets
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setError('Failed to delete ticket. Please try again.');
    }
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTicket(null);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
          <p className="mt-2">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AliʻiLuau Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage ticket information for your website</p>
        </div>
        
        {!secretKey ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enter Admin Secret Key</h2>
            <form onSubmit={handleSecretKeySubmit}>
              <div className="mb-4">
                <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Secret Key
                </label>
                <input
                  type="password"
                  id="secretKey"
                  value={secretKey}
                  onChange={handleSecretKeyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div>
            {error && (
              <div className="mb-4 bg-red-50 p-4 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            {isEditing ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {currentTicket ? 'Edit Ticket' : 'Add New Ticket'}
                </h2>
                <form onSubmit={handleSaveTicket}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ticket Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        id="order"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                        Active (visible on website)
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      {currentTicket ? 'Update Ticket' : 'Add Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mb-6 flex justify-end">
                <button
                  onClick={handleNewTicket}
                  className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Add New Ticket
                </button>
              </div>
            )}
            
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Ticket Types</h3>
                <p className="mt-1 text-sm text-gray-500">Manage ticket types and pricing for your luau experience</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No tickets found. Add your first ticket type.
                        </td>
                      </tr>
                    ) : (
                      tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {ticket.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${ticket.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              ticket.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ticket.order}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditTicket(ticket)}
                              className="text-teal-600 hover:text-teal-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
