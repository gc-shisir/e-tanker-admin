const udpateButton = document.querySelector(".btn-update");

const supplierDetails = JSON.parse(localStorage.getItem("selectedSupplier"));

function editSupplier() {
  const supplierName = document.querySelector("#name");
  const supplierCompanyName = document.querySelector("#companyName");
  const supplierEmail = document.querySelector("#email");
  const supplierLocation = document.querySelector("#location");
  const supplierContact = document.querySelector("#contact");

  console.log(supplierDetails);

  supplierName.value = supplierDetails.name;
  supplierCompanyName.value = supplierDetails.companyName;
  supplierEmail.value = supplierDetails.email;
  supplierLocation.value = supplierDetails.location;
  supplierContact.value = supplierDetails.contact;
}

function updateSupplierDetails(e) {
  e.preventDefault();
  console.log("hello");
  const name = document.querySelector("#name").value;
  const companyName = document.querySelector("#companyName").value;
  const location = document.querySelector("#location").value;
  const phone_number = document.querySelector("#contact").value;
  // console.log(name, address, contact);

  db.collection("suppliers")
    .doc(supplierDetails.id)
    .update({
      name: name,
      companyName: companyName,
      location: location,
      phone_number: phone_number,
    })
    .then(() => {
      // console.log("successfully updated");
      let message = {
        msg: "Supplier Updated Successfully",
        bg: "bg-success",
      };
      localStorage.setItem("message", JSON.stringify(message));
      window.location = "suppliers.html";
    })
    .catch((err) => {
      console.log("Failed to updata data");
    });
}

editSupplier();

udpateButton.addEventListener("click", updateSupplierDetails);
