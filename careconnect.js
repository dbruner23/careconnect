// -----Fixed menu icon animation------

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".nav-item");

// Set the initial state of the menu

let showMenu = false;

function toggleMenu() {
    if (showMenu == false) {
        menuBtn.classList.add("close");
        menu.classList.add("show");
        menuNav.classList.add("show");
        navItems.forEach((item) =>
            item.classList.add("show"));

        // Reset the menu state
        showMenu = true;
    } else {
        menuBtn.classList.remove("close");
        menu.classList.remove("show");
        menuNav.classList.remove("show");
        navItems.forEach((item) =>
            item.classList.remove("show"));

        // Reset the menu state
        showMenu = false;
    }
}

menuBtn.addEventListener("click", toggleMenu);


// ------Profile Modal-------- 

// variables
const modal = document.querySelector('#myModal');
const modalContent = document.querySelector('#modal-interior')
const modalButton = document.querySelector('#profileButton');
const modalClose = document.querySelector('#modal-close');

// functions
let clearForm = () => document.getElementById('myform').reset();

function showModal() {
    modal.style.display = "block";
    modal.style.opacity = "1";
}

let hideModal = () => modal.style.display = "none"; modal.style.opacity = "0"; clearForm();

function altHideModal(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.style.opacity = "0";
        clearForm();
    }
}

// calls
modalButton.addEventListener('click', showModal);
modalClose.addEventListener('click', hideModal);
window.addEventListener('click', altHideModal);

// Photo uploader 
document.querySelector('#myFileInput').addEventListener("change", function () {
    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result)
    });

    reader.readAsDataURL(this.files[0]);
});
   
// ----- Profile creation -------
const createProfile = document.getElementById('create-profile');

let users = [];
const newUser = (e) => {
    e.preventDefault();
    let user = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email-address').value,
        photo: localStorage.getItem("recent-image"),
        intro: document.getElementById('intro').value,
        personType: document.getElementById('person-type').value,
        condition: document.getElementById('condition-type').value
    }
    users.push(user);
    console.log(users);
    alert('New profile Created!');
    localStorage.setItem('UserList', JSON.stringify(users));
    document.location.reload;
    clearForm();
    hideModal();
}

createProfile.addEventListener('click', newUser);

// ------- Lightbox slideshow -------------
const meetMembers = document.querySelector('#meet-members-btn');

meetMembers.addEventListener('click', function (e) {
    e.preventDefault();
    const userData = localStorage.getItem('UserList');
    const users = JSON.parse(userData);
    const lightboxModal = document.getElementById("lightbox-modal");
    const bsModal = new bootstrap.Modal(lightboxModal);
    const lightboxCarousel = document.getElementById("lightboxCarousel");
    // const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
    const modalBody = document.querySelector(".modal-body .container-fluid");
    // const prev = document.querySelector('.carousel-control-prev');
    // const next = document.querySelector('.carousel-control-next');
    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function load() { 
        for (let i = 0; i <= users.length; i++) {
            createCarousel(users[i]);
            bsModal.show();
            await timer(3000); 
        }
    }

    load();
      
    function createCarousel(user) {
        const markup = `
        <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">
                ${createSlides(user)}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>    
        </div>
        `;
        modalBody.innerHTML = markup;
    }

    function createSlides(user) {
        const imgSrc = user.photo;
        const intro = user.intro;
        const name = user.name;
        let markup = "";
        markup += `
        <div class="carousel-item active">
            <img src=${imgSrc}>
            <div class="carousel-caption">
                <h2>${name}</h2>
                <p class="m-0">${intro}</p>
            </div>
        </div>
    </div>
    `;
        return markup;
    }
});







// for (user of users) {
            // const prev = document.querySelector('.carousel-control-prev');
            // const next = document.querySelector('.carousel-control-next');
            // const index = users.indexOf(user);
            // const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
            // prev.addEventListener('click', function (e) {
            //     e.preventDefault();
            //     console.log("Previous");
            //     bsCarousel.to(index - 1);
            // })
            // next.addEventListener('click', function (e) {
            //     e.preventDefault();
            //     console.log("Next");
            //     bsCarousel.to(index + 1);
            // })