import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--primary-dark)] text-white relative">
      {/* Polynesian wave pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
        <div className="w-full h-16 bg-[color:var(--primary-color)]" style={{
          maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'%3E%3C/path%3E%3C/svg%3E\")",
          maskSize: "cover",
          maskPosition: "bottom",
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'%3E%3C/path%3E%3C/svg%3E\")",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "bottom",
        }} />
      </div>
      
      {/* Main Footer */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[color:var(--accent-color)] flex items-center justify-center border-2 border-[color:var(--secondary-light)] shadow-md">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                AliʻiLuau
                <span className="text-[color:var(--secondary-light)]">•</span>
              </h3>
            </div>
            <p className="mb-6 text-[color:var(--text-light)] opacity-90">
              Experience the magic of Polynesia and the Pacific through authentic food, music, and dance at our traditional luau.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Icons with Polynesian styling */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" 
                className="w-9 h-9 rounded-full bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links with Polynesian styling */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-[color:var(--secondary-light)] border-b border-[color:var(--primary-color)] pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  About Us
                </Link>
              </li>
              <li>
                {/* <Link href="/experience" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  The Experience
                </Link> */}
              </li>
              <li>
                {/* <Link href="/menu" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  Menu
                </Link> */}
              </li>
              <li>
                <Link href="/gallery" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] transition-colors flex items-center">
                  <span className="text-[color:var(--secondary-light)] mr-2">›</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info with Polynesian styling */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-[color:var(--secondary-light)] border-b border-[color:var(--primary-color)] pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[color:var(--primary-color)] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[color:var(--text-light)]">1753-1799 Mount Cotton Rd, Cornubia, QLD 4130</span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[color:var(--primary-color)] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-[color:var(--text-light)]">(61) 415 793 573</span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[color:var(--primary-color)] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[color:var(--text-light)]">info@aliiluau.com</span>
              </li>
            </ul>
          </div>

          {/* Luau Schedule with Polynesian styling */}
          {/*<div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-[color:var(--secondary-light)] border-b border-[color:var(--primary-color)] pb-2">Luau Schedule</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Monday</span>
                <span className="text-[color:var(--natural-light)]">Closed</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Tuesday</span>
                <span className="text-[color:var(--natural-light)]">Closed</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Wednesday</span>
                <span className="text-[color:var(--secondary-light)]">6:00 PM - 9:00 PM</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Thursday</span>
                <span className="text-[color:var(--natural-light)]">Closed</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Friday</span>
                <span className="text-[color:var(--secondary-light)]">6:00 PM - 9:00 PM</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Saturday</span>
                <span className="text-[color:var(--secondary-light)]">6:00 PM - 9:00 PM</span>
              </li>
              <li className="flex justify-between text-[color:var(--text-light)]">
                <span>Sunday</span>
                <span className="text-[color:var(--secondary-light)]">5:00 PM - 8:00 PM</span>
              </li>
            </ul>
          </div>
          */}
        </div>
      </div>

      {/* Copyright with Polynesian styling */}
      <div className="bg-[color:var(--primary-darker)] py-6 relative">
        {/* Polynesian pattern divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[color:var(--secondary-color)] opacity-50"></div>
        
        <div className="container-custom text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[color:var(--text-light)] text-sm opacity-80">© {currentYear} AliʻiLuau. All rights reserved.</p>
            <div className="mt-3 md:mt-0 space-x-6">
              <Link href="/privacy-policy" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-[color:var(--text-light)] hover:text-[color:var(--secondary-color)] text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
