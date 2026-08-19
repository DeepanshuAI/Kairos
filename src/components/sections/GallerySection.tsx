import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'RESORT' | 'ROOMS' | 'DINING' | 'EXPERIENCES' | 'NATURE';
  title: string;
  image: string;
  aspect: string; // e.g. 'aspect-[16/10]' or 'aspect-[4/5]' or 'aspect-[16/9]'
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'RESORT',
    title: 'The Monolithic Signature Pavilion at Twilight',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'g2',
    category: 'ROOMS',
    title: 'Garden Suite Travertine Bath & Morning Fog',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g3',
    category: 'DINING',
    title: 'The Terrace Floating Dining Table at Sunset',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g4',
    category: 'NATURE',
    title: 'Sanctuary Forest Canopy & Morning Light',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'g5',
    category: 'ROOMS',
    title: 'Horizon Sky Villa Upper Observation Deck',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g6',
    category: 'EXPERIENCES',
    title: 'Silent Waterway Solar Launch Excursion',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g7',
    category: 'DINING',
    title: 'Organic Farm-to-Plate Artisanal Preparations',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'g8',
    category: 'RESORT',
    title: 'Central Reflecting Pool at Midnight',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
  },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'RESORT', 'ROOMS', 'DINING', 'EXPERIENCES', 'NATURE'];

  const filteredItems = activeCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="relative z-10 w-full py-28 md:py-40 bg-[#121110] text-ivory border-b border-stone/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-6 border-b border-stone/15">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                07 • VISUAL ARCHIVE
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                KAIROS IN STILLNESS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              The Gallery.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Explore the interplay of stone, light, and nature across the Kairos estate grounds and private villas.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'border-bronze bg-bronze/10 text-ivory font-semibold'
                    : 'border-stone/20 text-stone/50 hover:border-stone/40 hover:text-stone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Varied Image Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`group relative overflow-hidden bg-charcoal border border-stone/15 cursor-pointer ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-bronze font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm font-light text-ivory line-clamp-1">{item.title}</h4>
                </div>
                <ArrowUpRight size={16} className="text-bronze shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setLightboxItem(null)}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] bg-[#141312] border border-stone/20 overflow-hidden shadow-2xl space-y-4 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">
                  {lightboxItem.category} • {lightboxItem.title}
                </span>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 text-stone hover:text-ivory"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
