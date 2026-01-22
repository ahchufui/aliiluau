// Gallery image data structure
export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

// Gallery images
export const galleryImages: GalleryImage[] = [
  // Existing sample images
  {
    src: '/images/hero/Lead-Image-1080x675.webp',
    alt: 'Alii Luau Event',
    width: 1080,
    height: 675,
    category: 'featured',
  },
  {
    src: '/images/hero/Samoan-Food-Prep-Molly-NZ.webp',
    alt: 'Samoan Food Preparation',
    width: 1080,
    height: 675,
    category: 'food',
  },
  
  // Luau Night Photos - Performance Category
  {
    src: '/images/gallery/luau-night/1-A7401436.jpg',
    alt: 'Luau Night Performance',
    width: 1200,
    height: 800,
    category: 'performance',
  },
  {
    src: '/images/gallery/luau-night/2-A7401437.jpg',
    alt: 'Traditional Dance Performance',
    width: 1200,
    height: 800,
    category: 'performance',
  },
  {
    src: '/images/gallery/luau-night/10-A7401453.jpg',
    alt: 'Cultural Dance Showcase',
    width: 1200,
    height: 800,
    category: 'performance',
  },
  {
    src: '/images/gallery/luau-night/15-A7401464.jpg',
    alt: 'Polynesian Dance Performance',
    width: 1200,
    height: 800,
    category: 'performance',
  },
  {
    src: '/images/gallery/luau-night/22-A7401482.jpg',
    alt: 'Traditional Dancer',
    width: 1200,
    height: 800,
    category: 'performance',
  },
  
  // Food Category
  {
    src: '/images/gallery/luau-night/30-A7401500.jpg',
    alt: 'Traditional Luau Food',
    width: 1200,
    height: 800,
    category: 'food',
  },
  {
    src: '/images/gallery/luau-night/31-A7401501.jpg',
    alt: 'Luau Feast Preparation',
    width: 1200,
    height: 800,
    category: 'food',
  },
  {
    src: '/images/gallery/luau-night/32-A7401503.jpg',
    alt: 'Traditional Cooking Methods',
    width: 1200,
    height: 800,
    category: 'food',
  },
  
  // Guests Category
  {
    src: '/images/gallery/luau-night/40-A7401522.jpg',
    alt: 'Guests Enjoying the Luau',
    width: 1200,
    height: 800,
    category: 'guests',
  },
  {
    src: '/images/gallery/luau-night/41-A7401524.jpg',
    alt: 'Luau Celebration with Guests',
    width: 1200,
    height: 800,
    category: 'guests',
  },
  {
    src: '/images/gallery/luau-night/42-A7401526.jpg',
    alt: 'Community Gathering',
    width: 1200,
    height: 800,
    category: 'guests',
  },
  
  // Atmosphere Category
  {
    src: '/images/gallery/luau-night/100-A7401643.jpg',
    alt: 'Evening Luau Atmosphere',
    width: 1200,
    height: 800,
    category: 'atmosphere',
  },
  {
    src: '/images/gallery/luau-night/101-A7401644.jpg',
    alt: 'Night Celebration',
    width: 1200,
    height: 800,
    category: 'atmosphere',
  },
  {
    src: '/images/gallery/luau-night/102-A7401645.jpg',
    alt: 'Luau Night Setting',
    width: 1200,
    height: 800,
    category: 'atmosphere',
  },
  
  // Add more images as needed
];

// Helper function to get images by category
export function getImagesByCategory(category?: string): GalleryImage[] {
  if (!category) return galleryImages;
  return galleryImages.filter(image => image.category === category);
}

// Helper function to get all available categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  galleryImages.forEach(image => {
    if (image.category) {
      categories.add(image.category);
    }
  });
  return Array.from(categories);
}

// Instructions for adding new images
/*
To add images from your local folder:
1. Create a 'gallery' folder inside the public/images directory
2. Copy your images from C:\Users\Chu\OneDrive\Documents\Aiga Alii Luau\Lu'au photos\Lu'au Night Photos
3. Add entries to the galleryImages array above with the correct path, dimensions, and alt text
4. Optionally add categories to help organize the images
*/
