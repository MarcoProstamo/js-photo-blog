// # Selecting DOM Elements
const postItContainerEl = document.querySelector("#postItContainer");

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
        <div class="card p-3 h-100">
            <img src=${element.url} class="card-img-top" alt="Photo"/>
            <div class="card-body px-0">
            <p class="card-text fs-4 fst-italic text-capitalize">${element.title}<p>
            </div>
        </div>
    </div>
    `;
  });
  container.innerHTML = postItContainerHtml;
}

// # Initialization
async function init() {
  await fetchPhotos();
  handlerHtmlGeneration(photos, postItContainerEl);
}

// # Start
init();
