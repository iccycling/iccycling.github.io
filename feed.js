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

function tagRow(tags) {
  if (!tags || !tags.length) return '';
  return `<div class="tag-row">${tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>`;
}

function renderNews(items) {
  const el = document.getElementById('nb-news-list');
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p>No news at the moment.</p>'; return; }
  el.innerHTML = items.map(item => {
    return `<a href="${item.url}" class="nb-news-item">${tagRow(item.tags)}<span class="nb-news-title">${item.title}</span></a>`;
  }).join('');
}

function renderPosts(items) {
  const el = document.getElementById('nb-blog-grid');
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p>No posts yet.</p>'; return; }
  el.innerHTML = items.map((item, i) => `
    <a href="${item.url}" class="nb-blog-card${i === 0 ? ' nb-blog-featured' : ''}">
      ${tagRow(item.tags)}
      <div class="nb-blog-title">${item.title}</div>
      <p class="nb-blog-excerpt">${item.excerpt || ''}</p>
      <div class="nb-blog-meta">${item.author}${item.readingTime ? ' · ' + item.readingTime + ' min read' : ''}</div>
    </a>
  `).join('');
}

loadFeed();
