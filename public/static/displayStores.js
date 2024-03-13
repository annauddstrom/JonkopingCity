function displayStores(stores) {
    const storesContainer = document.getElementById('allStoresContainer');

    // Rensa innehållet i behållaren
    storesContainer.innerHTML = '';

    // Skapa och lägg till butikskort för varje butik
    stores.forEach(store => {
        // Skapa ett butikskort
        const storeCard = createStoreCard(store);
        // Lägg till butikskort i behållaren
        storesContainer.appendChild(storeCard);
    });
}

var loadedStores = {};
var districtFilter = 'All';
var storetypeFilter = 'All';

window.addEventListener('load', async () => {
    try {
        const response = await fetch('/stores');
        const stores = await response.json();

        const searchValue = document.getElementById('searchInput').value;
        if(!searchValue) {
            displayStores(stores);
        } else {
            searchStores()
        }
        
      
        loadedStores = stores;
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
  });

async function getUpdateStores() {
    try {
        const response = await fetch('/stores');
        const stores = await response.json();
        loadedStores = stores;
    } catch (error) {
        console.error('Error fetching stores:', error);
    }

}

function resetFilters() {
    storetypeFilter = 'All';
    districtFilter = 'All';
    filterStores();
}

async function filterStoreType(storetype) {
    storetypeFilter = storetype;
    filterStores();
}

async function filterStoreDistrict(district) {
    districtFilter = district;
    filterStores();
}

async function filterStores() {
    getUpdateStores().then(() => {
        var currentFilteredStores = loadedStores;
        if (storetypeFilter === 'All') {
            currentFilteredStores = loadedStores;
            console.log(currentFilteredStores);
        } else {
            currentFilteredStores = currentFilteredStores.filter(store => store.storetype === storetypeFilter);
        }

        if (districtFilter === 'All') {
            currentFilteredStores = currentFilteredStores
        } else if (districtFilter === 'Other') {
            currentFilteredStores = currentFilteredStores.filter(store => store.district !== 'Väster' && store.district !== 'Öster');
        } else {
            currentFilteredStores = currentFilteredStores.filter(store => store.district === districtFilter);
        }

        console.log(currentFilteredStores);
        displayStores(currentFilteredStores);
    });
}

const searchInput = document.getElementById('searchInput')
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter"){
        searchStores()
    }
})

async function searchStores() {
    const searchValue = document.getElementById('searchInput').value;
    console.log(searchValue)

    if(!searchValue) {
        getUpdateStores()
        resetFilters()
        return;
    }

    try {
        const response = await fetch(`/storeSearch/${searchValue}`);

        const stores = await response.json();
        console.log(stores)

        console.log('hej', stores); // Logga sökresultaten
        // Anropa funktionen för att visa sökresultaten
        displayStores(stores);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}