const container = document.querySelector("#container");

function about(media, users) {
    const author = media.filter((value) => value.slug === "author").map((value) => value)[0];
    container.innerHTML = ` 
    <section>
        <div class="section-description">
            <h2 class="c07">.<span class="c06 spacing">${pageTitle02}</span></h2>
            <p class="shadow bg01">${users[0].description}</p>
        </div>
        <div class="section-media">
            <img src="${author.media_details.sizes.large.source_url}" alt="${author.alt_text}">
            <span>
                <a href="#" class="cv">cv</a>
                <a href="#" class="linkedIn">in</a>
            </span>
        </div>
    </section>`;
}

fetchApi();
