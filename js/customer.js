const tableItems = document.querySelector(".table-body");
const lists = document.querySelector(".td");
const btnMap = document.querySelector(".btnMap");

function getCustomerData() {
  let output = "";
  rowInit = 0;
  db.collection("customers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        customerData = doc.data();
        // console.log("Supplier id:",doc.id)
        supplierId = doc.id;
        output += `
      <tr data-id=${supplierId}>
        <td>${++rowInit}</td>
        <td>${customerData.name}</td>
        <td>${customerData.email}</td>
        <td>${customerData.phone_number}</td>
        <td>${customerData.address}</td>
        <td><button class="text-decoration-none btn bg-primary text-white  btnMap" 
          onclick="setLatitudeLongitude('${customerData.latitude}',
          '${customerData.longitude}')">View</button></td>
        <td>
          <a href="#" class="btn bg-medium-light text-white ">Explore</a>
          <a href="#" class="btn bg-success text-white ">Update</a>
          <a href="#" class="btn bg-delete text-white ">Delete</a>
        </td>
      </tr>
    `;
        localStorage.setItem("customerCount", rowInit);
      });
      tableItems.innerHTML = output;
    });
}
function setLatitudeLongitude(latitude, longitude) {
  console.log(latitude, longitude);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

getCustomerData();
