import Image from "next/image";
import Link from "next/link";
import SharedLayout from "@/components/SharedLayout";
import TryBookingWidget from "@/components/TryBookingWidget";
import { TryBookingProvider } from "@/contexts/TryBookingContext";
import TestimonialSlider from '@/components/TestimonialSlider';
import NewsletterSignup from '@/components/NewsletterSignup';
import PlaceholderImage from '@/components/PlaceholderImage';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function Home() {
  // Ensure the event ID is properly formatted as a string
  const eventId = process.env.NEXT_PUBLIC_TRYBOOKING_EVENT_ID || '1419456';
  
  return (
    <TryBookingProvider eventId={eventId}>
      <SharedLayout>
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
          {/* Hero Image Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/hero/Lead-Image-1080x675.webp" 
              alt="Ali'i Luau Experience" 
              fill 
              priority
              className="object-cover object-center brightness-50 opacity-80"
              sizes="100vw"
            />
          </div>
          
          {/* Additional dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black opacity-40 z-[1]"></div>
          
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10 z-10" 
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '24px 24px'
              }}>
          </div>
          
          {/* Decorative wave shape at bottom */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" 
                className="relative block w-full h-12">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                    className="fill-white"></path>
            </svg>
          </div>
          
          {/* Content */}
          <div className="container-custom relative z-30 h-full flex flex-col md:flex-row justify-center items-center md:items-start text-white py-20">
            {/* Text Content */}
            <div className="animate-fadeIn md:w-1/2">
              <span className="inline-block py-1 px-3 rounded-full bg-[color:var(--secondary-color)]/20 text-[color:var(--secondary-color)] font-medium text-sm mb-6">
                Authentic Pacific Island Experience
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Experience <span className="text-[color:var(--secondary-color)]">Pacific Island</span> Culture
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl text-blue-100">
                Immerse yourself in authentic Pacific Island traditions, music, dance, and cuisine at Brisbane's own Pacific Island cultural experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="btn-secondary hover-lift text-lg px-8 py-3">
                  Book Tickets Now
                </Link>
                <Link href="/about" className="btn-outline text-lg px-8 py-3">
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Call to action buttons */}
            <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 pl-8 flex justify-center items-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
                <Link href="/booking" className="btn-primary text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Reserve Your Experience
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Overview Section */}
      <section className="py-16 bg-ocean-blue-100">
        <div className="container-custom">
          <h2 className="section-title text-center">The AliʻiLuau Experience</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">Experience authentic Traditional Polynesian Food Preparation and cultural immersion</p>
          
          {/* Featured Image */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image 
                src="/images/hero/Samoan-Food-Prep-Molly-NZ.webp" 
                alt="Traditional Samoan Food Preparation" 
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4 text-teal text-4xl flex justify-center">
                {/* Icon would go here */}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-center">Traditional Cuisine</h3>
              <p className="text-center">
                Savor authentic Polynesian dishes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4 text-teal text-4xl flex justify-center">
                {/* Icon would go here */}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-center">Polynesian Performances</h3>
              <p className="text-center">
                Experience the beauty and power of traditional Hawaiian and Polynesian dance, music, and storytelling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4 text-teal text-4xl flex justify-center">
                {/* Icon would go here */}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-center">Cultural Immersion</h3>
              <p className="text-center">
                Learn about Pacific Island traditions, customs, and history through interactive demonstrations and exhibits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Widget Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">Book Your Experience</h2>
          <p className="text-center max-w-2xl mx-auto mb-12">
            Select your preferred date and time to experience our authentic Pacific Island luau.
          </p>
          <div className="max-w-4xl mx-auto">
            <TryBookingWidget />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center">Upcoming Events</h2>
          <p className="text-center max-w-2xl mx-auto mb-12">
            Join us for our upcoming luau experiences. Book early to secure your spot for an unforgettable evening of Hawaiian culture.
          </p>
          <UpcomingEvents />
        </div>
      </section>

      {/* Testimonials Section */}
      { /* <section className="py-16 bg-earth-100">
        <div className="container-custom">
          <h2 className="section-title text-center">Guest Experiences</h2>
          <TestimonialSlider />
        </div>
      </section> */}

      {/* Newsletter Section */}
      <section className="py-16 bg-ocean-blue-700 text-on-light">
        <div className="container-custom">
          <h2 className="section-title text-center">Stay Updated</h2>
          <p className="text-center max-w-2xl mx-auto mb-12">
            Subscribe to our newsletter for exclusive offers, upcoming events, and Hawaiian cultural insights.
          </p>
          <NewsletterSignup />
        </div>
      </section>
      </SharedLayout>
    </TryBookingProvider>
  );
}
