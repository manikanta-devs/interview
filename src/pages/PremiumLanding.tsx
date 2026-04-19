import { useEffect, useRef } from 'react';

export default function PremiumLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadScriptsAndInit();
  }, []);

  const loadScriptsAndInit = () => {
    // Load external scripts
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    ];

    let loaded = 0;
    const checkAllLoaded = () => {
      loaded++;
      if (loaded === scripts.length) {
        setTimeout(() => initLandingPage(), 200);
      }
    };

    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        checkAllLoaded();
      } else {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = checkAllLoaded;
        document.body.appendChild(script);
      }
    });

    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    if (!document.querySelector(`link[href*="fonts.googleapis"]`)) {
      document.head.appendChild(link);
    }
  };

  const initLandingPage = () => {
    // Loader animation
    const lbar = document.getElementById('lbar');
    const lLabel = document.getElementById('loader-label');
    const labels = ['Initializing...', 'Loading AI Engine...', 'Building Interface...', 'Ready.'];
    let prog = 0;
    const lInt = setInterval(() => {
      prog = Math.min(100, prog + Math.random() * 18);
      if (lbar) lbar.style.width = prog + '%';
      if (lLabel) lLabel.textContent = labels[Math.floor(prog / 34)] || 'Ready.';
      if (prog >= 100) {
        clearInterval(lInt);
        if (lLabel) lLabel.textContent = 'Ready.';
      }
    }, 80);

    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('out');
    }, 2400);

    // Custom cursor
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const trackCursor = () => {
      if (dot && ring) {
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      requestAnimationFrame(trackCursor);
    };
    trackCursor();

    // Three.js
    if ((window as any).THREE) {
      const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
      if (canvas) {
        const THREE = (window as any).THREE;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 5);

        // Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(1.9, 1);
        const icoMat = new THREE.MeshBasicMaterial({
          color: 0xc6ff00,
          wireframe: true,
          transparent: true,
          opacity: 0.09,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        scene.add(ico);

        // Octahedron
        const octGeo = new THREE.OctahedronGeometry(1.1, 0);
        const octMat = new THREE.MeshBasicMaterial({
          color: 0xff4500,
          wireframe: true,
          transparent: true,
          opacity: 0.13,
        });
        const oct = new THREE.Mesh(octGeo, octMat);
        scene.add(oct);

        // Torus
        const torGeo = new THREE.TorusGeometry(2.6, 0.005, 8, 160);
        const torMat = new THREE.MeshBasicMaterial({ color: 0xc6ff00, transparent: true, opacity: 0.07 });
        const tor = new THREE.Mesh(torGeo, torMat);
        tor.rotation.x = 0.5;
        scene.add(tor);

        // Particles
        const pGeo = new THREE.BufferGeometry();
        const pCount = 1400;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = Math.random() * Math.PI * 2;
          const r = 2.2 + (Math.random() - 0.5) * 0.8;
          pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pPos[i * 3 + 2] = r * Math.cos(phi);
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0xc6ff00, size: 0.016, transparent: true, opacity: 0.45 });
        const pts = new THREE.Points(pGeo, pMat);
        scene.add(pts);

        let mouseX = 0,
          mouseY = 0;
        document.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        window.addEventListener('scroll', () => {
          const scrollPct = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
          const fade = 1 - scrollPct;
          icoMat.opacity = 0.09 * fade;
          octMat.opacity = 0.13 * fade;
          torMat.opacity = 0.07 * fade;
          pMat.opacity = 0.45 * fade;
        });

        const render = () => {
          requestAnimationFrame(render);
          const t = (Date.now() * 0.0003) % (Math.PI * 2);
          ico.rotation.y = t * 0.22 + mouseX * 0.1;
          ico.rotation.x = t * 0.11 + mouseY * 0.06;
          oct.rotation.y = -t * 0.35 + mouseX * 0.12;
          oct.rotation.z = t * 0.17;
          tor.rotation.z = t * 0.09;
          pts.rotation.y = t * 0.06;
          renderer.render(scene, camera);
        };
        render();

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      }
    }

    // GSAP animations
    if ((window as any).gsap) {
      const gsap = (window as any).gsap;
      gsap.registerPlugin((window as any).ScrollTrigger);

      gsap.timeline({ delay: 2.6 })
        .to('#he-ey', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('#he-title', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=.4')
        .to('#he-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=.5')
        .to('#he-act', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=.4')
        .to('#he-right', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=.5');

      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.to('.cta-bg-text', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: '#cta', start: 'top bottom', end: 'bottom top', scrub: 2 },
      });

      // Privacy section scroll animations
      gsap.fromTo(
        '.privacy-title',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#privacy', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.privacy-text h3',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: '.privacy-text', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // CTA section fade and slide
      gsap.fromTo(
        '#cta .reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '#cta', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      // Features horizontal scroll with smooth mouse drag + momentum
      const track = document.getElementById('feat-track');
      const pin = document.querySelector('.features-pin');
      const bar = document.getElementById('feat-bar');
      
      if (track && pin && bar && (window as any).gsap) {
        const gsap = (window as any).gsap;
        
        gsap.set(track, { willChange: 'transform' });
        
        let isDown = false;
        let startX = 0;
        let startPos = 0;
        let currentX = 0;
        let velocity = 0;
        let animationId: number | null = null;
        const maxScroll = track.scrollWidth - window.innerWidth;
        
        track.style.cursor = 'grab';
        
        const clampX = (x: number) => Math.max(-maxScroll, Math.min(0, x));
        
        const updateBar = () => {
          const progress = Math.abs(currentX) / maxScroll;
          bar.style.width = Math.max(0, Math.min(100, progress * 100)) + '%';
        };
        
        const applyMomentum = () => {
          if (animationId) cancelAnimationFrame(animationId);
          
          const decay = 0.94;
          const minVelocity = 0.05;
          
          const tick = () => {
            velocity *= decay;
            
            if (Math.abs(velocity) > minVelocity) {
              const newX = currentX + velocity;
              
              // Bounce effect at boundaries
              if (newX > 0 || newX < -maxScroll) {
                velocity *= -0.3; // Reverse and reduce velocity at boundary
              }
              
              currentX = clampX(newX);
              gsap.set(track, { x: currentX });
              updateBar();
              animationId = requestAnimationFrame(tick);
            } else {
              velocity = 0;
              gsap.set(track, { willChange: 'auto' });
              updateBar();
            }
          };
          
          tick();
        };
        
        track.addEventListener('mousedown', (e: MouseEvent) => {
          isDown = true;
          track.style.cursor = 'grabbing';
          startX = e.pageX;
          startPos = currentX;
          velocity = 0;
          gsap.killTweensOf(track);
          gsap.set(track, { willChange: 'transform' });
          if (animationId) cancelAnimationFrame(animationId);
        });
        
        document.addEventListener('mouseup', () => {
          if (!isDown) return;
          isDown = false;
          track.style.cursor = 'grab';
          applyMomentum();
        });
        
        track.addEventListener('mousemove', (e: MouseEvent) => {
          if (!isDown) return;
          const diff = (e.pageX - startX) * 1.8;
          const rawNewX = startPos - diff;
          
          // Allow momentum to carry past boundaries for natural scrolling
          if (rawNewX > 0.5 || rawNewX < -maxScroll - 0.5) {
            // At boundary - apply resistance
            const overflow = rawNewX > 0 ? rawNewX * 0.15 : (rawNewX + maxScroll) * 0.15;
            currentX = clampX(rawNewX - overflow);
          } else {
            currentX = rawNewX;
          }
          
          velocity = currentX - startPos;
          gsap.set(track, { x: currentX });
          updateBar();
        });
        
        // Scroll wheel support - allow page scroll at boundaries
        let wheelTimeout: ReturnType<typeof setTimeout> | null = null;
        track.addEventListener('wheel', (e: WheelEvent) => {
          const isAtStart = currentX >= -1;
          const isAtEnd = currentX <= -maxScroll + 1;
          
          // Allow page scroll if at boundaries
          if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtStart)) {
            return; // Let normal scroll happen
          }
          
          e.preventDefault();
          gsap.killTweensOf(track);
          gsap.set(track, { willChange: 'transform' });
          if (animationId) cancelAnimationFrame(animationId);
          
          const newX = currentX - e.deltaY * 0.8;
          
          // Smooth scrolling with boundary feedback
          if (newX > 0 || newX < -maxScroll) {
            // Apply resistance at boundary
            currentX = clampX(newX + (newX > 0 ? -e.deltaY * 0.2 : e.deltaY * 0.2));
          } else {
            currentX = newX;
          }
          
          velocity = 0;
          gsap.set(track, { x: currentX });
          updateBar();
          
          if (wheelTimeout) clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            gsap.set(track, { willChange: 'auto' });
          }, 100);
        }, { passive: false });
      }

      // Feature slides 3D tilt
      document.querySelectorAll('.feat-slide').forEach((slide: any) => {
        slide.addEventListener('mousemove', (e: MouseEvent) => {
          const r = slide.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          slide.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
        });
        slide.addEventListener('mouseleave', () => {
          slide.style.transform = '';
        });
      });

      // Process steps stagger reveal
      gsap.utils.toArray('.step').forEach((step: any, i: number) => {
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: .7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Process heading reveal
      gsap.fromTo('.process-top h2',
        { opacity: 0, x: -40 },
        { 
          opacity: 1, x: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-top', start: 'top 85%' } 
        }
      );
      gsap.fromTo('.process-top p',
        { opacity: 0, x: 40 },
        { 
          opacity: 1, x: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-top', start: 'top 85%' } 
        }
      );

      // Connector line draw
      gsap.fromTo('.steps-connector-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { 
          scaleX: 1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.steps-connector', start: 'top 88%' } 
        }
      );

      window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: '#0a0a0f',
        color: '#f8f8ff',
        fontFamily: "'Poppins', sans-serif",
        overflowX: 'hidden',
      }}
    >
      <style>{`
        :root {
          --bg: #0a0a0f;
          --bg2: #111118;
          --accent: #7c3aed;
          --accent-light: #a78bfa;
          --ember: #ff4500;
          --text: #f8f8ff;
          --muted: #94a3b8;
          --text-secondary: #475569;
          --card: rgba(255,255,255,0.028);
          --border: rgba(255,255,255,0.06);
          --glow: rgba(124,58,237,0.3);
        }

        *,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Poppins', sans-serif; overflow-x: hidden; cursor: none; }

        #loader { position: fixed; inset: 0; z-index: 9999; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.8rem; transition: opacity .7s ease, visibility .7s ease; }
        #loader.out { opacity: 0; visibility: hidden; pointer-events: none; }
        .loader-progress { width: 160px; height: 1px; background: rgba(124,58,237,0.12); position: relative; overflow: hidden; }
        .loader-bar { position: absolute; top: 0; left: 0; height: 100%; background: var(--accent); width: 0%; transition: width .04s linear; }
        .loader-label { font-family: 'JetBrains Mono', monospace; font-size: .65rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }

        #cur-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; position: fixed; top:0; left:0; pointer-events: none; z-index: 8888; transform: translate(-50%,-50%); mix-blend-mode: screen; }
        #cur-ring { width: 40px; height: 40px; border: 1px solid rgba(124,58,237,0.45); border-radius: 50%; position: fixed; top:0; left:0; pointer-events: none; z-index: 8887; transform: translate(-50%,-50%); }

        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 500; padding: 1.3rem 5%; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(24px); background: rgba(10,10,15,0.55); border-bottom: 1px solid rgba(124,58,237,0.05); }
        nav.scrolled { border-bottom-color: rgba(124,58,237,0.12); }
        .nav-brand { display: flex; align-items: center; gap: .9rem; }
        .nav-logomark { width: 28px; height: 32px; }
        .nav-name { font-family: 'Sora', sans-serif; font-size: 1.45rem; letter-spacing: .08em; color: #fff; font-weight: 700; }
        .nav-name em { color: var(--accent); font-style: normal; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a { font-size: .76rem; letter-spacing: .14em; text-transform: uppercase; text-decoration: none; color: var(--muted); font-family: 'Poppins', sans-serif; }
        .nav-links a:hover { color: var(--accent); }
        .btn-nav { padding: .52rem 1.4rem; background: var(--accent); color: #fff; font-size: .76rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; }

        #hero { position: relative; height: 100vh; display: flex; align-items: flex-end; padding: 0 5% 6rem; overflow: hidden; }
        #hero-canvas { position: absolute; inset: 0; z-index: 0; }
        .hero-overlay { position: absolute; inset: 0; z-index: 1; background: radial-gradient(ellipse 70% 70% at 60% 40%, rgba(10,10,15,0.3), rgba(10,10,15,0.82)); }
        .hero-content { position: relative; z-index: 3; display: grid; grid-template-columns: 1fr auto; align-items: flex-end; gap: 4rem; width: 100%; }
        .hero-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .22em; color: var(--accent); margin-bottom: 1.2rem; display: flex; align-items: center; gap: .7rem; opacity: 0; transform: translateY(16px); }
        .hero-eyebrow::before { content: ''; display: inline-block; width: 32px; height: 1px; background: var(--accent); }
        .hero-title { font-family: 'Sora', sans-serif; line-height: .9; opacity: 0; transform: translateY(50px); font-weight: 700; }
        .hero-word-solid { display: block; font-size: clamp(6rem, 16vw, 15.5rem); color: #fff; }
        .hero-word-stroke { display: block; font-size: clamp(6rem, 16vw, 15.5rem); color: transparent; -webkit-text-stroke: 2px var(--accent); }
        .hero-sub-row { margin-top: 2rem; display: flex; align-items: center; gap: 3rem; opacity: 0; transform: translateY(20px); }
        .hero-sep { width: 60px; height: 1px; background: var(--muted); }
        .hero-desc { font-size: .92rem; font-weight: 400; color: var(--muted); line-height: 1.75; max-width: 380px; font-family: 'Poppins', sans-serif; }
        .hero-actions { margin-top: 2.4rem; display: flex; gap: 1rem; flex-wrap: wrap; opacity: 0; transform: translateY(20px); }
        .btn-primary { padding: .9rem 2.4rem; background: var(--accent); color: #fff; font-size: .82rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-outline { padding: .9rem 2.4rem; background: transparent; border: 1px solid rgba(255,255,255,0.15); color: var(--text); font-size: .82rem; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; }
        .hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1.4rem; opacity: 0; }
        .hero-badge { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--accent); border: 1px solid var(--border); padding: .5rem 1rem; background: rgba(124,58,237,0.04); }
        .scroll-track { width: 1px; height: 56px; background: rgba(255,255,255,0.08); position: relative; overflow: hidden; }
        .scroll-track::after { content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 40%; background: var(--accent); animation: scandown 2s infinite; }
        @keyframes scandown { 0%{top:-40%} 100%{top:140%} }



        #cta { padding: 10rem 5%; background: var(--accent); position: relative; overflow: hidden; z-index: 2; clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%); }
        .cta-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: 'Sora', sans-serif; font-size: clamp(8rem, 20vw, 18rem); color: rgba(255,255,255,0.04); white-space: nowrap; pointer-events: none; font-weight: 700; }
        .cta-content { position: relative; z-index: 2; max-width: 800px; margin: 0 auto; text-align: center; }
        .cta-tag { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: rgba(255,255,255,0.45); margin-bottom: 1.5rem; display: block; }
        .cta-title { font-family: 'Sora', sans-serif; font-size: clamp(3.5rem, 8vw, 8rem); color: #ffffff; line-height: .9; margin-bottom: 1.8rem; font-weight: 700; }
        .cta-title em { display: block; font-style: italic; font-family: 'Poppins', sans-serif; }
        .cta-desc { font-size: 1rem; color: rgba(255,255,255,0.55); margin-bottom: 2.8rem; font-family: 'Poppins', sans-serif; }
        .btn-dark { padding: 1rem 2.8rem; background: #0a0a0f; color: var(--accent); font-size: .85rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; display: inline-block; }
        .btn-dark-outline { padding: 1rem 2.8rem; background: transparent; color: #ffffff; border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; cursor: pointer; display: inline-block; }
        .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .cta-pills { margin-top: 2.2rem; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; }
        .pill { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: rgba(255,255,255,0.45); }
        .pill::before { content: '✓'; margin-right: .4rem; font-weight: 700; }

        footer { padding: 3rem 5%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; border-top: 1px solid rgba(124,58,237,0.06); }
        .footer-brand { display: flex; align-items: center; gap: .9rem; }
        .footer-brand svg { width: 24px; height: 28px; }
        .footer-brand-name { font-family: 'Sora', sans-serif; font-size: 1.45rem; color: #fff; font-weight: 700; }
        .footer-brand-name em { color: var(--accent); font-style: normal; }
        .footer-links { display: flex; gap: 2.5rem; list-style: none; }
        .footer-links a { font-size: .76rem; text-decoration: none; color: var(--muted); font-family: 'Poppins', sans-serif; }
        .footer-copy { font-family: 'JetBrains Mono', monospace; }
        .footer-copy b { color: var(--accent); }

        .reveal { opacity: 0; }

        #privacy { padding: 6rem 5%; background: var(--bg2); border-top: 1px solid var(--border); }
        .privacy-content { max-width: 800px; margin: 0 auto; }
        .privacy-title { font-family: 'Sora', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; margin-bottom: 2rem; text-align: center; color: var(--text); }
        .privacy-text h3 { font-family: 'Sora', sans-serif; font-size: 1.3rem; font-weight: 600; color: var(--text); margin-bottom: 1rem; }
        .privacy-text p { font-family: 'Poppins', sans-serif; font-size: .95rem; color: var(--muted); line-height: 1.8; margin-bottom: 1.5rem; }

        #features { position: relative; overflow: hidden; background: var(--bg); }
        .features-pin { height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0 0 0 5%; overflow: visible; will-change: transform; }
        .features-header { display: flex; align-items: baseline; gap: 2rem; margin-bottom: 2.8rem; flex-shrink: 0; flex-wrap: wrap; }
        .features-header .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .22em; text-transform: uppercase; color: var(--accent); white-space: nowrap; }
        .features-header h2 { font-family: 'Sora', sans-serif; font-size: clamp(1.8rem, 4vw, 3.2rem); color: #fff; letter-spacing: .04em; line-height: 1; font-weight: 700; }
        .features-header h2 em { color: var(--accent); font-style: italic; }
        .features-scroll-hint { font-family: 'JetBrains Mono', monospace; font-size: .6rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-left: auto; padding-right: 5%; display: flex; align-items: center; gap: .5rem; white-space: nowrap; align-self: center; }
        .features-scroll-hint::after { content: '→'; color: var(--accent); }
        .features-track { display: flex; gap: 0; width: max-content; align-items: stretch; cursor: grab; user-select: none; transform: translateZ(0); backface-visibility: hidden; -webkit-font-smoothing: antialiased; }
        .features-track:active { cursor: grabbing; }
        .feat-slide { width: 320px; flex-shrink: 0; height: 420px; background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.15); border-right: none; padding: 2.4rem 2rem; position: relative; overflow: hidden; transition: background .3s ease, transform .2s ease; backface-visibility: hidden; }
        .feat-slide:last-child { border-right: 1px solid rgba(124,58,237,0.15); }
        .feat-slide::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), transparent); transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.23,1,.32,1); }
        .feat-slide:hover::before { transform: scaleX(1); }
        .feat-slide:hover { background: rgba(124,58,237,0.1); transform: translateY(-8px); }
        .feat-slide-num { font-family: 'JetBrains Mono', monospace; font-size: .6rem; color: var(--muted); letter-spacing: .1em; margin-bottom: 1.8rem; }
        .feat-slide-icon { width: 44px; height: 44px; margin-bottom: 1.4rem; border-radius: 8px; border: 1px solid rgba(124,58,237,0.18); background: rgba(124,58,237,0.04); display: flex; align-items: center; justify-content: center; font-size: 1.15rem; transition: background .3s, border-color .3s, transform .3s; }
        .feat-slide:hover .feat-slide-icon { background: rgba(124,58,237,0.10); border-color: rgba(124,58,237,0.45); transform: scale(1.1); }
        .feat-slide-title { font-family: 'Sora', sans-serif; font-size: 1.35rem; font-weight: 600; color: #fff; margin-bottom: .7rem; line-height: 1.25; }
        .feat-slide-desc { font-size: .82rem; font-weight: 400; color: var(--muted); line-height: 1.8; }
        .feat-slide-tech { margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: .4rem; }
        .tech-tag { font-family: 'JetBrains Mono', monospace; font-size: .58rem; letter-spacing: .1em; padding: .2rem .55rem; border-radius: 4px; border: 1px solid rgba(124,58,237,0.15); color: rgba(124,58,237,0.6); background: rgba(124,58,237,0.03); white-space: nowrap; }
        .feat-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(124,58,237,0.1); }
        .feat-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), rgba(124,58,237,0.5)); width: 0%; transition: width 0.05s linear; }
        .feat-progress-fill { height: 100%; background: var(--accent); transition: width .05s linear; }

        #process { padding: 9rem 5% 9rem; position: relative; z-index: 2; background: var(--bg2); }
        .process-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5rem; position: relative; z-index: 1; flex-wrap: wrap; gap: 2rem; }
        .process-top h2 { font-family: 'Sora', sans-serif; font-size: clamp(2.8rem, 6vw, 5.5rem); line-height: .88; color: #fff; letter-spacing: .02em; font-weight: 700; }
        .process-top h2 em { display: block; font-style: italic; color: var(--accent); }
        .process-top p { max-width: 340px; font-size: .88rem; color: var(--muted); line-height: 1.8; font-weight: 400; font-family: 'Poppins', sans-serif; }
        .steps-connector { position: relative; z-index: 1; margin-bottom: -1px; }
        .steps-connector-line { position: absolute; top: 4px; left: 0; right: 5%; height: 1px; background: linear-gradient(90deg, rgba(124,58,237,0.2), rgba(124,58,237,0.04) 80%, transparent); z-index: 0; }
        .steps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border-top: 1px solid rgba(255,255,255,0.04); position: relative; z-index: 1; }
        .step { padding: 2.4rem 1.6rem 2.4rem 0; border-right: 1px solid rgba(255,255,255,0.04); position: relative; transition: background .35s; }
        .step:last-child { border-right: none; }
        .step:hover { background: rgba(124,58,237,0.012); }
        .step-dot { position: absolute; top: -5px; left: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--bg2); border: 2px solid var(--muted); transition: border-color .4s, background .4s, box-shadow .4s; z-index: 2; }
        .step:hover .step-dot { border-color: var(--accent); background: var(--accent); box-shadow: 0 0 12px rgba(124,58,237,0.5); }
        .step-n { font-family: 'Sora', sans-serif; font-size: 3.8rem; line-height: 1; color: rgba(124,58,237,0.07); margin-bottom: .7rem; transition: color .4s; user-select: none; font-weight: 700; }
        .step:hover .step-n { color: rgba(124,58,237,0.3); }
        .step-title { font-family: 'Sora', sans-serif; font-size: 1rem; color: #fff; margin-bottom: .55rem; line-height: 1.35; font-weight: 600; }
        .step-desc { font-size: .77rem; color: var(--muted); line-height: 1.8; font-weight: 400; font-family: 'Poppins', sans-serif; }
        .step-icon { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.12); font-size: .75rem; margin-bottom: .9rem; transition: background .3s; }
        .step:hover .step-icon { background: rgba(124,58,237,0.12); }
      `}</style>

      <div id="loader">
        <div className="loader-progress">
          <div id="lbar" className="loader-bar"></div>
        </div>
        <div id="loader-label" className="loader-label">Initializing...</div>
      </div>

      <div id="cur-dot"></div>
      <div id="cur-ring"></div>

      <nav id="navbar">
        <div className="nav-brand">
          <svg className="nav-logomark" viewBox="0 0 48 56" fill="none">
            <polygon points="24,2 46,15 46,41 24,54 2,41 2,15" stroke="#7c3aed" strokeWidth="1.8" fill="none"/>
            <line x1="14" y1="40" x2="14" y2="16" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="34" y2="40" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round"/>
            <line x1="34" y1="40" x2="34" y2="16" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round"/>
            <circle cx="24" cy="28" r="1.8" fill="#ff4500"/>
          </svg>
          <div className="nav-name">Nex<em>Hire</em></div>
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#privacy">Privacy</a></li>
        </ul>
        <button className="btn-nav">Get Started</button>
      </nav>

      <section id="hero">
        <canvas id="hero-canvas"></canvas>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow" id="he-ey">WELCOME TO NEXHIRE</div>
            <div className="hero-title" id="he-title">
              <span className="hero-word-solid">NEX</span>
              <span className="hero-word-stroke">HIRE</span>
            </div>
            <div className="hero-sub-row" id="he-sub">
              <div className="hero-sep"></div>
              <div className="hero-desc">AI-powered interview preparation with real-time feedback and practice tools</div>
            </div>
            <div className="hero-actions" id="he-act">
              <a href="/dashboard" className="btn-primary">Launch NexHire Free</a>
            </div>
          </div>
          <div className="hero-right" id="he-right">
            <div className="hero-badge">AI-POWERED</div>
            <div className="scroll-track"></div>
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="cta-bg-text">NEXHIRE</div>
        <div className="cta-content">
          <span className="cta-tag reveal">Ready to land your dream offer?</span>
          <h2 className="cta-title reveal">
            Free.<br/>No BS.<br/><em>Just Results.</em>
          </h2>
          <div className="cta-actions reveal">
            <a href="/dashboard" className="btn-dark">Launch NexHire Free</a>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="features-pin">
          <div className="features-header">
            <span className="eyebrow">Capabilities</span>
            <h2>Built to make you <em>unbeatable</em></h2>
            <span className="features-scroll-hint">Drag to explore</span>
          </div>

          <div className="features-track" id="feat-track">
            <div className="feat-slide">
              <div className="feat-slide-num">01 / 08</div>
              <div className="feat-slide-icon">🤖</div>
              <div className="feat-slide-title">AI Question Engine</div>
              <p className="feat-slide-desc">Generates contextually relevant, role-specific questions on the fly — adapting difficulty based on your answers in real time.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">AI Powered</span>
                <span className="tech-tag">Adaptive</span>
                <span className="tech-tag">Role-Aware</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">02 / 08</div>
              <div className="feat-slide-icon">🎙️</div>
              <div className="feat-slide-title">Voice Analysis</div>
              <p className="feat-slide-desc">Speak your answers aloud. The system captures your voice, transcribes it live, and analyses pace, clarity, and filler-word usage.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">Speech API</span>
                <span className="tech-tag">Live Transcript</span>
                <span className="tech-tag">Analysis</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">03 / 08</div>
              <div className="feat-slide-icon">📄</div>
              <div className="feat-slide-title">Resume Scanner</div>
              <p className="feat-slide-desc">Upload your CV as a PDF. The system parses it intelligently, extracts your skills and experience, and tailors every question.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">PDF Parsing</span>
                <span className="tech-tag">AI Vision</span>
                <span className="tech-tag">Skill Extract</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">04 / 08</div>
              <div className="feat-slide-icon">⚡</div>
              <div className="feat-slide-title">Real-time Feedback</div>
              <p className="feat-slide-desc">Instant AI scoring after every answer — STAR method adherence, keyword density, answer structure, and personalised tips in seconds.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">Streaming API</span>
                <span className="tech-tag">STAR Scoring</span>
                <span className="tech-tag">Instant Tips</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">05 / 08</div>
              <div className="feat-slide-icon">📊</div>
              <div className="feat-slide-title">Performance Analytics</div>
              <p className="feat-slide-desc">After each session, a full radar chart breaks down Communication, Technical Depth, Confidence, Clarity across questions.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">Radar Graph</span>
                <span className="tech-tag">Analytics</span>
                <span className="tech-tag">History</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">06 / 08</div>
              <div className="feat-slide-icon">🔁</div>
              <div className="feat-slide-title">Mock Interview Mode</div>
              <p className="feat-slide-desc">Full simulation with a timer, randomised order, no hints, and a final debrief. Mirrors the pressure of a real interview round.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">Timed Sessions</span>
                <span className="tech-tag">Blind Mode</span>
                <span className="tech-tag">Debrief</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">07 / 08</div>
              <div className="feat-slide-icon">📈</div>
              <div className="feat-slide-title">Progress Tracking</div>
              <p className="feat-slide-desc">All your sessions stored locally — no cloud, no account. Watch your scores trend upward with a timeline view of your growth.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">Local Storage</span>
                <span className="tech-tag">Offline-First</span>
                <span className="tech-tag">Timeline</span>
              </div>
            </div>

            <div className="feat-slide">
              <div className="feat-slide-num">08 / 08</div>
              <div className="feat-slide-icon">📥</div>
              <div className="feat-slide-title">Export & Report</div>
              <p className="feat-slide-desc">One click to export your full session as a polished PDF — questions, answers, AI scores, and recommendations included.</p>
              <div className="feat-slide-tech">
                <span className="tech-tag">PDF Export</span>
                <span className="tech-tag">Canvas API</span>
                <span className="tech-tag">Reports</span>
              </div>
            </div>
          </div>

          <div className="feat-progress" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <div className="feat-progress-fill" id="feat-bar" style={{width: '0%'}}></div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="process-top">
          <h2>How it<br/><em>actually works</em></h2>
          <p>Five steps from zero to offer-ready. No fluff, no friction — just deliberate practice that compounds.</p>
        </div>

        <div className="steps-connector">
          <div className="steps-connector-line"></div>
        </div>

        <div className="steps-grid">
          <div className="step">
            <div className="step-dot"></div>
            <div className="step-n">01</div>
            <div className="step-icon">📎</div>
            <div className="step-title">Upload Resume</div>
            <p className="step-desc">Drop your PDF. AI reads it so questions match your exact experience level.</p>
          </div>

          <div className="step">
            <div className="step-dot"></div>
            <div className="step-n">02</div>
            <div className="step-icon">🎯</div>
            <div className="step-title">Choose Mode</div>
            <p className="step-desc">Pick from Quick Fire, Deep Dive, Domain Expert, or full Mock Interview.</p>
          </div>

          <div className="step">
            <div className="step-dot"></div>
            <div className="step-n">03</div>
            <div className="step-icon">🎙️</div>
            <div className="step-title">Answer Live</div>
            <p className="step-desc">Type or speak your answers. Real-time transcript keeps you accountable.</p>
          </div>

          <div className="step">
            <div className="step-dot"></div>
            <div className="step-n">04</div>
            <div className="step-icon">⚡</div>
            <div className="step-title">Get Scored</div>
            <p className="step-desc">Instant AI feedback on every answer with score, gap analysis, and tips.</p>
          </div>

          <div className="step">
            <div className="step-dot"></div>
            <div className="step-n">05</div>
            <div className="step-icon">📥</div>
            <div className="step-title">Export & Repeat</div>
            <p className="step-desc">Download your PDF report, review your radar chart, and come back sharper.</p>
          </div>
        </div>
      </section>

      <section id="privacy">
        <div className="privacy-content">
          <h2 className="privacy-title">Privacy & Terms</h2>
          <div className="privacy-text reveal">
            <h3>Your Privacy Matters</h3>
            <p>We don't store your personal data on our servers. All your interview data stays on your device. Your privacy is our top priority.</p>
            <h3 style={{marginTop: '2rem'}}>No Data Collection</h3>
            <p>We don't track, sell, or share your data. Complete transparency in everything we do.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <svg width="24" height="28" viewBox="0 0 48 56" fill="none">
            <polygon points="24,2 46,15 46,41 24,54 2,41 2,15" stroke="#c6ff00" strokeWidth="1.8" fill="none"/>
            <line x1="14" y1="40" x2="14" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="34" y2="40" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
            <line x1="34" y1="40" x2="34" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
            <circle cx="24" cy="28" r="1.8" fill="#ff4500"/>
          </svg>
          <div className="footer-brand-name">Nex<em>Hire</em></div>
        </div>
        <ul className="footer-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#privacy">Privacy</a></li>
        </ul>
        <span className="footer-copy">Built with <b>✦</b> for every job seeker in India</span>
      </footer>
    </div>
  );
}
