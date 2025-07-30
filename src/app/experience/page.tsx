import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'The Experience | AliʻiLuau - Authentic Polynesian Luau Experience',
  description: 'Discover what makes our authentic Polynesian luau special - from traditional food preparation to Polynesian dance performances and cultural demonstrations.',
};

export default function ExperiencePage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-teal-900">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/experience-hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">The AliʻiLuau Experience</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Immerse yourself in the culture, cuisine, and traditions of Hawaii
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">A Celebration of Polynesian Culture</h2>
            <p className="mb-6">
              At AliʻiLuau, we offer more than just a dinner show—we provide an immersive journey into 
              Polynesian culture and traditions. From the moment you arrive, you'll be welcomed with the 
              warm spirit of aloha that Polynesia is famous for.
            </p>
            <p className="mb-6">
              Our luau experience combines delicious traditional cuisine, captivating performances, 
              interactive cultural demonstrations to create an unforgettable evening that honors the rich heritage of the Pacific islands.
            </p>
          </div>
        </div>
      </section>

      {/* Traditional Welcome */}
      <section className="py-16 bg-sand-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">Traditional Welcome</h2>
              <p className="mb-4">
                Your evening begins with a traditional Hawaiian greeting as you're presented with a 
                fresh flower lei and a tradition welcome to country.
              </p>
              <p className="mb-4">
                As you enter our beautiful grounds, you'll be invited to participate in 
                various pre-dinner activities that offer a glimpse into daily life in ancient Polynesia and Pacific Islands.
              </p>
              <p className="mb-4">
                Try your hand at traditional Polynesian games, learn basic hula steps, or watch artisans 
                demonstrate traditional crafts such as weaving, coconut husking, and other Polynesian traditions.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/experience-welcome.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Feast */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/experience-feast.jpg')" }}
              ></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">Traditional Cooking</h2>
              {/*<p className="mb-4">
                The centerpiece of any luau is the feast, and ours features a lavish buffet of 
                traditional Hawaiian dishes prepared using authentic methods.
              </p>*/}
              <p className="mb-4">
                Witness the unveiling of our umu.
              </p>
              {/*<p className="mb-4">
                Our menu includes Hawaiian favorites such as lomi lomi salmon, poi, haupia (coconut pudding), 
                fresh tropical fruits, and much more. Vegetarian and special dietary options are always available.
              </p>*/}
              {/*<p className="mb-4">
                Throughout your meal, enjoy tropical cocktails including our signature Mai Tai, as well as 
                non-alcoholic options featuring fresh island fruits.
              </p>*/}
            </div>
          </div>
        </div>
      </section>

      {/* The Show */}
      <section className="py-16 bg-ocean-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-teal">Polynesian Performances</h2>
              <p className="mb-4">
                As the sun sets over the Pacific, our evening entertainment begins with the dramatic 
                lighting of the torches, signaling the start of our Polynesian review.
              </p>
              <p className="mb-4">
                Our talented performers will take you on a journey through the islands of Polynesia 
                through traditional dance and music. Experience the gentle sway of Hawaiian hula, the 
                energetic Tahitian tamure, the powerful Maori haka from New Zealand, and the exciting 
                Samoan fire knife dance.
              </p>
              <p className="mb-4">
                Each performance is accompanied by traditional music and chants, with narration that 
                explains the cultural significance and stories behind each dance.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/experience-show.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Demonstrations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-teal">Cultural Demonstrations</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Demo 1 */}
            <div className="bg-sand-100 rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/demo-lei.jpg')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-3 text-orange">Lei Making</h3>
                <p>
                  Learn the art of lei making and create your own beautiful flower garland to take home 
                  as a memento of your evening with us.
                </p>
              </div>
            </div>

            {/* Demo 2 */}
            <div className="bg-sand-100 rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/demo-hula.jpg')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-3 text-orange">Hula Lessons</h3>
                <p>
                  Join our dancers for a fun and interactive hula lesson where you'll learn the basic 
                  steps and hand movements of this beautiful Hawaiian dance form.
                </p>
              </div>
            </div>

            {/* Demo 3 */}
            <div className="bg-sand-100 rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/demo-coconut.jpg')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-3 text-orange">Coconut Husking</h3>
                <p>
                  Watch our skilled demonstrators show traditional methods of husking coconuts and 
                  extracting the meat and milk—vital skills in traditional Hawaiian life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-16 bg-sand-100">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-teal">Menu Highlights</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-display text-xl font-bold mb-3 text-orange">Kalua Pork</h3>
              <p className="text-sm">
                Tender pork slow-cooked in our traditional underground imu oven, wrapped in ti leaves 
                for a distinctive smoky flavor.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-display text-xl font-bold mb-3 text-orange">Lomi Lomi Salmon</h3>
              <p className="text-sm">
                Fresh salmon mixed with diced tomatoes and onions, a refreshing side dish that 
                complements the rich flavors of the main courses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-display text-xl font-bold mb-3 text-orange">Poi</h3>
              <p className="text-sm">
                A traditional Hawaiian staple made from taro root, with a unique texture and subtle flavor 
                that pairs perfectly with savory dishes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-display text-xl font-bold mb-3 text-orange">Haupia</h3>
              <p className="text-sm">
                A delicious coconut milk-based dessert with a pudding-like consistency, the perfect sweet 
                ending to your luau feast.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="mb-6">
              Our menu includes many more traditional and contemporary Hawaiian dishes, as well as 
              options for vegetarians and those with dietary restrictions.
            </p>
            <Link href="/booking" className="btn-primary">View Full Menu & Book Now</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Ready to Experience AliʻiLuau?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Join us for an unforgettable evening of Hawaiian culture, cuisine, and entertainment. 
            Book your visit to AliʻiLuau today!
          </p>
          <Link href="/booking" className="btn-secondary">Check Availability & Book Now</Link>
        </div>
      </section>
    </SharedLayout>
  );
}
