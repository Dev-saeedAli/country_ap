// selectors
let modes = document.querySelectorAll(".modes");
let navbar = document.querySelector(".navbar");
let navbarBrand = document.querySelector(".navbar-brand");
let mainContainer= document.querySelector(".mainContainer");
let inputSearch= document.querySelector("#inputSearch");
let formSelect = document.querySelector(".form-select");
let cardMain = document.querySelectorAll(".cardMain");
let populationSpan = document.querySelectorAll(".populationSpan");
let backBtn = document.querySelector("#backBtn");
let cardInfo= document.querySelector(".card-infos");
let form = document.querySelector(".form-group")
let infos= document.querySelector("#info")
let cardInfoContainer = cardInfo.querySelector(".container")





fetchData() //call for displaying when page loads



// fetch items from api and displaying when app first loads
 function fetchData(){
    let baseUrl = "https://restcountries.com/v3.1/all"
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => getAllCountries(data))
}



// filtering out all countries and displaying 
function getAllCountries(countries){
    let html = ""
   let countryfiltered =  countries.filter(country => {
     return country
   });
  countryfiltered.map(item => {
    // console.log(item);
                html += `
                <div class="justify-content-center col-lg-3 col-md-4 mt-3 mb-3">
                                <div onClick="(countryDetails('${item.cca3}'))"  class="card bg-blue shadow cardMain" >
                                <div class="card-header">
                                <img src="${item.flags.svg}" class="m-auto" alt="${item.name.common}">
                                </div
                                <div class="card-body px-2">
                                <h3 class="px-2">${item.name.common}</h3>
                                <div class="info d-flex flex-column px-2">
                                    <small>Population: &nbsp;<span class="text-white-50 populationSpan">${item.population}</span></small> 
                                    <small>Region: ${item.region}</small> 
                                    <small>Capital: ${item.capital}</small> 
                                </div>
                                </div>
                            </div>
                        </div>
                `
            })
            document.querySelector(".allCountries").innerHTML += html;
}



// This country pass the id on to "getSelectedCountry" function to fetch the same country 
function countryDetails(id){
    let baseUrl = `https://restcountries.com/v3.1/alpha/${id}`
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => getSelectedCountry(data))
    
    cardInfo.classList.remove("d-none")
    mainContainer.classList.add("d-none")
}   
// going back from cardInfo screen to mainContainer
function backToScreen(){
    mainContainer.classList.remove("d-none")
    cardInfo.classList.add("d-none")
}


// this function gets the id of the clicked card and research the item and display in cardIfo section.
function getSelectedCountry(items){
    let html = ""
   items.map(item =>{
    // console.log(item);
    html += `
    <button onClick="(backToScreen())" id="backBtn" class="btn btn-secondary shadow"><span><i class="fas fa-arrow-left"></i></span>&nbsp; Back</button>
            <div class="grid mt-5">
            <div class="row align-items-center justify-content-center" id="cards">
                <div class="col-lg-6 shadow me-5">
                <img style="width:100%; height:50vh; object-fit:cover;" text-center" src="${item.flags.svg}" alt="${item.name.common}">
                </div>
                <div class="col-lg-5 main-row mt-5" id="mainrow">
                    <h3>${item.name.common}</h3>
                    <div class="grid">
                        <div class="row mt-4">
                            <div class="col-lg-6 detail-col">
                                <p>Native Name: <span class="text-white-50">${Object.keys(item.name.nativeName)[0]}</span></p>
                                <p>Population: <span class="text-white-50">${item.population}</span></p>
                                <p>Region: <span class="text-white-50">${item.region}</span></p>
                                <p>Sub region: <span class="text-white-50">${item.subregion}</span></p>
                                <p>Capital: <span class="text-white-50">${item.capital ? item.capital : "Nothing found"}</span></p>
                            </div>
                            <div class="col-lg-6 detail-col">
                                <p>Top Level Domain: <span class="text-white-50">${item.tld}</span></p>
                                    <p>Currencies: <span class="text-white-50">${Object.keys(item.currencies)[0]}</span></p>
                                    <p>Languages: <span class="text-white-50">${Object.keys(item.languages)[0]}</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="border-country">
                            <p>Border Countries:
                                ${(item.borders ? item.borders.map(border => (
                                    `
                                    <small class="">${border}</small>
                                    `
                                )):`Not found`)}
                            </p> 
                        </div>

                    </div>
                </div>
            </div>
    `
});
infos.innerHTML = html


   
}
// form submission passing the searched value to searchedCountries function
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    searchedCountries(inputSearch.value)
});

// fetching data of the searched countries and cathing error if not found and if found then passing in to "searcCountry" function
function searchedCountries(search){
    let baseUrl = `https://restcountries.com/v3.1/name/${search}`
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => searchCountry(data)).catch((error) => {
        document.querySelector(".allCountries").innerHTML = `
        <div class="col text-center my-5">
                <p class="text-white">No items Found in the name of "${search}" Try again...</p>
         </div>
        `;
    })

}
// getting the fetched data from searchCountries and displaying in ui
   function searchCountry(names){
       let html = ""
       document.querySelector(".allCountries").innerHTML = "";
       names.map(item =>{
        html += `
        <div class="col-lg-3 col-md-4 my-4 ">
                    <div onClick="(countryDetails('${item.cca3}'))" class="card bg-blue shadow cardMain">
                        <div class="card-header">
                            <img src="${item.flags.png}" class="img-fluid alt="${item.name.common}">
                        </div>
                        <div class="card-body">
                            <h3>${item.name.common}</h3>
                            <div class="info d-flex flex-column">
                                <small>Population: &nbsp;<span class="text-white-50 populationSpan">${item.population}</span></small> 
                                <small>Region: ${item.region}</small> 
                                <small>Capital: ${item.capital}</small> 
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
    document.querySelector(".allCountries").innerHTML += html;
   }

// function to get country name depending on the select region filter
function selectRegion(option){
    let baseUrl = `https://restcountries.com/v3.1/region/${option}`
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => selectedRegion(data))
}

// getting the items from "selectRegion" and displaying in ui
function selectedRegion(option){
    let html = ""
    document.querySelector(".allCountries").innerHTML = "";
    option.map(item =>{
        html += `
                <div class="col-lg-3 col-md-4 my-4 ">
                <div onClick="(countryDetails('${item.cca3}'))"  class="card bg-blue shadow cardMain">
                    <div class="card-header">
                        <img src="${item.flags.svg}" class="img-fluid" alt="${item.name.common}">
                    </div>
                    <div class="card-body">
                        <h3>${item.name.common}</h3>
                        <div class="info d-flex flex-column">
                            <small>Population: &nbsp;<span class="text-white-50 populationSpan">${item.population}</span></small> 
                            <small>Region: ${item.region}</small> 
                            <small>Capital: ${item.capital}</small> 
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    document.querySelector(".allCountries").innerHTML += html;
}


// onchange passing the value to selectRegion function
formSelect.addEventListener("change", (e)=>{
    selectRegion(e.target.value)
});

