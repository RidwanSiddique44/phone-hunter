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
    result.textContent = '';
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
//-------------- Details Load Function -------------//
const loadDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDitails(data.data))

}
//-------------- Details Result Function -------------//
const displayDitails = info => {
    // console.log(info)
    const details = document.getElementById('details-output');
    details.textContent = '';
    const releaseDate = info.releaseDate;

    const displayInfo = (date) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card border border-danger rounded shadow-lg p-3 mb-5 bg-body rounded">
    <img src="${info.image}" class="card-img-top img-fluid p-md-5 w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${info.name}</h5>
          <h6 class="card-title">${date}</h6>
          <p class="card-text">Storage:${info.mainFeatures.storage}</p>
          <p class="card-text">Display size:${info.mainFeatures.displaySize}</p>
          <p class="card-text">${info.mainFeatures.chipSet}</p>
          

        </div>
        </div>`;

        details.appendChild(div);
    }
    if (releaseDate == '') {
        const date = 'No release date found';
        displayInfo(date);


    }
    else {
        const date = releaseDate;
        displayInfo(date);

    }

}
