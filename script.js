//declare dynamic elements from html
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

//intialise variables to optimise photo loading
let ready = false;
let imgsLoaded = 0;
let totalimgs = 0;

//declare empty array for photos
let photosArray = [];

//Unsplash API
//set api parameters
const maxPhotos = 5;
const apiKey = 'tLzlx1GofWGatxwRYXwnqq1iARY_8lumv0U3KiW9KU4';
const collection = '';
//composite url for api
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${maxPhotos}`;

//Check if all images are uploaded
function imageLoaded() {
    imgsLoaded++;
    if (imgsLoaded === totalimgs) {
        ready = true;
        loader.hidden = true;
        maxPhotos = 30;
    }
}

//Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Create elements for links & photos, add to DOM
function displayPhotos(){
    imgsLoaded = 0;
    totalimgs = photosArray.length;

    //run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event listener, check when each has finished loading
        img.addEventListener("load",imageLoaded);

        //put <img> inside <a>, then put both inside imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

//Get Photos from unsplash
async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error
        console.log(error);
    }
}

//On Load
getPhotos();

//Check if scroll is near bottom, Load More photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});