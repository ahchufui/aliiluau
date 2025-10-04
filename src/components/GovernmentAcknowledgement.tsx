'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GovernmentAcknowledgementProps {
  className?: string;
}

export default function GovernmentAcknowledgement({ className = '' }: GovernmentAcknowledgementProps) {
  return (
    <div className={`government-acknowledgement ${className}`}>
      {/* Logos displayed side by side */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 w-full">
        {/* Queensland Government */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="min-w-[180px] min-h-[60px] relative">
            <Image 
              src="/images/branding/logan-city-logo.png"
              alt="Logan City Council Logo"
              width={180}
              height={60}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="text-sm text-white">
            <p className="mb-2">
              This project is proudly supported by Logan City Council
            </p>
            <p>
              <Link 
                href="https://www.qld.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-maroon hover:underline"
              >
                Visit Queensland Government
              </Link>
            </p>
          </div>
        </div>
        
        {/* Logan City Council */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="min-w-[200px] min-h-[50px] relative">
            <Image 
              src="/images/branding/qld-coa-logo.png"
              alt="Queensland Government Coat of Arms"
              width={200}
              height={50}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="text-sm text-white">
            <p className="mb-2">
              This project is proudly supported by the Queensland Government.
            </p>
            <p>
              <Link 
                href="https://www.logan.qld.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A3D7B] hover:underline"
              >
                Visit Logan City Council
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
