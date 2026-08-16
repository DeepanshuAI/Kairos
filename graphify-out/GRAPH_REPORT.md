# Graph Report - .  (2026-08-16)

## Corpus Check
- Corpus is ~16,109 words - fits in a single context window. You may not need a graph.

## Summary
- 195 nodes · 265 edges · 19 communities (16 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Core Hero & Scroll Animations
- App TypeScript Configuration
- Build & Linting Tooling
- Vite & Node Configuration
- External Runtime Dependencies
- Three.js Scene & Lighting
- Package Manifest & Scripts
- Material & Interior Experience
- OxLint Rules & Schema
- Architecture Story Timeline
- Lifestyle Experience Transitions
- Root TypeScript Project References
- Design Tokens & Constants
- Vercel Deployment Rewrites

## God Nodes (most connected - your core abstractions)
1. `react` - 22 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 15 edges
4. `prefersReducedMotion()` - 12 edges
5. `scripts` - 5 edges
6. `cinematicEase` - 5 edges
7. `plugins` - 4 edges
8. `initSignatureLifestyleReveal()` - 4 edges
9. `initInteriorCinematicExpansion()` - 4 edges
10. `initMaterialTransformationTimeline()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `initSignatureLifestyleReveal()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/animations/lifestyleScroll.ts → src/animations/utils.ts
- `initInteriorCinematicExpansion()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/animations/materialScroll.ts → src/animations/utils.ts
- `initMaterialTransformationTimeline()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/animations/materialScroll.ts → src/animations/utils.ts
- `initScrollReveals()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/animations/reveal.ts → src/animations/utils.ts
- `App()` --calls--> `initScrollReveals()`  [EXTRACTED]
  src/App.tsx → src/animations/reveal.ts

## Import Cycles
- None detected.

## Communities (19 total, 3 thin omitted)

### Community 0 - "Core Hero & Scroll Animations"
Cohesion: 0.12
Nodes (21): react, animateHeroEntrance(), HeroAnimationRefs, initScrollReveals(), cinematicEase, defaultEase, smoothScrub, App() (+13 more)

### Community 1 - "App TypeScript Configuration"
Cohesion: 0.08
Nodes (23): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+15 more)

### Community 2 - "Build & Linting Tooling"
Cohesion: 0.09
Nodes (23): autoprefixer, oxlint, devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @tailwindcss/postcss (+15 more)

### Community 3 - "Vite & Node Configuration"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 4 - "External Runtime Dependencies"
Cohesion: 0.12
Nodes (17): gsap, lucide-react, dependencies, gsap, lucide-react, react, react-dom, @react-three/drei (+9 more)

### Community 5 - "Three.js Scene & Lighting"
Cohesion: 0.21
Nodes (10): prefersReducedMotion(), CameraController(), CameraControllerProps, Lighting(), ARCHITECTURAL_MATERIALS, ResidenceModel(), ResidenceScene(), CAMERA_STAGES (+2 more)

### Community 6 - "Package Manifest & Scripts"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 7 - "Material & Interior Experience"
Cohesion: 0.29
Nodes (7): initInteriorCinematicExpansion(), initMaterialTransformationTimeline(), MaterialTransformationRefs, InteriorExperience(), MaterialTransformation(), PHASES, TransformationPhase

### Community 9 - "OxLint Rules & Schema"
Cohesion: 0.22
Nodes (8): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, typescript, warn

### Community 10 - "Architecture Story Timeline"
Cohesion: 0.60
Nodes (3): ArchitectureScrollRefs, initArchitectureScrollStory(), ArchitectureStory()

### Community 11 - "Lifestyle Experience Transitions"
Cohesion: 0.60
Nodes (3): initSignatureLifestyleReveal(), SignatureLifestyleRefs, LifestyleExperience()

## Knowledge Gaps
- **83 isolated node(s):** `$schema`, `typescript`, `oxc`, `react/rules-of-hooks`, `warn` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Core Hero & Scroll Animations` to `Three.js Scene & Lighting`, `Material & Interior Experience`, `Section Layout & Rhythm Components`, `OxLint Rules & Schema`, `Architecture Story Timeline`, `Lifestyle Experience Transitions`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Build & Linting Tooling` to `Package Manifest & Scripts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `plugins` connect `OxLint Rules & Schema` to `Core Hero & Scroll Animations`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `$schema`, `typescript`, `oxc` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Hero & Scroll Animations` be split into smaller, more focused modules?**
  _Cohesion score 0.11596638655462185 - nodes in this community are weakly interconnected._
- **Should `App TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Build & Linting Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._