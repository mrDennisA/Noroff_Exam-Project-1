const container = document.querySelector("#container");

container.innerHTML = ` 
<form>
    <div class="message shadow"><span>Your message has been successfully sent.</span></div>
    <h2 class="c07">.<span class="c06 spacing">${pageTitle02}</span></h2>
    <div>
        <div class="inputContainer">
            <label for="contactName">
                <span>name</span>
                <span>*</span>
                <span class="fs14 c07">(min 5 characters)</span>
            </label>
            <input type="text" name="contactName" id="contactName" class=" fs20 bg01"> 
            <span class="contactName-message fs14">Please enter your name, min 5 characters</span>
        </div>
        <div class="inputContainer">
            <label for="contactEmail">
                <span>email</span>
                <span>*</span>
                <span class="fs14 c07">(valid email address)</span>
            </label>
            <input type="email" name="contactEmail" id="contactEmail" class="fs20 bg01">
            <span class="contactEmail-message fs14">Please enter a valid email address</span>
        </div>
        <div class="inputContainer">
            <label for="contactSubject">
                <span>subject</span>
                <span>*</span>
                <span class="fs14 c07">(min 15 characters)</span>
            </label>
            <textarea name="contactSubject" id="contactSubject" class="autoExpand fs20 bg01"></textarea>
            <span class="contactSubject-message fs14">Please enter min 15 characters</span>
        </div>
        <div class="inputContainer">
            <label for="contactMessage">
                <span>message</span>
                <span>*</span>
                <span class="fs14 c07">(min 25 characters)</span>
            </label>
            <textarea name="contactMessage" id="contactMessage" class="autoExpand fs20 bg01" rows="3"></textarea>
            <span class="contactMessage-message fs14">Please enter min 25 characters</span>    
        </div>
    </div>
    <button class="h3 pointer">submit</button>  
</form>`;

// Validate Contact Form
const contactForm = document.querySelector("form");

const contactName = document.querySelector("#contactName");
const contactNameFalse = document.querySelector(".contactName-message");
const contactEmail = document.querySelector("#contactEmail");
const contactEmailFalse = document.querySelector(".contactEmail-message");
const contactSubject = document.querySelector("#contactSubject");
const contactSubjectFlase = document.querySelector(".contactSubject-message");
const contactMessage = document.querySelector("#contactMessage");
const contactMessageFalse = document.querySelector(".contactMessage-message");

const inputFalse = document.querySelector(".false");
const message = document.querySelector(".message span");

function inputName(event) {
    event.preventDefault();
    message.style.display = "none";
    if (validateName(contactName.value) && checkLength(contactName.value, 4)) {
        contactNameFalse.style.display = "none";
        contactName.classList.remove("false");
        return true;
    }
    return false;
}

function inputEmail(event) {
    event.preventDefault();
    message.style.display = "none";
    if (validateEmail(contactEmail.value)) {
        contactEmailFalse.style.display = "none";
        contactEmail.classList.remove("false");
        return true;
    }
    return false;
}

function inputSubject(event) {
    event.preventDefault();
    message.style.display = "none";
    if (validateName(contactSubject.value) && checkLength(contactSubject.value, 14)) {
        contactSubjectFlase.style.display = "none";
        contactSubject.classList.remove("false");
        return true;
    }
    return false;
}

function inputMessage(event) {
    event.preventDefault();
    message.style.display = "none";
    if (validateName(contactMessage.value) && checkLength(contactMessage.value, 24)) {
        contactMessageFalse.style.display = "none";
        contactMessage.classList.remove("false");
        return true;
    }
    return false;
}

function validateForm(event) {
    event.preventDefault();
    message.style.display = "none";

    if (!inputName(event)) {
        contactNameFalse.style.display = "block";
        contactName.classList.add("false");
    }
    if (!inputEmail(event)) {
        contactEmailFalse.style.display = "block";
        contactEmail.classList.add("false");
    }
    if (!inputSubject(event)) {
        contactSubjectFlase.style.display = "block";
        contactSubject.classList.add("false");
    }
    if (!inputMessage(event)) {
        contactMessageFalse.style.display = "block";
        contactMessage.classList.add("false");
    }

    if (inputName(event) && inputEmail(event) && inputSubject(event) && inputMessage(event)) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        message.style.display = "flex";
        contactForm.reset();
    }
}

// Validate Lenght
function checkLength(value, length) {
    if (value.trim().length > length) {
        return true;
    } else {
        return false;
    }
}

// Validate Name
function validateName(name) {
    const regEX = /^[a-zA-ZæøåÆØÅ0-9,. \r\n]*$/;
    const patternMatches = regEX.test(name);

    return patternMatches;
}

// Validate Email
function validateEmail(email) {
    const regEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEX.test(email);
    return patternMatches;
}

contactName.addEventListener("input", inputName);
contactEmail.addEventListener("input", inputEmail);
contactSubject.addEventListener("input", inputSubject);
contactMessage.addEventListener("input", inputMessage);
contactForm.addEventListener("submit", validateForm);

// TextAria Auto Expand
const textarea = document.querySelectorAll(".autoExpand");

function autoExpand(event) {
    event.preventDefault();

    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}

textarea.forEach((value) => {
    value.addEventListener("input", autoExpand);
});

//Page Off loader
pageOffLoader();
