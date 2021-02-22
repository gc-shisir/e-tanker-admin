const tableItems = document.querySelector(".table-body");
const lists = document.querySelector(".td");
const btnMap = document.querySelector(".btnMap");

const message = document.querySelector(".message");

if (localStorage.getItem("message") !== null) {
  console.log(localStorage.getItem("message"));
  let messageBody = JSON.parse(localStorage.getItem("message"));
  message.textContent = messageBody.msg;
  message.classList.add(messageBody.bg);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(messageBody.bg);
    localStorage.removeItem("message");
  }, 3000);
}

function getCustomerData() {
  let output = "";
  rowInit = 0;
  db.collection("customers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        customerData = doc.data();
        // console.log("Supplier id:",doc.id)
        customerId = doc.id;
        output += `
      <tr data-id=${customerId}>
        <td>${++rowInit}</td>
        <td>${customerData.name}</td>
        <td>${customerData.email}</td>
        <td>${customerData.phone}</td>
        <td>${customerData.address}</td>
        <td><button class="text-decoration-none btn bg-primary text-white  btnMap" 
          onclick="setLatitudeLongitude('${customerData.latitude}',
          '${customerData.longitude}')">View</button></td>
        <td>
          <a href="#" class="btn bg-medium-light text-white ">Explore</a>
          <a href="edit-customer.html" onclick="selectCustomer('${customerId}','${
          customerData.name
        }','${customerData.email}','${customerData.phone}','${
          customerData.address
        }')" class="btn bg-success text-white ">Update</a>
          <button class="btn bg-delete text-white " onclick="deleteCustomer('${customerId}')">Delete</button>
        </td>
      </tr>
    `;
        // localStorage.setItem("customerCount", rowInit);
      });
      tableItems.innerHTML = output;
    });
}
function setLatitudeLongitude(latitude, longitude) {
  console.log(latitude, longitude);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

function deleteCustomer(customerId) {
  let confirm = window.confirm("Do you want to delete the selected supplier?");
  if (confirm) {
    db.collection("customers")
      .doc(customerId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        let message = {
          msg: "Curtomer Deleted Successfully",
          bg: "bg-delete",
        };
        localStorage.setItem("message", JSON.stringify(message));
        window.location = "customers.html";
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

function selectCustomer(
  customerId,
  customerName,
  customerEmail,
  customerContact,
  customerAddress
) {
  const selectedCustomer = {
    id: customerId,
    name: customerName,
    email: customerEmail,
    contact: customerContact,
    address: customerAddress,
  };
  localStorage.setItem("selectedCustomer", JSON.stringify(selectedCustomer));
}

getCustomerData();
