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



//här displayas butikerna

function displayStores(stores) {
    const storesContainer = document.getElementById('allStoresContainer');

    // Rensa innehållet i behållaren
    storesContainer.innerHTML = '';

    // Skapa och lägg till butikslänkar
    stores.forEach(store => {
        const storeLink = document.createElement('a');
        storeLink.href = '#'; // Här kan du lägga till butikens faktiska länk
        storeLink.textContent = store.name; // Antag att butiken har ett attribut "name"

        // Lägg till butikslänken i behållaren
        storesContainer.appendChild(storeLink);
    });
}