const API = 'https://public-api.wordpress.com/wp/v2/sites/stenobot.wordpress.com/posts'
          + '?_fields=title,excerpt,date,link,featured_media&_embed=wp:featuredmedia&per_page=10';

const list = document.getElementById('post-list');

fetch(API)
  .then(r => r.json())
  .then(posts => {
    list.innerHTML = posts.map(post => {
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      });
      const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();
      const imgSrc = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      const img = imgSrc ? `<img class="post-image" src="${imgSrc}" alt="" loading="lazy" />` : '';
      return `
        <li class="post-item">
          <a class="post-title" href="${post.link}" target="_blank" rel="noopener">${post.title.rendered}</a>
          ${img}
          <span class="post-date">${date}</span>
          <p class="post-excerpt">${excerpt}</p>
        </li>`;
    }).join('');
  })
  .catch(() => {
    list.innerHTML = '<li class="post-error">Could not load posts.</li>';
  });
