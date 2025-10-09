document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.getElementById('article-list');
    const articleContent = document.getElementById('article-content');
    const tocList = document.getElementById('toc-list');
    const searchInput = document.getElementById('search-input');
    const tocToggle = document.getElementById('toc-toggle');
    const rightSidebar = document.querySelector('.right-sidebar');
    const main = document.querySelector('main');

    const articles = [
        {
            title: 'Welcome to the Wiki',
            path: 'docs/welcome.html'
        },
        {
            title: 'Getting Started',
            path: 'docs/getting-started.html'
        },
        {
            title: 'Style Guide',
            path: 'docs/style-guide.html'
        }
    ];

    function renderArticleList() {
        articleList.innerHTML = '';
        articles.forEach(article => {
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
            const content = await response.text();
            articleContent.innerHTML = content;
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
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    function searchArticles(query) {
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase())
        );
        renderFilteredArticleList(filteredArticles);
    }

    function renderFilteredArticleList(filteredArticles) {
        articleList.innerHTML = '';
        filteredArticles.forEach(article => {
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

    searchInput.addEventListener('input', (e) => {
        searchArticles(e.target.value);
    });

    tocToggle.addEventListener('click', () => {
        rightSidebar.classList.toggle('collapsed');
        main.classList.toggle('right-collapsed');
    });

    // Initial load
    renderArticleList();
    if (articles.length > 0) {
        loadArticle(articles[0].path);
    }
});