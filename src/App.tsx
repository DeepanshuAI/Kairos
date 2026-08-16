import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { ArchitectureStory } from './components/ArchitectureStory';
import { ResidenceScene } from './three/ResidenceScene';
import { ResidencesShowcase } from './components/ResidencesShowcase';
import { InteriorExperience } from './components/InteriorExperience';
import { MaterialStory } from './components/MaterialStory';
import { LifestyleExperience } from './components/LifestyleExperience';
import { LocationExperience } from './components/LocationExperience';
import { CredibilityExperience } from './components/CredibilityExperience';
import { FinalConversionExperience } from './components/FinalConversionExperience';
import { initScrollReveals } from './animations/reveal';
import { CustomCursor } from './components/CustomCursor';
import { GlobalCanvas } from './three/GlobalCanvas';
import { LoadingScreen } from './components/LoadingScreen';
import { SectionIndicator } from './components/SectionIndicator';

export const App: React.FC = () => {
  useEffect(() => {
    initScrollReveals();
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-ivory font-sans antialiased selection:bg-bronze selection:text-ivory overflow-x-hidden relative">
      {/* Luxury Loading Screen */}
      <LoadingScreen />

      {/* Persistent Single 3D Architecture Canvas (Behind Narrative Stream) */}
      <GlobalCanvas />

      {/* Custom Global Cursor */}
      <CustomCursor />

      {/* Subtle Fixed Section Progress Rail */}
      <SectionIndicator />
      
      {/* Navigation Header */}
      <Navigation />

      {/* Main Experience Stream */}
      <main className="relative z-10 overflow-x-hidden">
        {/* 01 - HERO */}
        <Hero />

        {/* 02 - THE STATEMENT / PHILOSOPHY */}
        <Statement />

        {/* 03 - ARCHITECTURE (Pinned Scroll Story) */}
        <ArchitectureStory />

        {/* 04 - SIGNATURE 3D EXPERIENCE (Facade & Spatial Highlights) */}
        <ResidenceScene />

        {/* 05 - THE RESIDENCES (Interactive Showcase) */}
        <ResidencesShowcase />

        {/* 06 - INTERIOR ATMOSPHERE ("Then, the world turns inward.") */}
        <InteriorExperience />

        {/* 07 - MATERIAL STORY (Stone • Wood • Light • Glass • Craft) */}
        <MaterialStory />

        {/* 08 - LIFESTYLE EXPERIENCE (Morning -> Living -> Connection -> Stillness -> Evening) */}
        <LifestyleExperience />

        {/* 10 - LOCATION EXPERIENCE (Rewari Cartographic Map & Verified Connectivity) */}
        <LocationExperience />

        {/* 11 - CREDIBILITY & SPECIFICATIONS (Estate Facts & Architectural Integrity) */}
        <CredibilityExperience />

        {/* 12 - FINAL CONVERSION EXPERIENCE & FOOTER */}
        <FinalConversionExperience />
      </main>
    </div>
  );
};

export default App;
