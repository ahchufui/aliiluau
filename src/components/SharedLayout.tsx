'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

interface SharedLayoutProps {
  children: ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--natural-light)]">
      {/* Header with Polynesian styling */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'} relative`}
      >
        {/* Polynesian decorative border at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[color:var(--secondary-color)]" />
        
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              {/* Logo with Polynesian styling */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[color:var(--accent-color)] flex items-center justify-center border-2 border-[color:var(--secondary-light)] shadow-md">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <span className="font-bold text-2xl text-[color:var(--primary-dark)]">
                AliʻiLuau<span className="text-[color:var(--secondary-color)]">.</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation with Polynesian styling */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/about' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/experience" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/experience' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  href="/menu" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/menu' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/gallery' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`font-medium transition-all duration-300 relative py-2 px-3 ${pathname === '/contact' 
                    ? 'text-[color:var(--secondary-color)] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[color:var(--secondary-color)]' 
                    : 'hover:text-[color:var(--primary-color)] hover:bg-[color:var(--sand-light)] rounded-md'}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Book Now Button with Polynesian styling */}
          <div className="hidden md:block">
            <Link 
              href="/booking" 
              className="btn-primary hover-lift"
            >
              Book Now
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[color:var(--primary-color)] text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 z-50 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`py-2 px-4 rounded-md ${pathname === '/' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`py-2 px-4 rounded-md ${pathname === '/about' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                About
              </Link>
              <Link 
                href="/experience" 
                className={`py-2 px-4 rounded-md ${pathname === '/experience' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                Experience
              </Link>
              <Link 
                href="/menu" 
                className={`py-2 px-4 rounded-md ${pathname === '/menu' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                Menu
              </Link>
              <Link 
                href="/gallery" 
                className={`py-2 px-4 rounded-md ${pathname === '/gallery' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                Gallery
              </Link>
              <Link 
                href="/contact" 
                className={`py-2 px-4 rounded-md ${pathname === '/contact' ? 'bg-[color:var(--sand-light)] text-[color:var(--primary-color)] font-medium' : ''}`}
              >
                Contact
              </Link>
              <Link 
                href="/booking" 
                className="btn-primary w-full text-center"
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
