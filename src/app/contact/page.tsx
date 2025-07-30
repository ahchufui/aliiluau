import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'Contact Us | AliʻiLuau - Authentic Hawaiian Luau Experience',
  description: 'Get in touch with AliʻiLuau for inquiries about our authentic Hawaiian luau experience, group bookings, or special requests.',
};

export default function ContactPage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-teal-900">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              We'd love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-6 text-teal">Send Us a Message</h2>
              <p className="mb-6">
                Have questions about our luau experience? Want to make a special request or book a large group?
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-6 text-teal">Contact Information</h2>
              
              <div className="bg-sand-100 p-6 rounded-lg mb-8">
                <h3 className="font-display text-xl font-bold mb-4 text-orange">Location</h3>
                <p className="mb-2">1753-1799 Mount Cotton Rd, Cornubia</p>
                <p className="mb-2">Brisbane, QLD 4130</p>
                <p className="mb-4">Australia</p>
                
                <div className="aspect-w-16 aspect-h-9 mt-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2316.6576657665766!2d153.06666666666666!3d-27.466666666666666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91a4b4b4b4b4b4%3A0x6b91a4b4b4b4b4b4!2s1753-1799%20Mount%20Cotton%20Rd%2C%20Cornubia%2C%20QLD%204130!5e0!3m2!1sen!2sus!4v1655430139096!5m2!1sen!2sus" 
                    className="w-full h-64 rounded-md border-0" 
                    allowFullScreen 
                    loading="lazy"
                    title="AliʻiLuau Location Map"
                  ></iframe>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-orange">Contact Details</h3>
                  <p className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-3 text-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>(61)415 793 573</span>
                  </p>
                  <p className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-3 text-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>info@aliiliau.com.au</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-orange">Luau Schedule</h3>
                 { /* <p className="mb-1">Wednesday: 6:00 PM - 9:00 PM</p>
                  <p className="mb-1">Friday: 6:00 PM - 9:00 PM</p>
                  <p className="mb-1">Saturday: 6:00 PM - 9:00 PM</p>
                  <p className="mb-1">Sunday: 5:00 PM - 8:00 PM</p>
                  <p className="mt-4 italic">Closed Monday, Tuesday, and Thursday</p> */}
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-orange">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-orange transition-colors" aria-label="Facebook">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-orange transition-colors" aria-label="Instagram">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-orange transition-colors" aria-label="Twitter">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-sand-100">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-teal">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-display text-xl font-bold mb-2 text-orange">Do I need to make a reservation?</h3>
              <p>
                Yes, reservations are required for our luau. We recommend booking at least 2-3 weeks in advance, 
                especially during peak tourist season (June-August and December-January).
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-display text-xl font-bold mb-2 text-orange">Can you accommodate dietary restrictions?</h3>
              <p>
                Yes, we offer vegetarian, vegan, and gluten-free options. Please let us know about any dietary 
                restrictions or allergies when you make your reservation or contact us at least 48 hours before your visit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-display text-xl font-bold mb-2 text-orange">Is transportation provided?</h3>
              <p>
                We do not provide transportation to and from the luau, but we can recommend transportation services 
                upon request. Our location is easily accessible by taxi, rideshare services, or public transportation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-display text-xl font-bold mb-2 text-orange">What happens in case of rain?</h3>
              <p>
                Our luau continues rain or shine! We have covered areas for dining and performances in case of 
                inclement weather, ensuring you'll have a wonderful experience regardless of the conditions.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/booking" className="btn-primary">Book Your Luau Experience</Link>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
