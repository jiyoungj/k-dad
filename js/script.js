/* K-DAD — script.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Animations ── */
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length && 'IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animateObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => animateObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    animateElements.forEach(el => el.classList.add('animated'));
  }

  /* ── Sidebar scroll-spy ── */
  const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');

  if (sidebarLinks.length) {
    const targets = [];

    sidebarLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) targets.push({ el, link });
    });

    function updateActive() {
      if (!targets.length) return;
      const scrollY = window.scrollY + 130;
      let current = targets[0].link;

      targets.forEach(({ el, link }) => {
        if (el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = link;
        }
      });

      sidebarLinks.forEach(l => l.classList.remove('active'));
      current.classList.add('active');
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  /* ── Copy citation ── */
  const copyBtn = document.getElementById('copy-citation');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textEl = document.getElementById('citation-text');
      if (!textEl) return;

      navigator.clipboard.writeText(textEl.innerText).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        /* Fallback for older browsers */
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textEl);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2200);
      });
    });
  }

});
