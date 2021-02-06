const tableItems = document.querySelector(".table-body");

function getSuppliers() {
  let output = "";
  rowInit = 0;
  db.collection("suppliers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        supplierData = doc.data();
        // console.log("Supplier id:",doc.id)
        output += `
        <tr data-id=${doc.id}>
          <td class="dataset" >${++rowInit}</td>
          <td>${supplierData.name}</td>
          <td>${supplierData.email}</td>
          <td>${supplierData.phone_number}</td>
          <td>${supplierData.tanker_count}</td>
          <td><a href="map.html" class="text-decoration-none" onclick="getLatitudeLongitude(supplierData.latitude,supplierData.longitude)">View</a></td>
          <td><a class="btn btn-info text-white explore-button" href="#tanker-section">Explore</a></td>
        </tr>
      `;
        localStorage.setItem('supplierCount',rowInit);
        tableItems.innerHTML = output;
        document
          .querySelector(".explore-button")
          .addEventListener("click", exploreTankers);
      });
    });
}

function tankerData(supplierID) {
  // localStorage.setItem("supplierID",supplierID)
  console.log(supplierID);
}

function getLatitudeLongitude(latitude, longitude) {
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

function exploreTankers(){
  console.log("tankeres");
}

getSuppliers();
