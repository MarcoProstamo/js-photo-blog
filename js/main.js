// # Selecting DOM Elements
const postItContainerEl = document.querySelector("#postItContainer");
const layoverEl = document.querySelector("#layover");
const btnCloseLayoverEl = document.querySelector("#btnCloseLayover");
const layoverImage = document.querySelector("#layoverImage");

// # Photos Request
let photos = [];
async function fetchPhotos() {
  const result = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=6"
  );
  const data = await result.json();
  photos = data;
}

// # Output Handler
let postItContainerHtml = ``;
function handlerHtmlGeneration(array, container) {
  array.forEach((element) => {
    postItContainerHtml += `
    <div class="col-12">
        <div class="card p-3 pb-0 h-100 position-relative border-0">
            <img src="./img/pin.svg" class="position-absolute top-0 start-50 translate-middle" alt="Pin" />
            <img src=${element.url} class="card-img-top" alt="Photo" data-element="photo"/>
            <div class="card-body px-0">
            <p class="card-text fs-4 fst-italic text-capitalize edu-tas-beginner-light">${element.title}<p>
            </div>
        </div>
    </div>
    `;
  });
  container.innerHTML = postItContainerHtml;
}

// # Handler Layover
let photosEl;
function handlerLayover() {
  photosEl = document.querySelectorAll("[data-element='photo']");
  photosEl.forEach((photo) => {
    photo.addEventListener("click", () => {
      layoverEl.classList.remove("d-none");
      layoverImage.src = photo.src;
    });
  });
}

// * Handler Layover → Event Listener
btnCloseLayoverEl.addEventListener("click", () => {
  layoverEl.classList.add("d-none");
  console.log(layoverEl);
});
layoverEl.addEventListener("click", (event) => {
  if (event.target === layoverEl) {
    layoverEl.classList.add("d-none");
    console.log("click layover");
  }
});

// # Initialization
async function init() {
  await fetchPhotos();
  handlerHtmlGeneration(photos, postItContainerEl);
  handlerLayover();
}

// # Start
init();

// ! TODO:
// 1. Add Bottom Margin to Cork Board 👍
// 2. Change to a much similar Font (See Slack) 👍
// 3. Set Cursor Pointer on Photo Images 👍
// 4. Set Shadow on Cards 👍
// 5. Create an Overlay:
//    a. Black - Alpha .5 👍
//    b. Open on Photo Click 👍
//    c. Close on:
//       i. Button Click 👍
//       ii. Overlay Click 👍
// 6. Animate (fluid) Card when Hovered
//    a. Rotate 10°
//    b. Transition towards me
//    c. Bigger but lighter Shadow
