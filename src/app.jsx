// Luca Martinez — Portfolio App

import React, { useState, useEffect, useRef } from 'react';
import wallVBImage from './images/WallVB.png';
import rfsImage from './images/RFS.png';
import remindersImage from './images/RemindersCleaner.jpg';
import remindersImage2 from './images/RemindersCleaner2.jpg';
import beachVBImage from './images/BeachVolleyballStats.jpg';
import forkdImage from './images/Forkd1.png';
import forkdImage2 from './images/Forkd2.png';
import mimicImage from './images/Mimic.webp';
import portfolioImage from './images/PortfolioWebsite.png';
import mechatronicsImage from './images/Mechatronics.jpg';
import voiceZapImage from './images/VoiceZap.jpg';
import reactionTimerImage from './images/ReactionTimer.jpg';
import meImage from './images/Me.jpg';

/* ============ DATA ============
 *
 * Static content lives at the top of the file as plain JS arrays. The
 * intent is that updating the portfolio (adding a project, changing a
 * blurb, etc.) means editing one of these arrays — not touching the
 * components below.
 *
 * Each entry uses an `accent` key that maps into ACCENT_HEX so the
 * card / row / detail view picks up the right oklch() color without
 * any hard-coded hex values in the components.
 */

// Software / web projects shown in the "Coding Projects" section.
// Ordered newest → oldest by latest active month. Tag suffixes are
// per-category (PROD/APP/DATA) and increment in the same chronological
// order, so PROD-001 = newest production site, PROD-002 = second-newest,
// etc. Reordering this array means renumbering the tags too.
const CODE_PROJECTS = [
{
  id: 'portfolio',
  name: 'Portfolio Website',
  role: 'Personal Site',
  stack: ['React', 'Vite', 'Vercel'],
  blurb: 'This site. React + Vite on Vercel with a cosmic theme and ambient SVG/canvas motion. A rocket that wanders the page (and speeds away if you hover near it), an interactive ISS that drifts toward your cursor, animated rover dividers between sections, and an orbiting moon system in the Flight Log.',
  accent: 'terracotta',
  year: 'May 2026',
  tag: 'PROD-001',
  image: portfolioImage
},
{
  id: 'wall',
  name: 'Wall Volleyball',
  role: 'Full-Stack Dev',
  stack: ['React', 'Vercel', 'AWS S3', 'Firebase', 'Stripe'],
  blurb: 'Migrated 4 legacy WordPress sites to React, cutting infra cost 90%. Transferred 1,000+ training videos out of a legacy app into a scalable AWS S3 pipeline, then built the full e-commerce + customer dashboard flow on Stripe.',
  accent: 'terracotta',
  year: 'Feb–May 2026',
  tag: 'PROD-002',
  image: wallVBImage,
  imageObjectPosition: 'left center'
},
{
  id: 'forkd',
  name: 'Forkd',
  role: 'Mobile App',
  stack: ['React Native', 'Expo', 'Firebase', 'Google AdMob'],
  blurb: 'Restaurant-decision app: pulls nearby spots from your location, lets you filter by cuisine and dietary preferences, then spins a colorful wheel to pick. React Native + Expo for the client, Firebase for auth + user data, monetized via Google AdMob.',
  accent: 'ochre',
  year: 'Apr 2026',
  tag: 'APP-001',
  // Two phone screenshots side-by-side. Square-ish frame at 420px max
  // so the slot is noticeably less tall than a single 9:19 phone (which
  // was 591px tall) — the description below now stays on screen. Each
  // column ends up close to phone aspect, so the screenshots render
  // mostly uncropped under cover-fit.
  images: [forkdImage, forkdImage2],
  imageRatio: '1 / 1',
  imageMaxWidth: '420px'
},
{
  id: 'rfs',
  name: 'Ready For School',
  role: 'Frontend Dev',
  stack: ['React', 'Vercel', 'Stripe'],
  blurb: 'Two production donor-facing sites for an education non-profit. 40% faster page loads, 100+ recurring donor subscribers via Stripe + email capture flows.',
  accent: 'ochre',
  year: 'Mar–Apr 2026',
  tag: 'PROD-003',
  image: rfsImage
},
{
  id: 'mimic',
  name: 'Mimic',
  role: 'Computer Vision App',
  stack: ['React', 'MediaPipe', 'AI'],
  blurb: 'AI movement coach for beach volleyball. Record yourself executing a skill, then play it side-by-side with a pro reference clip. MediaPipe pose-tracking overlays joint skeletons on both videos so you can see deltas frame-by-frame, with optional AI auto-analysis of the differences.',
  accent: 'crimson',
  year: 'Jan 2026',
  tag: 'APP-002',
  image: mimicImage
},
{
  id: 'reminders',
  name: 'Reminders Cleaner',
  role: 'iOS App',
  stack: ['Flutter', 'Dart', 'iOS SDK'],
  blurb: 'Tinder-style swipe interface for cleaning out the iOS Reminders database. Native SDK integration, 100+ reminders processed with zero data loss, themeable UI + onboarding.',
  accent: 'crimson',
  year: 'Jul 2025',
  tag: 'APP-003',
  // Two phone screenshots side-by-side; same layout as Forkd.
  images: [remindersImage, remindersImage2],
  imageRatio: '1 / 1',
  imageMaxWidth: '420px'
},
{
  id: 'volley-stats',
  name: 'Beach Volleyball Stats',
  role: 'Data Analysis',
  stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
  blurb: 'Pulled 1000+ match records from Sports Devs API, built rate-limited scrapers, generated 10+ visualizations to identify optimal serving strategies.',
  accent: 'jade',
  year: 'May 2025',
  tag: 'DATA-001',
  image: beachVBImage
}];


// Hardware / robotics projects shown in the "Robotics" section.
// `specs` are the bullet-pointed quick-facts under each card.
const ROBOTICS_PROJECTS = [
{
  id: 'auto-robot',
  name: 'Autonomous Maze Robot',
  award: 'Mechatronics - PLINKO',
  stack: ['C++', 'Arduino', 'Computer Vision', 'SolidWorks'],
  blurb: 'Semester-long final. Navigates a maze, identifies and collects colored disks, drops them in correct bins. Sonar + state machine for smooth nav. 3D-printed and laser-cut custom chassis.',
  accent: 'terracotta',
  year: '2024',
  tag: 'BOT-001',
  specs: ['Sonar depth', 'OOD state machine', 'CV color detection'],
  image: mechatronicsImage,
  // Shift the visible window down — anchors the lower portion of the
  // 4284×5712 source so the robot/board content sits in frame instead
  // of getting top-cropped.
  imageObjectPosition: 'center 90%'
},
{
  id: 'zap',
  name: 'Voice-Activated Zap System',
  award: 'Summer Build',
  stack: ['Arduino', 'C++', 'Voice Rec', 'Relay', 'Taser'],
  blurb: 'Voice-recognition shock system. Zaps friends when they say unknown keywords. 95% accuracy. Housed in a Frosted Flakes box. Friends learned to watch their language real quick.',
  accent: 'crimson',
  year: '2023',
  tag: 'BOT-002',
  specs: ['Relay switching', '95% accuracy', 'Cereal-box chassis'],
  image: voiceZapImage
},
{
  id: 'reaction',
  name: 'Reaction Time Trainer',
  award: 'Personal Build',
  stack: ['Arduino', 'C++', 'PVC Fab'],
  blurb: '4-station reaction trainer. Reverse-engineered commercial buttons to interface with Arduino. PVC housing. Tracks across sessions so you can see if you\'re actually getting faster.',
  accent: 'ochre',
  year: '2023',
  tag: 'BOT-003',
  specs: ['<50ms latency', '4 stations', '100+ logged runs'],
  image: reactionTimerImage
}];


// Work + education timeline shown in the "Flight Log" section, oldest at
// the bottom, most-recent at the top.
const EXPERIENCE = [
{ co: 'Wall Volleyball', role: 'Full-Stack Developer', when: 'Feb 2026 — May 2026', where: 'Remote', notes: 'React migration · e-commerce architecture · Stripe + AWS S3 + Firebase' },
{ co: 'Ready For School', role: 'Frontend Developer', when: 'Mar 2026 — Apr 2026', where: 'Remote', notes: 'Donor-facing production sites · perf tuning · Stripe payment flows' },
{ co: 'CodeWiz', role: 'Coding Coach', when: 'May 2025 — Present', where: 'St. Petersburg, FL', notes: '25+ students, ages 7–17 · 90% retention · Scratch + robotics + game dev' },
{ co: 'Roger Williams University', role: 'B.S. Computer Science · Minor: Robotics & Math', when: 'Aug 2021 — May 2025', where: 'Bristol, RI', notes: 'Dean\'s List · ABET Accredited · Software Design, AI, Mechatronics' }];


// "Off-duty" interests rendered in the About sidebar, with English /
// Spanish glosses to nod at the bilingual angle in the bio.
const INTERESTS = [
{ name: 'Beach Volleyball', es: 'Vóley playa', glyph: '○' },
{ name: 'Rock Climbing',    es: 'Escalada',    glyph: '△' },
{ name: 'Robotics',         es: 'Robótica',    glyph: '⬡' },
{ name: 'Video Creation',   es: 'Cine',        glyph: '▷' }];


// Maps the named accent on each project entry to an actual oklch() color
// string. Using oklch() (instead of hex) keeps the four accents at the
// same perceived chroma, so they read as a coherent palette.
// These same names exist as CSS custom properties in styles.css; this
// table is what the *components* use when they need the color inline
// (e.g. a CSS variable on a row, a stroke on the project list dot).
const ACCENT_HEX = {
  terracotta: 'oklch(65% 0.15 40)',
  ochre: 'oklch(75% 0.13 75)',
  crimson: 'oklch(58% 0.19 25)',
  jade: 'oklch(60% 0.10 165)'
};

/* ============ HOOKS ============ */

/**
 * useScrollMouseTransform
 * -----------------------
 * Drives an SVG element's `transform` attribute from two inputs:
 *
 *   - the page's scroll position → continuous rotation
 *   - the cursor's distance from a reference element → translation toward
 *     the cursor when it's in range, with a dead zone at the center
 *
 * Both the hero's ISS and the planet interlude further down the page
 * use this hook with slightly different tunables, so the two animations
 * feel related but not identical.
 *
 * Implementation notes:
 *
 *   1. A continuous requestAnimationFrame loop runs while the host
 *      component is mounted. Each frame it:
 *        a. computes the *target* translate/rotate from current inputs,
 *        b. lerps the *displayed* values toward those targets.
 *      The lerp is what makes the motion feel seamless — sudden changes
 *      in target (e.g. cursor entering the dead zone) decay over ~10
 *      frames instead of snapping.
 *
 *   2. A dead zone (no pull inside `deadZonePx`) is necessary because
 *      the unit vector toward the cursor (dx/dist, dy/dist) is unstable
 *      at the singularity dist→0. Without it, micro-jitter on the
 *      cursor flips the pull direction wildly. The lerp keeps the
 *      dead-zone *boundary* visually smooth.
 *
 *   3. The viewBox is assumed centered on (0, 0) with width
 *      `viewBoxSize`. Pull is computed in pixels first, then converted
 *      to SVG units so motion feels right regardless of how big the
 *      element renders.
 *
 * @param {React.RefObject<HTMLElement>} deckRef  Container whose center anchors cursor distance.
 * @param {React.RefObject<SVGElement>}  targetRef SVG <g> that receives the transform.
 * @param {object}                       opts     Optional tunables, see destructure below.
 */
function useScrollMouseTransform(deckRef, targetRef, opts = {}) {
  const {
    pullRangePx = 420,          // px from center within which the cursor attracts the target
    deadZonePx = 110,           // px around center where pull is disabled (stabilizes singularity)
    maxNudgePx = 18,            // peak displacement (px) when cursor is at the dead-zone edge
    scrollRotDegPerPx = 0.04,   // 1 px of scroll → this many degrees of rotation
    pullEase = 0.12,            // 0..1 — lerp factor for translation; lower = more lag/smoother
    rotEase = 0.20,             // 0..1 — lerp factor for rotation
    viewBoxSize = 600,          // SVG viewBox width (assumes -size/2..size/2 on each axis)
  } = opts;

  useEffect(() => {
    // Inputs (mutated by listeners).
    let scrollY = window.scrollY;
    let mouseX = -9999, mouseY = -9999; // off-screen sentinels until the first mousemove

    // Smoothed state (mutated each frame inside tick).
    let curPullX = 0, curPullY = 0;
    let curRot = 0;

    let rafId = null;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      rafId = requestAnimationFrame(tick);

      const deck = deckRef.current;
      const target = targetRef.current;
      if (!deck || !target) return;

      const rect = deck.getBoundingClientRect();
      if (rect.width === 0) return; // not laid out yet

      // Cursor distance to deck center, in viewport px.
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.hypot(dx, dy);

      // Target pull in SVG units. Outside the active band → 0.
      let targetPullX = 0;
      let targetPullY = 0;
      if (dist > deadZonePx && dist < pullRangePx) {
        // Linear falloff: full strength at the dead-zone edge, fading to
        // zero at the outer pull range.
        const t = (pullRangePx - dist) / (pullRangePx - deadZonePx); // 0..1
        const strengthPx = t * maxNudgePx;
        const pxToSvg = viewBoxSize / rect.width;
        targetPullX = (dx / dist) * strengthPx * pxToSvg;
        targetPullY = (dy / dist) * strengthPx * pxToSvg;
      }

      // Exponential approach toward target — the eased curves are what
      // hide the dead-zone boundary visually.
      curPullX += (targetPullX - curPullX) * pullEase;
      curPullY += (targetPullY - curPullY) * pullEase;

      const targetRot = scrollY * scrollRotDegPerPx;
      curRot += (targetRot - curRot) * rotEase;

      // SVG transforms apply right-to-left: rotate first, then translate
      // — so rotation pivots around the local origin and translation
      // is independent of spin angle.
      target.setAttribute(
        'transform',
        `translate(${curPullX.toFixed(2)} ${curPullY.toFixed(2)}) rotate(${curRot.toFixed(2)})`
      );
    };

    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    // Park the cursor outside the pull range when it leaves the window
    // so the target eases back home smoothly.
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [deckRef, targetRef, pullRangePx, deadZonePx, maxNudgePx, scrollRotDegPerPx, pullEase, rotEase, viewBoxSize]);
}

/* ============ COMPONENTS ============ */

/**
 * The little numbered tag that sits above every section heading
 * (e.g. "01 / ABOUT THE OPERATOR"). Pure presentation — no state.
 */
function SectionLabel({ num, children }) {
  return (
    <div className="label">
      <span className="label-num mono">{num}</span>
      <span className="mono">{children}</span>
    </div>);

}

/**
 * The large editorial heading that sits under a SectionLabel — set in the
 * Instrument Serif italic used by the hero/ledes (e.g. "The operator.").
 */
function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

/* ---------- Hero ----------
 * The landing section. Two pieces of light interactivity:
 *   1. A live EST clock in the top-right status bar (updates every second).
 *   2. The ISS illustration in the orbital deck reacts to the user:
 *        - rotates a little as the page scrolls,
 *        - "edges" toward the cursor when the cursor is in range.
 */
function Hero() {
  const [time, setTime] = useState(() => new Date());

  // Refs into the DOM so the ISS effect can measure the deck's position
  // (for cursor-distance math) and write transforms onto the ISS group.
  const orbitDeckRef = useRef(null);
  const issPullRef = useRef(null);

  // ── Live EST clock ────────────────────────────────────────────────
  // setInterval keeps a render cadence of ~1s; the cleanup clears the
  // timer on unmount so we don't leak a handle if Hero is ever removed.
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // ISS reactivity (scroll-spin + cursor attraction). The shared hook
  // does all the heavy lifting; see useScrollMouseTransform up top.
  useScrollMouseTransform(orbitDeckRef, issPullRef);

  // Format the live clock as HH:MM:SS EST. Intl/toLocaleTimeString
  // pinned to America/New_York so it follows DST automatically.
  const est = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/New_York',
  }) + ' EST';

  return (
    <section className="hero" data-screen-label="01 Hero">
      {/* Top status bar */}
      <div className="hero-statusbar container">
        <div className="status-left">
          <span className="dot" />
          <span className="mono">SYS · ONLINE</span>
        </div>
        <nav className="hero-nav">
          <a href="#about" className="mono">01 About</a>
          <a href="#experience" className="mono">02 Experience</a>
          <a href="#code" className="mono">03 Code</a>
          <a href="#robotics" className="mono">04 Robotics</a>
          <a href="#contact" className="mono">05 Contact</a>
        </nav>
        <div className="status-right mono">{est}</div>
      </div>

      {/* Orbital decoration — ISS */}
      <div className="orbit-deck" aria-hidden="true" ref={orbitDeckRef}>
        <svg viewBox="-300 -300 600 600" width="100%" height="100%">
          <defs>
            <linearGradient id="panel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1442" />
              <stop offset="50%" stopColor="#3a2d80" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1a1442" />
            </linearGradient>
            <linearGradient id="module" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8dcc4" />
              <stop offset="100%" stopColor="#9a8a6c" />
            </linearGradient>
            <linearGradient id="radiator" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9d2c2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6a6354" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* concentric orbits */}
          <circle r="160" fill="none" stroke="rgba(244,234,216,0.08)" strokeWidth="0.6" />
          <circle r="220" fill="none" stroke="rgba(244,234,216,0.06)" strokeWidth="0.4" strokeDasharray="2 6" />
          <circle r="280" fill="none" stroke="rgba(244,234,216,0.04)" strokeWidth="0.4" />
          {/* tick marks on outer orbit */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = i / 36 * Math.PI * 2;
            const r1 = 280, r2 = i % 3 === 0 ? 270 : 275;
            return (
              <line key={i}
                x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
                x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
                stroke="rgba(244,234,216,0.3)" strokeWidth="0.6" />
            );
          })}

          {/* ISS — drifts slowly */}
          <g className="iss-drift">
            <g ref={issPullRef}>
            <g transform="rotate(-12)">
              {/* Main truss (horizontal backbone) */}
              <rect x="-180" y="-3" width="360" height="6" fill="#c9bfa8" />
              <rect x="-180" y="-3" width="360" height="6" fill="none" stroke="#3a3326" strokeWidth="0.4" />
              {/* truss segments */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1={-160 + i * 40} y1="-3" x2={-160 + i * 40} y2="3" stroke="#3a3326" strokeWidth="0.5" />
              ))}

              {/* Solar arrays — 4 pairs, panels with grid */}
              {[-160, -100, 100, 160].map((cx, idx) => (
                <g key={idx} transform={`translate(${cx}, 0)`}>
                  {/* upper panel */}
                  <rect x="-26" y="-58" width="52" height="48" fill="url(#panel)" stroke="oklch(75% 0.13 75)" strokeWidth="0.6" />
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={i} x1={-26 + (i + 1) * 6.5} y1="-58" x2={-26 + (i + 1) * 6.5} y2="-10" stroke="rgba(244,234,216,0.18)" strokeWidth="0.3" />
                  ))}
                  <line x1="-26" y1="-34" x2="26" y2="-34" stroke="rgba(244,234,216,0.18)" strokeWidth="0.3" />
                  {/* lower panel */}
                  <rect x="-26" y="10" width="52" height="48" fill="url(#panel)" stroke="oklch(75% 0.13 75)" strokeWidth="0.6" />
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={i} x1={-26 + (i + 1) * 6.5} y1="10" x2={-26 + (i + 1) * 6.5} y2="58" stroke="rgba(244,234,216,0.18)" strokeWidth="0.3" />
                  ))}
                  <line x1="-26" y1="34" x2="26" y2="34" stroke="rgba(244,234,216,0.18)" strokeWidth="0.3" />
                  {/* connector booms */}
                  <line x1="0" y1="-10" x2="0" y2="-3" stroke="#9a8a6c" strokeWidth="1" />
                  <line x1="0" y1="10" x2="0" y2="3" stroke="#9a8a6c" strokeWidth="1" />
                </g>
              ))}

              {/* Radiators (smaller, between inner solar arrays) */}
              <g transform="translate(-50, 0)">
                <rect x="-8" y="-20" width="16" height="40" fill="url(#radiator)" stroke="#3a3326" strokeWidth="0.4" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={i} x1="-8" y1={-16 + i * 8} x2="8" y2={-16 + i * 8} stroke="#3a3326" strokeWidth="0.3" />
                ))}
              </g>
              <g transform="translate(50, 0)">
                <rect x="-8" y="-20" width="16" height="40" fill="url(#radiator)" stroke="#3a3326" strokeWidth="0.4" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={i} x1="-8" y1={-16 + i * 8} x2="8" y2={-16 + i * 8} stroke="#3a3326" strokeWidth="0.3" />
                ))}
              </g>

              {/* Central module cluster — vertical spine */}
              <g>
                {/* spine */}
                <rect x="-9" y="-44" width="18" height="88" rx="3" fill="url(#module)" stroke="#3a3326" strokeWidth="0.5" />
                {/* node ring details */}
                <line x1="-9" y1="-22" x2="9" y2="-22" stroke="#3a3326" strokeWidth="0.4" />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#3a3326" strokeWidth="0.4" />
                <line x1="-9" y1="22" x2="9" y2="22" stroke="#3a3326" strokeWidth="0.4" />
                {/* windows */}
                <circle cx="-4" cy="-32" r="1.2" fill="oklch(75% 0.13 75)" />
                <circle cx="4" cy="-32" r="1.2" fill="oklch(75% 0.13 75)" />
                <circle cx="-4" cy="12" r="1.2" fill="oklch(75% 0.13 75)" />
                <circle cx="4" cy="12" r="1.2" fill="oklch(75% 0.13 75)" />
                {/* docked capsule (top) */}
                <rect x="-5" y="-58" width="10" height="14" rx="2" fill="#b6a888" stroke="#3a3326" strokeWidth="0.4" />
                <rect x="-3" y="-44" width="6" height="2" fill="#3a3326" />
                {/* cupola (bottom) */}
                <path d="M -8 44 Q 0 56 8 44 Z" fill="url(#module)" stroke="#3a3326" strokeWidth="0.4" />
                <circle cx="0" cy="48" r="2" fill="oklch(75% 0.13 75)" opacity="0.9" />
              </g>

              {/* faint highlight for warmth */}
              <ellipse cx="0" cy="0" rx="200" ry="14" fill="oklch(65% 0.15 40)" opacity="0.04" />
            </g>
            </g>
          </g>

          {/* tiny satellites in orbit around the ISS */}
          <g className="orbit-moon orbit-moon-1">
            <circle cx="220" cy="0" r="2.5" fill="oklch(75% 0.13 75)" />
          </g>
          <g className="orbit-moon orbit-moon-2">
            <circle cx="160" cy="0" r="2" fill="oklch(65% 0.15 40)" />
          </g>
          <g className="orbit-moon orbit-moon-3">
            <circle cx="280" cy="0" r="1.5" fill="#dfe8ff" />
          </g>
        </svg>
      </div>

      <div className="container hero-grid">
        <div className="hero-meta">
          <SectionLabel num="00 /">CALL SIGN</SectionLabel>
          <div className="hero-meta-item">
            <span className="mono dim">N°</span>
            <span className="mono">LM-2003</span>
          </div>
          <div className="hero-meta-item">
            <span className="mono dim">LOC</span>
            <span className="mono">ST. PETERSBURG, FL</span>
          </div>
          <div className="hero-meta-item">
            <span className="mono dim">LANG</span>
            <span className="mono">EN / ES</span>
          </div>
        </div>

        <div className="hero-title">
          <h1>
            <span className="line thin">prototype</span>
            <span className="line"><span className="ochre">test</span></span>
            <span className="line heavy"><span className="terra">iterate.</span></span>
          </h1>

          <p className="hero-sub">
            I'm <strong>Luca Martinez</strong> a <em>Frontend Developer</em>, App & Website
            Maker, <em>Robotics Engineer</em> end-to-end (think, schematic, code, build, test),
            full-time Creative.
          </p>

          <div className="hero-cta">
            <a href="#code" className="btn btn-primary">View Work →</a>
            <a href="#contact" className="btn">Get in Touch</a>
          </div>
        </div>

        <div className="hero-side">
          <div className="hud-frame">
            <div className="hud-corner tl" /><div className="hud-corner tr" />
            <div className="hud-corner bl" /><div className="hud-corner br" />
            <div className="hud-line"><span className="dim mono">role</span><span className="mono">FRONTEND · ROBOTICS</span></div>
            <div className="hud-line"><span className="dim mono">stack</span><span className="mono">REACT · C++ · PYTHON</span></div>
            <div className="hud-line"><span className="dim mono">edu</span><span className="mono">B.S. CS · ROBOTICS</span></div>
            <div className="hud-line"><span className="dim mono">status</span><span className="mono go">AVAILABLE</span></div>
          </div>
          <div className="vert-text mono">MISSION-LOG · 2026</div>
        </div>
      </div>

    </section>);

}

/* ---------- Console typewriter (about) ----------
 * A fake terminal that types out a greeting on a loop:
 *   typing → 2.5s hold → erasing → 0.6s pause → typing again …
 *
 * Two implementation choices worth flagging for review:
 *
 *  1. IntersectionObserver gates the *first* tick so the animation
 *     doesn't run while the section is still off-screen — once the
 *     panel scrolls into view the loop kicks off and self-perpetuates.
 *
 *  2. The animation is driven by a small phase machine ("typing" →
 *     "holding" → "erasing") rather than nested setTimeouts. Each
 *     tick consults `phase` and `i` and schedules the next tick. This
 *     keeps the per-character timing easy to reason about and makes
 *     cancellation a single clearTimeout in the cleanup function.
 */
function ConsoleHello() {
  const fullText = "Hi, I'm Luca.";
  const [typed, setTyped] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    let i = 0;                        // current cursor position within fullText
    let phase = 'typing';             // 'typing' | 'holding' | 'erasing'
    let timeoutId;                    // single live timeout — replaced each tick
    let started = false;              // ensures we only kick off once per mount

    // Each call advances exactly one step (one char or one phase
    // change) and schedules the next tick. That structure keeps the
    // per-character delays expressive without nesting callbacks.
    const tick = () => {
      if (phase === 'typing') {
        if (i <= fullText.length) {
          setTyped(fullText.slice(0, i));
          const ch = fullText[i - 1];
          i++;
          // Vary the delay per character so the typing feels human:
          // longer pause after a comma, shorter after a space, and a
          // small random jitter on regular letters.
          const delay = ch === ',' ? 220 : ch === ' ' ? 80 : 75 + Math.random() * 70;
          timeoutId = setTimeout(tick, delay);
        } else {
          // Done typing — hold the full sentence on screen for a beat.
          phase = 'holding';
          timeoutId = setTimeout(tick, 2500);
        }
      } else if (phase === 'holding') {
        // Reset i to the visible length before erasing so the first
        // erase-tick removes a real character (not a no-op).
        phase = 'erasing';
        i = fullText.length;
        timeoutId = setTimeout(tick, 0);
      } else if (phase === 'erasing') {
        if (i > 0) {
          i--;
          setTyped(fullText.slice(0, i));
          timeoutId = setTimeout(tick, 35 + Math.random() * 25);
        } else {
          // Empty — short breath, then start typing again.
          phase = 'typing';
          timeoutId = setTimeout(tick, 600);
        }
      }
    };

    // Don't start typing until the panel scrolls into view. threshold:
    // 0.4 means at least 40% of the console must be visible. The
    // `started` guard prevents the IO callback from re-firing the loop
    // if the user scrolls in and out repeatedly.
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          timeoutId = setTimeout(tick, 450); // small lead-in so it doesn't start mid-scroll
        }
      });
    }, { threshold: 0.4 });
    obs.observe(ref.current);

    return () => { clearTimeout(timeoutId); obs.disconnect(); };
  }, []);

  return (
    <div className="console" ref={ref}>
      <div className="console-chrome">
        <div className="console-dots">
          <span /><span /><span />
        </div>
        <div className="console-title mono">~ / luca — zsh</div>
      </div>
      <div className="console-body mono">
        <div className="console-line">
          <span className="console-prompt">luca@portfolio</span>
          <span className="console-sep">:</span>
          <span className="console-path">~</span>
          <span className="console-sep">$</span>
          <span className="console-cmd"> echo "$GREETING"</span>
        </div>
        <div className="console-line console-out">
          <span>{typed}</span>
          <span className="caret">▋</span>
        </div>
      </div>
    </div>);

}

/* ---------- About ----------
 * Two-column section: bio paragraphs on the left, sidebar on the right
 * containing the live typewriter terminal and the off-duty interests.
 * Stateless — the only animation lives inside <ConsoleHello />.
 */
function About() {
  return (
    <section id="about" className="section about" data-screen-label="02 About">
      <div className="container">
        <SectionLabel num="01 /">ABOUT THE OPERATOR</SectionLabel>
        <SectionTitle>The operator.</SectionTitle>
        <figure className="operator-id">
          <div className="operator-photo">
            <img src={meImage} alt="Luca Martinez" />
          </div>
          <figcaption className="operator-id-cap mono">LM-2003 · OPERATOR</figcaption>
        </figure>
        <div className="about-grid">
          <div className="about-copy">
            <p className="lede">
              I'm a <span className="terra">builder</span>. Software, Hardware, Web, Mobile, Robotics.
              Whatever shape the problem takes, I learn the stack and ship the thing.
            </p>
            <p>
              I just finished a B.S. in Computer Science with minors in Robotics and Math at
              Roger Williams University. Now I work as a frontend developer building production
              e-commerce and donor sites, and teach kids how to code on the side.
            </p>
            <p>
              I think the most interesting problems live where software meets the physical world:
              a state machine deciding which way a robot should turn, a swipe gesture controlling
              an iOS reminder, a keyword unlocking a relay. That's where I want to spend my time.
            </p>
          </div>

          <div className="about-side">
            <ConsoleHello />

            <div className="interests">
              <div className="label" style={{ marginBottom: 18 }}><span className="mono">OFF-DUTY</span></div>
              {INTERESTS.map((it, i) =>
              <div key={i} className="interest-row">
                  <span className="glyph">{it.glyph}</span>
                  <span className="iname">{it.name}</span>
                  <span className="ies serif italic">{it.es}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Image slot ----------
 * Aspect-ratio'd frame with accent-colored corner ticks. If a `src`
 * is provided, renders the actual image inside the frame and hides
 * the "[ LABEL ]" placeholder caption + diagonal-stripe pattern;
 * otherwise falls back to the original placeholder treatment. The
 * pattern id is derived from the label so multiple stripe-pattern
 * slots on the same page don't collide and share fills.
 */
function ImageSlot({
  label,
  ratio = '4 / 3',
  accent = 'terracotta',
  src,
  images,               // optional array of N image srcs — renders side-by-side in equal columns
  imageFit,             // 'cover' | 'contain' — overrides default 'cover'
  imageObjectPosition,  // e.g. 'left center' | 'center' — overrides default 'center'
  maxWidth,             // optional cap on the frame's width (e.g. '420px' for a phone-aspect frame)
}) {
  // When maxWidth is set, also center the constrained frame inside its parent.
  const slotStyle = {
    aspectRatio: ratio,
    '--slot-accent': ACCENT_HEX[accent],
    ...(maxWidth ? { maxWidth, marginLeft: 'auto', marginRight: 'auto' } : null),
  };
  const imgStyle = {
    ...(imageFit ? { objectFit: imageFit } : null),
    ...(imageObjectPosition ? { objectPosition: imageObjectPosition } : null),
  };
  return (
    <div className="img-slot" style={slotStyle}>
      {images && images.length ? (
        <div className="img-slot-grid">
          {images.map((imgSrc, i) => (
            <img
              key={i}
              className="img-slot-img-cell"
              src={imgSrc}
              alt={`${label} ${i + 1}`}
              style={imgStyle}
            />
          ))}
        </div>
      ) : src ? (
        <img className="img-slot-img" src={src} alt={label} style={imgStyle} />
      ) : (
        <>
          <svg className="img-slot-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`stripe-${label.replace(/\s+/g, '')}`} patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(244,234,216,0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#stripe-${label.replace(/\s+/g, '')})`} />
          </svg>
          <div className="img-slot-label mono">[ {label} ]</div>
        </>
      )}
      <div className="img-slot-corner tl" />
      <div className="img-slot-corner tr" />
      <div className="img-slot-corner bl" />
      <div className="img-slot-corner br" />
    </div>);

}

/* ---------- Code Projects ----------
 * Master/detail layout: a vertical list of project rows on the left,
 * the currently-selected project's screenshot + write-up on the right.
 * Selection lives in a single `active` index so clicking a row swaps the
 * detail view without remounting the whole section. The detail panel
 * gets `key={proj.id}` so React tears it down and remounts on change —
 * which lets us play CSS enter animations on every selection.
 */
function CodeProjects() {
  const [active, setActive] = useState(0);
  const proj = CODE_PROJECTS[active];

  return (
    <section id="code" className="section projects" data-screen-label="04 Code">
      <div className="container">
        <div className="section-head">
          <SectionLabel num="03 /">CODING PROJECTS</SectionLabel>
          <div className="mono dim section-meta">{String(active + 1).padStart(2, '0')} / {String(CODE_PROJECTS.length).padStart(2, '0')}</div>
        </div>
        <SectionTitle>The build log.</SectionTitle>

        <div className="projects-layout">
          {/* Mobile: the long row list is awkward to scroll past, so swap it
              for a compact dropdown (hidden on desktop via CSS). */}
          <select
            className="proj-select mono"
            value={active}
            onChange={(e) => setActive(Number(e.target.value))}
            aria-label="Select a project">
            {CODE_PROJECTS.map((p, i) =>
            <option key={p.id} value={i}>{p.tag} · {p.name} · {p.year}</option>
            )}
          </select>

          <div className="project-list">
            {CODE_PROJECTS.map((p, i) =>
            <button
              key={p.id}
              className={`proj-row ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--row-accent': ACCENT_HEX[p.accent] }}>

                <span className="proj-num mono">{p.tag}</span>
                <span className="proj-name">{p.name}</span>
                <span className="proj-year mono">{p.year}</span>
              </button>
            )}
          </div>

          <div className="project-detail" key={proj.id}>
            <ImageSlot
              label={`${proj.name.toUpperCase()} — screenshot`}
              ratio={proj.imageRatio || '16 / 10'}
              accent={proj.accent}
              src={proj.image}
              images={proj.images}
              imageFit={proj.imageFit}
              imageObjectPosition={proj.imageObjectPosition}
              maxWidth={proj.imageMaxWidth} />
            <div className="proj-body">
              <div className="proj-meta">
                <span className="mono dim">{proj.tag} · {proj.year}</span>
                <span className="mono" style={{ color: ACCENT_HEX[proj.accent] }}>● {proj.role}</span>
              </div>
              <h3 className="proj-title">{proj.name}</h3>
              <p className="proj-blurb">{proj.blurb}</p>
              <div className="stack">
                {proj.stack.map((s) => <span key={s} className="chip mono">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Robotics Projects ----------
 * Card grid (no detail view here — the cards are short enough to read
 * inline). Each card colors its border / accents from `--card-accent`,
 * a CSS custom property set per-card from ACCENT_HEX.
 */
function RoboticsProjects() {
  return (
    <section id="robotics" className="section robotics" data-screen-label="05 Robotics">
      <div className="container">
        <div className="section-head">
          <SectionLabel num="04 /">ROBOTICS · HARDWARE</SectionLabel>
          <div className="mono dim section-meta">{ROBOTICS_PROJECTS.length} BUILDS</div>
        </div>
        <SectionTitle>Circuits & servos.</SectionTitle>

        <p className="section-lede">
          Things I built with my hands, an Arduino, and probably too many late nights in the engineering lab.
        </p>

        <div className="robotics-grid">
          {ROBOTICS_PROJECTS.map((p, i) =>
          <article key={p.id} className="bot-card" style={{ '--card-accent': ACCENT_HEX[p.accent] }}>
              <div className="bot-card-head">
                <span className="mono dim">{p.tag} · {p.year}</span>
                <span className="mono pill">{p.award}</span>
              </div>
              <ImageSlot label={`${p.name.toUpperCase()} — photo`} ratio="4 / 3" accent={p.accent} src={p.image} imageObjectPosition={p.imageObjectPosition} />
              <h3 className="bot-title">{p.name}</h3>
              <p className="bot-blurb">{p.blurb}</p>
              <div className="bot-specs">
                {p.specs.map((s) => <div key={s} className="spec-line">
                  <span className="spec-bullet">▸</span>
                  <span className="mono">{s}</span>
                </div>)}
              </div>
              <div className="stack">
                {p.stack.map((s) => <span key={s} className="chip mono">{s}</span>)}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- Planet Deck ----------
 * Decorative Saturn-styled planet — the visual counterpart to the
 * hero's ISS, placed inside the Experience section so the timeline
 * content reads against it. Renders a gradient body with gas-giant
 * latitude bands, a Jupiter-style storm spot, a tilted ring drawn in
 * two halves so it appears to pass behind and in front of the body,
 * an atmospheric halo, and two distant moons on independent CSS orbits.
 *
 * Reuses useScrollMouseTransform with slightly different tunables than
 * the ISS — bigger pull radius, snappier scroll rotation — so the two
 * animations feel related but not identical.
 *
 * The component renders ONLY the absolute-positioned deck div; the
 * surrounding <section> is provided by whichever section embeds it.
 */
function PlanetDeck() {
  const deckRef = useRef(null);
  const planetRef = useRef(null);

  useScrollMouseTransform(deckRef, planetRef, {
    pullRangePx: 460,         // a touch wider than the ISS — planets feel heavier, longer reach
    deadZonePx: 130,
    maxNudgePx: 16,
    scrollRotDegPerPx: 0.05,  // spins a hair faster than the ISS
  });

  return (
    <div className="planet-deck" aria-hidden="true" ref={deckRef}>
        <svg viewBox="-300 -300 600 600" width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            {/* Body gradient: warm-lit hemisphere on the upper-left,
                shadowed limb on the lower-right. */}
            <radialGradient id="planet-body" cx="35%" cy="32%">
              <stop offset="0%" stopColor="oklch(72% 0.16 60)" />
              <stop offset="55%" stopColor="oklch(45% 0.13 35)" />
              <stop offset="100%" stopColor="oklch(18% 0.05 30)" />
            </radialGradient>
            {/* Atmospheric glow: invisible at the body, soft accent at the limb. */}
            <radialGradient id="planet-glow" cx="50%" cy="50%">
              <stop offset="60%" stopColor="oklch(65% 0.15 40)" stopOpacity="0" />
              <stop offset="80%" stopColor="oklch(65% 0.15 40)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="oklch(65% 0.15 40)" stopOpacity="0" />
            </radialGradient>
            {/* Ring gradient — fades at both ends so the ring doesn't
                hard-stop at the planet's silhouette. */}
            <linearGradient id="planet-ring" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(75% 0.13 75)" stopOpacity="0" />
              <stop offset="40%" stopColor="oklch(75% 0.13 75)" stopOpacity="0.65" />
              <stop offset="60%" stopColor="oklch(65% 0.15 40)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="oklch(58% 0.19 25)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Faint distant orbits — backdrop, not part of the planet group. */}
          <circle r="170" fill="none" stroke="rgba(244,234,216,0.06)" strokeWidth="0.5" strokeDasharray="2 6" />
          <circle r="240" fill="none" stroke="rgba(244,234,216,0.04)" strokeWidth="0.4" />

          {/* Everything inside this <g> rotates with scroll and edges
              toward the cursor. The hook writes the transform here. */}
          <g ref={planetRef}>
            {/* Atmospheric halo — soft warm glow around the limb. */}
            <circle r="135" fill="url(#planet-glow)" />

            {/* Back half of the ring, drawn behind the body. */}
            <g transform="rotate(-22)">
              <path
                d="M -200 0 A 200 48 0 0 1 200 0"
                fill="none" stroke="url(#planet-ring)" strokeWidth="3" opacity="0.55"
              />
            </g>

            {/* Planet body. */}
            <circle r="110" fill="url(#planet-body)" />

            {/* Surface bands — wide ellipses suggest gas-giant latitude lines. */}
            <ellipse cx="0" cy="-32" rx="104" ry="6" fill="oklch(60% 0.10 60)" opacity="0.20" />
            <ellipse cx="0" cy="22"  rx="108" ry="9" fill="oklch(35% 0.10 30)" opacity="0.28" />
            <ellipse cx="0" cy="58"  rx="90"  ry="5" fill="oklch(50% 0.12 50)" opacity="0.20" />

            {/* Storm spot — Jupiter-style flourish, slightly tilted. */}
            <g transform="rotate(-8 -38 8)">
              <ellipse cx="-38" cy="8" rx="20" ry="11" fill="oklch(45% 0.15 25)" opacity="0.55" />
              <ellipse cx="-38" cy="8" rx="11" ry="6"  fill="oklch(32% 0.15 20)" opacity="0.7" />
            </g>

            {/* Front half of the ring, drawn over the body. */}
            <g transform="rotate(-22)">
              <path
                d="M -200 0 A 200 48 0 0 0 200 0"
                fill="none" stroke="url(#planet-ring)" strokeWidth="3"
              />
            </g>
          </g>

          {/* Tiny moons sit *outside* the transformed group so they keep
              their independent CSS orbital animations regardless of the
              planet's scroll-rotation or cursor pull. */}
          {/* Five chunky moons with crater detail. Each has a subtly
              tinted gray body — red, plain, yellow, orange, cool —
              so the lineup reads as varied moons rather than five
              identical pebbles. Orbits get progressively wider; the
              fifth moon sits roughly twice as far out as the rest
              for an "outer dwarf" feel. SVG overflow:visible lets
              them drift past the deck's box; the section no longer
              has overflow:hidden so they cross into the Robotics
              section above without clipping. */}
          {/* Moon 1 — innermost, fast, red tint */}
          <g className="orbit-moon orbit-moon-2">
            <g transform="translate(240, 0)">
              <circle r="8" fill="oklch(70% 0.04 25)" stroke="#1a1a1a" strokeWidth="0.4" />
              <circle cx="-2" cy="-3" r="2"   fill="oklch(45% 0.05 25)" opacity="0.7" />
              <circle cx="3"  cy="2"  r="1.5" fill="oklch(40% 0.05 25)" opacity="0.7" />
              <circle cx="-3" cy="3"  r="1"   fill="oklch(45% 0.05 25)" opacity="0.6" />
            </g>
          </g>
          {/* Moon 2 — plain gray, mid speed */}
          <g className="orbit-moon orbit-moon-1">
            <g transform="translate(340, 0)">
              <circle r="11" fill="#a8a8a8" stroke="#1a1a1a" strokeWidth="0.5" />
              <circle cx="-3" cy="-4" r="2.5" fill="#777" opacity="0.65" />
              <circle cx="4"  cy="3"  r="2"   fill="#666" opacity="0.7" />
              <circle cx="-4" cy="4"  r="1.5" fill="#888" opacity="0.65" />
              <circle cx="5"  cy="-2" r="1"   fill="#777" opacity="0.7" />
            </g>
          </g>
          {/* Moon 3 — yellow tint */}
          <g className="orbit-moon orbit-moon-3">
            <g transform="translate(440, 0)">
              <circle r="9" fill="oklch(76% 0.04 85)" stroke="#1a1a1a" strokeWidth="0.4" />
              <circle cx="-2" cy="-2" r="2"   fill="oklch(50% 0.05 85)" opacity="0.7" />
              <circle cx="3"  cy="3"  r="1.8" fill="oklch(45% 0.05 85)" opacity="0.65" />
              <circle cx="-3" cy="4"  r="1.2" fill="oklch(50% 0.05 85)" opacity="0.7" />
            </g>
          </g>
          {/* Moon 4 — orange tint, biggest body */}
          <g className="orbit-moon orbit-moon-4">
            <g transform="translate(540, 0)">
              <circle r="13" fill="oklch(72% 0.05 50)" stroke="#1a1a1a" strokeWidth="0.5" />
              <circle cx="-4" cy="-5" r="3"   fill="oklch(48% 0.06 50)" opacity="0.65" />
              <circle cx="5"  cy="3"  r="2.5" fill="oklch(45% 0.06 50)" opacity="0.7" />
              <circle cx="-5" cy="5"  r="2"   fill="oklch(50% 0.06 50)" opacity="0.65" />
              <circle cx="6"  cy="-3" r="1.5" fill="oklch(45% 0.06 50)" opacity="0.7" />
              <circle cx="0"  cy="6"  r="1"   fill="oklch(48% 0.06 50)" opacity="0.65" />
            </g>
          </g>
          {/* Moon 5 — far outer dwarf, very slow, cool blue-gray */}
          <g className="orbit-moon orbit-moon-5">
            <g transform="translate(800, 0)">
              <circle r="10" fill="oklch(72% 0.025 240)" stroke="#1a1a1a" strokeWidth="0.5" />
              <circle cx="-3" cy="-3" r="2.5" fill="oklch(48% 0.04 240)" opacity="0.7" />
              <circle cx="4"  cy="2"  r="2"   fill="oklch(44% 0.04 240)" opacity="0.65" />
              <circle cx="-2" cy="4"  r="1.4" fill="oklch(50% 0.04 240)" opacity="0.7" />
              <circle cx="5"  cy="-2" r="1"   fill="oklch(46% 0.04 240)" opacity="0.65" />
            </g>
          </g>
        </svg>
      </div>);

}

/* ---------- Experience ----------
 * Vertical timeline. Each row has a "when" column on the left, a node
 * + connector line in the middle, and the role write-up on the right.
 * The connector line is omitted on the last row so it doesn't dangle.
 */
function Experience() {
  return (
    <section id="experience" className="section experience" data-screen-label="03 Experience">
      <PlanetDeck />
      <div className="container">
        <div className="section-head">
          <SectionLabel num="02 /">FLIGHT LOG</SectionLabel>
          <div className="mono dim section-meta">EXPERIENCE · EDUCATION</div>
        </div>
        <SectionTitle>The flight path.</SectionTitle>

        <div className="timeline">
          {EXPERIENCE.map((e, i) =>
          <div key={i} className="tl-row">
              <div className="tl-when mono">{e.when}</div>
              <div className="tl-track">
                <div className="tl-node" />
                {i < EXPERIENCE.length - 1 && <div className="tl-line" />}
              </div>
              <div className="tl-body">
                <div className="tl-role">{e.role}</div>
                <div className="tl-co">
                  <span>{e.co}</span>
                  <span className="dim mono">· {e.where}</span>
                </div>
                <div className="tl-notes mono">{e.notes}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- Contact ----------
 * Footer-y section with four contact cards (email, phone, LinkedIn,
 * GitHub) plus a closing footer line. The LinkedIn/GitHub cards
 * preventDefault on click for now since the URLs aren't live yet.
 */
function Contact() {
  return (
    <section id="contact" className="section contact" data-screen-label="06 Contact">
      <div className="container">
        <SectionLabel num="05 /">OPEN COMMS</SectionLabel>

        <h2 className="contact-headline">
          <span className="line">Let's <span className="terra serif italic">build</span></span>
          <span className="line">something.</span>
        </h2>

        <p className="contact-sub">
          Looking for frontend, robotics, or full-stack work. Also happy to talk about beach volleyball,
          climbing routes, or how to wire a relay into a cereal box.
        </p>

        <div className="contact-grid">
          <a className="contact-card" href="mailto:lucamartinez03@gmail.com">
            <div className="cc-label mono">EMAIL</div>
            <div className="cc-value">lucamartinez03@gmail.com</div>
            <div className="cc-arrow">→</div>
          </a>
          <a className="contact-card" href="tel:+12032909902">
            <div className="cc-label mono">PHONE</div>
            <div className="cc-value">+1·203·290·9902</div>
            <div className="cc-arrow">→</div>
          </a>
          <a className="contact-card" href="https://www.linkedin.com/in/lucamartinez2003/" target="_blank" rel="noopener noreferrer">
            <div className="cc-label mono">LINKEDIN</div>
            <div className="cc-value">in/lucamartinez2003/</div>
            <div className="cc-arrow">→</div>
          </a>
          <a className="contact-card" href="https://github.com/lmartinez03" target="_blank" rel="noopener noreferrer">
            <div className="cc-label mono">GITHUB</div>
            <div className="cc-value">github.com/lmartinez03</div>
            <div className="cc-arrow">→</div>
          </a>
        </div>

        <footer className="footer mono">
          <div>LUCA · MARTINEZ · MMXXVI</div>
          <div className="dim">— signed off from St. Petersburg, FL · 27.7676° N —</div>
        </footer>
      </div>
    </section>);

}

/* ---------- Rocket ----------
 * Small cartoony rocket that flies *autonomously* through the entire
 * document on a slow time-based orbit, leaving a fading red-fire-into-
 * smoke particle trail. The ship lives in document coordinates so it
 * can be at the bottom of the page while the user is at the top —
 * scroll to that part and you'll find it (and its trail) waiting.
 *
 * Two layered elements:
 *
 *   1. A full-viewport <canvas> (position: fixed) for the trail. Each
 *      frame we redraw every live particle from scratch; particles
 *      age toward death, shifting from a bright fire color to muted
 *      smoke while their alpha falls. Particle positions are stored
 *      in document coords; on draw we subtract the current scroll
 *      offset to find where they should appear in the viewport.
 *
 *   2. A small <div> wrapping the ship SVG (position: absolute on the
 *      document), positioned each frame via `translate(...)` + a
 *      `rotate(...)` for heading. Negative margins in CSS center the
 *      ship's bounding box on the translate point.
 *
 * Both layers are pointer-events:none so they never intercept clicks.
 *
 * Path: two slow sine oscillations with different periods, computed
 * directly from `performance.now()` — so the ship's progress is
 * independent of where the user is scrolling. The y-period spans the
 * full document height, the x-period oscillates within the viewport
 * width.
 */
function Rocket() {
  const canvasRef = useRef(null);
  const shipRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ship = shipRef.current;
    if (!canvas || !ship) return;
    const ctx = canvas.getContext('2d');

    // ── Tunables ────────────────────────────────────────────────
    const SHIP_EASE = 0.07;            // 0..1 — lower = lazier ship homing toward target
    const SPAWN_PER_FRAME = 2;         // base particles per frame; scales up at hover speed too
    const PARTICLE_LIFE_S = 2.0;       // seconds before a particle dies and is recycled
    const PARTICLE_BASE_R = 6;         // px — radius at birth
    const PARTICLE_GROW_R = 12;        // px — additional radius gained over lifetime (puffier smoke)
    const PARTICLE_BIRTH_ALPHA = 0.85; // opacity at birth — bumped for a denser-looking trail
    const FIRE_RGB = [232, 110, 50];   // bright fire color at birth
    const SMOKE_RGB = [200, 195, 180]; // warm gray smoke at death
    const PATH_MARGIN = 70;            // px buffer from viewport edges so the ship doesn't clip
    const Y_PERIOD_S = 150;            // seconds for one full top→bottom→top oscillation (3× slower than v1)
    const X_PERIOD_S = 54;             // seconds for one full left→right→left oscillation
    // Hover speedup — when the cursor is near the ship, simulated time
    // advances 3× faster, restoring the previous brisk pace.
    const HOVER_RADIUS_PX = 90;        // px from ship center within which we consider "hovered"
    const SPEED_MULT_BASE = 1;
    const SPEED_MULT_HOVER = 5;
    const MULT_EASE = 0.08;            // 0..1 — how snappily the multiplier eases between base and hover

    // ── Canvas resize / DPR handling ────────────────────────────
    // Canvas is doc-anchored (position: absolute) and sized to the
    // FULL document, not the viewport. Drawing in doc coords means
    // the trail rides the document with the compositor — no per-frame
    // scrollY math to lag during iOS momentum scroll.
    //
    // `w` is viewport width (path math); `vh` is viewport height (cull
    // math); `docH` is the canvas's CSS height.
    let w = 0, vh = 0, docH = 0;
    let lastDpr = 0, lastCssW = 0, lastCssDocH = 0;
    const resize = () => {
      // Cap DPR at 2 — particles are feathered radial gradients where
      // DPR 3 isn't perceptible, and a tall doc × DPR 3 would push the
      // canvas past iOS Safari's 16384-pixel-per-side limit.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const cssDocH = Math.max(cssH, document.documentElement.scrollHeight);
      // Viewport height is read fresh each frame for cull math, but we
      // also keep it on the closure for any non-render reads.
      vh = cssH;
      // Bail if nothing meaningful changed. Setting canvas.width/height
      // reallocates the backing buffer (and zeroes it), which causes a
      // visible stutter — and ResizeObserver can fire repeatedly during
      // iOS URL-bar show/hide. Dedupe so rAF stays smooth.
      if (dpr === lastDpr && cssW === lastCssW && cssDocH === lastCssDocH) return;
      lastDpr = dpr; lastCssW = cssW; lastCssDocH = cssDocH;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssDocH * dpr);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssDocH + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = cssW; docH = cssDocH;
    };
    resize();
    window.addEventListener('resize', resize);
    // Doc height can grow after mount (images decode, fonts swap,
    // sections animate in). Reobserve so the canvas keeps covering
    // the full document.
    const docResizeObs = ('ResizeObserver' in window)
      ? new ResizeObserver(() => resize())
      : null;
    if (docResizeObs) docResizeObs.observe(document.body);

    // ── Particle pool ───────────────────────────────────────────
    // Plain array; ~96 live particles max at default settings, which
    // is well below any worry threshold for canvas fillRect cost.
    const particles = [];

    // Compute the ship's *target* position in document coordinates.
    //
    // The ship's progress is purely time-based — it ignores scroll
    // entirely. So if the user lingers at the top of the page, the
    // ship continues its journey on its own and may end up far below
    // the visible viewport.
    //
    // We pass in `simElapsedMs` (simulated elapsed time) rather than
    // wall-clock time so we can speed the ship up when the cursor
    // hovers near it without causing a position jump — the multiplier
    // affects how fast `simElapsedMs` advances, not what we plug in.
    //
    // Two sine oscillations:
    //   - y oscillates over the full document height (Y_PERIOD_S)
    //   - x oscillates over the viewport width (X_PERIOD_S)
    // Different periods so the path doesn't repeat tightly. The y
    // wave starts at +π so the ship begins near the top of the page
    // when the user lands.
    const computeTarget = (simElapsedMs) => {
      const docH = document.documentElement.scrollHeight;
      const vw = w; // viewport width (no horizontal scroll on this page)

      const yPhase = (simElapsedMs / 1000 / Y_PERIOD_S) * Math.PI * 2 + Math.PI;
      const xPhase = (simElapsedMs / 1000 / X_PERIOD_S) * Math.PI * 2;

      // y ranges over (margin, docH - margin) — the full document.
      // x stays inside the viewport so the ship doesn't get clipped
      // by the body's overflow-x: hidden.
      const ty = (docH * 0.5) + Math.cos(yPhase) * (docH * 0.5 - PATH_MARGIN);
      const tx = (vw * 0.5) + Math.sin(xPhase) * (vw * 0.5 - PATH_MARGIN);
      return { tx, ty };
    };

    // ── State for the rAF loop ──────────────────────────────────
    // Initialize the ship at its first target so it doesn't fly in
    // from the (0, 0) corner on mount.
    let simElapsedMs = 0;             // simulated time, advances by dt × multiplier each frame
    let curMultiplier = SPEED_MULT_BASE; // eases between BASE and HOVER
    let lastTime = performance.now();
    const init = computeTarget(simElapsedMs);
    let curX = init.tx, curY = init.ty;
    let prevX = curX, prevY = curY;
    let prevAngle = 0;
    // Cursor position in viewport coords (sentinel = off-screen).
    let mouseX = -9999, mouseY = -9999;
    let raf = null;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      // Clamp dt so a tab returning from background doesn't dump a
      // huge time step into the simulation and teleport everything.
      const dtMs = Math.min(now - lastTime, 1000 / 30);
      const dt = dtMs / 1000;
      lastTime = now;

      // ── Hover detection + speed multiplier ───────────────────
      // Distance from cursor (viewport coords) to the ship's current
      // viewport position. Inside HOVER_RADIUS_PX → speed multiplier
      // eases toward HOVER (3×); otherwise toward BASE (1×). Easing
      // the multiplier (rather than snapping it) means the ship
      // doesn't lurch when the cursor enters/leaves the radius.
      const shipScreenX = curX - window.scrollX;
      const shipScreenY = curY - window.scrollY;
      const dToCursor = Math.hypot(mouseX - shipScreenX, mouseY - shipScreenY);
      const hoverTarget = dToCursor < HOVER_RADIUS_PX ? SPEED_MULT_HOVER : SPEED_MULT_BASE;
      curMultiplier += (hoverTarget - curMultiplier) * MULT_EASE;

      // Advance simulated time by dt × multiplier. The path is a
      // function of simElapsedMs, so this is what makes hover feel
      // like a speed-up rather than a teleport.
      simElapsedMs += dtMs * curMultiplier;

      // Ease ship toward its time-derived target.
      const { tx, ty } = computeTarget(simElapsedMs);
      curX += (tx - curX) * SHIP_EASE;
      curY += (ty - curY) * SHIP_EASE;

      // Velocity → heading. The SVG points up (-y) by default, so we
      // add π/2 to the screen-space heading to align the nose with
      // the direction of motion.
      const vx = curX - prevX;
      const vy = curY - prevY;
      const speed = Math.hypot(vx, vy);
      const angle = speed > 0.05
        ? Math.atan2(vy, vx) + Math.PI / 2
        : prevAngle;
      prevAngle = angle;

      // ── Emit new particles at the ship's tail ────────────────
      // heading = angle - π/2 (undo the SVG offset) gives the actual
      // direction the nose points; tail is the opposite direction.
      // Low speed threshold so even the slow orbit emits steadily.
      if (speed > 0.08) {
        const heading = angle - Math.PI / 2;
        const cosH = Math.cos(heading);
        const sinH = Math.sin(heading);
        const tailDist = 14;
        // Scale spawn count with the speed multiplier — at 3× speed,
        // ship covers 3× the distance per frame, so 3× the particles
        // keep the trail visually dense.
        const spawnCount = Math.round(SPAWN_PER_FRAME * curMultiplier);
        for (let i = 0; i < spawnCount; i++) {
          // Lateral jitter perpendicular to the heading for a fluffy puff.
          const jitter = (Math.random() - 0.5) * 6;
          const px = curX - cosH * tailDist + (-sinH) * jitter;
          const py = curY - sinH * tailDist + ( cosH) * jitter;
          particles.push({
            x: px, y: py,
            // Initial velocity: continue away from the ship, plus a
            // small random kick so the puff disperses naturally.
            vx: -cosH * 0.3 + (Math.random() - 0.5) * 0.4,
            vy: -sinH * 0.3 + (Math.random() - 0.5) * 0.4,
            age: 0,
          });
        }
      }

      // ── Update + render particles ────────────────────────────
      // Canvas is full-document-sized but we only clear the visible
      // viewport region each frame. Particles outside the viewport are
      // culled (not redrawn), so old draws of them stay on the canvas
      // in non-viewport regions — and any time the user scrolls into
      // such a region, *that* frame's clear (covering the new viewport)
      // wipes the stale draws before the user can see them. Net result:
      // visually clean, with ~1/30th the per-frame fill cost vs. clearing
      // the entire 6000-px-tall canvas. Big win on mobile GPUs.
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      // Read viewport height fresh each frame — iOS URL bar show/hide
      // changes innerHeight without firing resize.
      vh = window.innerHeight;
      const cullPad = PARTICLE_BASE_R + PARTICLE_GROW_R;
      ctx.clearRect(
        scrollX - cullPad,
        scrollY - cullPad,
        w + cullPad * 2,
        vh + cullPad * 2,
      );

      // Iterate backwards so splicing dead particles is safe.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= PARTICLE_LIFE_S) { particles.splice(i, 1); continue; }
        p.x += p.vx;
        p.y += p.vy;

        // Cull particles fully outside the visible viewport (doc-coord
        // bounds). They still age — they just don't get drawn.
        if (p.x < scrollX - cullPad || p.x > scrollX + w + cullPad ||
            p.y < scrollY - cullPad || p.y > scrollY + vh + cullPad) continue;

        const lifeT = p.age / PARTICLE_LIFE_S;             // 0..1
        const radius = PARTICLE_BASE_R + PARTICLE_GROW_R * lifeT;

        // Color lerps from fire RGB → smoke RGB.
        const r = FIRE_RGB[0] + (SMOKE_RGB[0] - FIRE_RGB[0]) * lifeT;
        const g = FIRE_RGB[1] + (SMOKE_RGB[1] - FIRE_RGB[1]) * lifeT;
        const b = FIRE_RGB[2] + (SMOKE_RGB[2] - FIRE_RGB[2]) * lifeT;
        // Alpha: bright at birth, fades to 0 at end of life.
        const alpha = (1 - lifeT) * PARTICLE_BIRTH_ALPHA;

        // Soft round particle via radial gradient — gives a hot
        // core with a feathered edge instead of a hard circle.
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},${alpha})`);
        grad.addColorStop(1, `rgba(${r | 0},${g | 0},${b | 0},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Position the ship ────────────────────────────────────
      // The ship is position:absolute on the document, so the
      // translate() values are document coords directly. Negative
      // margins on .rocket-ship in CSS center the ship's bounding
      // box on the translate point.
      ship.style.transform =
        `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px) rotate(${angle.toFixed(3)}rad)`;

      prevX = curX; prevY = curY;
    };

    // Cursor tracking — used by the hover-speedup logic above.
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (docResizeObs) docResizeObs.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="rocket-trail" aria-hidden="true" />
      <div ref={shipRef} className="rocket-ship" aria-hidden="true">
        <svg viewBox="-20 -28 40 56" width="36" height="50" style={{ overflow: 'visible' }}>
          {/* Exhaust flame — flickers via CSS keyframes (see styles.css). */}
          <g className="rocket-flame">
            <path d="M -5 16 Q -3 28 0 32 Q 3 28 5 16 Z" fill="oklch(58% 0.19 25)" opacity="0.92" />
            <path d="M -3 16 Q -2 24 0 28 Q 2 24 3 16 Z" fill="oklch(78% 0.18 60)" />
          </g>
          {/* Body (warm cream) with a subtle right-side shadow. */}
          <path d="M 0 -22 C 8 -14 8 8 6 16 L -6 16 C -8 8 -8 -14 0 -22 Z"
                fill="#f4ead8" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
          <path d="M 1 -22 C 8 -14 8 8 6 16 L 2 16 C 4 8 4 -14 1 -22 Z"
                fill="rgba(0,0,0,0.06)" />
          {/* Porthole window with a small specular highlight. */}
          <circle cx="0" cy="-4" r="3.5" fill="oklch(62% 0.16 220)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
          <circle cx="-1" cy="-5" r="1" fill="rgba(255,255,255,0.6)" />
          {/* Two fins, in the page's accent colors. */}
          <path d="M -6 6 L -12 18 L -6 16 Z" fill="oklch(65% 0.15 40)" />
          <path d="M  6 6 L  12 18 L  6 16 Z" fill="oklch(58% 0.19 25)" />
        </svg>
      </div>
    </>);

}

/* ---------- Mars Divider ----------
 * Toy-cartoon Perseverance + Ingenuity scene rendered between every
 * pair of sections. Neither character translates; the Mars surface
 * scrolls beneath them, classic Mickey-Mouse-walk style.
 *
 * Design notes (the user's chosen final variant):
 *
 *   - Rover: V1 toy "standard explorer" with the Mastcam-Z stereo
 *     camera mast on top, a big robotic arm raised up into the sky,
 *     and a visible drill housing + bit at the arm's end. Outer wheel
 *     rings are gray (was pure black) so they actually read.
 *
 *   - Helicopter: V2 toy "compact" body — small cubic body, dome
 *     roof, four splayed legs — but with two cosmetic fixes:
 *       1. The rotor is a *static* horizontal blur ellipse rather
 *          than a fast-spinning thin blade. At 10 rev/s a thin
 *          ellipse aliases between frames and reads as "shaky";
 *          drawing it as a static motion-blur disk gives the
 *          appearance of speed without any per-frame jitter.
 *       2. The whole craft is tilted 6° clockwise so it reads as
 *          flying forward instead of just hovering in place.
 *
 *   - Ground: V1 cracked-mud — branching crack networks, secondary
 *     thin texture cracks, embedded gray rock chunks with rim
 *     highlights, dust pebbles, and a soft ground-band fill so the
 *     dirt has visible mass instead of being a single line.
 *
 * Animation strategy:
 *   - SMIL <animateTransform> drives the wheel spins and the ground
 *     scroll. SMIL works in SVG user units, not CSS px, so the
 *     seamless tile wrap survives any responsive scaling.
 *   - CSS keyframes (.mars-bob-toy, .mars-bounce-toy) drive the
 *     vertical bob and bounce. Those wrappers sit *inside* the
 *     positioning <g transform="translate(...)">, so the CSS only
 *     touches the wrapper — leaving the parent positioning intact.
 */
function MarsDivider() {
  const TILE_W = 480;
  const WHEEL_SPIN = { from: '0', to: '360', dur: '0.5s' };

  // Cracked-mud ground tile — branching cracks, embedded rock
  // chunks with highlights, secondary texture cracks, dust pebbles,
  // and a soft ground-band tone underneath so the dirt reads as
  // substance instead of a single line.
  const CrackTile = ({ offset = 0 }) => (
    <g transform={`translate(${offset}, 0)`}>
      <rect x="0" y="100" width={TILE_W} height="20" fill="rgba(244,234,216,0.04)" />
      <line x1="0" y1="100" x2={TILE_W} y2="100"
        stroke="rgba(244,234,216,0.42)" strokeWidth="1.6" />
      <line x1="0" y1="102.2" x2={TILE_W} y2="102.2"
        stroke="rgba(244,234,216,0.18)" strokeWidth="0.7" strokeDasharray="6 10" />
      {/* main branching cracks */}
      <g stroke="#1a1a1a" strokeWidth="1.05" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 26 100 L 32 108 L 26 116 L 34 120" />
        <path d="M 26 116 L 16 119" />
        <path d="M 80 100 L 88 108 L 82 116 L 92 119" />
        <path d="M 88 108 L 96 113" />
        <path d="M 132 100 L 138 109 L 132 117 L 142 120" />
        <path d="M 138 109 L 148 114" />
        <path d="M 188 100 L 196 108 L 188 116 L 196 120" />
        <path d="M 188 116 L 178 119" />
        <path d="M 246 100 L 240 109 L 248 116 L 240 119" />
        <path d="M 248 116 L 258 119" />
        <path d="M 308 100 L 316 108 L 310 116 L 320 120" />
        <path d="M 316 108 L 324 113" />
        <path d="M 360 100 L 366 109 L 360 117 L 368 120" />
        <path d="M 366 109 L 376 113" />
        <path d="M 418 100 L 426 108 L 420 115 L 430 120" />
        <path d="M 426 108 L 434 111" />
        <path d="M 462 100 L 468 110 L 462 118 L 470 119" />
      </g>
      {/* secondary thinner texture cracks */}
      <g stroke="#1a1a1a" strokeWidth="0.55" fill="none" opacity="0.45" strokeLinecap="round">
        <path d="M 50 105 L 56 113" />
        <path d="M 110 108 L 116 117" />
        <path d="M 160 102 L 168 110" />
        <path d="M 220 110 L 226 119" />
        <path d="M 270 105 L 280 113" />
        <path d="M 340 110 L 346 119" />
        <path d="M 390 102 L 398 113" />
        <path d="M 440 108 L 450 116" />
      </g>
      {/* rock chunks between cracks */}
      {[
        { cx: 52, cy: 110, rx: 4.5, ry: 2.6 },
        { cx: 100, cy: 116, rx: 3.5, ry: 2 },
        { cx: 158, cy: 113, rx: 5, ry: 2.4 },
        { cx: 218, cy: 105, rx: 3.5, ry: 2 },
        { cx: 282, cy: 110, rx: 5, ry: 2.8 },
        { cx: 332, cy: 117, rx: 3, ry: 1.8 },
        { cx: 390, cy: 110, rx: 4.5, ry: 2.5 },
        { cx: 446, cy: 116, rx: 3.5, ry: 2 },
      ].map(({ cx, cy, rx, ry }, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
            fill="#666" stroke="#1a1a1a" strokeWidth="0.4" />
          <line x1={cx - rx * 0.55} y1={cy - ry * 0.55}
                x2={cx + rx * 0.4}  y2={cy - ry * 0.45}
            stroke="rgba(244,234,216,0.32)" strokeWidth="0.5" strokeLinecap="round" />
        </g>
      ))}
      {/* dust pebbles between cracks */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 12 + i * 22;
        const y = 113 + ((i * 7) % 5);
        return <circle key={i} cx={x} cy={y} r="0.7" fill="rgba(244,234,216,0.28)" />;
      })}
    </g>
  );

  return (
    <div className="mars-divider" aria-hidden="true">
      <svg viewBox="0 0 480 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Soft moon-dust puff: warm gray center fading to transparent.
              The center color (200,195,180) matches the rocket trail's
              SMOKE_RGB; reusing the gradient keeps the rover's dust and
              the rocket's tail visually consistent. */}
          <radialGradient id="md-dust-puff">
            <stop offset="0%"   stopColor="rgb(200,195,180)" stopOpacity="0.85" />
            <stop offset="60%"  stopColor="rgb(200,195,180)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(200,195,180)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g>
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to={`-${TILE_W} 0`} dur="5s" repeatCount="indefinite" />
          <CrackTile offset={0} />
          <CrackTile offset={TILE_W} />
        </g>

        {/* Compact tilted Ingenuity — V2 body + static blur rotor + 6° tilt */}
        <g transform="translate(140, 80)">
          {/* Hover bob — SMIL animateTransform inside the SVG (was a CSS
              class on the wrapper, but CSS transforms on SVG <g> elements
              were rendering as still in the user's browser). Translates the
              whole helicopter up 7 SVG units and back over 1.4 s. */}
          <g>
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 0,-7; 0,0" keyTimes="0; 0.5; 1"
              dur="1.4s" repeatCount="indefinite" />
            {/* Inner rotation — tilts the whole craft forward (right) so it
                reads as moving through the scene instead of hovering. */}
            <g transform="rotate(6)">
              {/* STATIC coaxial swept-rotor "blur disks".
                  Real Ingenuity has two counter-rotating rotors stacked
                  ~4 SVG units apart on the same mast. An animated thin
                  ellipse at ~10 rev/s aliases between frames and reads
                  as shaky, so each rotor is a stable motion-blur disk —
                  same speed cue without per-frame jitter. */}
              <g transform="translate(0, -22)">
                <ellipse rx="22" ry="2.8" fill="#555" opacity="0.4" />
                <ellipse rx="22" ry="1.4" fill="#1a1a1a" opacity="0.75" />
                <circle r="2" fill="#666" stroke="#1a1a1a" strokeWidth="0.6" />
              </g>
              <g transform="translate(0, -18)">
                <ellipse rx="22" ry="2.8" fill="#555" opacity="0.4" />
                <ellipse rx="22" ry="1.4" fill="#1a1a1a" opacity="0.75" />
                <circle r="2" fill="#666" stroke="#1a1a1a" strokeWidth="0.6" />
              </g>
              {/* mast — extended up past the second rotor */}
              <rect x="-1.5" y="-20" width="3" height="13" rx="0.8"
                fill="#888" stroke="#1a1a1a" strokeWidth="0.5" />
              {/* small cubic body */}
              <rect x="-9" y="-7" width="18" height="14" rx="3"
                fill="#e8e8e8" stroke="#1a1a1a" strokeWidth="1.8" />
              {/* lens */}
              <circle cx="0" cy="0" r="3.5" fill="#888" stroke="#1a1a1a" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="1.6" fill="#444" />
              <circle cx="-1" cy="-1" r="0.6" fill="rgba(255,255,255,0.55)" />
              {/* dome on top */}
              <path d="M -7 -7 Q 0 -12 7 -7"
                fill="#aaa" stroke="#1a1a1a" strokeWidth="1.2" />
              {/* 4 splayed legs */}
              <line x1="-7" y1="6" x2="-10" y2="13" stroke="#666" strokeWidth="2"   strokeLinecap="round" />
              <line x1="7"  y1="6" x2="10"  y2="13" stroke="#666" strokeWidth="2"   strokeLinecap="round" />
              <line x1="-3" y1="6" x2="-4"  y2="13" stroke="#666" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="3"  y1="6" x2="4"   y2="13" stroke="#666" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* Toy Perseverance — Mastcam-Z mast + head, raised arm w/ visible drill */}
        <g transform="translate(310, 86)">
          <g className="mars-bounce-toy">
            {/* solar panel on top */}
            <rect x="-22" y="-22" width="44" height="6" rx="1"
              fill="#666" stroke="#1a1a1a" strokeWidth="1.4" />
            {[-16, -10, -4, 2, 8, 14].map((x) => (
              <line key={x} x1={x} y1="-22" x2={x} y2="-16"
                stroke="#888" strokeWidth="0.5" />
            ))}
            {/* MAST + Mastcam-Z stereo camera head */}
            <line x1="-14" y1="-22" x2="-14" y2="-32"
              stroke="#444" strokeWidth="2.4" strokeLinecap="round" />
            <rect x="-22" y="-40" width="16" height="9" rx="1.5"
              fill="#888" stroke="#1a1a1a" strokeWidth="1.6" />
            <circle cx="-18" cy="-35" r="2" fill="#333" stroke="#1a1a1a" strokeWidth="0.8" />
            <circle cx="-10" cy="-35" r="2" fill="#333" stroke="#1a1a1a" strokeWidth="0.8" />
            <circle cx="-18.5" cy="-35.5" r="0.7" fill="#aaa" />
            <circle cx="-10.5" cy="-35.5" r="0.7" fill="#aaa" />
            {/* asymmetric secondary antenna */}
            <line x1="14" y1="-22" x2="18" y2="-30"
              stroke="#444" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="18" cy="-31" r="1.6" fill="#666" stroke="#1a1a1a" strokeWidth="0.8" />
            {/* High-gain antenna dish */}
            <line x1="20" y1="-16" x2="24" y2="-22"
              stroke="#444" strokeWidth="1.6" />
            <ellipse cx="24" cy="-23" rx="3" ry="1.6"
              fill="#888" stroke="#1a1a1a" strokeWidth="1.2" />
            {/* chunky body */}
            <rect x="-28" y="-16" width="56" height="22" rx="6"
              fill="#aaa" stroke="#1a1a1a" strokeWidth="2" />
            {/* ARTICULATED + ANIMATED ROBOTIC ARM — modeled on
                Perseverance's Sample Caching System. Two SMIL-driven
                joints (shoulder + elbow) cycle the arm through four
                poses every 6 seconds: scanning sky → higher scan →
                lowering forward → drilling pose → reset.

                The structure is intentionally nested so each joint
                pivots around its own end-of-segment point:
                  shoulder pivot at (28, -9)
                    upper-arm boom drawn horizontal in this group
                    elbow at upper-arm end
                      forearm boom drawn horizontal in this group
                      wrist at forearm end
                        turret + drill (rotated -90 so the bit points
                        outward from the wrist; the whole assembly
                        inherits both joint rotations).
                That way one SMIL <animateTransform type="rotate"> on
                each pivot group is enough to drive everything that
                hangs off it. */}
            {/* shoulder mount block (static) */}
            <rect x="24" y="-12" width="6" height="6" rx="0.6"
              fill="#888" stroke="#1a1a1a" strokeWidth="1.2" />
            {/* shoulder pivot circle (static) */}
            <circle cx="28" cy="-9" r="1.6"
              fill="#666" stroke="#1a1a1a" strokeWidth="0.8" />
            {/* shoulder pivot group — translate to pivot point */}
            <g transform="translate(28, -9)">
              {/* shoulder rotation — animated through pose cycle */}
              <g>
                <animateTransform attributeName="transform" type="rotate"
                  values="-33; -50; -10; 5; -33"
                  keyTimes="0; 0.25; 0.5; 0.7; 1"
                  dur="6s" repeatCount="indefinite" />
                {/* upper arm boom — drawn horizontal; the rotation
                    above is what tilts it visually. */}
                <rect x="0" y="-1.8" width="14.4" height="3.6" rx="0.6"
                  fill="#888" stroke="#1a1a1a" strokeWidth="1.1" />
                <line x1="2" y1="0" x2="13" y2="0"
                  stroke="#1a1a1a" strokeWidth="0.4" opacity="0.55" />
                {/* elbow joint — sits at the end of the upper arm */}
                <circle cx="14.4" cy="0" r="2.4"
                  fill="#666" stroke="#1a1a1a" strokeWidth="1" />
                <circle cx="14.4" cy="0" r="0.9" fill="#1a1a1a" />
                {/* elbow pivot group */}
                <g transform="translate(14.4, 0)">
                  {/* elbow rotation — animated through the same cycle */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate"
                      values="-17; -30; 0; 25; -17"
                      keyTimes="0; 0.25; 0.5; 0.7; 1"
                      dur="6s" repeatCount="indefinite" />
                    {/* forearm boom — drawn horizontal */}
                    <rect x="0" y="-1.7" width="15.6" height="3.4" rx="0.5"
                      fill="#888" stroke="#1a1a1a" strokeWidth="1.1" />
                    <line x1="2" y1="0" x2="13.6" y2="0"
                      stroke="#1a1a1a" strokeWidth="0.4" opacity="0.5" />
                    {/* wrist joint at forearm end */}
                    <circle cx="15.6" cy="0" r="2"
                      fill="#666" stroke="#1a1a1a" strokeWidth="1" />
                    {/* TURRET + DRILL — translated to wrist, rotated
                        -90° so the drill points "out" from the wrist
                        (perpendicular to the forearm). The whole
                        assembly inherits the cumulative shoulder +
                        elbow rotation, so it naturally reorients as
                        the arm cycles through its poses. */}
                    <g transform="translate(15.6, 0) rotate(90)">
                      <rect x="-3" y="-2.5" width="6" height="5" rx="0.7"
                        fill="#888" stroke="#1a1a1a" strokeWidth="1.2" />
                      <circle cx="-2.4" cy="0" r="0.8"
                        fill="#444" stroke="#1a1a1a" strokeWidth="0.4" />
                      {/* drill housing */}
                      <rect x="-1.6" y="-7" width="3.2" height="4.5" rx="0.4"
                        fill="#666" stroke="#1a1a1a" strokeWidth="0.9" />
                      {/* drill bit — pointed */}
                      <polygon points="-1.6,-7 1.6,-7 0,-12.5"
                        fill="#444" stroke="#1a1a1a" strokeWidth="0.8" strokeLinejoin="round" />
                      <line x1="-1.2" y1="-8.5"  x2="1.2" y2="-8.5"  stroke="#1a1a1a" strokeWidth="0.4" />
                      <line x1="-0.8" y1="-10"   x2="0.8" y2="-10"   stroke="#1a1a1a" strokeWidth="0.4" />
                      <line x1="-0.4" y1="-11.3" x2="0.4" y2="-11.3" stroke="#1a1a1a" strokeWidth="0.3" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
            {/* short suspension struts */}
            <line x1="-22" y1="6" x2="-22" y2="9" stroke="#1a1a1a" strokeWidth="1.5" />
            <line x1="0"   y1="6" x2="0"   y2="9" stroke="#1a1a1a" strokeWidth="1.5" />
            <line x1="22"  y1="6" x2="22"  y2="9" stroke="#1a1a1a" strokeWidth="1.5" />
            {/* Moon-dust puffs trailing the back wheel — 5 staggered
                radial-gradient puffs form a continuously dense stream.
                Each puff: opacity fades in fast then out long, radius
                grows from 3 → 14, drifts back-and-up out of the wheel
                track. Color stays a flat warm gray throughout (no
                fire-to-smoke fade — this is dust, not exhaust). The
                soft feathered edges come from the radial gradient
                defined in <defs>. Drawn before the wheels so the
                wheel renders on top of the spawn origin. */}
            <g transform="translate(-26, 18)">
              {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((begin, i) => (
                <circle key={i} r="0" cx="0" cy="0" fill="url(#md-dust-puff)">
                  <animate attributeName="opacity"
                    values="0; 0.85; 0" keyTimes="0; 0.2; 1"
                    dur="1s" begin={`${begin}s`} repeatCount="indefinite" />
                  <animate attributeName="r"
                    values="3; 14" dur="1s" begin={`${begin}s`} repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate"
                    values="0,0; -18,-10" dur="1s" begin={`${begin}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
            {/* big chunky drum wheels — outer ring gray (not black) */}
            {[-22, 0, 22].map((cx) => (
              <g key={cx} transform={`translate(${cx}, 9)`}>
                <g>
                  <animateTransform attributeName="transform" type="rotate"
                    repeatCount="indefinite" {...WHEEL_SPIN} />
                  <circle r="10" fill="#555" stroke="#1a1a1a" strokeWidth="1" />
                  <circle r="7"  fill="#aaa" stroke="#1a1a1a" strokeWidth="1" />
                  <circle r="2.2" fill="#444" />
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#1a1a1a" strokeWidth="1.5" />
                  <line x1="0" y1="-7" x2="0" y2="7" stroke="#1a1a1a" strokeWidth="1.5" />
                </g>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>);

}

/* ---------- App ----------
 * Top-level component. Just composes the sections in order.
 *
 * The optional Tweaks panel: this site can be loaded with an external
 * "tweaks-panel.jsx" that attaches helpers (useTweaks, TweaksPanel,
 * etc.) onto the global window. When present, those globals power a
 * floating dev panel for live-tweaking the accent color, starfield,
 * and scanline overlay. When absent — which is the normal production
 * path — every reference is gated behind `window.useTweaks ? ... :
 * null` so the component renders exactly the same tree without it.
 */
function App() {
  // Read tweaks state from the optional global, or null if it's not
  // loaded. The `t` tuple shape mirrors useState: [values, setKey].
  const t = window.useTweaks ? window.useTweaks({
    accent: 'terracotta',
    showStars: true,
    showScanlines: true
  }) : null;

  // When tweaks state changes, push the values out to the DOM:
  //  - accent → CSS custom property used across the stylesheet
  //  - stars / scanlines → toggle visibility of the fixed canvases
  // This effect is a no-op when the Tweaks panel isn't loaded.
  useEffect(() => {
    if (!t) return;
    const tweaks = t[0];
    document.documentElement.style.setProperty('--accent', `var(--${tweaks.accent})`);
    document.getElementById('starfield').style.display = tweaks.showStars ? 'block' : 'none';
    document.getElementById('scanlines').style.display = tweaks.showScanlines ? 'block' : 'none';
  }, [t && t[0]]);

  return (
    <>
      <Rocket />
      <Hero />
      <MarsDivider />
      <About />
      <MarsDivider />
      <Experience />
      <MarsDivider />
      <CodeProjects />
      <MarsDivider />
      <RoboticsProjects />
      <MarsDivider />
      <Contact />
      {t && window.TweaksPanel &&
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Theme">
            <window.TweakRadio
            label="Accent"
            value={t[0].accent}
            onChange={(v) => t[1]('accent', v)}
            options={[
            { label: 'Terracotta', value: 'terracotta' },
            { label: 'Ochre', value: 'ochre' },
            { label: 'Crimson', value: 'crimson' }]
            } />
          
            <window.TweakToggle label="Starfield" value={t[0].showStars} onChange={(v) => t[1]('showStars', v)} />
            <window.TweakToggle label="Scanlines" value={t[0].showScanlines} onChange={(v) => t[1]('showScanlines', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      }
    </>);

}

export default App;
