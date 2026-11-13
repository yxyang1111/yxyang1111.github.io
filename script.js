(() => {
  'use strict';
  let language = 'en';
  let activeFilter = 'all';
  let toastTimer;
  const toggle = document.getElementById('language-toggle');
  const search = document.getElementById('publication-search');
  const papers = [...document.querySelectorAll('.publication')];
  const toast = document.getElementById('toast');

  function filterPapers() {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    papers.forEach(paper => {
      const text = paper.querySelector('.pub-body h3').textContent + ' ' + paper.querySelector('.authors').textContent + ' ' + paper.querySelector('.venue').textContent + ' ' + paper.querySelector('.pub-label').textContent;
      const visible = (activeFilter === 'all' || paper.dataset.kind === activeFilter) && text.toLocaleLowerCase().includes(query);
      paper.hidden = !visible;
      if (visible) visibleCount++;
    });
    document.getElementById('no-results').hidden = visibleCount > 0;
    document.getElementById('publication-count').textContent = language === 'zh' ? `显示 ${visibleCount} 篇论文` : `${visibleCount} publications shown`;
  }

  function setLanguage(lang) {
    language = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-placeholder-en]').forEach(el => { el.placeholder = lang === 'zh' ? el.dataset.placeholderZh : el.dataset.placeholderEn; });
    toggle.textContent = lang === 'zh' ? 'EN ↗' : '中文 ↗';
    toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换至中文');
    search.setAttribute('aria-label', lang === 'zh' ? '搜索论文' : 'Search publications');
    try { localStorage.setItem('academic-site-language', lang); } catch (_) { /* Storage may be unavailable. */ }
    filterPapers();
  }
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll('.filter').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      filterPapers();
    });
  });
  search.addEventListener('input', filterPapers);

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
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
    navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
  }
  try { const saved = localStorage.getItem('academic-site-language'); if (saved === 'zh') language = 'zh'; } catch (_) { /* Use English by default. */ }
  setLanguage(language);
})();
