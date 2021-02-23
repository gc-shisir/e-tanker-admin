const form = document.querySelector("form");
console.log(form);

function editSupplier() {
  const supplierName = document.querySelector("#name");
  const supplierCompanyName = document.querySelector("#companyName");
  const supplierEmail = document.querySelector("#email");
  const supplierLocation = document.querySelector("#location");
  const supplierContact = document.querySelector("#contact");

  const supplierDetails = JSON.parse(localStorage.getItem("selectedSupplier"));

  supplierName.value = supplierDetails.name;
  supplierCompanyName.value = supplierDetails.companyName;
  supplierEmail.value = supplierDetails.email;
  supplierLocation.value = supplierDetails.location;
  supplierContact.value = supplierDetails.contact;
}

function updateSupplierDetails(e) {
  console.log("hello");
}

editSupplier();

form.addEventListener("submit", updateSupplierDetails);
