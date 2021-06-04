const container = document.querySelector("#container");
container.innerHTML = `

<section>
    <figure class="banner"></figure>
    <h2 class="c07">.<span class="c06 spacing">${pageTitle01}</span><span class="c07 ">.</span><span class="c05 spacing">${pageTitle02}</span></h2>
   
    <div>
        <button id="arrowSideLeft" aria-label="arrow left">
            <svg class="arrowSide" viewBox="0 0 48 96">
                <polyline  points="32 16 16 48 32 80" />
            </svg>
        </button>
        <div id="articleContainer"></div>
        <button id="arrowSideRight" aria-label="arrow right">
            <svg class="arrowSide" viewBox="0 0 48 96">
                <polyline  points="16 16 32 48 16 80" />
            </svg>
        </button>
    </div>
</section>`;

let cardWidth = validateWidth();
let cardOffset = 0;

function validateWidth() {
    if (window.innerWidth <= 767) {
        return 1;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 991) {
        return 2;
    }
    if (window.innerWidth >= 992) {
        return 3;
    }
}

function index(media, pages, posts) {
    // Banner
    const bannerPage = pages.filter((value) => value.slug === "welcome").map((value) => value)[0];
    const bannerImage = media.filter((value) => value.id === bannerPage.featured_media).map((value) => value)[0];

    document.querySelector(".banner").innerHTML = `
    <img src="${bannerImage.media_details.sizes.full.source_url}" alt="${bannerImage.alt_text}">
    <p class="h4 fw600">${bannerPage.content.rendered.replace(/<\/?p>/g, "")}</p>`;

    const arrowSideLeft = document.querySelector("#arrowSideLeft");
    const arrowSideRight = document.querySelector("#arrowSideRight");

    arrowSideLeft.addEventListener("click", () => {
        cardWidth -= validateWidth();
        cardOffset -= validateWidth();

        if (cardWidth <= validateWidth()) {
            cardWidth = validateWidth();
            cardOffset = 0;
        }
        article(posts);
    });

    arrowSideRight.addEventListener("click", () => {
        cardWidth += validateWidth();
        cardOffset += validateWidth();
        article(posts);
    });

    article(posts);
}

fetchApi();
