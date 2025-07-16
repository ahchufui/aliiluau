'use client';

import React from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaCalendarAlt, FaUsers, FaCog } from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-ocean-blue-800 text-white">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Ali'i Luau Admin</h1>
            <Link href="/" className="text-white hover:text-teal-200">
              Back to Site
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/admin/tickets" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-teal-100 p-4 rounded-full mb-4">
              <FaTicketAlt className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium mb-2">Ticket Management</h3>
            <p className="text-gray-600">Update ticket prices and availability</p>
          </Link>
          
          <Link 
            href="/admin/events" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FaCalendarAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium mb-2">Event Management</h3>
            <p className="text-gray-600">Manage upcoming events and sessions</p>
          </Link>
          
          <Link 
            href="/admin/users" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <FaUsers className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium mb-2">User Management</h3>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </Link>
          
          <Link 
            href="/admin/settings" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <FaCog className="text-gray-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium mb-2">Settings</h3>
            <p className="text-gray-600">Configure site settings and preferences</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
