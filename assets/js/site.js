const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (menu && nav) {
  const close = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) close(); });
  matchMedia('(min-width: 761px)').addEventListener('change', close);
}
const filters = document.querySelector('.filters');
if (filters) {
  const cards = [...document.querySelectorAll('.project-card')];
  filters.hidden = false;
  filters.addEventListener('click', e => {
    const button = e.target.closest('button[data-filter]');
    if (!button) return;
    const filter = button.dataset.filter;
    filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => { card.hidden = filter !== 'All work' && card.dataset.category !== filter; });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown: ${filter}.`;
  });
}
document.documentElement.classList.add('js');
