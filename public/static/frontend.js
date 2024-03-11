
function displayStores(stores) {
    const storesContainer = document.getElementById('allStoresContainer');

    // Rensa innehållet i behållaren
    storesContainer.innerHTML = '';

    // Skapa och lägg till butikslänkar
    stores.forEach(store => {
        const storeLink = document.createElement('a');
        storeLink.innerText = `Name: ${store.name}`;
        if(store.url) {
            if (!store.url.includes('https')) {
                // Lägg till "https" om det saknas
                store.url = 'https://' + store.url;
            }    
        }
        storeLink.href = store.url; // Här kan du lägga till butikens faktiska länk


        const districtElement = document.createElement('p');
        districtElement.textContent = `District: ${store.district}`;
        storeLink.appendChild(districtElement);

        const storeTypeElement = document.createElement('p');
        storeTypeElement.textContent = `Type of store: ${store.storetype}`;
        storeLink.appendChild(storeTypeElement);

        // Lägg till butikslänken i behållaren
        storesContainer.appendChild(storeLink);
    });
}

var loadedStores = {};
var districtFilter = 'All';
var storetypeFilter = 'All';

window.addEventListener('load', async () => {
  try {
    const response = await fetch('/stores');
    const stores = await response.json();
    displayStores(stores);
    loadedStores = stores;
  } catch (error) {
    console.error('Error fetching stores:', error);
  }
});

async function filterStoreType(storetype) {
    storetypeFilter = storetype;
    filterStores();
}

async function filterStoreDistrict(district) {
    districtFilter = district;
    filterStores();
}

async function filterStores() {
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
}