//-------------- Data Load Function -------------//
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data.slice(0, 20)))

}
//-------------- Display Result Function -------------//
const displayResult = (phones) => {
    const result = document.getElementById('display-result');

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card border border-info rounded shadow-lg p-3 mb-5 bg-body rounded">
            <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
            <div class="card-body">
                <h5 class="card-title px-5">${phone.brand}</h5>
                <p class="card-text px-5">${phone.phone_name}</p>
                <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-info px-5 mx-5 w-75">Details</button>
            </div>
        </div>`
        result.appendChild(div);

    });

}
const loadDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDitails(data.data))

}
const displayDitails = info => {
    console.log(info)
    const result = document.getElementById('display-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>`
    result.appendChild(div);

}
