const container = document.querySelector("#container");
container.innerHTML = ` 
<section>
    <div>
        <h2 class="c07">.<span class="c06 spacing">${pageTitle02}</span></h2>
        <div>
            <label for="categories">Filter:</label>
            <select name="categories" id="categories"></select>
        </div>
    </div>
    <div id="articleContainer"></div>
</section>`;

let cardWidth = validateWidth();
let cardNewSize = 0;
let cardOffset = 0;

function validateWidth() {
    if (window.innerWidth <= 767) {
        return 3;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 991) {
        return 6;
    }
    if (window.innerWidth >= 992) {
        return 9;
    }
}

function blog(posts, categories) {
    const select = document.querySelector("#categories");

    categories.forEach((value) => {
        if (value.slug === "none") {
            select.innerHTML += `
            <option value="${value.id}" selected>${value.name}</option>`;
        } else {
            select.innerHTML += `
            <option value="${value.id}">${value.name}</option>`;
        }
    });

    // Filter
    let postsFilter = posts;

    select.onchange = (event) => {
        const filter = categories.filter((result) => String(result.id) === event.target.value)[0].id;

        postsFilter = posts.filter((value) => value.categories[0] === filter);

        if (postsFilter.length === 0) {
            cardWidth = validateWidth();
            postsFilter = posts;
            article(postsFilter);
        } else {
            article(postsFilter);
        }
    };

    article(postsFilter);

    window.addEventListener("scroll", () => {
        setTimeout(() => {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2) {
                cardWidth = cardNewSize + validateWidth();
                cardNewSize += validateWidth();
                article(postsFilter);
            }
        }, 600);
    });
}

fetchApi();
