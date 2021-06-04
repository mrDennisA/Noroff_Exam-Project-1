// PRELOAD
const body = document.querySelector("body");
window.onload = () => {
    body.classList.remove("preload");
};

// API CALL
const apiUrl = "https://yunitto.online/noroff/FEU1/AW33-37_Project-Exam-01/wp/wp-json/wp/v2/";

async function fetchApi() {
    try {
        const media = await (await fetch(apiUrl + `media?per_page=100`)).json();
        const pages = await (await fetch(apiUrl + `pages?per_page=100`)).json();
        const posts = await (await fetch(apiUrl + `posts?per_page=100&_embed`)).json();
        const users = await (await fetch(apiUrl + `users`)).json();
        const categories = await (await fetch(apiUrl + `categories`)).json();

        // FavIcon
        const favicon = media.filter((image) => image.slug === "da_favicon").map((image) => image.source_url)[0];
        document.querySelector("head").innerHTML += `<link rel="icon" href="${favicon}" type="image/gif" sizes="32x32">`;

        // Index
        if (extractName === "index" || extractName === "") {
            index(media, pages, posts);
            window.addEventListener("resize", mediaQueries);
        }

        // Blog
        if (extractName === "blog") {
            blog(posts, categories);
            window.addEventListener("resize", mediaQueries);
        }

        // Post
        if (extractName === "post") {
            const id = new URLSearchParams(document.location.search).get("id");
            if (id === null) {
                location.href = "/";
            }
            const blogPost = await (await fetch(apiUrl + `posts/${id}?_embed`)).json();
            article(blogPost);
        }

        // About
        if (extractName === "about") {
            about(media, users);
        }

        // Media Queries
        let small = true;
        let medium = true;
        let big = true;
        function mediaQueries() {
            function resizeWidth() {
                if (extractName === "index" || extractName === "") {
                    cardWidth = cardOffset + validateWidth();
                }
                if (extractName === "blog") {
                    cardWidth = cardNewSize + validateWidth();
                }
                article(posts);
            }

            if (window.innerWidth <= 767 && small) {
                small = false;
                medium = true;
                big = true;
                resizeWidth();
            }
            if (window.innerWidth >= 768 && window.innerWidth <= 991 && medium) {
                small = true;
                medium = false;
                big = true;
                resizeWidth();
            }
            if (window.innerWidth >= 992 && big) {
                small = true;
                medium = true;
                big = false;
                resizeWidth();
            }
        }

        // Page Off loader
        pageOffLoader();
    } catch (error) {
        console.log(error);
    }
}

// HEAD
const extractName = window.location.pathname
    .split("/")
    .pop()
    .replace(/\/?.html/g, "");

let pageName;
let pageTitle01;
let pageTitle02;

function validatePage() {
    if (extractName === "index" || extractName === "") {
        pageName = "home";
        pageTitle01 = "latest";
        pageTitle02 = "posts";
    }
    if (extractName === "blog") {
        pageName = extractName;
        pageTitle01 = "blog";
        pageTitle02 = "posts";
    }
    if (extractName === "post") {
        pageName = extractName;
        pageTitle01 = "post";
        pageTitle02 = "";
    }
    if (extractName === "about") {
        pageName = extractName;
        pageTitle01 = extractName;
        pageTitle02 = "me";
    }
    if (extractName === "contact") {
        pageName = extractName;
        pageTitle01 = extractName;
        pageTitle02 = "form";
    }

    document.querySelector("title").innerHTML = `dA.${pageName}`;
}
validatePage();

// Loader
const pageLoader = document.querySelector("#page-loader");
pageLoader.innerHTML = `
<span></span>
<span></span>
<span></span>`;

function pageOffLoader() {
    setTimeout(() => {
        pageLoader.innerHTML = "";
        container.style.display = "block";

        // Call Footer function
        footer();
    }, 350);
}

//Back to Top Arrow
document.querySelector("#arrowUpContainer").innerHTML = `
<button id="arrowUp" aria-label="arrow back to top">
    <svg class="arrowUp" viewBox="0 0 48 48">
        <polyline points="8 20 24 12 40 20" />
        <polyline points="8 36 24 28 40 36" />
    </svg>
</button>`;

const arrowUp = document.querySelector("#arrowUp");
arrowUp.addEventListener("click", () => {
    window.scroll({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", toTop);
function toTop() {
    if (document.documentElement.scrollTop > 640) {
        arrowUp.style.display = "block";
    }

    if (document.documentElement.scrollTop < 640) {
        arrowUp.style.display = "none";
    }
}

// FOOTER;
function footer() {
    const footer = document.querySelector("footer > div");
    const year = new Date().getFullYear();
    footer.innerHTML = `
    <ul class="copyright fs14">
        <li>© Copyright</li>
        <li class="year">${year}</li>
        <li class="author"><a class="c06" href="./about.html">Dennis Alekseev</a></li>
        <li>All Rights Reserved</li>
    </ul>`;
}
