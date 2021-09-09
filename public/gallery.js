"use strict";
const galleryUrl = new URL('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery');
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let pageNumber;
if (localStorage.getItem('page')) {
    pageNumber = localStorage.getItem('page');
}
else {
    localStorage.setItem('page', "1");
    pageNumber = localStorage.getItem('page');
}
const pageSearch = /\?page=[1-5]/g;
if (location.search.match(pageSearch)) {
    localStorage.setItem('page', params.page);
    pageNumber = localStorage.getItem('page');
}
createGalleryPage(pageNumber);
const gallery = document.getElementById('gallery');
const btnBack = document.getElementById('back');
const btnNext = document.getElementById('next');
async function fetchPhotos(fetchurl) {
    let token = localStorage.getItem('token');
    if (token) {
        try {
            let response = await fetch(fetchurl, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });
            let data = await response.json();
            return data.objects;
        }
        catch (err) {
            console.log(err);
        }
    }
}
async function createGalleryPage(pageNumber) {
    try {
        await displayPhotos(pageNumber);
        checkTime();
        updateLocation();
    }
    catch (err) {
        alert(err.message);
    }
}
async function displayPhotos(pageNumber) {
    try {
        let newUrl = 'https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=' + pageNumber;
        let fetchedPhotos = await (fetchPhotos(newUrl));
        gallery.innerHTML = "";
        fetchedPhotos.forEach((item) => gallery.innerHTML += `<img src=${item} height='400'
        width='400' style="object-fit: cover">`);
    }
    catch (err) {
        alert(err.message);
    }
}
function checkTime() {
    let timeNow = new Date();
    if (timeNow.getUTCMinutes() - Number(localStorage.getItem('time')) >= 10) {
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        document.location.replace('../index.html');
    }
}
function updateLocation() {
    if (location.search != `?page=${localStorage.getItem('page')}`) {
        location.search = `?page=${localStorage.getItem('page')}`;
    }
}
btnBack.addEventListener('click', function () {
    pageNumber = previousPage(pageNumber);
    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});
btnNext.addEventListener('click', function () {
    pageNumber = nextPage(pageNumber);
    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});
// function changePageNumber(pageNumber: string, sign: string): string{
//     if(sign === "-"){
//         pageNumber = `${+pageNumber - 1}`;
//         if(+pageNumber < 1){
//             pageNumber = `${+pageNumber + 5}`;
//         }
//         localStorage.setItem('page', pageNumber);
//     } else if(sign === '+'){
//         pageNumber = `${+pageNumber + 1}`;
//         if(+pageNumber > 5){
//             pageNumber = `${+pageNumber - 5}`;
//         }
//         localStorage.setItem('page', pageNumber);
//     }
//     console.log(pageNumber)
//     return pageNumber;
// }
function nextPage(pageNumber) {
    pageNumber = `${+pageNumber + 1}`;
    if (+pageNumber > 5) {
        pageNumber = `${+pageNumber - 5}`;
    }
    localStorage.setItem('page', pageNumber);
    console.log(pageNumber);
    return pageNumber;
}
function previousPage(pageNumber) {
    pageNumber = `${+pageNumber - 1}`;
    if (+pageNumber < 1) {
        pageNumber = `${+pageNumber + 5}`;
    }
    localStorage.setItem('page', pageNumber);
    console.log(pageNumber);
    return pageNumber;
}
