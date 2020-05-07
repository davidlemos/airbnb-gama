const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsContainer = document.querySelector("#accommodations");
const paginationContainer = document.querySelector("#pagination");
const numAccomodationsPage = 9;
let accomodations = [];
let localization;
let days;
let guests;

async function fetchCards() {
  let response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.map(renderCard);
}

function renderCard(card) {
  const div = document.createElement("div");
  div.className = "card m-1 mb-2";
  div.style= "width: 30%; min-width: 300px"
  div.innerHTML = `
  <img
    src="${card.photo}"
    alt="${card.name}"
    class="card-img-top"
  />
  <div class="card-description p-1">
    <div class="card-type mb-1">${card.property_type}</div>
    <h1 class="card-name mb-2">${card.name}</h1>
    <h3 class="card-price"><span>R$${card.price}</span>,00/noite</h3>
    <h3 class="card-price">Total de R$${card.price * days * guests},00</h3>
  </div>
  `;

  cardsContainer.appendChild(div);
}

function paginateAccomodations(page){
  console.log(page);
  cards =[];
  for(let i= numAccomodationsPage*(page-1); i < numAccomodationsPage*page; i++){
    if(i < accomodations.length)
      cards.push(accomodations[i]);
  }
  console.log(cards)
  renderCards(cards);
}

function pagination(){
  
  totalPages = Math.ceil(accomodations.length/numAccomodationsPage);
  paginationContainer.innerHTML = "";
  console.log(totalPages)
  for(let i= 1; i <= totalPages; i++){    
    renderPagination(i);
  }
  

  
}

function renderPagination(page) {
  const li = document.createElement("li");
  li.className = "page-item";
  li.innerHTML = `
    <a class="page-link" href="#void" onclick="paginateAccomodations(${page});">${page}</a>
  `;

  paginationContainer.appendChild(li);
}

async function show() {
  accomodations = await fetchCards();

  if(accomodations[0]) {
    paginateAccomodations(1);  
    pagination();  
  }
}

function listAccomodations(event){
  event.preventDefault();
  console.log("teste")
  localization = document.querySelector("#localization").value;
  days = document.querySelector("#days").value;
  document.querySelector("#guests").value != '' ? guests = document.querySelector("#guests").value : guests = 1;  

  console.log(guests)

  document.querySelector("#optionsToLocalization").innerHTML  = `Opções de hospedagem para ${localization}`;
  document.querySelector("#filters").innerHTML = `
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('casa')">Casa</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('apartamento')">Apartamento</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('Chácara')">Chácara</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('Estúdio')">Estúdio</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('Loft')">Loft</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('Quarto')">Quarto</button>
  <button type="button" class="btn btn-outline-secondary btn-sm mr-1" onClick="filterBy('Sítio')">Sítio</button>
  `
  show();
}

async function filterBy(filtro){
  console.log(filtro)
  accomodations = await fetchCards();

  if(accomodations[0]) {
    accomodations = accomodations.filter( accomodation => {
      return accomodation.property_type.toLowerCase() == filtro.toLowerCase();
    })
    paginateAccomodations(1);  
    pagination();  
  }
}

