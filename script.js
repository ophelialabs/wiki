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
            const response = await fetch('/wiki/articles.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch articles.json: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            try {
                articles = JSON.parse(text);
                console.log('Articles loaded:', articles); // Debug log
                renderArticleList();
                if (articles.length > 0) {
                    loadArticle(articles[0].path);
                }
            } catch (parseError) {
                throw new Error(`Failed to parse articles.json: ${parseError.message}`);
            }
        } catch (error) {
            console.error('Error loading articles:', error);
            articleList.innerHTML = `<li class="error">Failed to load articles: ${error.message}</li>`;
        }
    }

    function renderArticleList(articlesToRender = articles) {
        articleList.innerHTML = '';
        articlesToRender.forEach(article => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = article.path ? `#${article.path}` : '#';
            a.textContent = article.title;
            li.appendChild(a);
            
            if (article.children) {
                const expandIcon = document.createElement('i');
                expandIcon.className = 'bi bi-chevron-right';
                expandIcon.style.marginRight = '5px';
                li.insertBefore(expandIcon, a);
                
                const subList = document.createElement('ul');
                subList.style.display = 'none';
                subList.className = 'nested';
                
                article.children.forEach(child => {
                    const childLi = document.createElement('li');
                    const childA = document.createElement('a');
                    childA.href = `#${child.path}`;
                    childA.textContent = child.title;
                    childA.addEventListener('click', (e) => {
                        e.preventDefault();
                        loadArticle(child.path);
                    });
                    childLi.appendChild(childA);
                    subList.appendChild(childLi);
                });
                
                li.appendChild(subList);
                
                expandIcon.addEventListener('click', () => {
                    expandIcon.classList.toggle('bi-chevron-down');
                    expandIcon.classList.toggle('bi-chevron-right');
                    subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
                });
            }
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                if (article.path) {
                    loadArticle(article.path);
                } else if (article.children && article.children.length > 0) {
                    // If it's a parent without content, toggle children visibility
                    const icon = li.querySelector('i');
                    const subList = li.querySelector('.nested');
                    if (icon && subList) {
                        icon.click();
                    }
                }
            });
            
            li.appendChild(a);
            articleList.appendChild(li);
        });
    }

    async function loadArticle(path) {
        try {
            console.log('Loading article from path:', path); // Debug log
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Could not load article: ${path} (${response.status} ${response.statusText})`);
            }
            const content = await response.text();
            console.log('Article content loaded, length:', content.length); // Debug log
            
            // Check if it's markdown or HTML
            if (path.endsWith('.md')) {
                articleContent.innerHTML = marked.parse(content);
            } else {
                articleContent.innerHTML = content;
            }
            generateToc();
        } catch (error) {
            console.error('Error loading article:', error); // Debug log
            articleContent.innerHTML = `<p class="error">Error loading article: ${error.message}</p>`;
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

    // Initialize modals if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
        modalTriggerList.forEach(el => new bootstrap.Modal(el));
    }
});