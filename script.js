(() => {
  'use strict';
  let language = 'en';
  let toastTimer;
  const toggle = document.getElementById('language-toggle');
  const toast = document.getElementById('toast');
  function setLanguage(lang) {
    language = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[lang]; });
    toggle.textContent = lang === 'zh' ? 'EN' : '中文';
    toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换至中文');
    try { localStorage.setItem('academic-site-language', lang); } catch (_) {}
  }
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  document.querySelectorAll('.copy-citation').forEach(button => {
    button.addEventListener('click', async () => {
      const pre = button.parentElement.querySelector('pre');
      try {
        await navigator.clipboard.writeText(pre.textContent);
        toast.textContent = language === 'zh' ? '引用已复制' : 'Citation copied';
      } catch (_) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
        toast.textContent = language === 'zh' ? '引用已选中，请按 Ctrl/Cmd+C 复制' : 'Citation selected. Press Ctrl/Cmd+C to copy.';
      }
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
    });
  });
  const navLinks = [...document.querySelectorAll('nav a')];
  if ('IntersectionObserver' in window && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
    navLinks.forEach(link => {
      const section = link.hash && document.getElementById(link.hash.slice(1));
      if (section) observer.observe(section);
    });
  }
  try { if (localStorage.getItem('academic-site-language') === 'zh') language = 'zh'; } catch (_) {}
  setLanguage(language);
})();
