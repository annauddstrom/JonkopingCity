//get stores by location Väster

async function getStoresVäster() {
    const district = 'Väster'; // Du kan byta ut detta med användarens val
    try {
        const response = await fetch(`/storeDistrict/${district}`);
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

//get stores by location Öster

async function getStoresÖster() {
    const district = 'Öster'; // Du kan byta ut detta med användarens val
    try {
        const response = await fetch(`/storeDistrict/${district}`);
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

//get stores by location other none

async function getStoresOther() {
    const district = null; // Du kan byta ut detta med användarens val
    try {
        const response = await fetch(`/storeDistrict/${district}`);
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

//get all stores

async function allStoresButton() {
    try {
        const response = await fetch('/stores');
        const stores = await response.json();
        console.log(stores)
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

//get stores shopping

async function getStoresShopping() {
    const storeType = 'Shopping'; // Du kan byta ut detta med användarens val
    try {
        const response = await fetch(`/storeType/${storeType}`);
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}


//get stores service

async function getStoresService() {
    const storeType = 'Service'; // Du kan byta ut detta med användarens val
    try {
        const response = await fetch(`/storeType/${storeType}`);
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

//search funktion
async function searchStores() {
    const searchValue = document.getElementById('searchInput').value;
    console.log(searchValue)

    try {
        const response = await fetch(`/storeSearch/${searchValue}`);

        const stores = await response.json();
        console.log(stores)

        console.log('hej', stores); // Logga sökresultaten
        // Anropa funktionen för att visa sökresultaten
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching search results:', error);
        console.log('hejdå');
    }
}



function displayStores(stores) {
    const storesContainer = document.getElementById('allStoresContainer');

    // Rensa innehållet i behållaren
    storesContainer.innerHTML = '';

    // Skapa och lägg till butikslänkar
    stores.forEach(store => {
        const storeLink = document.createElement('a');
        storeLink.innerText = `Name: ${store.name}`;
        if (!store.url.includes('https')) {
            // Lägg till "https" om det saknas
            store.url = 'https://' + store.url;
        }    
        storeLink.href = store.url; // Här kan du lägga till butikens faktiska länk

        // Skapa element för varje attribut och lägg till dem i butikslänken
        // const nameElement = document.createElement('p');
        // nameElement.textContent = `Name: ${store.name}`;
        // storeLink.appendChild(nameElement);

        // const urlElement = document.createElement('p');
        // urlElement.textContent = `URL: ${store.url}`;
        // storeLink.appendChild(urlElement);

        const districtElement = document.createElement('p');
        console.log(store)
        districtElement.textContent = `District: ${store.district}`;
        storeLink.appendChild(districtElement);

        const storeTypeElement = document.createElement('p');
        storeTypeElement.textContent = `Type of store: ${store.storetype}`;
        storeLink.appendChild(storeTypeElement);

        // Lägg till butikslänken i behållaren
        storesContainer.appendChild(storeLink);
    });
}


const searchInput = document.getElementById('searchInput')
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter"){
        searchStores()
    }
})
