"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
      } relative`}
    >
      {/* Polynesian decorative border at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[color:var(--secondary-color)]" />
      
      <div className="container-custom flex justify-between items-center">
        {/* Logo with Polynesian styling */}
        <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[color:var(--accent-color)] flex items-center justify-center border-2 border-[color:var(--secondary-light)] shadow-md">
            <span className="text-white font-bold text-lg">AL</span>
          </div>
          <span className="font-bold text-2xl text-[color:var(--primary-dark)]">
            AliʻiLuau
            <span className="text-[color:var(--secondary-color)]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Experience', href: '/experience' },
            { name: 'Menu', href: '/menu' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors hover:text-[color:var(--secondary-color)] relative group ${pathname === link.href 
                ? 'text-[color:var(--secondary-color)]' 
                : 'text-[color:var(--primary-dark)]'}`}
            >
              {link.name}
              {/* Polynesian-inspired underline effect */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--secondary-color)] transition-all duration-300 ${pathname === link.href ? 'w-full' : 'group-hover:w-full'}`}></span>
            </Link>
          ))}

          <Link href="/booking" className="btn-primary ml-4">
            Book Now
          </Link>
        </nav>

        {/* Mobile menu button with Polynesian styling */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center p-2 rounded-full bg-[color:var(--primary-color)] text-white hover:bg-[color:var(--primary-dark)] transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu with Polynesian styling */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t-2 border-[color:var(--secondary-light)]">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Experience', href: '/experience' },
                { name: 'Menu', href: '/menu' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium py-2 px-3 rounded-md transition-colors ${
                    pathname === item.href
                      ? 'text-[color:var(--secondary-color)] bg-[color:var(--natural-medium)]'
                      : 'text-[color:var(--primary-dark)] hover:bg-[color:var(--natural-medium)] hover:text-[color:var(--secondary-color)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-[color:var(--natural-medium)]">
                <Link
                  href="/booking"
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
