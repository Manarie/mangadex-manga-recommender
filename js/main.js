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
let mangaDescriptionEN
let lastVolume
let lastChapter
let mangaID
let offset = getRandomInt(48461)
let oneOfTen = getRandomInt(10)
let dataStore



const mangaOptions = {
    method: 'GET',
    headers: {
      'Origin': 'HTTP://http://127.0.0.2:3800/',
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    mode: "cors"
}

fetch(`https://api.mangadex.org/manga?limit=10&offset=0`, mangaOptions)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      dataStore = data
      

      mangaTitle = data.Object[0].title.en
      mangaAltTitle = data.Object[0].altTitles[0]
      mangaDescriptionEN = data.Object[0].description.en
      //linkToManga = data.Object[oneOfTen].links
      //lastVolume = data.Object[oneOfTen]
      //lastChapter = data.Object[oneOfTen]

      //ex: dataStore.data[0].attributes.title.en
      //https://api.mangadex.org/swagger.html#/Manga/get-search-manga
      
    })

    .catch(err => {
        console.log(`error ${err}`)
    });






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

