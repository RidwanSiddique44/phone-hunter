//-------------- Data Load Function -------------//
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    if (searchValue == '') {
        document.getElementById('empty-string')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.data.slice(0, 20)))
    }



}
//-------------- Display Result Function -------------//
const displayResult = (phones) => {
    console.log(phones)
    const result = document.getElementById('display-result');
    result.textContent = '';
    if (phones.length == 0) {
        console.log('error found')
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card border border-info rounded shadow-lg p-3 mb-5 bg-body rounded">
                <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title px-5">${phone.brand}</h5>
                    <p class="card-text px-5">${phone.phone_name}</p>
                    <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-info px-5 mx-5 w-75 text-light fw-bold">Details</button>
                </div>
            </div>`
            result.appendChild(div);

        });

    }

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
    console.log(info)
    const details = document.getElementById('details-output');
    details.textContent = '';
    const releaseDate = info.releaseDate;

    const displayInfo = (date) => {
        const sensors = info.mainFeatures.sensors
        const [a, b, c, d, e, f, g] = sensors;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card border border-danger rounded shadow-lg p-3 mb-5 bg-body rounded">
    <img src="${info.image}" class="card-img-top img-fluid p-md-5 w-50" alt="...">
        <div class="card-body">
          <h4 class="card-title fw-bolder">${info.name}</h4>
          <h6 class="card-title text-danger">${date}</h6>
          <h5 class="card-title">Main Features</h5>

          <p class="card-text"><span class="fw-bolder">Storage:</span> ${info.mainFeatures.storage}</p>
          <p class="card-text"><span class="fw-bolder">Display size:</span> ${info.mainFeatures.displaySize}</p>
          <p class="card-text"><span class="fw-bolder">Chipset:</span> ${info.mainFeatures.chipSet}</p>
          <p class="card-text"><span class="fw-bolder">Sensors:</span> ${a},${b},${c},${d},${e},${f},${g}</p>
          <h5 class="card-title">Other Features</h5>

          <p class="card-text"><span class="fw-bolder">WLAN:</span> ${info.others.WLAN}</p>
          <p class="card-text"><span class="fw-bolder">Bluetooth:</span> ${info.others.Bluetooth}</p>
          <p class="card-text"><span class="fw-bolder">GPS:</span> ${info.others.GPS}</p>
          <p class="card-text"><span class="fw-bolder">USB:</span> ${info.others.USB}</p>
          <p class="card-text"><span class="fw-bolder">NFC:</span> ${info.others.NFC}</p>
          <p class="card-text"><span class="fw-bolder">Radio:</span> ${info.others.Radio}</p>
          

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
