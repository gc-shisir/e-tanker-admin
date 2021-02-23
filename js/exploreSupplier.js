let tableItems = document.querySelector(".table-body");
const supplierInfo = document.querySelector(".info-group");

// const supplierId = localStorage.getItem("selectedSupplierId");
// const supplierName = localStorage.getItem("selectedSupplierName");
// const supplierCompanyName = localStorage.getItem("selectedSupplierCompanyName");
// const supplierEmail = localStorage.getItem("selectedSupplierEmail");
// const supplierContact = localStorage.getItem("selectedSupplierContact");

const selectedSupplier = JSON.parse(localStorage.getItem("selectedSupplier"));

supplierInfo.innerHTML = `
  <h4>${selectedSupplier.companyName} (${selectedSupplier.name})</h4>
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
            <button class="btn explore-button bg-medium-light text-white" onclick="getFeedbacks('${
              supplierData.tankerNumber
            }')">Feedback</button>
            
          </td>
        </tr>
        `;
      });
      tableItems.innerHTML = output;
    });
}

function getFeedbacks(tankerNumber) {
  db.collection("feedback")
    .doc(selectedSupplier.id)
    .collection(tankerNumber)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        feedbacks = doc.data();
        console.log(feedbacks);
      });
    });
}

getTanker();
// getFeedbacks();
