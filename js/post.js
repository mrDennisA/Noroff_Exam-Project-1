function article(article) {
    const container = document.querySelector("#container");

    const featuredImage = article._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    const featuredImageAlt = article._embedded["wp:featuredmedia"][0].alt_text;
    const formatDate = new Date(article.date).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // console.log(article);

    document.querySelector("title").innerHTML += ` - ${article.title.rendered}`;

    container.innerHTML = `
        <section>
            <button class="arrowBack pointer" aria-label="arrow back">
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </button>
            <div>
                <div class="title">
                    <div class="fs14">
                        <span class="c07">by <a class="c06" href="./about.html">${article._embedded.author[0].name}</a></span>
                        <span class="c07">${formatDate}</span>
                    </div>
                    <h2 class="c07">.<span class="c05 spacing">${article.title.rendered}</span></h2>
                </div>
                <figure class="featured">
                    <img src="${featuredImage}" alt="${featuredImageAlt}">
                </figure>
                <div class="description shadow bg01">
                    ${article.content.rendered}
                </div>
            </div>
        </section>`;

    // Modal
    const modalContainer = document.querySelector("#modalContainer");
    const modal = document.querySelectorAll("figure img");

    modal.forEach((enlarge) => {
        enlarge.addEventListener("click", (event) => {
            body.style.overflow = "hidden";
            modalContainer.style.display = "grid";
            modalContainer.innerHTML = `
                    <div class="modal">
                        <div class="close pointer" data-id="overlay"><span></span><span></span></div>
                        <img class="shadow-radius" src="${event.target.currentSrc}"/>
                    </div>`;

            function closeModal(event) {
                if (event.target.dataset.id === "overlay") {
                    body.style.overflow = "unset";
                    modalContainer.style.display = "none";
                    modalContainer.innerHTML = "";
                }
            }

            modalContainer.addEventListener("click", closeModal);
        });
    });

    // Back
    const arrowBack = document.querySelector(".arrowBack");
    arrowBack.addEventListener("click", () => {
        history.back(-1);
    });
}

fetchApi();
