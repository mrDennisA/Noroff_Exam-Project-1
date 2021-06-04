// Article
const articleContainer = document.querySelector("#articleContainer");

function article(data) {
    articleContainer.innerHTML = "";
    for (let i = cardOffset; i < cardWidth; i++) {
        if (data[i] !== undefined) {
            // Extract Text
            const featuredImage = data[i]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
            const featuredImageAlt = data[i]._embedded["wp:featuredmedia"][0].alt_text;

            const formatDate = new Date(data[i].date).toLocaleString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            articleContainer.innerHTML += `
                <article>
                    <a href="./post.html?id=${data[i].id}">
                        <img class="featured-image" src="${featuredImage}" alt="${featuredImageAlt}">
                    </a>
                    <div>
                        <div class="description">
                            <h3 class="fw400">
                                <a href="./post.html?id=${data[i].id}">${data[i].title.rendered}</a>
                            </h3>
                        </div>
                        <div class="author fs14">
                            <span class="c07">by <a class="c06" href="./about.html"> ${data[i]._embedded.author[0].name}</a></span>
                            <div class="c07">${formatDate}</div>
                        </div>
                    </div>

                </article>`;
        }

        // Validate Arrow visibility
        if (pageName === "home") {
            if (cardOffset <= 0) {
                arrowSideLeft.style.display = "none";
            } else {
                arrowSideLeft.style.display = "grid";
            }
            if (cardWidth >= data.length) {
                arrowSideRight.style.display = "none";
            } else {
                arrowSideRight.style.display = "grid";
            }
        }
    }
}
