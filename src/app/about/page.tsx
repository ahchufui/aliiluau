import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'About Us | AliʻiLuau - Authentic Hawaiian Luau Experience',
  description: 'Learn about our authentic Hawaiian luau experience, our history, and our commitment to preserving Hawaiian culture and traditions.',
};

export default function AboutPage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-teal-900">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Story</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Celebrating Hawaiian culture and traditions since 1985
            </p>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">Our History</h2>
              <p className="mb-4">
                AliʻiLuau was founded in 1985 by the Kealoha family, who sought to create an authentic 
                Hawaiian cultural experience that honors the rich traditions of the islands while providing 
                visitors with an unforgettable evening of entertainment, food, and community.
              </p>
              <p className="mb-4">
                The name "Aliʻi" refers to the Hawaiian nobility or chiefs, and our luau aims to treat 
                every guest like royalty while immersing them in the cultural practices that have been 
                passed down through generations.
              </p>
              <p className="mb-4">
                What began as a small family operation has grown into one of Oahu's most respected 
                cultural attractions, welcoming thousands of visitors each year while maintaining the 
                intimate, authentic experience that has been our hallmark for over three decades.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/about-history.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-sand-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/about-mission.jpg')" }}
              ></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">Our Mission</h2>
              <p className="mb-4">
                At AliʻiLuau, our mission is to preserve and share the authentic cultural heritage of 
                Hawaii through immersive experiences that educate, entertain, and inspire our guests.
              </p>
              <p className="mb-4">
                We are committed to cultural authenticity in everything we do—from our traditional 
                cooking methods and recipes to our music and dance performances that tell the stories 
                of Hawaii's rich history.
              </p>
              <p className="mb-4">
                We believe that by sharing these traditions with visitors from around the world, we 
                help ensure that Hawaiian cultural practices continue to thrive for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-teal">Our ʻOhana (Family)</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/team-1.jpg')" }}
                ></div>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Kekoa Kealoha</h3>
              <p className="text-gray-600 mb-2">Founder & Cultural Director</p>
              <p className="text-sm">
                With deep roots in Hawaiian cultural practices, Kekoa ensures that every aspect of our 
                luau remains authentic and respectful to Hawaiian traditions.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/team-2.jpg')" }}
                ></div>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Leilani Kealoha</h3>
              <p className="text-gray-600 mb-2">Executive Chef</p>
              <p className="text-sm">
                Trained in both traditional Hawaiian cooking and modern culinary techniques, Leilani 
                creates the delicious feast that is central to our luau experience.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/team-3.jpg')" }}
                ></div>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Kai Mahelona</h3>
              <p className="text-gray-600 mb-2">Performance Director</p>
              <p className="text-sm">
                A master of traditional Hawaiian dance and music, Kai leads our talented troupe of 
                performers who bring the stories of Hawaii to life through dance and song.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Commitment */}
      <section className="py-16 bg-ocean-100">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center text-teal">Our Cultural Commitment</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="mb-6 text-center">
              At AliʻiLuau, we are deeply committed to honoring and preserving Hawaiian culture. 
              We work closely with cultural practitioners and community elders to ensure that our 
              presentations are authentic, respectful, and educational.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl font-bold mb-4 text-orange">Community Support</h3>
                <p>
                  We actively support local Hawaiian cultural education programs and donate a portion 
                  of our proceeds to organizations dedicated to preserving Hawaiian language, arts, 
                  and traditions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl font-bold mb-4 text-orange">Sustainability</h3>
                <p>
                  We are committed to sustainable practices that honor the Hawaiian value of mālama ʻāina 
                  (caring for the land). From locally sourced ingredients to eco-friendly operations, 
                  we strive to minimize our environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Experience Our Luau</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Join us for an unforgettable evening of Hawaiian culture, cuisine, and entertainment. 
            Book your visit to AliʻiLuau today!
          </p>
          <Link href="/booking" className="btn-secondary">Book Now</Link>
        </div>
      </section>
    </SharedLayout>
  );
}
