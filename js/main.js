// # Selecting DOM Elements
let postItContainerEl, layoverEl, btnCloseLayoverEl, layoverImage;
addEventListener("load", () => {
  postItContainerEl = document.querySelector("#postItContainer");
  layoverEl = document.querySelector("#layover");
  btnCloseLayoverEl = document.querySelector("#btnCloseLayover");
  layoverImage = document.querySelector("#layoverImage");
  init();
});

// # Post-It Request
let postIt = [];
/**
 *
 * Retrieve datas from a given link via Fetch
 *
 * @param {string} link
 */
async function fetchPostIt(link) {
  const result = await fetch(link);
  if (!result.ok) throw new Error(result.status);
  const data = await result.json();
  postIt = data;
}

// # Post-It Generation
let postItContainerHtml = ``;
/**
 *
 * Generate Post-It
 *
 * @param {NodeList} postIt
 * @param {Node} postItContainer
 */
function generatePostIt(postIt, postItContainer) {
  postIt.forEach((postIt) => {
    postItContainerHtml += `
    <div class="col-12">
        <div class="card p-3 pb-0 h-100 position-relative border-0">
            <img src="./img/pin.svg" class="position-absolute top-0 start-50 translate-middle" alt="Pin" data-element="pin"/>
            <img src=${postIt.url} class="card-img-top" alt="Photo" data-element="photo"/>
            <div class="card-body px-0">
            <p class="card-text fs-4 fst-italic text-capitalize edu-tas-beginner-light">${postIt.title}<p>
            </div>
        </div>
    </div>
    `;
  });
  postItContainer.innerHTML = postItContainerHtml;
}

// # Retrieve Post-It Elements
let postItEl, postItPhotosEl, postItPinEl;
/**
 *
 * Retrieves all the component of a Post It
 *
 */
function retrievePostItElements() {
  postItEl = document.querySelectorAll(".card");
  postItPhotosEl = document.querySelectorAll("[data-element='photo']");
  postItPinEl = document.querySelectorAll("[data-element='pin']");
}

// # Layover
// * Layover → Close
/**
 *
 * Close Layover
 *
 */
function closeLayover() {
  layoverEl.classList.add("d-none");
}
// * Event Listener → Close
addEventListener("load", () => {
  btnCloseLayoverEl.addEventListener("click", closeLayover);
  layoverEl.addEventListener("click", (event) => {
    if (event.target === layoverEl) closeLayover();
  });
});

// * Layover → Open
/**
 *
 * Open Layover and set the image url
 *
 * @param {Node} postItPhotoEl
 */
function openLayover(postItPhotoEl) {
  layoverImage.src = postItPhotoEl.src;
  layoverEl.classList.remove("d-none");
}
// * Event Listener → Open
/**
 *
 * Adds the OnClick to all Post It Photos
 *
 */
function postItPhotoEventHandler() {
  postItPhotosEl.forEach((postItPhotoEl) => {
    postItPhotoEl.addEventListener(
      "click",
      openLayover.bind(this, postItPhotoEl)
    );
  });
}

// # Post-It Animation
// * Animation Handler
/**
 *
 * Starts or Ends the Post It animation
 *
 * @param {string} state Expected values: "start" or "close"
 * @param {Node} postIt
 * @param {number} postItIndex
 */
function animationHandler(state, postIt, postItIndex) {
  switch (state) {
    case "start":
      postIt.classList.remove("effectsDeactive");
      postIt.classList.add("effectsActive");
      postItPinEl[postItIndex].classList.add("d-none");
      break;
    case "end":
      postIt.classList.remove("effectsActive");
      postIt.classList.add("effectsDeactive");
      postItPinEl[postItIndex].classList.remove("d-none");
      break;
  }
}
// * Animation Events Listener
/**
 *
 * Adds "Mouse Over" and "Mouse Leave" events listener to all the Post It
 *
 */
function postItAnimation() {
  postItEl.forEach((postIt, postItIndex) => {
    postIt.addEventListener(
      "mouseover",
      animationHandler.bind(this, "start", postIt, postItIndex)
    );
    postIt.addEventListener(
      "mouseleave",
      animationHandler.bind(this, "end", postIt, postItIndex)
    );
  });
}

// # Initialization
/**
 *
 * Initialize page
 *
 */
async function init() {
  await fetchPostIt("https://jsonplaceholder.typicode.com/photos?_limit=6");
  generatePostIt(postIt, postItContainerEl);
  retrievePostItElements();
  postItPhotoEventHandler();
  postItAnimation();
}
