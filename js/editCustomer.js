const form = document.querySelector("form");
const customerDetails = JSON.parse(localStorage.getItem("selectedCustomer"));

function editCustomer() {
  const CustomerName = document.querySelector("#name");
  const CustomerEmail = document.querySelector("#email");
  const CustomerAddress = document.querySelector("#address");
  const customerContact = document.querySelector("#contact");

  CustomerName.value = customerDetails.name;
  CustomerEmail.value = customerDetails.email;
  CustomerAddress.value = customerDetails.address;
  customerContact.value = customerDetails.contact;
}

function updateDetails(e) {
  e.preventDefault();
  console.log("hello");
  const name = document.querySelector("#name").value;
  // const email = document.querySelector("#email").value;
  const address = document.querySelector("#address").value;
  const contact = document.querySelector("#contact").value;
  console.log(name, address, contact);

  db.collection("customers")
    .doc(customerDetails.id)
    .update({
      name: name,
      address: address,
      contact: contact,
    })
    .then(() => {
      console.log("successfully updated");
    })
    .catch((err) => {
      console.log("Failed to updata data");
    });
}

editCustomer();

form.addEventListener("submit", updateDetails);
