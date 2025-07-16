"use client";

import React, { useState } from 'react';

interface BookingFormProps {
  sessionId: string;
  date: string;
  time: string;
  price: number;
  ticketTypeId?: string;
}

export default function BookingForm({ sessionId, date, time, price, ticketTypeId }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) : value
    }));
  };

  const calculateTotal = () => {
    const adultTotal = formData.adults * price;
    const childTotal = formData.children * (price * 0.6); // 60% of adult price for children
    return adultTotal + childTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      // Extract ticket type ID from sessionId if it contains a hyphen
      let actualTicketTypeId = ticketTypeId;
      if (!actualTicketTypeId && sessionId.includes('-')) {
        const parts = sessionId.split('-');
        actualTicketTypeId = parts[1];
      }
      
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          sessionId,
          ticketTypeId: actualTicketTypeId,
          tickets: {
            adults: formData.adults,
            children: formData.children,
          },
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            specialRequests: formData.specialRequests,
          }
        }),
      });
      
      const data = await response.json();
      
      setIsSuccess(response.ok);
      setMessage(data.message);
      
      if (response.ok) {
        setBookingConfirmation(data);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again later.');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingConfirmation) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-center text-green-800 mb-4">Booking Confirmed!</h3>
        <p className="text-center mb-6">{message}</p>
        
        <div className="bg-white rounded-lg p-4 mb-6">
          <h4 className="font-bold text-lg mb-2">Booking Details</h4>
          <p><span className="font-medium">Booking Reference:</span> {bookingConfirmation.bookingReference}</p>
          <p><span className="font-medium">Date:</span> {date}</p>
          <p><span className="font-medium">Time:</span> {time}</p>
          <p><span className="font-medium">Tickets:</span> {bookingConfirmation.tickets.adults} Adult(s), {bookingConfirmation.tickets.children} Child(ren)</p>
          <p><span className="font-medium">Total Amount:</span> ${bookingConfirmation.totalAmount.toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-gray-600 text-center">
          A confirmation email has been sent to {bookingConfirmation.customerInfo.email}.<br />
          Please check your inbox (and spam folder) for details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {message && (
        <div className={`mb-6 p-4 rounded ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
              Adult Tickets (${price.toFixed(2)})
            </label>
            <select
              id="adults"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
              Child Tickets (${(price * 0.6).toFixed(2)})
            </label>
            <select
              id="children"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests (dietary requirements, accessibility needs, etc.)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
          ></textarea>
        </div>
        
        <div className="bg-earth-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Order Summary</h4>
          <div className="flex justify-between mb-1">
            <span>Adult Tickets ({formData.adults})</span>
            <span>${(formData.adults * price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Child Tickets ({formData.children})</span>
            <span>${(formData.children * price * 0.6).toFixed(2)}</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Complete Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
