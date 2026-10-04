const stories = [
  {
    title: "Borrowed Time",
    genre: "Romance",
    mood: "Bittersweet",
    time: "18 min read",
    year: "2026",
    description: "A quiet story about timing, attachment, and what happens when two people meet at exactly the wrong moment.",
    body: [
      "There are people we meet too early, people we meet too late, and a rare few who arrive precisely when our lives have already begun moving in another direction.",
      "This is a story about two such people — about the small decisions that make a life, and the larger ones we only understand after the moment has passed.",
      "Replace this sample text with your own chapter, opening scene, or full story."
    ]
  },
  {
    title: "ছায়ার নগরী",
    genre: "Mystery",
    mood: "Atmospheric",
    time: "24 min read",
    year: "2026",
    description: "A city of rain, memory, and half-forgotten promises where every familiar street seems to hide another version of the truth.",
    body: [
      "At dusk, the city looked different. Not changed — merely revealed.",
      "The lamps came on one by one, and the old buildings gathered shadows in their windows as though they had been waiting for someone.",
      "Replace this sample text with your original Bengali chapters or story text."
    ]
  },
  {
    title: "After the Monsoon",
    genre: "Drama",
    mood: "Reflective",
    time: "12 min read",
    year: "2026",
    description: "A short story about homecoming, unfinished conversations, and the strange tenderness of places we thought we had outgrown.",
    body: [
      "The first clear morning after the rain always made the town look newly washed.",
      "He had spent years thinking that leaving was the opposite of belonging. It took only one train journey back to discover how wrong he had been.",
      "Replace this sample text with your own story."
    ]
  },
  {
    title: "The Glass Orchard",
    genre: "Fantasy",
    mood: "Dreamlike",
    time: "16 min read",
    year: "2026",
    description: "In an orchard where memories grow like fruit, a young keeper must decide which of her pasts she is willing to lose.",
    body: [
      "The trees did not bear apples, or pears, or anything that could be found in an ordinary orchard.",
      "They bore memories.",
      "Replace this sample text with your own fantasy story or serialized chapter."
    ]
  }
];

const grid = document.getElementById("storyGrid");
const empty = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const storyCount = document.getElementById("storyCount");

let currentFilter = "All";

function renderStories() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = stories.filter(story => {
    const filterMatch = currentFilter === "All" || story.genre === currentFilter;
    const text = `${story.title} ${story.genre} ${story.mood} ${story.description}`.toLowerCase();
    return filterMatch && text.includes(q);
  });

  grid.innerHTML = filtered.map((story, index) => `
    <article class="story-card">
      <div>
        <div class="story-top">
          <span class="story-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="story-tag">${story.genre} · ${story.mood}</span>
        </div>
        <h3>${story.title}</h3>
        <p>${story.description}</p>
      </div>
      <div class="story-bottom">
        <button class="read-link" data-read="${story.title}">Read story ↗</button>
        <span class="story-time">${story.time}</span>
      </div>
    </article>
  `).join("");

  empty.hidden = filtered.length !== 0;
  resultCount.textContent = `${filtered.length} stor${filtered.length === 1 ? "y" : "ies"}`;
  storyCount.textContent = String(stories.length).padStart(2, "0");
}

function openReader(title) {
  const story = stories.find(s => s.title === title);
  if (!story) return;

  document.getElementById("readerGenre").textContent = `${story.genre} · ${story.mood}`;
  document.getElementById("readerTitle").textContent = story.title;
  document.getElementById("readerMeta").textContent = `${story.time} · ${story.year}`;
  document.getElementById("readerBody").innerHTML = story.body
    .map((paragraph, i) => `<p class="${i === 0 ? "dropcap" : ""}">${paragraph}</p>`)
    .join("");

  const modal = document.getElementById("readerModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReader() {
  const modal = document.getElementById("readerModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderStories();
  });
});

searchInput.addEventListener("input", renderStories);

document.addEventListener("click", event => {
  const readTarget = event.target.closest("[data-read]");
  if (readTarget) openReader(readTarget.dataset.read);

  if (event.target.closest("[data-close]")) closeReader();

  if (event.target.closest(".nav-toggle")) {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeReader();
});

renderStories();
