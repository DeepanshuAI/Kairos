import React, { useEffect } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ResortIntroduction } from './components/sections/ResortIntroduction';
import { ArchitectureStory } from './components/ArchitectureStory';
import { ResidenceScene } from './three/ResidenceScene';
import { RoomsSection } from './components/sections/RoomsSection';
import { InteriorExperience } from './components/InteriorExperience';
import { MaterialStory } from './components/MaterialStory';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { DiningSection } from './components/sections/DiningSection';
import { AmenitiesSection } from './components/sections/AmenitiesSection';
import { GallerySection } from './components/sections/GallerySection';
import { LocationSection } from './components/sections/LocationSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactFooter } from './components/sections/ContactFooter';

import { BookingModal } from './components/booking/BookingModal';
import { RoomDetailModal } from './components/booking/RoomDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PageTransitionCurtain } from './components/common/PageTransitionCurtain';

import { initScrollReveals } from './animations/reveal';
import { CustomCursor } from './components/CustomCursor';
import { GlobalCanvas } from './three/GlobalCanvas';
import { LoadingScreen } from './components/LoadingScreen';
import { SectionIndicator } from './components/SectionIndicator';
import { Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentView, navigateToSection } = useBooking();

  useEffect(() => {
    initScrollReveals();
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-ivory font-sans antialiased selection:bg-bronze selection:text-ivory overflow-x-hidden relative">
      {/* Luxury Loading Screen */}
      <LoadingScreen />

      {/* Cinematic Page-Like Transition Curtain */}
      <PageTransitionCurtain />

      {/* Persistent Single 3D Architecture Canvas */}
      <GlobalCanvas />

      {/* Custom Global Cursor */}
      <CustomCursor />

      {/* Subtle Fixed Section Progress Rail (Only in continuous all view) */}
      {currentView === 'all' && <SectionIndicator />}
      
      {/* Navigation Header */}
      <Navigation />

      {/* MAIN VIEW CONTROLLER */}
      <main className="relative z-10 overflow-x-hidden animate-fadeIn">
        
        {/* ========================================================= */}
        {/* 1. CONTINUOUS 3D CINEMATIC OVERVIEW VIEW (DEFAULT) */}
        {/* ========================================================= */}
        {currentView === 'all' && (
          <>
            {/* 01 - HERO (3D Orbit & 4-Beat Narrative) */}
            <Hero />

            {/* 02 - RESORT INTRODUCTION (More than a stay) */}
            <ResortIntroduction />

            {/* 03 - ARCHITECTURAL STATEMENT (Pinned Scroll Story) */}
            <ArchitectureStory />

            {/* 04 - SIGNATURE 3D EXPERIENCE (Pavilion & Spatial Highlights) */}
            <ResidenceScene />

            {/* 05 - STAY YOUR WAY (Rooms & Suites Showcase from Local Database) */}
            <RoomsSection />

            {/* 06 - HORIZON / 360 (3D Cinematic Orbit) */}
            <section id="horizon" className="relative w-full h-[100vh] pointer-events-none">
              <div className="sticky top-1/2 -translate-y-1/2 w-full text-center mix-blend-difference text-ivory z-10 px-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-bronze font-medium block mb-4">04 • HORIZON</span>
                <h2 className="font-serif text-4xl sm:text-6xl font-light">360° Uninterrupted View.</h2>
              </div>
            </section>

            {/* 07 - LIGHT JOURNEY (3D Day to Night Atmosphere) */}
            <section id="light-journey" className="relative w-full h-[100vh] pointer-events-none">
              <div className="sticky top-1/2 -translate-y-1/2 w-full text-center mix-blend-difference text-ivory z-10 px-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-bronze font-medium block mb-4">05 • ATMOSPHERE</span>
                <h2 className="font-serif text-4xl sm:text-6xl font-light">Designed around the movement of light.</h2>
              </div>
            </section>

            {/* 08 - INTERIOR ATMOSPHERE */}
            <div className="relative z-10">
              <InteriorExperience />
            </div>

            {/* 09 - MATERIAL CRAFT STORY */}
            <div className="relative z-10">
              <MaterialStory />
            </div>

            {/* 10 - THE EXPERIENCE (Curated Resort Rituals) */}
            <ExperienceSection />

            {/* 11 - DINING AT KAIROS (Culinary Spaces & Menus) */}
            <DiningSection />

            {/* 12 - RESORT AMENITIES (Quiet Wellness Composition) */}
            <AmenitiesSection />

            {/* 13 - THE GALLERY (Filterable Visual Archive) */}
            <GallerySection />

            {/* 14 - LOCATION & ARRIVAL (Delhi Airport Transit & Topography) */}
            <LocationSection />

            {/* 15 - GUEST STORIES (Authentic Reviews) */}
            <TestimonialsSection />

            {/* 16 - CONCIERGE INQUIRY, NEWSLETTER & FOOTER */}
            <ContactFooter />
          </>
        )}

        {/* ========================================================= */}
        {/* 2. DEDICATED SECTION PAGE-LIKE VIEWS (UPON BUTTON CLICK) */}
        {/* ========================================================= */}

        {/* VIEW: STAY / ACCOMMODATIONS */}
        {currentView === 'stay' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">Accommodations</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <RoomsSection />
            <AmenitiesSection />
            <TestimonialsSection />
            <ContactFooter />
          </div>
        )}

        {/* VIEW: EXPERIENCE / RITUALS */}
        {currentView === 'experience' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">The Experience</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <ExperienceSection />
            <GallerySection />
            <ContactFooter />
          </div>
        )}

        {/* VIEW: DINING */}
        {currentView === 'dining' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">Dining</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <DiningSection />
            <ExperienceSection />
            <ContactFooter />
          </div>
        )}

        {/* VIEW: THE RESORT / ARCHITECTURE */}
        {currentView === 'resort' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">The Resort</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <ResortIntroduction />
            <InteriorExperience />
            <MaterialStory />
            <AmenitiesSection />
            <GallerySection />
            <ContactFooter />
          </div>
        )}

        {/* VIEW: LOCATION & ARRIVAL */}
        {currentView === 'location' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">Location</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <LocationSection />
            <ContactFooter />
          </div>
        )}

        {/* VIEW: CONTACT / CONCIERGE */}
        {currentView === 'contact' && (
          <div className="pt-24 min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between border-b border-stone/15 text-xs">
              <div className="flex items-center gap-2 text-stone/60 uppercase tracking-[0.25em]">
                <button onClick={() => navigateToSection('all', 'Kairos Sanctuary')} className="hover:text-bronze">
                  Home
                </button>
                <span>/</span>
                <span className="text-ivory font-medium">Concierge</span>
              </div>
              <button
                onClick={() => navigateToSection('all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory text-[10px] uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                <span>Return to 3D Story</span>
              </button>
            </div>

            <ContactFooter />
          </div>
        )}

      </main>

      {/* Global Modals & PMS Drawers */}
      <BookingModal />
      <RoomDetailModal />
      <AdminDashboard />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
};

export default App;
