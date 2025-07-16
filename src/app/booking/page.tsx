// import BookingCalendar from '@/components/BookingCalendar';
// BookingFAQ removed as no longer needed
import { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import { TryBookingProvider } from '@/contexts/TryBookingContext';
import TryBookingWidget from '@/components/TryBookingWidget';
import TicketInformation from '@/components/TicketInformation';

export const metadata: Metadata = {
  title: 'Book Your Luau Experience | AliʻiLuau',
  description: 'Reserve your spot for an authentic Pacific Island luau experience with traditional food, music, and dance performances.',
};

export default function BookingPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Get eventId from URL query parameters or use default
  const eventIdFromUrl = searchParams.eventId as string;
  const defaultEventId = process.env.NEXT_PUBLIC_TRYBOOKING_EVENT_ID || 'aliiluau-2025';
  const eventId = eventIdFromUrl || defaultEventId;
  
  return (
    <TryBookingProvider eventId={eventId}>
      <SharedLayout>
      {/* Hero Section */}
      <section className="bg-ocean-blue-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-white drop-shadow-lg">
            Book Your AliʻiLuau Experience
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Select your preferred date and ticket options to secure your spot at our authentic Pacific Island luau
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="section-title text-ocean-blue-800 font-bold">Available Dates</h2>
              <p className="mb-8">
                Select your preferred date and ticket options below. Our Pacific Island luau experiences typically run from 6:00 PM to 9:00 PM on selected dates.
              </p>
              
              {/* Trybooking Integration Component */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-ocean-blue-800">Book Your Pacific Island Experience</h3>
                <p className="mb-6">Click the button below to book your tickets through our secure TryBooking platform. You'll be able to select your preferred date, time, and ticket type for our authentic Pacific Island cultural experience.</p>
                <TryBookingWidget className="py-4" />
              </div>
            </div>
            
            <div className="bg-earth-100 p-6 rounded-lg h-fit">
              <h2 className="section-subtitle text-ocean-blue-800 font-bold">Ticket Information</h2>
              <TicketInformation />
            </div>
          </div>
        </div>
      </section>

      {/* End of booking section */}
      </SharedLayout>
    </TryBookingProvider>
  );
}
