let currentMangaList
let authToken

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//login and JWT token fetch
/*
const user = {
    "username": "string",
    "email": "string",
    "password": "stringst"
}

const help = btoa(`${user.username}:${user.email}:${user.password}`)

const  authOptions  = { 
    method: "POST",
    body: JSON.stringify(user),
    headers: {
        'content-type': 'application/json',
        //'Authorization': `Basic ${help}`
    },
    mode:"cors"
}

fetch('https://api.mangadex.org/auth/login', authOptions)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        dataStore = data
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
*/

//-==========================================================================================-//
//get list of manga

let mangaTitle
let mangaAltTitle
let mangaDescriptionEN = ''
let MangaLastVolume
let MangaLastChapter
let mangaID
let MangaContentRating
let offset = getRandomInt(11000)
let oneOfTen = getRandomInt(10)
let dataStore

let mangaCover


/* -== old ==-
const mangaOptions = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    mode: "cors"
}

fetch(`https://api.mangadex.org/manga?limit=10&offset=${offset}`, mangaOptions)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      dataStore = data
      

      mangaTitle = data.data[oneOfTen].attributes.title.en
      mangaAltTitle = data.data[oneOfTen].attributes.altTitles[0].en
      mangaDescriptionEN = data.data[oneOfTen].attributes.description.en
      mangaID = data.data[oneOfTen].id
      lastVolume = data.data[oneOfTen].attributes.lastVolume
      lastChapter = data.data[oneOfTen].attributes.lastChaper

      //ex: data.data[0].attributes.title.en
      //https://api.mangadex.org/swagger.html#/Manga/get-search-manga
      
    })

    .catch(err => {
        console.log(`error ${err}`)
    });
*/

function arrToUl(root, arr){
  for (let i = 0; i < arr.length; i++){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(arr[i].attributes.name.en))
    root.appendChild(li)
  }
}

//better way to get manga stuff

async function getMangaStuff(url =''){
  const res = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
  });
  return res.json();
}


getMangaStuff(`https://api.mangadex.org/manga?limit=10&offset=${offset}&includes[]=author&includes[]=artist&includes[]=cover_art`)
  .then(data => {
    console.log(data)
    dataStore = data

    document.querySelector('#mangaTitle').innerText = data.data[oneOfTen].attributes.title.en
    /*document.querySelector('#altTitle').innerText += ` ${data.data[oneOfTen].attributes.altTitles[1].en}`
    if (document.querySelector('#altTitle').innerText === 'Alt title: undefined')
      document.querySelector('#altTitle').remove()*/
    description = data.data[oneOfTen].attributes.description.en
    mangaID = data.data[oneOfTen].id
    lastVolume = data.data[oneOfTen].attributes.lastVolume
    lastChapter = data.data[oneOfTen].attributes.lastChaper
    
    //get manga cover
    let relNumCover = 0
    while(!data.data[oneOfTen].relationships[relNumCover].attributes.fileName){
      ++relNumCover
      if (relNumCover == 5)
        break;
    }
    document.querySelector('#coverArt').src = `https://uploads.mangadex.org/covers/${mangaID}/${data.data[oneOfTen].relationships[relNumCover].attributes.fileName}`
    
    //get link to manga
    document.querySelector('#linkToManga').href = `https://mangadex.org/manga/${mangaID}`

    
    //get tags and add them to DOM
    let mangaTags = data.data[oneOfTen].attributes.tags
    arrToUl(document.querySelector('#tags'), mangaTags)

    //if description is not empty add it to DOM
    if (description != undefined){
      document.querySelector('#description').innerText = description
    }

  });

//sidenav
document.querySelector('.openNavBtn').addEventListener('click', () => {
  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  document.getElementById("mySideNav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
})
document.querySelector('.closeNavBtn').addEventListener('click', () => {
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  document.getElementById("mySideNav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
})

//post fetch ref
/*async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  postData('https://api.mangadex.org/auth/login', user)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });*/

  //compression for storing imgs on local storage
  //https://github.com/pieroxy/lz-string
