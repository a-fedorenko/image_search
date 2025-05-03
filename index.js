const form = document.querySelector('form');
const list = document.querySelector('.gallery');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = form.querySelector('input').value;
    
    form.reset();
    clearList();

    getData(search);
});

async function getData(query) {
    const url = "https://example.org/products.json";
    try {
      const response = await fetch(`https://pixabay.com/api/?key=50083392-ca7a042b60b5f81ae001ddb50&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json.hits);
      createList(json.hits);
    } catch (error) {
      console.error(error.message);
    }
}

function createList(data) {
    if (data.length === 0) {
        iziToast.info({
            title: 'Hello',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        })
        return;
    }
    
    data.forEach(({ id, webformatURL, likes, views, comments, downloads, tags }) => {
        const liItem = document.createElement('li');
        liItem.innerHTML = `<img class="gallery-img" id="${id}" src="${webformatURL}" alt="${tags}"/>
        <ul class="gallery-item-info">
            <li class="info-item"><b>Likes</b><span>${likes}</span></li>
            <li class="info-item"><b>Views</b><span>${views}</span></li>
            <li class="info-item"><b>Comments</b><span>${comments}</span></li>
            <li class="info-item"><b>Downloads</b><span>${downloads}</span></li>
        </ul>`;
        liItem.classList.add('gallery-item');
        list.appendChild(liItem);
    });
}

function clearList() {
    list.innerHTML = '';
}