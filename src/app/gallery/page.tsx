'use client';

import React, { useState, useEffect } from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import { galleryImages, getAllCategories, getImagesByCategory, GalleryImage } from '@/data/galleryImages';

const categories = getAllCategories();

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);

  useEffect(() => {
    setFilteredImages(getImagesByCategory(selectedCategory));
  }, [selectedCategory]);
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[color:var(--primary-color)]">
          Gallery
        </h1>
        <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
          Experience the beauty and joy of our Alii Luau events through our photo gallery.
        </p>
        
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedCategory === undefined
                  ? 'bg-[color:var(--primary-color)] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedCategory === category
                    ? 'bg-[color:var(--primary-color)] text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
        
        {/* Gallery grid component */}
        <GalleryGrid images={filteredImages} />
        
        {/* Instructions for adding more images */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[color:var(--primary-color)]">Gallery Images</h2>
          <p className="mb-4">
            The gallery now displays images from your Luau Night Photos collection.
          </p>
          <p>
            To add more images, update the <code>galleryImages</code> array in <code>src/data/galleryImages.ts</code>.
          </p>
        </div>
      </div>
    </main>
  );
}
