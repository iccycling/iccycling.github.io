const FEED_URL = 'https://iccycling.github.io/iccc-hub/feed/index.json';

async function loadFeed() {
  try {
    const res = await fetch(FEED_URL);
    const data = await res.json();
    renderNews(data.news || []);
    renderPosts(data.posts || []);
  } catch (e) {
    console.warn('Could not load feed:', e);
  }
}

function renderNews(items) {
  const el = document.getElementById('nb-news-list');
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p>No news at the moment.</p>'; return; }
  el.innerHTML = items.map(item => {
    const dateLabel = item.eventDate
      ? `<span class="news-date event">${item.eventDate}</span>`
      : `<span class="news-date">${item.dateLabel}</span>`;
    return `<a href="${item.url}" class="nb-news-item">${dateLabel}<span class="nb-news-title">${item.title}</span></a>`;
  }).join('');
}

function renderPosts(items) {
  const el = document.getElementById('nb-blog-grid');
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p>No posts yet.</p>'; return; }
  el.innerHTML = items.map((item, i) => `
    <a href="${item.url}" class="nb-blog-card${i === 0 ? ' nb-blog-featured' : ''}">
      <div class="nb-blog-tag">${item.tag || ''}</div>
      <div class="nb-blog-title">${item.title}</div>
      <p class="nb-blog-excerpt">${item.excerpt || ''}</p>
      <div class="nb-blog-meta">${item.author}${item.readingTime ? ' · ' + item.readingTime + ' min read' : ''}</div>
    </a>
  `).join('');
}

loadFeed();
