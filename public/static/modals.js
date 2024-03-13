var addModal = document.getElementById('myAddModal');
var editModal = document.getElementById('myEditModal');
var addForm = document.getElementById('addForm');
var editForm = document.getElementById('editForm');

function clearModal() {
    addForm.reset();
    editForm.reset();
}

// Get the button that opens the modal
var addBtn = document.getElementById("buttonAdd");

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");
console.log(spans)

// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  addModal.style.display = "block";
  clearModal();
}

// When the user clicks on <span> (x), close the modal
for(let span of spans){
    console.log(span)
    span.onclick = function() {
        addModal.style.display = "none";
        editModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == addModal || event.target == editModal) {
    addModal.style.display = "none";
    editModal.style.display = "none";
  }
}

addForm.addEventListener('submit', function(_event){
    if (addForm.hasChildNodes()) {
        searchInput.value = addForm.childNodes[2].value
        getUpdateStores().then(() => {
            searchStores()
        })
    }
    addModal.style.display = "none";
    return true;
});

function populateEditForm(store) {
    console.log(store)
    return async () => {
        editModal.style.display = "block";
        editForm.childNodes[2].value = store.name;
        editForm.childNodes[6].value = store.url;
        editForm.childNodes[10].value = store.district;
        if(store.storetype === 'Shopping') {
            editForm.childNodes[14].checked = true;
        } else {
            editForm.childNodes[16].checked = true;
        }
        editForm.childNodes[21].value = store.id;
    }
}

editForm.addEventListener('submit', function(_event){
    getUpdateStores()
    var editedStore = {};
    editedStore.name = editForm.childNodes[2].value;
    editedStore.url = editForm.childNodes[6].value;
    editedStore.district = editForm.childNodes[10].value;
    editedStore.storetype = editForm.childNodes[14].checked ? 'Shopping' : 'Service';
    editedStore.id = editForm.childNodes[21].value;

    console.log(editedStore)

    const storeCard = document.getElementById(`storeID${editedStore.id}`);
    const visitSiteButton = storeCard.childNodes[3];

    storeCard.childNodes[0].textContent = `Name: ${editedStore.name}`;
    storeCard.childNodes[1].textContent = `District: ${editedStore.district}`;
    storeCard.childNodes[2].textContent = `Type of store: ${editedStore.storetype}`;
    visitSiteButton.onclick = async () => {
        window.location.href = editedStore.url;
    }
    storeCard.childNodes[4].onclick = populateEditForm(editedStore);

    editModal.style.display = "none";
    return true;
});