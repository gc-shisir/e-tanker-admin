const tableItems = document.querySelector(".table-body");

function getSuppliers() {
  let output = "";
  rowInit = 0;
  db.collection("suppliers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        supplierData = doc.data();
        // console.log(supplierData);
        // console.log("Supplier id:",doc.id)
        supplierID = doc.id;
        output += `
        <tr data-id=${doc.id}>
          <td class="dataset" >${++rowInit}</td>
          <td>${supplierData.company_name}</td>
          <td>${supplierData.email}</td>
          <td>${supplierData.phone_number}</td>
          <td>${supplierData.tanker_count}</td>
          <td>
            <a href='map.html' class="text-decoration-none btn bg-primary text-white"
              onclick="getLatitudeLongitude('${supplierData.latitude}',
              '${supplierData.longitude}')">View</a>
          </td>
          <td>
            <a class="btn explore-button bg-medium-light text-white" href="#tanker-section"
              onclick="exploreTankers('${supplierData.ID}','${
          supplierData.company_name
        }','${supplierData.email}','${supplierData.phone_number}','${
          supplierData.name
        }')">Explore</a>
            <a class="btn explore-button bg-success text-white ml-1" href="#tanker-section">Update</a>
            <a class="btn explore-button bg-delete ml-1 text-white" href="#tanker-section">Delete</a>
          </td>
        </tr>
      `;
      });
      tableItems.innerHTML = output;
    });
}

function getLatitudeLongitude(latitude, longitude) {
  console.log(latitude, longitude);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

function exploreTankers(
  supplierId,
  supplierCompanyName,
  supplierEmail,
  supplierContact,
  supplierName
) {
  localStorage.setItem("selectedSupplierId", supplierId);
  localStorage.setItem("selectedSupplierCompanyName", supplierCompanyName);
  localStorage.setItem("selectedSupplierName", supplierName);
  localStorage.setItem("selectedSupplierEmail", supplierEmail);
  localStorage.setItem("selectedSupplierContact", supplierContact);
  window.location.href = "explore-supplier.html";
}

getSuppliers();
