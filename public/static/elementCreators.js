function createStoreCard(store) {
    const storeCard = document.createElement('div');
        storeCard.className = 'storeCard';
        storeCard.id = `storeID${store.id}`;

        if(store.url) {
            if (!store.url.includes('https') || !store.url.includes('http')) {
                // Lägg till "https" om det saknas
                store.url = 'https://' + store.url;
            }    
        }

        const nameElement = document.createElement('p');
        nameElement.textContent = `Name: ${store.name}`;
        storeCard.appendChild(nameElement);

        const districtElement = document.createElement('p');
        districtElement.textContent = `District: ${store.district}`;
        storeCard.appendChild(districtElement);

        const storeTypeElement = document.createElement('p');
        storeTypeElement.textContent = `Type of store: ${store.storetype}`;
        storeCard.appendChild(storeTypeElement);

        const visitSiteButton = createStoreCardButton(
            'Visit site', 
            async () => {
                window.location.href = store.url;
            });
        storeCard.appendChild(visitSiteButton);

        const editButton = createStoreCardButton(
            'Edit', 
            populateEditForm(store)
            );
        storeCard.appendChild(editButton);

        const deleteButton = createStoreCardButton(
            'Delete', 
            async () => {
                try {
                    const response = await fetch(`/store/${store.id}`, {
                        method: 'DELETE'
                    });
                    const stores = await response.json();
                    getUpdateStores().then(() => {
                        filterStores()
                    });
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            });
        storeCard.appendChild(deleteButton);

        return storeCard;
}

function createStoreCardButton(text, onclick = null) {
    const button = document.createElement('button');
    button.textContent = text;
    if (onclick !== null) {
        button.onclick = onclick;
    }
    return button;
}