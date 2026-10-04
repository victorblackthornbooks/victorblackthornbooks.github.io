const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.library-card');
const search = document.getElementById('storySearch');
const noResults = document.getElementById('noResults');
let activeFilter = 'all';

function applyLibraryFilters() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    const haystack = card.dataset.search.toLowerCase();
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchesSearch = !query || haystack.includes(query);
    const show = matchesFilter && matchesSearch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  noResults.hidden = visible !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    applyLibraryFilters();
  });
});
search?.addEventListener('input', applyLibraryFilters);
