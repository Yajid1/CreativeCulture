import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import '../../css/lumora.css';

export default function Welcome() {
  useEffect(() => {
    let cleanupFns: Array<() => void> = [];
    let rafId: number;

    // ===== PAGE LOADER - JALAN LANGSUNG, TIDAK MENUNGGU LENIS =====
    const loader = document.getElementById('pageLoader');
    const loaderFill = document.getElementById('loaderFill') as HTMLElement | null;
    const loaderCounter = document.getElementById('loaderCounter') as HTMLElement | null;
    const FILL_MS = 1300;

    if (loader) {
      document.documentElement.style.position = 'relative';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
    }

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function revealHeader() {
      setTimeout(() => {
        document.getElementById('siteHeader')?.classList.add('revealed');
      }, 150);
    }

    function revealHeroGated() {
      const gatedItems = document.querySelectorAll('[data-hero-gate][data-reveal]');
      gatedItems.forEach(el => {
        const elH = el as HTMLElement;
        const delay = parseInt(elH.dataset.delay || '0', 10);
        const translate = elH.dataset.translate || '16';
        elH.style.transform = 'translateY(' + translate + 'px)';
        setTimeout(() => {
          elH.classList.add('revealed');
          elH.style.transform = '';
        }, delay);
      });

      const heroLines = document.querySelectorAll('[data-hero-gate][data-line-reveal]');
      heroLines.forEach(el => {
        const elH = el as HTMLElement;
        const delay = parseInt(elH.dataset.delay || '0', 10);
        const stagger = parseInt(elH.dataset.stagger || '0', 10);
        const lines = elH.querySelectorAll('.line-inner') as NodeListOf<HTMLElement>;
        setTimeout(() => {
          elH.classList.add('revealed');
          lines.forEach((line, i) => {
            line.style.transitionDelay = (i * stagger) + 'ms';
          });
        }, delay);
      });

      setTimeout(() => {
        document.getElementById('heroCard')?.classList.add('revealed');
      }, 400);

      setTimeout(() => {
        document.getElementById('heroWatermark')?.classList.add('revealed');
      }, 300);
    }

    let loaderStart: number | null = null;
    let loaderRafId: number;
    function loaderTick(timestamp: number) {
      if (!loaderStart) loaderStart = timestamp;
      const elapsed = timestamp - loaderStart;
      const t = Math.min(elapsed / FILL_MS, 1);
      const progress = Math.round(easeInOutCubic(t) * 100);
      if (loaderFill) loaderFill.style.width = progress + '%';
      if (loaderCounter) loaderCounter.textContent = String(progress).padStart(3, '0');

      if (t < 1) {
        loaderRafId = requestAnimationFrame(loaderTick);
      } else {
        const center = loader?.querySelector('.loader-center') as HTMLElement | null;
        if (center) {
          center.style.opacity = '0';
          center.style.transform = 'translateY(-12px)';
        }
        if (loader) {
          loader.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1)';
          loader.style.transform = 'translateY(-100%)';
        }

        setTimeout(() => {
          loader?.remove();
          document.documentElement.style.removeProperty('position');
          document.documentElement.style.removeProperty('overflow');
          document.documentElement.style.removeProperty('height');
          revealHeroGated();
          revealHeader();
        }, 700);
      }
    }
    if (loader) {
      loaderRafId = requestAnimationFrame(loaderTick);
      cleanupFns.push(() => cancelAnimationFrame(loaderRafId));
    } else {
      document.documentElement.style.removeProperty('position');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('height');
      revealHeroGated();
      revealHeader();
    }

    // Safety fallback timer to unlock document overflow no matter what
    const fallbackTimer = setTimeout(() => {
      document.documentElement.style.removeProperty('position');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('height');
      revealHeroGated();
      revealHeader();
    }, 1500);
    cleanupFns.push(() => clearTimeout(fallbackTimer));

    // ===== SISANYA - JALAN DI BELAKANG LAYAR, TIDAK MENGHAMBAT LOADER =====
    (async () => {
      const { default: Lenis } = await import('lenis');

      window.scrollTo(0, 0);
      const lenis = new Lenis({ smoothWheel: true });
      function raf(t: number) { lenis.raf(t); rafId = requestAnimationFrame(raf); }
      rafId = requestAnimationFrame(raf);

      function stopScroll() {
        lenis.stop();
        document.documentElement.style.position = 'relative';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
      }
      function startScroll() {
        lenis.start();
        document.documentElement.style.removeProperty('position');
        document.documentElement.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('height');
      }

      function smoothScrollTo(id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        setTimeout(() => {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' });
        }, 50);
      }

      // ===== ADAPTIVE GRID =====
      function applyAdaptiveGrid() {
        const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
        const w = window.innerWidth;
        const widthReduction = ((baseWidth - w) / baseWidth) * 100;
        const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
        if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
        else document.documentElement.style.removeProperty('font-size');
      }
      applyAdaptiveGrid();
      window.addEventListener('resize', applyAdaptiveGrid);
      cleanupFns.push(() => window.removeEventListener('resize', applyAdaptiveGrid));

      // ===== CLOCK =====
      const clockTimeEl = document.getElementById('clockTime');
      const clockDateEl = document.getElementById('clockDate');
      const navTimeEl = document.getElementById('navTime');
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      function updateClock() {
        const now = new Date();
        const h = now.getHours() % 12 || 12;
        const m = String(now.getMinutes()).padStart(2, '0');
        const mer = now.getHours() >= 12 ? 'pm' : 'am';
        const timeStr = h + ':' + m + mer;
        const dateStr = now.getDate() + ' ' + months[now.getMonth()] + ', ' + now.getFullYear();
        if (clockTimeEl) clockTimeEl.textContent = timeStr;
        if (clockDateEl) clockDateEl.textContent = dateStr;
        if (navTimeEl) navTimeEl.textContent = timeStr;
      }
      updateClock();
      const clockInterval = setInterval(updateClock, 1000);
      cleanupFns.push(() => clearInterval(clockInterval));

      // ===== HERO CARD CAROUSEL =====
      const cardItems = [
        { caption: 'Conversion design', title: 'Crafted to convert.' },
        { caption: 'Engineering', title: 'Built to scale.' },
        { caption: 'Brand systems', title: 'Designed to last.' }
      ];
      let cardIndex = 0;
      const heroCardCaption = document.getElementById('heroCardCaption');
      const heroCardTitle = document.getElementById('heroCardTitle');
      const heroCardDots = document.getElementById('heroCardDots');
      const heroCardRow = document.getElementById('heroCardRow');
      const heroCard = document.getElementById('heroCard');

      function renderDots() {
        if (!heroCardDots) return;
        heroCardDots.innerHTML = '';
        cardItems.forEach((_, i) => {
          const d = document.createElement('span');
          d.className = 'hero-card-dot ' + (i === cardIndex ? 'hero-card-dot--active' : 'hero-card-dot--inactive');
          heroCardDots.appendChild(d);
        });
      }
      renderDots();

      function setCardItem(newIndex: number, direction: number) {
        const content = document.getElementById('heroCardContent');
        if (!content) return;
        content.style.transition = 'opacity .25s, transform .25s';
        content.style.opacity = '0';
        content.style.transform = 'translateY(' + (direction > 0 ? '-14px' : '14px') + ')';

        setTimeout(() => {
          cardIndex = ((newIndex % cardItems.length) + cardItems.length) % cardItems.length;
          if (heroCardCaption) heroCardCaption.textContent = cardItems[cardIndex].caption;
          if (heroCardTitle) heroCardTitle.textContent = cardItems[cardIndex].title;
          renderDots();
          content.style.transform = 'translateY(' + (direction > 0 ? '14px' : '-14px') + ')';
          requestAnimationFrame(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
          });
        }, 250);
      }

      const nextBtn = heroCard?.querySelector('.next-btn');
      const prevBtn = heroCard?.querySelector('.prev-btn');
      const handleNext = (e: Event) => { e.stopPropagation(); setCardItem(cardIndex + 1, 1); };
      const handlePrev = (e: Event) => { e.stopPropagation(); setCardItem(cardIndex - 1, -1); };
      nextBtn?.addEventListener('click', handleNext);
      prevBtn?.addEventListener('click', handlePrev);
      const handleRowClick = () => setCardItem(cardIndex + 1, 1);
      heroCardRow?.addEventListener('click', handleRowClick);
      cleanupFns.push(() => {
        nextBtn?.removeEventListener('click', handleNext);
        prevBtn?.removeEventListener('click', handlePrev);
        heroCardRow?.removeEventListener('click', handleRowClick);
      });

      // ===== INTERSECTION OBSERVER REVEALS (non hero-gated) =====
      function setupReveals() {
        const revealItems = document.querySelectorAll('[data-reveal]:not([data-hero-gate])');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = parseInt(el.dataset.delay || '0', 10);
              const translate = el.dataset.translate || '16';
              el.style.transform = 'translateY(' + translate + 'px)';
              setTimeout(() => {
                el.classList.add('revealed');
                el.style.transform = '';
              }, delay);
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        revealItems.forEach(el => observer.observe(el));

        const lineReveals = document.querySelectorAll('[data-line-reveal]:not([data-hero-gate])');
        const lineObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = parseInt(el.dataset.delay || '0', 10);
              const stagger = parseInt(el.dataset.stagger || '0', 10);
              const lines = el.querySelectorAll('.line-inner') as NodeListOf<HTMLElement>;
              setTimeout(() => {
                el.classList.add('revealed');
                lines.forEach((line, i) => {
                  line.style.transitionDelay = (i * stagger) + 'ms';
                });
              }, delay);
              lineObserver.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        lineReveals.forEach(el => lineObserver.observe(el));

        const wordReveals = document.querySelectorAll('[data-word-reveal]');
        wordReveals.forEach(el => {
          const html = el.innerHTML;
          const parts: string[] = [];
          const temp = document.createElement('div');
          temp.innerHTML = html;
          function processNode(node: ChildNode) {
            if (node.nodeType === 3) {
              const words = (node.textContent || '').split(/(\s+)/);
              words.forEach(w => {
                if (w.trim()) {
                  parts.push('<span class="word">' + w + '</span>');
                } else {
                  parts.push(w);
                }
              });
            } else if (node.nodeType === 1) {
              const elNode = node as HTMLElement;
              const tag = elNode.tagName.toLowerCase();
              const cls = elNode.className ? ' class="' + elNode.className + '"' : '';
              parts.push('<' + tag + cls + '>');
              elNode.childNodes.forEach(processNode);
              parts.push('</' + tag + '>');
            }
          }
          temp.childNodes.forEach(processNode);
          el.innerHTML = parts.join('');

          const wordObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                el.classList.add('revealed');
                const words = el.querySelectorAll('.word') as NodeListOf<HTMLElement>;
                words.forEach((w, i) => {
                  w.style.transitionDelay = (i * 35) + 'ms';
                });
                wordObserver.unobserve(el);
              }
            });
          }, { threshold: 0.1 });
          wordObserver.observe(el);
        });
      }
      setupReveals();

      // ===== STATS COUNT-UP =====
      const statNumbers = document.querySelectorAll('[data-count]');
      let lastStatUpdate = 0;

      function updateStats() {
        const now = Date.now();
        if (now - lastStatUpdate < 30) return;
        lastStatUpdate = now;

        statNumbers.forEach(el => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const elCenter = rect.top + rect.height / 2;

          const start = vh;
          const end = vh / 2;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height / 2)));

          const target = parseInt((el as HTMLElement).dataset.count || '0', 10);
          const current = Math.round(progress * target);
          const valueEl = el.querySelector('.stat-value');
          if (valueEl) valueEl.textContent = String(current);
        });
      }

      window.addEventListener('scroll', updateStats, { passive: true });
      lenis.on('scroll', updateStats);
      cleanupFns.push(() => window.removeEventListener('scroll', updateStats));

      // ===== LIQUID REVEAL =====
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        const container = document.getElementById('liquidReveal');
        const canvas = document.getElementById('heroCanvas') as HTMLCanvasElement | null;
        if (container && canvas) {
          const ctx = canvas.getContext('2d')!;
          const afterImg = new Image();
          afterImg.crossOrigin = 'anonymous';
          afterImg.src = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/before.jpg';

          const brushRadius = 143;
          const decay = 0.016;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);

          let cw = 0, ch = 0, radius = 0, diameter = 0;
          let coverCanvas: HTMLCanvasElement, coverCtx: CanvasRenderingContext2D;
          let brushCanvas: HTMLCanvasElement, brushCtx: CanvasRenderingContext2D;
          let points: { x: number; y: number }[] = [];
          let lastPt: { x: number; y: number } | null = null;
          let idle = 0;
          let afterLoaded = false;

          afterImg.onload = () => {
            afterLoaded = true;
            sizeCanvas();
          };

          function coverFit(img: HTMLImageElement, w: number, h: number) {
            const ir = img.naturalWidth / img.naturalHeight;
            const cr = w / h;
            let sw, sh, sx, sy;
            if (cr > ir) {
              sw = img.naturalWidth; sh = sw / cr;
              sx = 0; sy = (img.naturalHeight - sh) / 2;
            } else {
              sh = img.naturalHeight; sw = sh * cr;
              sy = 0; sx = (img.naturalWidth - sw) / 2;
            }
            return { sx, sy, sw, sh };
          }

          function sizeCanvas() {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            cw = Math.round(rect.width * dpr);
            ch = Math.round(rect.height * dpr);
            canvas!.width = cw;
            canvas!.height = ch;
            canvas!.style.width = rect.width + 'px';
            canvas!.style.height = rect.height + 'px';

            radius = brushRadius * dpr;
            diameter = Math.ceil(radius * 2);

            coverCanvas = document.createElement('canvas');
            coverCanvas.width = cw;
            coverCanvas.height = ch;
            coverCtx = coverCanvas.getContext('2d')!;
            if (afterLoaded) {
              const f = coverFit(afterImg, cw, ch);
              coverCtx.drawImage(afterImg, f.sx, f.sy, f.sw, f.sh, 0, 0, cw, ch);
            }

            brushCanvas = document.createElement('canvas');
            brushCanvas.width = diameter;
            brushCanvas.height = diameter;
            brushCtx = brushCanvas.getContext('2d')!;

            ctx.clearRect(0, 0, cw, ch);
          }

          const ro = new ResizeObserver(() => { if (afterLoaded) sizeCanvas(); });
          ro.observe(container);
          cleanupFns.push(() => ro.disconnect());

          const handlePointerMove = (e: PointerEvent) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) * dpr;
            const y = (e.clientY - rect.top) * dpr;

            if (x < -radius || y < -radius || x > cw + radius || y > ch + radius) {
              lastPt = null;
              return;
            }

            if (!lastPt) {
              lastPt = { x, y };
              points.push({ x, y });
              return;
            }

            const dx = x - lastPt.x;
            const dy = y - lastPt.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const step = Math.max(radius * 0.3, 1);
            const n = Math.min(Math.ceil(dist / step), 60);

            for (let i = 1; i <= n; i++) {
              const t = i / n;
              points.push({ x: lastPt.x + dx * t, y: lastPt.y + dy * t });
            }
            lastPt = { x, y };
          };
          window.addEventListener('pointermove', handlePointerMove);
          cleanupFns.push(() => window.removeEventListener('pointermove', handlePointerMove));

          function stamp(x: number, y: number) {
            const c = radius;
            brushCtx.clearRect(0, 0, diameter, diameter);
            brushCtx.globalCompositeOperation = 'source-over';
            const grad = brushCtx.createRadialGradient(c, c, 0, c, c, c);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.55, 'rgba(255,255,255,0.82)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            brushCtx.fillStyle = grad;
            brushCtx.fillRect(0, 0, diameter, diameter);
            brushCtx.globalCompositeOperation = 'source-in';
            brushCtx.drawImage(coverCanvas, x - c, y - c, diameter, diameter, 0, 0, diameter, diameter);
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(brushCanvas, x - c, y - c);
          }

          let liquidRafId: number;
          function tick() {
            if (!cw) { liquidRafId = requestAnimationFrame(tick); return; }

            const drawing = points.length > 0;
            if (drawing) {
              idle = 0;
            } else {
              idle++;
            }

            const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,' + fade + ')';
            ctx.fillRect(0, 0, cw, ch);

            if (drawing) {
              for (const p of points) stamp(p.x, p.y);
              points = [];
            }

            if (idle >= 120) {
              ctx.clearRect(0, 0, cw, ch);
            }

            liquidRafId = requestAnimationFrame(tick);
          }
          liquidRafId = requestAnimationFrame(tick);
          cleanupFns.push(() => cancelAnimationFrame(liquidRafId));
        }
      }

      // ===== NAV MENU =====
      const navMenu = document.getElementById('navMenu');
      const navList = document.getElementById('navList');

      function openNav() {
        navMenu?.classList.add('open');
        stopScroll();
        const items = navList?.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
        items?.forEach((item, i) => {
          item.style.transitionDelay = (i * 45 + 80) + 'ms';
        });
        document.addEventListener('keydown', navEscHandler);
      }

      function closeNav(cb?: () => void) {
        const items = navList?.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
        items?.forEach(item => {
          item.style.transitionDelay = '0ms';
        });
        navMenu?.classList.remove('open');
        startScroll();
        document.removeEventListener('keydown', navEscHandler);
        if (cb) setTimeout(cb, 400);
      }

      function navEscHandler(e: KeyboardEvent) { if (e.key === 'Escape') closeNav(); }

      const menuBtn = document.getElementById('menuBtn');
      const navClose = document.getElementById('navClose');
      menuBtn?.addEventListener('click', openNav);
      navClose?.addEventListener('click', () => closeNav());

      navList?.querySelectorAll('.nav-item[data-scroll]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = (btn as HTMLElement).dataset.scroll;
          closeNav(() => id && smoothScrollTo(id));
        });
      });

      navList?.querySelector('.contact-trigger')?.addEventListener('click', () => {
        closeNav(() => openModal());
      });

      document.getElementById('navStartProject')?.addEventListener('click', () => {
        closeNav(() => openModal());
      });

      // ===== REQUEST MODAL =====
      const modalBackdrop = document.getElementById('modalBackdrop');
      const modalPanel = document.getElementById('modalPanel');
      const modalFormState = document.getElementById('modalFormState');
      const modalSuccessState = document.getElementById('modalSuccessState');
      const requestForm = document.getElementById('requestForm') as HTMLFormElement | null;
      const submitLabel = document.getElementById('submitLabel');

      function openModal() {
        modalBackdrop?.classList.add('open');
        stopScroll();
        document.addEventListener('keydown', modalEscHandler);
      }

      function closeModal() {
        modalBackdrop?.classList.remove('open');
        startScroll();
        document.removeEventListener('keydown', modalEscHandler);
        setTimeout(() => {
          if (modalFormState) modalFormState.style.display = '';
          if (modalSuccessState) modalSuccessState.style.display = 'none';
          requestForm?.reset();
          if (submitLabel) submitLabel.textContent = 'Send request';
        }, 300);
      }

      function modalEscHandler(e: KeyboardEvent) { if (e.key === 'Escape') closeModal(); }

      modalBackdrop?.addEventListener('click', e => {
        if (e.target === modalBackdrop) closeModal();
      });
      modalPanel?.addEventListener('click', e => e.stopPropagation());
      document.getElementById('modalClose')?.addEventListener('click', closeModal);
      document.getElementById('modalSuccessClose')?.addEventListener('click', closeModal);

      requestForm?.addEventListener('submit', e => {
        e.preventDefault();
        if (submitLabel) submitLabel.textContent = 'Sending…';
        setTimeout(() => {
          if (modalFormState) modalFormState.style.display = 'none';
          if (modalSuccessState) modalSuccessState.style.display = '';
        }, 600);
      });

      document.querySelectorAll('.contact-trigger').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          if (btn.closest('.nav-menu') || btn.closest('#navStartProject')) return;
          openModal();
        });
      });

      document.querySelectorAll('.header-nav [data-scroll]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = (btn as HTMLElement).dataset.scroll;
          if (id) smoothScrollTo(id);
        });
      });

      document.getElementById('brandBtn')?.addEventListener('click', () => smoothScrollTo('home'));
      document.getElementById('viewWorkBtn')?.addEventListener('click', () => smoothScrollTo('works'));

      // ===== ACCORDION DROPDOWN FASILITAS KEBUDAYAAN =====
      const facilityItems = document.querySelectorAll('.facility-item-btn');
      facilityItems.forEach(btn => {
        const el = btn as HTMLElement & { _hasFacilityListener?: boolean };
        if (el._hasFacilityListener) return;
        el._hasFacilityListener = true;

        el.addEventListener('click', (e: MouseEvent) => {
          // Prevent closing if click is inside open text content
          if ((e.target as HTMLElement).closest('.facility-dropdown-content')) {
            return;
          }

          e.preventDefault();
          const dropdown = el.querySelector('.facility-dropdown-content');
          const badge = el.querySelector('.service-badge');
          const descPreview = el.querySelector('.service-desc');
          const isHidden = dropdown?.classList.contains('hidden');

          // Close all dropdowns
          facilityItems.forEach(other => {
            other.querySelector('.facility-dropdown-content')?.classList.add('hidden');
            other.querySelector('.service-badge')?.classList.remove('rotate-90');
            other.querySelector('.service-desc')?.classList.remove('opacity-0', 'pointer-events-none');
            other.classList.remove('is-active', 'bg-slate-50/80', 'shadow-sm');
          });

          // Toggle current
          if (isHidden && dropdown) {
            dropdown.classList.remove('hidden');
            badge?.classList.add('rotate-90');
            descPreview?.classList.add('opacity-0', 'pointer-events-none');
            el.classList.add('is-active');
          }
        });
      });
    })();

    return () => {
      cleanupFns.forEach(fn => fn());
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Head title="Lumora — Independent Design & Engineering Studio">
        <meta
          name="description"
          content="Lumora is an independent studio crafting brands, products, and the systems that connect them — bold ideas, shipped with quiet precision."
        />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}

const BODY_HTML = `
  <a href="#main" class="skip-link">Skip to content</a>

  <!-- PAGE LOADER -->
  <div class="page-loader" id="pageLoader">
    <div class="loader-center">
      <div class="loader-brand">
        <svg viewBox="0 0 48 48" fill="currentColor">
          <path
            d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
        </svg>
        Lumora
      </div>
      <p class="loader-tagline">Bold ideas, shipped with quiet precision.</p>
    </div>
    <div class="loader-progress">
      <div class="loader-track">
        <div class="loader-fill" id="loaderFill"></div>
      </div>
      <div class="loader-meta">
        <span>Loading</span>
        <span class="loader-counter" id="loaderCounter">000</span>
      </div>
    </div>
  </div>

  <!-- HEADER -->
  <header class="site-header" id="siteHeader">
    <div class="header-inner shell">
      <div class="header-brand flex items-center gap-2 sm:gap-3">
        <a href="/" class="flex items-center gap-2 sm:gap-3">
          <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" class="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
          <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" class="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
          <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" class="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden sm:block drop-shadow-sm" />
          <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" class="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
          <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" class="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
        </a>
      </div>

      <nav class="header-nav" aria-label="Primary">
        <ul>
          <li><button data-scroll="home" aria-current="page">Home</button></li>
          <li><button data-scroll="services">Fasilitas <span class="caret">▾</span></button></li>
          <li><a href="/berita" class="nav-link">Berita</a></li>
          <li><a href="/artikel" class="nav-link">Artikel</a></li>
          <li><button class="contact-trigger">Contact</button></li>
        </ul>
      </nav>

      <div class="header-right">
        <div class="clock-chip">
          <span class="clock-label">Local time</span>
          <span class="clock-time" id="clockTime">9:41am</span>
          <span class="clock-sep">•</span>
          <span class="clock-date" id="clockDate">12 March, 2025</span>
        </div>
        <button class="menu-btn" id="menuBtn" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <span class="menu-btn-label">Menu</span>
        </button>
      </div>
    </div>
  </header>

  <!-- MAIN -->
  <main id="main">

    <!-- HERO -->
    <section class="hero" id="home">
      <div class="hero-vignette"></div>

      <div class="hero-content shell">
        <div class="hero-left">
          <div class="reveal-item eyebrow eyebrow--dark" data-reveal data-delay="200" data-hero-gate>
            <span class="eyebrow-dot"></span>
            Independent Studio
          </div>

          <h1 class="hero-h1 line-reveal" data-line-reveal data-delay="250" data-stagger="120" data-hero-gate>
            <span class="line-wrap"><span class="line-inner">Unit</span></span>
            <span class="line-wrap"><span class="line-inner">Pelaksana</span></span>
            <span class="line-wrap"><span class="line-inner">Teknis Daerah</span></span>
            <span class="line-wrap"><span class="line-inner">Kota Bandung</span></span>
          </h1>

          <div class="hero-ctas reveal-item" data-reveal data-delay="750" data-hero-gate>
            <button class="pill-btn pill-btn--dark pill-btn--with-arrow contact-trigger">
              <span class="pill-btn-inner">
                Let's Talk
                <span class="pill-btn-badge"><svg class="arrow-right-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg></span>
              </span>
            </button>
            <button class="pill-btn pill-btn--outline pill-btn--with-arrow" id="viewWorkBtn">
              <span class="pill-btn-inner">
                View Work
                <span class="pill-btn-badge"><svg class="arrow-right-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg></span>
              </span>
            </button>
          </div>
        </div>

        <div class="hero-right">
          <div class="hero-card" id="heroCard" data-hero-gate>
            <div class="hero-card-row" id="heroCardRow">
              <div class="hero-card-tile">
                <svg viewBox="0 0 48 48" fill="currentColor">
                  <path
                    d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                </svg>
              </div>
              <div class="hero-card-panel">
                <div class="hero-card-content" id="heroCardContent">
                  <div class="hero-card-caption" id="heroCardCaption">Conversion design</div>
                  <div class="hero-card-title" id="heroCardTitle">Crafted to convert.</div>
                </div>
                <div class="hero-card-bottom">
                  <div class="hero-card-dots" id="heroCardDots"></div>
                  <div class="hero-card-nav">
                    <button class="prev-btn" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg></button>
                    <button class="next-btn" aria-label="Next"><svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg></button>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>

    </section>

    <!-- ABOUT -->
    <section class="about" id="about">
      <div class="about-inner shell">
        <div class="about-left">
          <div class="about-globe-bg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="12" cy="12" r="9.25" />
              <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25z" />
              <path d="M2.75 12h18.5" />
            </svg>
          </div>
          <div class="eyebrow eyebrow--dark about-eyebrow reveal-item" data-reveal>
            <span class="eyebrow-dot"></span>
            The Studio
          </div>
          <div class="about-distributed reveal-item" data-reveal data-translate="12">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="12" cy="12" r="9.25" />
              <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25z" />
              <path d="M2.75 12h18.5" />
            </svg>
            <span>A distributed team building across every time zone.</span>
          </div>
        </div>
        <div class="about-right">
          <h2 class="about-h2 word-reveal" data-word-reveal>We partner with ambitious teams to ship <span
              class="muted">digital products, brand systems, and the strategy that holds them together.</span></h2>
          <div class="about-footer reveal-item" data-reveal data-delay="200">
            <div>
              <div class="about-social-label">Find us online</div>
              <div class="about-social-row">
                <a href="#" class="social-chip social-chip--accent" aria-label="X / Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M4 4l16 16" />
                    <path d="M20 4L4 20" />
                  </svg>
                </a>
                <a href="#" class="social-chip social-chip--muted" aria-label="Behance">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" class="social-chip social-chip--muted" aria-label="Dribbble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
            <a href="#about" class="pill-btn pill-btn--outline pill-btn--with-arrow">
              <span class="pill-btn-inner">
                About Us
                <span class="pill-btn-badge"><svg class="arrow-right-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>


    <!-- PORTFOLIO -->
    <section class="portfolio" id="works">
      <div class="portfolio-inner shell">
        <div class="portfolio-header">
          <span class="eyebrow eyebrow--dark portfolio-eyebrow reveal-item" data-reveal>
            <span class="eyebrow-dot"></span>
            Portfolio
          </span>
          <h2 class="portfolio-h2 line-reveal" data-line-reveal data-delay="120">
            <span class="line-wrap"><span class="line-inner">Fasilitas</span></span>
          </h2>
        </div>
        <ul class="portfolio-grid">
          <li class="reveal-item" data-reveal data-delay="0" data-translate="48">
            <a href="/fasilitas/bandung-creative-hub">
              <article class="portfolio-card">
                <div class="portfolio-meta">
                  <span>Branding — 2025</span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-watermark">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path
                      d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                  </svg>
                </div>
                <div class="portfolio-bottom">
                  <h3>Bandung Creative HUB</h3>
                  <p>A complete identity and go-to-market system for a fast-moving research startup.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Branding</span>
                    <span class="tag-chip">Strategy</span>
                    <span class="tag-chip">Design</span>
                  </div>
                </div>
              </article>
            </a>
          </li>
          <li class="reveal-item" data-reveal data-delay="90" data-translate="48">
            <a href="/fasilitas/padepokan-seni-mayang-sunda">
              <article class="portfolio-card">
                <div class="portfolio-meta">
                  <span>Product — 2024</span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-watermark">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path
                      d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                  </svg>
                </div>
                <div class="portfolio-bottom">
                  <h3> Padekopakan Seni Mayang Sunda </h3>
                  <p>A finance platform reimagined — clear data, calm interfaces, and effortless flows.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Product Design</span>
                    <span class="tag-chip">Web App</span>
                    <span class="tag-chip">QA</span>
                  </div>
                </div>
              </article>
            </a>
          </li>
          <li class="reveal-item" data-reveal data-delay="180" data-translate="48">
            <a href="/fasilitas/teras-sunda-cibiru">
              <article class="portfolio-card">
                <div class="portfolio-meta">
                  <span>Identity — 2023</span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-watermark">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path
                      d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                  </svg>
                </div>
                <div class="portfolio-bottom">
                  <h3>Teras Sunda Cibiru </h3>
                  <p>A bold visual identity and art direction system built to scale across every surface.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Brand Identity</span>
                    <span class="tag-chip">Art Direction</span>
                  </div>
                </div>
              </article>
            </a>
          </li>
          <li class="reveal-item" data-reveal data-delay="270" data-translate="48">
            <a href="/fasilitas/kampung-wisata-pasir-kunci">
              <article class="portfolio-card">
                <div class="portfolio-meta">
                  <span>Mobile — 2023</span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-watermark">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path
                      d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                  </svg>
                </div>
                <div class="portfolio-bottom">
                  <h3>Kampung Wisata Pasir Kunci</h3>
                  <p>A wellness app grounded in research, shipped end to end from concept to release.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Mobile App</span>
                    <span class="tag-chip">UX Research</span>
                    <span class="tag-chip">Development</span>
                  </div>
                </div>
              </article>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- SERVICES / FASILITAS KEBUDAYAAN -->
    <section class="services" id="services">
      <div class="services-inner shell">
        <div class="eyebrow eyebrow--dark reveal-item" data-reveal>
          <span class="eyebrow-dot"></span>
          Fasilitas Kebudayaan
        </div>
        <h2 class="services-h2 line-reveal" data-line-reveal data-delay="120">
          <span class="line-wrap"><span class="line-inner">Fasilitas Utama Kebudayaan</span></span>
        </h2>
        <ul class="space-y-4">

          <!-- ITEM 01 — BANDUNG CREATIVE HUB -->
          <li class="service-row reveal-item" data-reveal data-delay="0" data-translate="24">
            <div class="service-link facility-item-btn cursor-pointer flex-col items-stretch transition-all duration-500 rounded-2xl p-6" data-facility="1">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-4">
                  <span class="service-index">01</span>
                  <h3 class="service-title">Bandung Creative Hub</h3>
                </div>
                <div class="flex items-center gap-6">
                  <p class="service-desc transition-all duration-300 text-sm text-gray-500 max-w-xs hidden lg:block">
                    Pusat inkubasi kreatif, studio rekaman audio, laboratorium desain 3D, & pameran seni digital.
                  </p>
                  <span class="service-badge transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- DROPDOWN CONTENT: SEAMLESS / MERGED DIRECTLY IN ITEM CARD -->
              <div class="facility-dropdown-content hidden mt-6 pt-6 border-t border-gray-200/80 animate-slide-down-text">
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Selamat datang di <strong>Bandung Creative Hub (BCH)</strong>, pusat fasilitas kebudayaan dan ekosistem inkubasi kreatif di Jalan Laswi No. 7. BCH dilengkapi dengan Studio Rekaman Audio profesional 'Summen Stag', laboratorium cetak 3D, studio podcast kedap suara, bioskop privat untuk pemutaran film independen, serta galeri pameran seni visual kontemporer yang dapat diakses secara gratis oleh warga binaan UPTD Kebudayaan dan masyarakat umum.
                </p>
              </div>
            </div>
          </li>

          <!-- ITEM 02 — PADEPOKAN SENI MAYANG SUNDA -->
          <li class="service-row reveal-item" data-reveal data-delay="80" data-translate="24">
            <div class="service-link facility-item-btn cursor-pointer flex-col items-stretch transition-all duration-500 rounded-2xl p-6" data-facility="2">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-4">
                  <span class="service-index">02</span>
                  <h3 class="service-title">Padepokan Seni Mayang Sunda</h3>
                </div>
                <div class="flex items-center gap-6">
                  <p class="service-desc transition-all duration-300 text-sm text-gray-500 max-w-xs hidden lg:block">
                    Ruang ekspresi seni pertunjukan tradisional, sanggar tari Sunda, & teater terbuka.
                  </p>
                  <span class="service-badge transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- DROPDOWN CONTENT: SEAMLESS / MERGED DIRECTLY IN ITEM CARD -->
              <div class="facility-dropdown-content hidden mt-6 pt-6 border-t border-gray-200/80 animate-slide-down-text">
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Selamat datang di <strong>Padepokan Seni Mayang Sunda (PSMS)</strong> di Jalan Peta No. 209. PSMS menjadi ruang ekspresi bagi puluhan sanggar seni tari, teater daerah, seni karawitan, dan pergelaran wayang golek. PSMS dilengkapi dengan panggung teater indoor berkapasitas besar, arena amphitheater terbuka untuk pentas malam, serta studio latihan karawitan & gamelan lengkap.
                </p>
              </div>
            </div>
          </li>

          <!-- ITEM 03 — TERAS SUNDA CIBIRU -->
          <li class="service-row reveal-item" data-reveal data-delay="160" data-translate="24">
            <div class="service-link facility-item-btn cursor-pointer flex-col items-stretch transition-all duration-500 rounded-2xl p-6" data-facility="3">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-4">
                  <span class="service-index">03</span>
                  <h3 class="service-title">Teras Sunda Cibiru</h3>
                </div>
                <div class="flex items-center gap-6">
                  <p class="service-desc transition-all duration-300 text-sm text-gray-500 max-w-xs hidden lg:block">
                    Pusat pelestarian musik tradisional, kerajinan bambu, & laboratorium seni Sunda.
                  </p>
                  <span class="service-badge transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- DROPDOWN CONTENT: SEAMLESS / MERGED DIRECTLY IN ITEM CARD -->
              <div class="facility-dropdown-content hidden mt-6 pt-6 border-t border-gray-200/80 animate-slide-down-text">
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Selamat datang di <strong>Teras Sunda Cibiru (TSC)</strong> di kawasan Cipadung Cibiru. TSC berfokus pada riset, pelestarian, dan pengembangan instrumen musik tradisional Sunda berbasis bambu seperti angklung, calung, arumba, dan suling. Pengunjung dan peneliti budaya dapat mengeksplorasi studio kriya bambu lokal serta menikmati pertunjukan musik alam terbuka di bawah lanskap lereng pegunungan.
                </p>
              </div>
            </div>
          </li>

          <!-- ITEM 04 — KAMPUNG WISATA PASIR KUNCI -->
          <li class="service-row reveal-item" data-reveal data-delay="240" data-translate="24">
            <div class="service-link facility-item-btn cursor-pointer flex-col items-stretch transition-all duration-500 rounded-2xl p-6" data-facility="4">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-4">
                  <span class="service-index">04</span>
                  <h3 class="service-title">Kampung Wisata Pasir Kunci</h3>
                </div>
                <div class="flex items-center gap-6">
                  <p class="service-desc transition-all duration-300 text-sm text-gray-500 max-w-xs hidden lg:block">
                    Kawasan seni budaya lereng Gunung Manglayang, permainan tradisional anak, & wisata edukasi.
                  </p>
                  <span class="service-badge transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- DROPDOWN CONTENT: SEAMLESS / MERGED DIRECTLY IN ITEM CARD -->
              <div class="facility-dropdown-content hidden mt-6 pt-6 border-t border-gray-200/80 animate-slide-down-text">
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Selamat datang di <strong>Kampung Wisata Pasir Kunci</strong> di ketinggian lereng Gunung Manglayang, Ujungberung. Kawasan ini berdedikasi memelihara kelestarian kaulinan lembur (permainan tradisional anak Sunda seperti egrang, gasing, dan bekel), seni pencak silat, dan sanggar tari daerah. Saung edukasi Pasir Kunci menjadi tempat berkumpul anak-anak sekolah dan wisatawan di tengah pemandangan pegunungan yang asri.
                </p>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </section>

    <!-- STATS / LOKASI FASILITAS -->
    <section class="stats-section">
      <div class="stats-wrapper shell">
        <div class="stats-panel reveal-item" data-reveal data-translate="40">
          <div class="eyebrow eyebrow--light">
            <span class="eyebrow-dot"></span>
            Lokasi Fasilitas
          </div>
          <h2 class="stats-h2 line-reveal" data-line-reveal data-delay="120">
            <span class="line-wrap"><span class="line-inner">Peta & Alamat</span></span>
            <span class="line-wrap"><span class="line-inner">4 Fasilitas Kebudayaan</span></span>
          </h2>
          <ul class="stats-grid">
            <!-- 01: BCH -->
            <li class="reveal-item" data-reveal data-delay="0" data-translate="20">
              <div class="flex flex-col gap-2">
                <a href="https://maps.google.com/?q=Bandung+Creative+Hub" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight">Bandung Creative Hub</div>
                <div class="stat-label text-gray-400 text-xs sm:text-sm mt-1">Jl. Laswi No.7, Kacapiring, Batununggal, Kota Bandung</div>
              </div>
            </li>
            <!-- 02: PSMS -->
            <li class="reveal-item" data-reveal data-delay="90" data-translate="20">
              <div class="flex flex-col gap-2">
                <a href="https://maps.google.com/?q=Padepokan+Seni+Mayang+Sunda" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight">Padepokan Seni Mayang Sunda</div>
                <div class="stat-label text-gray-400 text-xs sm:text-sm mt-1">Jl. Peta No.209, Suka Asih, Bojongloa Kaler, Kota Bandung</div>
              </div>
            </li>
            <!-- 03: TSC -->
            <li class="reveal-item" data-reveal data-delay="180" data-translate="20">
              <div class="flex flex-col gap-2">
                <a href="https://maps.google.com/?q=Teras+Sunda+Cibiru" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight">Teras Sunda Cibiru</div>
                <div class="stat-label text-gray-400 text-xs sm:text-sm mt-1">Jl. Raya Cipadung, Cipadung, Kec. Cibiru, Kota Bandung</div>
              </div>
            </li>
            <!-- 04: Pasir Kunci -->
            <li class="reveal-item" data-reveal data-delay="270" data-translate="20">
              <div class="flex flex-col gap-2">
                <a href="https://maps.google.com/?q=Kampung+Wisata+Pasir+Kunci" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-xs uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight">Kampung Wisata Pasir Kunci</div>
                <div class="stat-label text-gray-400 text-xs sm:text-sm mt-1">Pasirjati, Kec. Ujung Berung, Kota Bandung</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-inner shell">
      <div class="footer-cta">
        <h2 class="footer-cta-h2 line-reveal" data-line-reveal data-stagger="100">
          <span class="line-wrap"><span class="line-inner">Have a project</span></span>
          <span class="line-wrap"><span class="line-inner">in mind? Let's</span></span>
          <span class="line-wrap"><span class="line-inner">get to work.</span></span>
        </h2>
        <button class="pill-btn pill-btn--light pill-btn--with-arrow contact-trigger">
          <span class="pill-btn-inner">
            Start a project
            <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg></span>
          </span>
        </button>
      </div>

      <div class="footer-columns">
        <div>
          <div class="footer-col-brand">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path
                d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
            </svg>
            Lumora
          </div>
          <p class="footer-tagline">An independent studio crafting brands, products, and the systems that connect them.
          </p>
        </div>
        <div>
          <div class="footer-col-title">Company</div>
          <div class="footer-links">
            <a href="#about" class="animated-link">About</a>
            <a href="#careers" class="animated-link">Careers</a>
            <a href="#partners" class="animated-link">Partners</a>
            <a href="#contact" class="animated-link contact-trigger">Contact</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Services</div>
          <div class="footer-links">
            <a href="#development" class="animated-link">Development</a>
            <a href="#design" class="animated-link">Design</a>
            <a href="#qa" class="animated-link">Quality Assurance</a>
            <a href="#consulting" class="animated-link">Consulting</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Social</div>
          <div class="footer-links">
            <a href="#" class="animated-link">X / Twitter</a>
            <a href="#" class="animated-link">Behance</a>
            <a href="#" class="animated-link">Dribbble</a>
            <a href="#" class="animated-link">LinkedIn</a>
          </div>
        </div>
      </div>

      <div class="footer-legal">
        <span>© 2025 Lumora Studio. All rights reserved.</span>
        <div class="footer-legal-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </div>
    <div class="footer-watermark">LUMORA</div>
  </footer>

  <!-- NAV MENU -->
  <div class="nav-menu" id="navMenu" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <div class="nav-top shell">
      <div class="nav-brand">
        <svg viewBox="0 0 48 48" fill="currentColor">
          <path
            d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
        </svg>
        Lumora
      </div>
      <button class="nav-close" id="navClose" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M4 4l16 16" />
          <path d="M20 4L4 20" />
        </svg>
        Close
      </button>
    </div>
    <nav class="nav-body shell">
      <ul class="nav-list" id="navList">
        <li><button class="nav-item" data-scroll="home"><span class="nav-item-index">01</span><span
              class="nav-item-label">Home</span></button></li>
        <li><button class="nav-item" data-scroll="services"><span class="nav-item-index">02</span><span
              class="nav-item-label">Fasilitas</span></button></li>
        <li><a class="nav-item" href="/berita"><span class="nav-item-index">03</span><span
              class="nav-item-label">Berita</span></a></li>
        <li><a class="nav-item" href="/artikel"><span class="nav-item-index">04</span><span
              class="nav-item-label">Artikel</span></a></li>
        <li><button class="nav-item contact-trigger"><span class="nav-item-index">05</span><span
              class="nav-item-label">Contact</span></button></li>
      </ul>
    </nav>
    <div class="nav-bottom shell">
      <span>Local time — <span id="navTime">9:41am</span></span>
      <button class="nav-bottom-cta" id="navStartProject">Start a project →</button>
    </div>
  </div>

  <!-- REQUEST MODAL -->
  <div class="modal-backdrop" id="modalBackdrop" role="dialog" aria-modal="true" aria-label="Start a project">
    <div class="modal-panel" id="modalPanel">
      <button class="modal-close" id="modalClose" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M4 4l16 16" />
          <path d="M20 4L4 20" />
        </svg>
      </button>

      <div id="modalFormState">
        <div class="modal-heading">
          <div class="modal-heading-row">
            <span class="modal-heading-dot"></span>
            Start a project
          </div>
          <h2>Tell us what you're building.</h2>
        </div>
        <form class="modal-form" id="requestForm">
          <label class="modal-label">
            Name
            <input type="text" class="modal-input" required placeholder="Your name" />
          </label>
          <label class="modal-label">
            Email
            <input type="email" class="modal-input" required placeholder="you@company.com" />
          </label>
          <label class="modal-label">
            Project
            <textarea class="modal-textarea" rows="4" required
              placeholder="A few words about your project, timeline, and budget."></textarea>
          </label>
          <div class="modal-bottom">
            <span class="modal-note">We reply within one business day.</span>
            <button type="submit" class="pill-btn pill-btn--dark pill-btn--with-arrow" id="submitBtn">
              <span class="pill-btn-inner">
                <span id="submitLabel">Send request</span>
                <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg></span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <div id="modalSuccessState" style="display:none">
        <div class="modal-success">
          <div class="modal-success-icon">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path
                d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
            </svg>
          </div>
          <h2>Request received</h2>
          <p>Thanks for reaching out — we'll get back to you within one business day.</p>
          <button class="pill-btn pill-btn--dark pill-btn--no-arrow" id="modalSuccessClose">
            <span class="pill-btn-inner">Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script type="importmap">
`;