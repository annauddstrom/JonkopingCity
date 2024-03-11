function displayStores(stores) {
    const storesContainer = document.getElementById('allStoresContainer');

    // Rensa innehållet i behållaren
    storesContainer.innerHTML = '';

    // Skapa och lägg till butikslänkar
    stores.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'storeCard';
        storeCard.innerText = `Name: ${store.name}`;
        if(store.url) {
            if (!store.url.includes('https') || !store.url.includes('http')) {
                // Lägg till "https" om det saknas
                store.url = 'https://' + store.url;
            }    
        }

        const districtElement = document.createElement('p');
        districtElement.textContent = `District: ${store.district}`;
        storeCard.appendChild(districtElement);

        const storeTypeElement = document.createElement('p');
        storeTypeElement.textContent = `Type of store: ${store.storetype}`;
        storeCard.appendChild(storeTypeElement);

        const visitSiteButtonElement = document.createElement('button');
        visitSiteButtonElement.textContent = 'Visit site';
        visitSiteButtonElement.onclick = async () => {
            window.location.href = store.url;
        }
        storeCard.appendChild(visitSiteButtonElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.textContent = 'Edit';
        editButtonElement.onclick = async () => {

        }
        storeCard.appendChild(editButtonElement);

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.onclick = async () => {
            try {
                const response = await fetch(`/store/${store.id}`, {
                    method: 'DELETE'
                });
                const stores = await response.json();
                getUpdateStores()
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
        storeCard.appendChild(deleteButtonElement);

        // Lägg till butikslänken i behållaren
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
    displayStores(stores);
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
        filterStores();
    } catch (error) {
        console.error('Error fetching stores:', error);
    }

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


const searchInput = document.getElementById('searchInput')
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter"){
        searchStores()
    }
})

//not working
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

function clearModal() {
    var form = document.getElementById('addForm').reset();
}

function populateModal() {

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var addBtn = document.getElementById("buttonAdd");
var editBtn = document.getElementById("buttonEdit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block";
  clearModal();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('addForm').addEventListener('submit', function(_event){
    var form = document.getElementById('addForm')
    if (form.hasChildNodes()) {
        searchInput.value = form.childNodes[2].value
        getUpdateStores()
        searchStores()
    }
    modal.style.display = "none";
    return true;
});