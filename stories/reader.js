const progressBar = document.getElementById('progressBar');
const tocToggle = document.getElementById('tocToggle');
const tocClose = document.getElementById('tocClose');
const tocPanel = document.getElementById('tocPanel');
const reader = document.getElementById('storyReader');
const themeToggle = document.getElementById('themeToggle');
const buttons = document.querySelectorAll('[data-font]');

function updateProgress() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

tocToggle?.addEventListener('click', () => tocPanel.classList.add('open'));
tocClose?.addEventListener('click', () => tocPanel.classList.remove('open'));
document.querySelectorAll('.toc-link').forEach(link => link.addEventListener('click', () => tocPanel.classList.remove('open')));

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('reader-dark');
  themeToggle.textContent = document.body.classList.contains('reader-dark') ? 'Light Reading Mode' : 'Dark Reading Mode';
});

let fontScale = 1;
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.font;
    if (action === 'decrease') fontScale = Math.max(0.85, fontScale - 0.05);
    if (action === 'increase') fontScale = Math.min(1.25, fontScale + 0.05);
    if (action === 'reset') fontScale = 1;
    reader.style.setProperty('--reader-scale', fontScale);
  });
});

const sections = [...document.querySelectorAll('.chapter[id]')];
const tocLinks = [...document.querySelectorAll('.toc-link')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-20% 0px -65% 0px' });
sections.forEach(section => observer.observe(section));
