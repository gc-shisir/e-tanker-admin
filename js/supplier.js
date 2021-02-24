const tableItems = document.querySelector(".table-body");
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
          <td>
            <a href='map.html' class="text-decoration-none btn bg-primary text-white"
              onclick="getLatitudeLongitude('${supplierData.latitude}',
              '${supplierData.longitude}')">View</a>
          </td>
          <td>
            <a href="explore-supplier.html" class="btn explore-button bg-medium-light text-white"
              onclick="exploreSuppliers('${supplierData.ID}','${
          supplierData.company_name
        }','${supplierData.email}','${supplierData.phone_number}','${
          supplierData.name
        }','${supplierData.registrationNumber}','${
          supplierData.location
        }')">Explore</a>
            <a class="btn explore-button bg-success text-white ml-1" onclick="exploreSuppliers('${
              supplierData.ID
            }','${supplierData.company_name}','${supplierData.email}','${
          supplierData.phone_number
        }','${supplierData.name}','${supplierData.registrationNumber}','${
          supplierData.location
        }')" href="edit-supplier.html">Update</a>
            <button class="btn explore-button bg-delete ml-1 text-white" onclick="deleteSupplier('${supplierID}')" >Delete</button>
          </td>
        </tr>
      `;
      });
      tableItems.innerHTML = output;
    });
}

function deleteSupplier(supplierId) {
  let confirm = window.confirm("Do you want to delete the selected supplier?");
  if (confirm) {
    db.collection("suppliers")
      .doc(supplierId)
      .delete()
      .then(() => {
        // console.log("Document successfully deleted!");
        let message = {
          msg: "Supplier Deleted Successfully",
          bg: "bg-delete",
        };
        localStorage.setItem("message", JSON.stringify(message));
        window.location.href = "suppliers.html";
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  // admin
  //   .auth()
  //   .getUser(supplierID)
  //   .then((userRecord) => {
  //     // See the UserRecord reference doc for the contents of userRecord.
  //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching user data:", error);
  //   });
}

function getLatitudeLongitude(latitude, longitude) {
  console.log(latitude, longitude);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

function exploreSuppliers(
  supplierId,
  supplierCompanyName,
  supplierEmail,
  supplierContact,
  supplierName,
  supplierRegistrationNumber,
  supplierLocation
) {
  const selectedSupplierInfo = {
    id: supplierId,
    companyName: supplierCompanyName,
    email: supplierEmail,
    contact: supplierContact,
    name: supplierName,
    registrationNumber: supplierRegistrationNumber,
    location: supplierLocation,
  };

  localStorage.setItem(
    "selectedSupplier",
    JSON.stringify(selectedSupplierInfo)
  );
  // localStorage.setItem("selectedSupplierId", supplierId);
  // localStorage.setItem("selectedSupplierCompanyName", supplierCompanyName);
  // localStorage.setItem("selectedSupplierName", supplierName);
  // localStorage.setItem("selectedSupplierEmail", supplierEmail);
  // localStorage.setItem("selectedSupplierContact", supplierContact);
  // window.location.href = "explore-supplier.html";
}

getSuppliers();
