const form = document.querySelector('form');
const list = document.querySelector('.gallery-list');
const loader = document.getElementById('loadingIndicator');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = form.querySelector('input').value;
    
    form.reset();
    clearList();

    getData(search);
});

function getData(query) {
    loader.style.display = 'flex';
    
    fetch(`https://pixabay.com/api/?key=50083392-ca7a042b60b5f81ae001ddb50&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            createList(json.hits);
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error.message
            });
        });
}

function createList(data) {
    if (data.length === 0) {
        iziToast.error({
            title: 'Hello',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return;
    }

    const fragment = document.createDocumentFragment();
    
    const markup = data.forEach(({ id, webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => {
        const liItem = document.createElement('li');
        liItem.innerHTML = `<a href="${largeImageURL}"><img class="gallery-img" id="${id}" src="${webformatURL}" alt="${tags}"/></a>
        <ul class="gallery-item-info">
            <li class="info-item"><b>Likes</b><span>${likes}</span></li>
            <li class="info-item"><b>Views</b><span>${views}</span></li>
            <li class="info-item"><b>Comments</b><span>${comments}</span></li>
            <li class="info-item"><b>Downloads</b><span>${downloads}</span></li>
        </ul>`;
        liItem.classList.add('gallery');
        
        fragment.appendChild(liItem);
    });

    list.appendChild(fragment);

    addLoghtBox();

    loader.style.display = 'none';
}

function addLoghtBox() {
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 0,
        captionPosition: 'bottom',
        scrollZoom: false,
        close: true,
        showCounter: false,
    });
    lightbox.refresh();
}

function clearList() {
    list.innerHTML = '';
}