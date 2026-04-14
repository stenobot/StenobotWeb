const API = 'https://public-api.wordpress.com/wp/v2/sites/stenobot.wordpress.com/posts'
          + '?_fields=title,excerpt,date,link,content&per_page=10';

const list = document.getElementById('post-list');

fetch(API)
  .then(r => r.json())
  .then(posts => {
    list.innerHTML = posts.map(post => {
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      });
      const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();
      const imgMatch = post.content.rendered.match(/src="([^"]+\.(?:png|jpe?g|gif)(?:\?[^"]*)?)"/i);
      const img = imgMatch ? `<img class="post-image" src="${imgMatch[1]}" alt="" loading="lazy" />` : '';
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
    list.innerHTML = '<li class="post-error">Having trouble getting the blog posts from WordPress. Probably due to a network issue.</li>';
  });
