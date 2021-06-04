// Logo
if (extractName === "post") {
    document.getElementById("logo").innerHTML = ` 
        <a class="c08" href="./index.html">dA</a>
        <span class="c07">.</span>
        <a class="c06" href="./blog.html">blog</a>
        <span class="c07">.</span>
        <span>${pageName}</span>`;
} else {
    document.getElementById("logo").innerHTML = ` 
    <a class="c08" href="./index.html">dA</a>
    <span class="spacing c07">.</span>
    <span>${pageName}</span>`;
}

// Nav Bar
const overlay = document.querySelector(".overlay");
const navBar = document.querySelector("#navBar");

navBar.innerHTML = `
    <div id="navBar-icon" class="pointer">
        <span></span>
        <span></span>
    </div>
    <div id="navBar-links" class="h3">
        <div>
            <a class="navBar-link" href="./index.html" >home</a>
            <a class="navBar-link" href="./blog.html" >blog</a>
            <a class="navBar-link" href="./about.html" >about</a>
            <a class="navBar-link" href="./contact.html" >contact</a>
        </div>
    </div>`;

const navBarIcon = document.querySelector("#navBar-icon");

function navAction(event) {
    event.preventDefault();
    if (event.type === "click") {
        navBar.classList.toggle("open");
        overlay.classList.toggle("open");
    }
    if (event.type === "mouseenter") {
        navBarIcon.classList.remove("leave");
        navBarIcon.classList.add("enter");
    }
    if (event.type === "mouseleave") {
        navBarIcon.classList.remove("enter");
        navBarIcon.classList.add("leave");
    }
}

function navScroll(event) {
    event.preventDefault();

    if (event.type === "scroll" && overlay.className.match("open")) {
        navBar.classList.toggle("open");
        overlay.classList.toggle("open");
        navBarIcon.classList.remove("enter");
        navBarIcon.classList.add("leave");
    }
}

navBarIcon.addEventListener("mouseenter", navAction);
navBarIcon.addEventListener("mouseleave", navAction);
navBarIcon.addEventListener("click", navAction);
overlay.addEventListener("click", navAction);
window.addEventListener("scroll", navScroll);

// Tab navigation
body.addEventListener("keyup", (event) => {
    if (event.target.classList.value === "navBar-link") {
        navBarIcon.classList.remove("leave");
        navBarIcon.classList.add("enter");

        navBar.classList.add("open");
        overlay.classList.add("open");
    } else {
        navBarIcon.classList.remove("enter");
        navBarIcon.classList.add("leave");

        navBar.classList.remove("open");
        overlay.classList.remove("open");
    }
});
