document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.getElementById('article-list');
    const articleContent = document.getElementById('article-content');
    const tocList = document.getElementById('toc-list');
    const searchInput = document.getElementById('search-input');
    const tocToggle = document.getElementById('toc-toggle');
    const rightSidebar = document.querySelector('.right-sidebar');
    const main = document.querySelector('main');

    let articles = [];

    async function fetchArticles() {
        try {
            const response = await fetch('articles.json');
            if (!response.ok) {
                throw new Error('Could not fetch articles.json');
            }
            articles = await response.json();
            renderArticleList();
            if (articles.length > 0) {
                loadArticle(articles[0].path);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            articleList.innerHTML = '<li>Failed to load articles.</li>';
        }
    }

    function renderArticleList(articlesToRender = articles) {
        articleList.innerHTML = '';
        articlesToRender.forEach(article => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${article.path}`;
            a.textContent = article.title;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                loadArticle(article.path);
            });
            li.appendChild(a);
            articleList.appendChild(li);
        });
    }

    async function loadArticle(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Could not load article: ${path}`);
            }
            const markdown = await response.text();
            articleContent.innerHTML = marked.parse(markdown);
            generateToc();
        } catch (error) {
            articleContent.innerHTML = `<p>Error loading article: ${error.message}</p>`;
        }
    }

    function generateToc() {
        tocList.innerHTML = '';
        const headings = articleContent.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
            heading.id = id;
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    function searchArticles(query) {
        const filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase())
        );
        renderArticleList(filteredArticles);
    }

    searchInput.addEventListener('input', (e) => {
        searchArticles(e.target.value);
    });

    tocToggle.addEventListener('click', () => {
        rightSidebar.classList.toggle('collapsed');
        main.classList.toggle('right-collapsed');
    });

    // Initial load
    fetchArticles();

    // Initialize modals
    const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalTriggerList.forEach(el => new bootstrap.Modal(el));
    });

    // Load Tech Stack
    fetch('Ophelia/stack/index.html')
        .then(res => res.ok ? res.text() : Promise.reject(res))
        .then(data => {
            const header = document.getElementById('techstack-placeholder');
            if (header) header.innerHTML = data;
        })
        .catch(() => {});