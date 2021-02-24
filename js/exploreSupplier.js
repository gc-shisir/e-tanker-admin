let tableItems = document.querySelector(".table-body");
const supplierInfo = document.querySelector(".info-group");
const image = document.querySelector(".profile-img");
const citizenship = document.querySelector(".citizenship");
const registration = document.querySelector(".registration");
console.log(image);

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

function getImages() {
  const link = "Verification_details/" + selectedSupplier.id + "/photo";
  console.log(link);
  // Create a reference to the file we want to download
  var starsRef = storageRef.child(link);

  // Get the download URL
  starsRef
    .getDownloadURL()
    .then((url) => {
      console.log(url);
      // Insert url into an <img> tag to "download"
      image.src = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("File doesnot exist");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("permission denied");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("upload cancelled ");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          console.log("storage unknown");
          break;
      }
    });
}
function getCitizenship() {
  const link = "Verification_details/" + selectedSupplier.id + "/citizenship";
  console.log(link);
  // Create a reference to the file we want to download
  var starsRef = storageRef.child(link);

  // Get the download URL
  starsRef
    .getDownloadURL()
    .then((url) => {
      console.log(url);
      // Insert url into an <img> tag to "download"
      citizenship.href = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("File doesnot exist");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("permission denied");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("upload cancelled ");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          console.log("storage unknown");
          break;
      }
    });
}
function getRegistration() {
  const link = "Verification_details/" + selectedSupplier.id + "/registration";
  console.log(link);
  // Create a reference to the file we want to download
  var starsRef = storageRef.child(link);

  // Get the download URL
  starsRef
    .getDownloadURL()
    .then((url) => {
      console.log(url);
      // Insert url into an <img> tag to "download"
      registration.src = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("File doesnot exist");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("permission denied");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("upload cancelled ");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          console.log("storage unknown");
          break;
      }
    });
}

getImages();
getCitizenship();
getRegistration();

getTanker();
// getFeedbacks();
