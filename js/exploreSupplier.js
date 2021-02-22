let tableItems = document.querySelector(".table-body");
const supplierInfo = document.querySelector(".info-group");

// const supplierId = localStorage.getItem("selectedSupplierId");
// const supplierName = localStorage.getItem("selectedSupplierName");
// const supplierCompanyName = localStorage.getItem("selectedSupplierCompanyName");
// const supplierEmail = localStorage.getItem("selectedSupplierEmail");
// const supplierContact = localStorage.getItem("selectedSupplierContact");

const selectedSupplier = JSON.parse(localStorage.getItem("selectedSupplier"));

supplierInfo.innerHTML = `
  <h3>${selectedSupplier.companyName} (${selectedSupplier.companyName})</h3>
  <p>${selectedSupplier.email !== "undefined" ? selectedSupplier.email : ""}</p>
  <p>${
    selectedSupplier.contact !== "undefined" ? selectedSupplier.contact : ""
  }</p>
`;

function getTanker() {
  let output = "";
  rowInit = 0;
  db.collection("suppliers")
    .doc(selectedSupplier.id)
    .collection("tankers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        supplierData = doc.data();
        // console.log(supplierData);
        output += `
        <tr data-id=${doc.id}>
          <td class="dataset" >${++rowInit}</td>
          <td>${supplierData.tankerNumber}</td>
          <td>${supplierData.driverName}</td>
          <td>${supplierData.driverContact}</td>
          <td>${supplierData.literCapacity}</td>
          <td>${supplierData.price}</td>
          <td>
            <a class="btn explore-button bg-medium-light text-white" href="#">Explore</a>
            <a class="btn explore-button bg-success text-white ml-1" href="#">Update</a>
            <a class="btn explore-button bg-delete ml-1 text-white" href="#">Delete</a>
          </td>
        </tr>
        `;
      });
      tableItems.innerHTML = output;
    });
}

getTanker();
