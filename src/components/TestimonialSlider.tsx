"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
};

const testimonials: Testimonial[] = [
  /*{
    id: 1,
    name: 'Sarah Johnson',
    location: 'Seattle, WA',
    quote: 'The AliʻiLuau was the highlight of our Hawaiian vacation! The food was incredible, and the performances were breathtaking. We felt truly immersed in Hawaiian culture.',
    rating: 5,
    image: '/images/testimonials/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    quote: 'As someone who has been to several luaus across Hawaii, I can confidently say that AliʻiLuau offers the most authentic experience. The attention to cultural details and traditions was impressive.',
    rating: 5,
    image: '/images/testimonials/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Emma and David Williams',
    location: 'London, UK',
    quote: 'We traveled all the way from the UK for this experience, and it was worth every mile! The dancers were incredible, and the sunset backdrop made for a magical evening.',
    rating: 5,
    image: '/images/testimonials/testimonial-3.jpg'
  },
  {
    id: 4,
    name: 'Carlos Rodriguez',
    location: 'Miami, FL',
    quote: 'The food alone is worth the visit! I still dream about the kalua pig and poi. The staff was incredibly friendly and made sure we understood the significance behind each performance.',
    rating: 4,
    image: '/images/testimonials/testimonial-4.jpg'
  },
  {
    id: 5,
    name: 'Jennifer Thompson',
    location: 'Chicago, IL',
    quote: 'We brought our entire family, from grandparents to young children, and everyone had an amazing time. The interactive elements of the show were especially engaging for the kids.',
    rating: 5,
    image: '/images/testimonials/testimonial-5.jpg'
  } */
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal">
              {/* Placeholder for testimonial image */}
              <div className="absolute inset-0 bg-ocean-blue-300 flex items-center justify-center text-white text-2xl font-bold">
                {currentTestimonial.name.charAt(0)}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < currentTestimonial.rating ? 'text-orange' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <blockquote className="italic text-gray-700 mb-4">"{currentTestimonial.quote}"</blockquote>
            
            <div className="font-semibold">
              {currentTestimonial.name}
              <span className="font-normal text-gray-500 ml-2">• {currentTestimonial.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-teal' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
