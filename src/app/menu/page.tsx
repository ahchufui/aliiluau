import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'Menu | AliʻiLuau - Authentic Hawaiian Luau Experience',
  description: 'Explore our authentic Hawaiian luau menu featuring traditional dishes like kalua pig, lomi salmon, poi, and haupia prepared using time-honored methods.',
};

export default function MenuPage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-teal-900">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/menu-hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Authentic Hawaiian cuisine prepared with traditional methods
            </p>
          </div>
        </div>
      </section>

      {/* Menu Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[color:var(--primary-color)]">
              Traditional Hawaiian Feast
            </h2>
            <p className="mb-8 text-lg">
              Our menu features authentic Hawaiian dishes prepared using traditional methods that have been 
              passed down through generations. Each dish is carefully crafted to provide an authentic taste 
              of Hawaiian cuisine, using locally sourced ingredients whenever possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Courses */}
      <section className="py-16 bg-[color:var(--sand-light)]">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Main Dishes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <div className="w-full h-full bg-[color:var(--primary-light)]"></div>
                {/* Image would go here */}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-2">Kalua Pig</h3>
                <p className="text-gray-700 mb-4">
                  Our signature dish, slow-roasted pork cooked in an underground imu oven, 
                  seasoned with Hawaiian sea salt and wrapped in ti leaves for a smoky, tender flavor.
                </p>
                <div className="flex items-center text-[color:var(--primary-color)] font-medium">
                  <span>Traditional preparation</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <div className="w-full h-full bg-[color:var(--primary-light)]"></div>
                {/* Image would go here */}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-2">Laulau</h3>
                <p className="text-gray-700 mb-4">
                  Pork and fish wrapped in taro leaves, then steamed to perfection, 
                  creating a savory bundle that captures the essence of Hawaiian cooking.
                </p>
                <div className="flex items-center text-[color:var(--primary-color)] font-medium">
                  <span>Steamed in ti leaves</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side Dishes */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Side Dishes</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Poi</h3>
              <p>
                A traditional Hawaiian staple made from pounded taro root, 
                with a unique paste-like consistency and subtle flavor.
              </p>
            </div>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Lomi Salmon</h3>
              <p>
                Fresh salmon mixed with tomatoes, onions, and green onions, 
                creating a refreshing side dish similar to a light salsa.
              </p>
            </div>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Chicken Long Rice</h3>
              <p>
                A comforting noodle dish with tender chicken, clear mung bean noodles, 
                and ginger in a light broth.
              </p>
            </div>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Haupia</h3>
              <p>
                A traditional coconut milk-based dessert with a pudding-like consistency, 
                cool and refreshing after a hearty meal.
              </p>
            </div>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Sweet Potato</h3>
              <p>
                Purple sweet potatoes grown in volcanic soil, giving them their distinctive 
                color and sweet flavor.
              </p>
            </div>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Poke</h3>
              <p>
                Fresh raw fish seasoned with sea salt, soy sauce, sesame oil, 
                and limu seaweed, a Hawaiian delicacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section className="py-16 bg-[color:var(--ocean-blue-100)]">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Beverages</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-display text-xl font-semibold mb-2">Non-Alcoholic Options</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Fresh Tropical Fruit Punch</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Coconut Water</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Pineapple Juice</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Passion Fruit Iced Tea</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-display text-xl font-semibold mb-2">Alcoholic Options</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Mai Tai</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Blue Hawaii</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Lava Flow</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--secondary-color)] mr-2"></span>
                  <span>Hawaiian Beer Selection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">Dietary Information</h2>
            <p className="mb-6 text-center">
              We strive to accommodate various dietary needs while maintaining the authenticity of our Hawaiian cuisine.
            </p>
            
            <div className="bg-[color:var(--sand-light)] rounded-lg p-6 mb-8">
              <h3 className="font-display text-xl font-semibold mb-4">Accommodations Available:</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[color:var(--secondary-color)] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Vegetarian options</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[color:var(--secondary-color)] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Vegan alternatives</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[color:var(--secondary-color)] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Gluten-free options</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[color:var(--secondary-color)] mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Nut-free preparation</span>
                </li>
              </ul>
            </div>
            
            <p className="text-center">
              Please inform us of any dietary restrictions or allergies when making your reservation, 
              and our chefs will do their best to accommodate your needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[color:var(--primary-color)] text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Experience Our Authentic Hawaiian Feast?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your spot at our next luau and enjoy all these traditional Hawaiian dishes and more.
          </p>
          <Link href="/booking" className="btn-secondary hover-lift text-lg px-8 py-3">
            Reserve Your Table
          </Link>
        </div>
      </section>
    </SharedLayout>
  );
}
