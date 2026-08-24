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
      const heroLines = document.querySelectorAll('[data-hero-gate][data-line-reveal]');
      heroLines.forEach(el => {
        const elH = el as HTMLElement;
        const lines = elH.querySelectorAll('.line-inner') as NodeListOf<HTMLElement>;
        elH.classList.add('revealed');
        lines.forEach((line, i) => {
          line.style.transitionDelay = (i * 400) + 'ms';
        });
      });

      const gatedItems = document.querySelectorAll('[data-hero-gate][data-reveal]');
      gatedItems.forEach(el => {
        const elH = el as HTMLElement;
        setTimeout(() => {
          elH.classList.add('revealed');
        }, 1700);
      });
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
      revealHeader();
    }

    // Safety fallback timer to unlock document overflow no matter what
    const fallbackTimer = setTimeout(() => {
      document.documentElement.style.removeProperty('position');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('height');
      revealHeader();
    }, 1500);
    cleanupFns.push(() => clearTimeout(fallbackTimer));

    // ===== PINNED HERO SCROLL REVEAL =====
    let heroRevealed = false;
    let heroUnlocked = false;
    let lenisInstance: any = null;

    function lockScrollAndRevealHero() {
      if (heroRevealed) return;
      heroRevealed = true;

      // Lock screen in place at top: 0 so navbar and hero are 100% visible without any cut-off
      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
        lenisInstance.stop();
      }
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';

      // Trigger line-by-line reveal
      revealHeroGated();

      // Wait until last sentence/buttons appear (2400ms), then unlock screen to allow downward scroll
      setTimeout(() => {
        heroUnlocked = true;
        if (lenisInstance) lenisInstance.start();
        document.documentElement.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('height');
      }, 2400);
    }

    const onUserScrollAttempt = () => {
      if (!heroUnlocked && !heroRevealed) {
        lockScrollAndRevealHero();
      }
    };

    window.addEventListener('wheel', onUserScrollAttempt, { passive: true });
    window.addEventListener('touchmove', onUserScrollAttempt, { passive: true });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5 && !heroRevealed) {
        lockScrollAndRevealHero();
      }
    }, { passive: true });

    cleanupFns.push(() => {
      window.removeEventListener('wheel', onUserScrollAttempt);
      window.removeEventListener('touchmove', onUserScrollAttempt);
    });

    // ===== SISANYA - JALAN DI BELAKANG LAYAR, TIDAK MENGHAMBAT LOADER =====
    (async () => {
      const { default: Lenis } = await import('lenis');

      window.scrollTo(0, 0);
      const lenis = new Lenis({ smoothWheel: true });
      lenisInstance = lenis;

      lenis.on('scroll', (e: { scroll: number }) => {
        if (e.scroll > 5 && !heroRevealed) {
          lockScrollAndRevealHero();
        }
      });
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
      <Head title="UPTD - CreativeCulture">
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
      <div class="loader-logos flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" class="h-9 sm:h-12 w-auto object-contain" />
        <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" class="h-9 sm:h-12 w-auto object-contain" />
        <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" class="h-9 sm:h-12 w-auto object-contain" />
        <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" class="h-9 sm:h-12 w-auto object-contain" />
        <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" class="h-9 sm:h-12 w-auto object-contain" />
      </div>
      <p class="loader-tagline font-bold uppercase tracking-wider text-xs sm:text-sm text-gray-900 text-center max-w-lg px-4 mt-2">
        UPTD PADEPOKAN SENI, KREATIVITAS DAN KEBUDAYAAN
      </p>
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
      <div class="hero-bg-container">
        <img src="/images/backround3.jpeg" alt="Hero Background" class="hero-bg-img" />
        <div class="hero-vignette"></div>
      </div>

      <div class="hero-content shell">
        <div class="hero-left">
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
                  Selamat datang di <strong>Bandung Creative Hub (BCH)</strong>, pusat fasilitas kebudayaan dan ekosistem inkubasi kreatif kebanggaan Kota Bandung yang berlokasi strategis di Jalan Laswi No. 7. Diresmikan sebagai wadah akselerasi ide dan kolaborasi talenta muda, gedung futuristik 6 lantai ini dirancang khusus untuk memfasilitasi 17 subsektor ekonomi kreatif, mulai dari industri musik, seni rupa & kriya, desain produk & interior, hingga pengembangan perangkat lunak game dan animasi digital.
                </p>
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  BCH menyediakan fasilitas berstandar industri yang dapat dimanfaatkan secara gratis melalui reservasi resmi, antara lain <strong>Studio Rekaman Audio 'Summen Stag'</strong> dengan instrumen akustik profesional, <strong>Laboratorium Cetak 3D & Desain Produk</strong>, <strong>Studio Animasi & Editing Video</strong>, <strong>Studio Podcast Kedap Suara</strong>, <strong>Studio Tari & Olah Tubuh</strong>, <strong>Studio Fashion & Jahit</strong>, <strong>Perpustakaan Kreatif</strong>, <strong>Coworking Space terbuka</strong>, <strong>Auditorium Teater & Bioskop Mini</strong>, serta <strong>Exhibition Area</strong> untuk pameran seni visual kontemporer.
                </p>
                <div class="facility-action-bar" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: flex-end;">
                  <a href="/fasilitas/bandung-creative-hub" class="facility-action-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111; text-decoration: none;">
                    <span>Lihat Profil Lengkap Fasilitas BCH</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px;"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
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
                  Selamat datang di <strong>Padepokan Seni Mayang Sunda (PSMS)</strong> yang berlokasi di Jalan Peta No. 209, Bandung. Sebagai episentrum pelestarian dan pengembangan 10 Obyek Pemajuan Kebudayaan di Kota Bandung, PSMS berdiri kokoh sebagai rumah bersama bagi para maestro, seniman tradisi, budayawan, dan puluhan sanggar seni independen untuk melestarikan khazanah warisan leluhur Pasundan.
                </p>
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  Kompleks padepokan ini dilengkapi dengan <strong>Panggung Teater Indoor (Indoor Stage)</strong> berkapasitas besar dengan akustik dan tata pencahayaan pentas lengkap, <strong>Gedung Outdoor & Amphitheater</strong> terbuka untuk festival malam hari, <strong>Studio Musik Tradisional Karawitan</strong> dengan set gamelan Salendro & Pelog, serta balé latihan tari dan teater yang representatif. PSMS rutin menyelenggarakan pagelaran wayang golek, tari jaipong, tembang cianjuran, festival teater daerah, serta diskusi dan riset kebudayaan Sunda.
                </p>
                <div class="facility-action-bar" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: flex-end;">
                  <a href="/fasilitas/padepokan-seni-mayang-sunda" class="facility-action-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111; text-decoration: none;">
                    <span>Lihat Profil Lengkap Fasilitas Mayang Sunda</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px;"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
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
                  Selamat datang di <strong>Teras Sunda Cibiru (TSC)</strong> yang berlokasi di kawasan hijau Cipadung, Bandung Timur. Didirikan sebagai pusat konservasi dan laboratorium riset seni budaya Sunda, TSC mengemban misi khusus dalam pelestarian instrumen musik tradisional berbahan bambu serta penguatan kriya lokal di tengah masyarakat urban modern.
                </p>
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  Kawasan berarsitektur bambu ramah lingkungan ini terbagi menjadi beberapa balé fungsional: <strong>Palataran (Panggung Terbuka Utama)</strong> untuk konser musik etnik dan pentas budaya alam, <strong>Balé Utama & Balé Riung</strong> untuk temu wicara serta pertemuan komunitas, <strong>Balé Karya</strong> sebagai bengkel kerja pembuatan angklung, calung, arumba, dan kriya anyaman bambu, serta <strong>Balé Motekar & Balé Alit</strong> untuk ruang pameran karya seni. TSC menjadi destinasi edukasi budaya yang memadukan keindahan alam pegunungan dengan keharmonisan alunan musik bambu Sunda.
                </p>
                <div class="facility-action-bar" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: flex-end;">
                  <a href="/fasilitas/teras-sunda-cibiru" class="facility-action-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111; text-decoration: none;">
                    <span>Lihat Profil Lengkap Fasilitas Teras Sunda Cibiru</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px;"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
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
                  Selamat datang di <strong>Kampung Wisata Pasir Kunci (KWPK)</strong> yang bertengger di ketinggian lereng Gunung Manglayang, Pasirjati, Ujungberung. Mengusung konsep pelestarian berbasis kearifan lokal dan ekowisata alam, Pasir Kunci merupakan surga edukasi budaya tradisional bagi anak-anak dan generasi penerus di Kota Bandung.
                </p>
                <p class="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  Pasir Kunci berdedikasi menjaga kelestarian <strong>Kaulinan Lembur</strong> (permainan tradisional anak Sunda seperti egrang, gasing kayu, sondah, engklek, rorodaan, congklak, dan bekel), seni bela diri tradisi <strong>Pencak Silat</strong>, serta sanggar tari Jaipongan. Fasilitas di kawasan ini mencakup <strong>Saung Padepokan Seni</strong>, <strong>Balé Puhun Edukasi</strong>, <strong>Wahana Kaulinan Lapang</strong> yang luas, dan <strong>Kalang Amphitheater Alam</strong> dengan panorama memukau lanskap Kota Bandung dari ketinggian pegunungan.
                </p>
                <div class="facility-action-bar" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: flex-end;">
                  <a href="/fasilitas/kampung-wisata-pasir-kunci" class="facility-action-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111; text-decoration: none;">
                    <span>Lihat Profil Lengkap Fasilitas Pasir Kunci</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px;"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </section>


    <!-- PORTFOLIO -->
    <section class="portfolio" id="works">
      <div class="portfolio-inner shell">
        <div class="portfolio-header">
          <h2 class="portfolio-h2 line-reveal" data-line-reveal data-delay="120">
            <span class="line-wrap"><span class="line-inner">Fasilitas</span></span>
          </h2>
        </div>
        <ul class="portfolio-grid">
          <!-- CARD 01 — BANDUNG CREATIVE HUB -->
          <li class="reveal-item" data-reveal data-delay="0" data-translate="48">
            <a href="/fasilitas/bandung-creative-hub">
              <article class="portfolio-card group relative">
                <!-- Background Image & Dark Overlay -->
                <div class="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                  <img
                    src="/images/backround.jpg"
                    alt="Bandung Creative HUB"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                </div>

                <div class="portfolio-meta relative z-10">
                  <span></span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-bottom relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <h3>Bandung Creative HUB</h3>
                  <p>Pusat inkubasi kreatif, studio rekaman audio, laboratorium desain 3D, & pameran seni digital.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Studio Audio</span>
                    <span class="tag-chip">Desain 3D</span>
                    <span class="tag-chip">Inkubasi</span>
                  </div>
                </div>
              </article>
            </a>
          </li>

          <!-- CARD 02 — PADEPOKAN SENI MAYANG SUNDA -->
          <li class="reveal-item" data-reveal data-delay="90" data-translate="48">
            <a href="/fasilitas/padepokan-seni-mayang-sunda">
              <article class="portfolio-card group relative">
                <!-- Background Image & Dark Overlay -->
                <div class="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                  <img
                    src="/images/backroundMS.jpg"
                    alt="Padepokan Seni Mayang Sunda"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                </div>

                <div class="portfolio-meta relative z-10">
                  <span></span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-bottom relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <h3>Padepokan Seni Mayang Sunda</h3>
                  <p>Ruang ekspresi seni pertunjukan tradisional, sanggar tari Sunda, & teater panggung daerah.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Teater & Tari</span>
                    <span class="tag-chip">Karawitan</span>
                    <span class="tag-chip">Pertunjukan</span>
                  </div>
                </div>
              </article>
            </a>
          </li>

          <!-- CARD 03 — TERAS SUNDA CIBIRU -->
          <li class="reveal-item" data-reveal data-delay="180" data-translate="48">
            <a href="/fasilitas/teras-sunda-cibiru">
              <article class="portfolio-card group relative">
                <!-- Background Image & Dark Overlay -->
                <div class="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                  <img
                    src="/images/backroundTSC.jpg"
                    alt="Teras Sunda Cibiru"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                </div>

                <div class="portfolio-meta relative z-10">
                  <span></span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-bottom relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <h3>Teras Sunda Cibiru</h3>
                  <p>Pusat riset, pelestarian musik tradisional Sunda, & laboratorium kerajinan bambu.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Kriya Bambu</span>
                    <span class="tag-chip">Musik Sunda</span>
                    <span class="tag-chip">Seni Alam</span>
                  </div>
                </div>
              </article>
            </a>
          </li>

          <!-- CARD 04 — KAMPUNG WISATA PASIR KUNCI -->
          <li class="reveal-item" data-reveal data-delay="270" data-translate="48">
            <a href="/fasilitas/kampung-wisata-pasir-kunci">
              <article class="portfolio-card group relative">
                <!-- Background Image & Dark Overlay -->
                <div class="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                  <img
                    src="/images/backroundPSKC.jpg"
                    alt="Kampung Wisata Pasir Kunci"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                </div>

                <div class="portfolio-meta relative z-10">
                  <span></span>
                  <span class="portfolio-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </div>
                <div class="portfolio-bottom relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <h3>Kampung Wisata Pasir Kunci</h3>
                  <p>Kawasan seni budaya lereng Gunung Manglayang, permainan tradisional anak, & wisata edukasi.</p>
                  <div class="portfolio-tags">
                    <span class="tag-chip">Kaulinan Lembur</span>
                    <span class="tag-chip">Pencak Silat</span>
                    <span class="tag-chip">Wisata Edukasi</span>
                  </div>
                </div>
              </article>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- KREASI & KEBUDAYAAN NARRATIVE (ECOSYSTEM SECTION) -->
    <section class="ecosystem-section" id="ekosistem">
      <div class="ecosystem-inner shell">
        
        <!-- Section Header -->
        <div class="ecosystem-header">
          <div>
            <div class="eyebrow eyebrow--dark reveal-item" data-reveal>
              <span class="eyebrow-dot"></span>
              Ekosistem & Visi Kebudayaan
            </div>
            <h2 class="ecosystem-title line-reveal" data-line-reveal data-delay="100">
              <span class="line-wrap"><span class="line-inner">Harmoni Tradisi &</span></span>
              <span class="line-wrap"><span class="line-inner">Inovasi Kreatif Kota.</span></span>
            </h2>
          </div>
          <div class="reveal-item" data-reveal data-delay="180" data-translate="20">
            <p class="ecosystem-lead">
              UPTD Kebudayaan Dinas Kebudayaan dan Pariwisata Kota Bandung hadir sebagai katalisator ruang hidup bersama—mengintegrasikan 4 fasilitas unggulan untuk melestarikan warisan leluhur Pasundan sekaligus mengakselerasi potensi industri kreatif generasi masa depan.
            </p>
          </div>
        </div>

        <!-- 4 Bento / Interactive Pillars -->
        <div class="ecosystem-grid">
          
          <!-- Pillar 1: Inkubasi Ekraf -->
          <div class="ecosystem-card reveal-item group" data-reveal data-delay="0" data-translate="30">
            <div class="ecosystem-card-top">
              <div class="ecosystem-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <div class="ecosystem-card-num">01 / Akselerasi</div>
              <h3 class="ecosystem-card-title">Inkubasi 17 Subsektor Ekraf</h3>
              <p class="ecosystem-card-desc">
                Mendorong talenta muda kota melalui studio rekaman audio, laboratorium cetak 3D, animasi digital, fesyen, serta coworking space kolaboratif berstandar industri.
              </p>
            </div>
            <div class="ecosystem-card-footer">
              <span class="ecosystem-card-tag">Bandung Creative Hub</span>
              <a href="/fasilitas/bandung-creative-hub" class="ecosystem-card-arrow" aria-label="Lihat BCH">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </div>

          <!-- Pillar 2: Seni Pertunjukan & Karawitan -->
          <div class="ecosystem-card reveal-item group" data-reveal data-delay="90" data-translate="30">
            <div class="ecosystem-card-top">
              <div class="ecosystem-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div class="ecosystem-card-num">02 / Pemajuan</div>
              <h3 class="ecosystem-card-title">10 Objek Pemajuan Budaya</h3>
              <p class="ecosystem-card-desc">
                Pusat pertunjukan teater indoor, panggung amphitheater, pagelaran wayang golek, tari jaipong, tembang cianjuran, serta studio karawitan gamelan Salendro & Pelog.
              </p>
            </div>
            <div class="ecosystem-card-footer">
              <span class="ecosystem-card-tag">Mayang Sunda</span>
              <a href="/fasilitas/padepokan-seni-mayang-sunda" class="ecosystem-card-arrow" aria-label="Lihat PSMS">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </div>

          <!-- Pillar 3: Konservasi Musik Bambu -->
          <div class="ecosystem-card reveal-item group" data-reveal data-delay="180" data-translate="30">
            <div class="ecosystem-card-top">
              <div class="ecosystem-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12h20"/><path d="M20 12v8H4v-8"/><path d="M6 12V4h12v8"/><path d="M10 8h4"/>
                </svg>
              </div>
              <div class="ecosystem-card-num">03 / Konservasi</div>
              <h3 class="ecosystem-card-title">Laboratorium Seni Bambu</h3>
              <p class="ecosystem-card-desc">
                Dedikasi pelestarian instrumen musik bambu Sunda (angklung, calung, arumba), lokakarya kriya anyaman lokal di Balé Karya, serta panggung pentas alam terbuka Palataran.
              </p>
            </div>
            <div class="ecosystem-card-footer">
              <span class="ecosystem-card-tag">Teras Sunda Cibiru</span>
              <a href="/fasilitas/teras-sunda-cibiru" class="ecosystem-card-arrow" aria-label="Lihat TSC">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </div>

          <!-- Pillar 4: Kaulinan Lembur & Ekowisata -->
          <div class="ecosystem-card reveal-item group" data-reveal data-delay="270" data-translate="30">
            <div class="ecosystem-card-top">
              <div class="ecosystem-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div class="ecosystem-card-num">04 / Kearifan</div>
              <h3 class="ecosystem-card-title">Kaulinan Lembur & Tradisi</h3>
              <p class="ecosystem-card-desc">
                Ekowisata edukasi lereng Gunung Manglayang yang menghidupkan kembali permainan tradisional anak Sunda, perguruan silat bela diri luhur, serta Saung Padepokan seni.
              </p>
            </div>
            <div class="ecosystem-card-footer">
              <span class="ecosystem-card-tag">Pasir Kunci</span>
              <a href="/fasilitas/kampung-wisata-pasir-kunci" class="ecosystem-card-arrow" aria-label="Lihat KWPK">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </div>

        </div>

        <!-- Impact Metrics & Collaboration Banner -->
        <div class="ecosystem-impact-banner reveal-item" data-reveal data-translate="36">
          <div>
            <div class="text-xs uppercase tracking-widest text-[#b15f2c] font-semibold mb-2">Komitmen Pelayanan</div>
            <h3 class="text-2xl sm:text-3xl font-bold text-[#111111] leading-tight mb-3">Ruang Terbuka, Merangkul Seluruh Komunitas.</h3>
            <p class="text-sm text-gray-600 leading-relaxed max-w-md">
              Seluruh fasilitas, studio, dan sarana panggung kami sediakan untuk memajukan kreasi masyarakat dan melestarikan budaya Kota Bandung.
            </p>
          </div>
          <div class="ecosystem-impact-stats">
            <div class="ecosystem-stat-item">
              <span class="ecosystem-stat-val">4</span>
              <span class="ecosystem-stat-label">Fasilitas Utama Kebudayaan</span>
            </div>
            <div class="ecosystem-stat-item">
              <span class="ecosystem-stat-val">17</span>
              <span class="ecosystem-stat-label">Subsektor Ekonomi Kreatif</span>
            </div>
            <div class="ecosystem-stat-item">
              <span class="ecosystem-stat-val">10</span>
              <span class="ecosystem-stat-label">Objek Pemajuan Kebudayaan</span>
            </div>
            <div class="ecosystem-stat-item">
              <span class="ecosystem-stat-val">100%</span>
              <span class="ecosystem-stat-label">Akses Komunitas & Seniman</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- STATS / LOKASI FASILITAS -->
    <section class="stats-section">
      <div class="stats-wrapper shell">
        <div class="stats-panel reveal-item" data-reveal data-translate="40">
          <div class="eyebrow eyebrow--light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <span class="eyebrow-dot"></span>
            Lokasi Fasilitas
          </div>
          <h2 class="stats-h2 line-reveal drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" data-line-reveal data-delay="120">
            <span class="line-wrap"><span class="line-inner">Peta & Alamat</span></span>
            <span class="line-wrap"><span class="line-inner">4 Fasilitas Kebudayaan</span></span>
          </h2>
          <ul class="stats-grid">
            <!-- 01: BCH -->
            <li class="reveal-item" data-reveal data-delay="0" data-translate="20">
              <div class="flex flex-col gap-2 group/card">
                <a href="https://maps.google.com/?q=Bandung+Creative+Hub" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight group-hover/card:text-amber-300 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Bandung Creative Hub</div>
                <div class="stat-label !text-white text-xs sm:text-sm mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-bold opacity-100 leading-normal">Jl. Laswi No.7, Kacapiring, Batununggal, Kota Bandung</div>
              </div>
            </li>
            <!-- 02: PSMS -->
            <li class="reveal-item" data-reveal data-delay="90" data-translate="20">
              <div class="flex flex-col gap-2 group/card">
                <a href="https://maps.google.com/?q=Padepokan+Seni+Mayang+Sunda" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight group-hover/card:text-amber-300 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Padepokan Seni Mayang Sunda</div>
                <div class="stat-label !text-white text-xs sm:text-sm mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-bold opacity-100 leading-normal">Jl. Peta No.209, Suka Asih, Bojongloa Kaler, Kota Bandung</div>
              </div>
            </li>
            <!-- 03: TSC -->
            <li class="reveal-item" data-reveal data-delay="180" data-translate="20">
              <div class="flex flex-col gap-2 group/card">
                <a href="https://maps.google.com/?q=Teras+Sunda+Cibiru" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight group-hover/card:text-amber-300 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Teras Sunda Cibiru</div>
                <div class="stat-label !text-white text-xs sm:text-sm mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-bold opacity-100 leading-normal">Jl. Raya Cipadung, Cipadung, Kec. Cibiru, Kota Bandung</div>
              </div>
            </li>
            <!-- 04: Pasir Kunci -->
            <li class="reveal-item" data-reveal data-delay="270" data-translate="20">
              <div class="flex flex-col gap-2 group/card">
                <a href="https://maps.google.com/?q=Kampung+Wisata+Pasir+Kunci" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Buka Google Maps ↗</span>
                </a>
                <div class="text-lg sm:text-xl font-bold text-white leading-tight group-hover/card:text-amber-300 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Kampung Wisata Pasir Kunci</div>
                <div class="stat-label !text-white text-xs sm:text-sm mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-bold opacity-100 leading-normal">Pasirjati, Kec. Ujung Berung, Kota Bandung</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- VIDEO GALLERY / YOUTUBE -->
    <section class="video-section" id="videoGallery">
      <div class="video-section-inner shell">
        <div class="video-section-left">
          <div class="eyebrow eyebrow--dark video-eyebrow reveal-item" data-reveal>
            <span class="eyebrow-dot"></span>
            Video & Dokumentasi
          </div>
          <div class="video-embed-wrapper reveal-item" data-reveal data-delay="100" data-translate="24">
            <div class="video-embed-frame">
              <iframe
                src="https://www.youtube.com/embed/cDEhVQlykIw"
                title="Video Profil UPTD Kebudayaan Kota Bandung"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div class="video-distributed reveal-item" data-reveal data-translate="12">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span>Dokumentasi kegiatan dan program di setiap fasilitas kebudayaan.</span>
          </div>
        </div>
        <div class="video-section-right">
          <h2 class="video-section-h2 word-reveal" data-word-reveal>Mengenal lebih dekat <span class="muted">fasilitas kebudayaan melalui dokumentasi video resmi UPTD Kota Bandung.</span></h2>

          <div class="video-section-footer reveal-item" data-reveal data-delay="200">
            <div>
              <div class="video-social-label">Ikuti kami di YouTube</div>
              <div class="about-social-row">
                <a href="https://www.youtube.com/@BandungCreativeHub" target="_blank" rel="noopener noreferrer" class="social-chip social-chip--accent" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-chip social-chip--muted" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-chip social-chip--muted" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
            <a href="https://www.youtube.com/@BandungCreativeHub" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn--outline pill-btn--with-arrow">
              <span class="pill-btn-inner">
                Lihat Semua Video
                <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- E-ZINE / DIGITAL PUBLICATION -->
    <section class="ezine-section" id="ezine">
      <div class="ezine-inner shell">
        <div class="ezine-header">
          <span class="eyebrow eyebrow--dark reveal-item" data-reveal>
            <span class="eyebrow-dot"></span>
            Publikasi & E-Zine
          </span>
          <h2 class="ezine-h2 line-reveal" data-line-reveal data-delay="120">
            <span class="line-wrap"><span class="line-inner">Majalah Digital</span></span>
            <span class="line-wrap"><span class="line-inner">& Warta Budaya</span></span>
          </h2>
          <p class="ezine-desc word-reveal" data-word-reveal>
            Jelajahi ragam liputan eksklusif geliat seni, profil seniman, dan inovasi ekosistem kebudayaan Kota Bandung dalam format majalah digital interaktif.
          </p>
        </div>

        <!-- Featured Edition Highlight -->
        <div class="ezine-featured-banner reveal-item" data-reveal data-delay="100" data-translate="32">
          <div class="ezine-featured-left">
            <span class="ezine-tag-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              E-Zine Bandung Creative Hub
            </span>
            <h3 class="ezine-featured-title">Creative Hub .bdg Zine — Volume 01</h3>
            <p class="ezine-featured-text">
              Edisi publikasi berkala dari Bandung Creative Hub yang merangkum ruang eksplorasi karya, inspirasi komunitas kreatif muda, dan geliat subsektor ekonomi kreatif Kota Bandung.
            </p>
            <div class="ezine-featured-meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Format PDF Interaktif
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Konsisten Gratis
              </span>
            </div>
            <div class="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="https://drive.google.com/file/d/1H0SFh8XnOKEYg1SlC66eSASpkzjGhZwv/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn--dark pill-btn--with-arrow">
                <span class="pill-btn-inner">
                  Baca E-Zine Sekarang
                  <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </span>
              </a>
              <a href="https://drive.google.com/drive/folders/109mEECOl-LObCZOfEG2G6KVOY2agbetM?usp=sharing" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn--outline pill-btn--with-arrow">
                <span class="pill-btn-inner">
                  Arsip Lengkap di Google Drive
                  <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg></span>
                </span>
              </a>
            </div>
          </div>
          <div class="ezine-book-showcase">
            <a href="https://drive.google.com/file/d/1H0SFh8XnOKEYg1SlC66eSASpkzjGhZwv/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="ezine-book-3d group" title="Baca E-Zine di Google Drive">
              <img src="/images/e-Zine.png" alt="Cover Creative Hub .bdg Zine Vol. 01" />
              <div class="ezine-book-spine"></div>
            </a>
          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-inner shell">
      <div class="footer-cta">
        <h2 class="footer-cta-h2 line-reveal" data-line-reveal data-stagger="100">
          <span class="line-wrap"><span class="line-inner">Punya gagasan</span></span>
          <span class="line-wrap"><span class="line-inner">kreatif? Mari</span></span>
          <span class="line-wrap"><span class="line-inner">berkarya bersama.</span></span>
        </h2>
        <a href="https://pusat-kreasi.disbudpar.bandung.go.id/" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn--light pill-btn--with-arrow">
          <span class="pill-btn-inner">
            Mulai Kolaborasi
            <span class="pill-btn-badge"><svg class="arrow-up-right-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg></span>
          </span>
        </a>
      </div>

      <div class="footer-columns">
        <div>
          <div class="flex items-center gap-2.5 sm:gap-3.5 flex-wrap mb-4">
            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" class="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]" />
            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" class="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]" />
            <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" class="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] brightness-110" />
            <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" class="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]" />
            <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" class="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]" />
          </div>
          <div class="footer-col-brand text-white font-bold text-base">
            UPTD Kebudayaan
          </div>
          <p class="footer-tagline">
            Dinas Kebudayaan dan Pariwisata Kota Bandung. Membangun ruang kreasi, apresiasi, dan pelestarian seni budaya.
          </p>
        </div>
        <div>
          <div class="footer-col-title">Navigasi</div>
          <div class="footer-links">
            <a href="#home" class="animated-link">Home</a>
            <a href="/berita" class="animated-link">Berita</a>
            <a href="/artikel" class="animated-link">Artikel</a>
            <a href="#contact" class="animated-link contact-trigger">Contact</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Fasilitas</div>
          <div class="footer-links">
            <a href="/fasilitas/bandung-creative-hub" class="animated-link">Bandung Creative Hub</a>
            <a href="/fasilitas/padepokan-seni-mayang-sunda" class="animated-link">Mayang Sunda</a>
            <a href="/fasilitas/teras-sunda-cibiru" class="animated-link">Teras Sunda Cibiru</a>
            <a href="/fasilitas/kampung-wisata-pasir-kunci" class="animated-link">Pasir Kunci</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Media Sosial</div>
          <div class="footer-links">
            <a href="https://www.youtube.com/@BandungCreativeHub" target="_blank" rel="noopener noreferrer" class="animated-link">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="animated-link">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="animated-link">TikTok</a>
          </div>
        </div>
      </div>

      <div class="footer-legal">
        <span>© 2026 UPTD Kebudayaan Kota Bandung. All rights reserved.</span>
        <div class="footer-legal-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- NAV MENU -->
  <div class="nav-menu" id="navMenu" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <div class="nav-top shell">
      <div class="nav-brand flex items-center gap-2">
        <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" class="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)]" />
        <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" class="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)]" />
        <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" class="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)] brightness-110" />
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
      <span>Waktu lokal — <span id="navTime">9:41am</span></span>
      <a href="https://pusat-kreasi.disbudpar.bandung.go.id/" target="_blank" rel="noopener noreferrer" class="nav-bottom-cta" id="navStartProject">Mulai Kolaborasi →</a>
    </div>
  </div>

  <!-- REQUEST MODAL -->
  <div class="modal-backdrop" id="modalBackdrop" role="dialog" aria-modal="true" aria-label="Mulai Kolaborasi">
    <div class="modal-panel" id="modalPanel">
      <button class="modal-close" id="modalClose" aria-label="Tutup">
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
            Mulai Kolaborasi
          </div>
          <h2>Ceritakan gagasan atau rencana Anda.</h2>
        </div>
        <form class="modal-form" id="requestForm">
          <label class="modal-label">
            Nama Lengkap
            <input type="text" class="modal-input" required placeholder="Nama Anda" />
          </label>
          <label class="modal-label">
            Email
            <input type="email" class="modal-input" required placeholder="email@contoh.com" />
          </label>
          <label class="modal-label">
            Pesan / Gagasan Kolaborasi
            <textarea class="modal-textarea" rows="4" required
              placeholder="Tuliskan ide kolaborasi, rencana kegiatan, atau pertanyaan Anda."></textarea>
          </label>
          <div class="modal-bottom">
            <span class="modal-note">Kami akan membalas dalam 1 hari kerja.</span>
            <button type="submit" class="pill-btn pill-btn--dark pill-btn--with-arrow" id="submitBtn">
              <span class="pill-btn-inner">
                <span id="submitLabel">Kirim Pesan</span>
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
          <h2>Pesan Diterima</h2>
          <p>Terima kasih telah menghubungi kami — tim UPTD Kebudayaan akan segera merespons pesan Anda.</p>
          <button class="pill-btn pill-btn--dark pill-btn--no-arrow" id="modalSuccessClose">
            <span class="pill-btn-inner">Tutup</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script type="importmap">
`;