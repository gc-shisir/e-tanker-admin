let tableItems = document.querySelector(".table-body");
const supplierInfo = document.querySelector(".info-group");
const image = document.querySelector(".profile-img");
const citizenshipBtn = document.querySelector(".citizenshipBtn");
const registrationBtn = document.querySelector(".registrationBtn");
const feedbackContainer = document.querySelector(".feedback-container");
console.log(feedbackContainer);
// console.log(citizenship);

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
            <button class="btn explore-button bg-medium-light text-white" data-toggle="modal" data-target="#feedback-section" onclick="getFeedbacks('${
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
  let output = "";
  db.collection("feedback")
    .doc(selectedSupplier.id)
    .collection(tankerNumber)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        feedbacks = doc.data();
        console.log(feedbacks);
        output += `
          <div class="modal-body>
            <p class="feedback bg-light px-2 mx-2">
              ${feedbacks.feedback}
            </p>
            <div class=" mt-2 pt-2 d-flex justify-content-between">
              <p><strong>Feedback by:</strong>${feedbacks.feedbackBy}</p>
              <p><strong>Rating : </strong class="text-primary">${feedbacks.rating}/5</p>
            </div>
            <i class="">Date: ${feedbacks.deliveredDate}</i>
          </div><hr>
        `;
      });
      document.querySelector(".feedback-container").innerHTML = output;
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
      localStorage.setItem("citizenshipUrl", url);
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
    .then((regUrl) => {
      // console.log(url);
      // Insert url into an <img> tag to "download"
      localStorage.setItem("registrationUrl", regUrl);
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
getTanker();
// getFeedbacks();

citizenshipBtn.addEventListener("click", getCitizenship());
registrationBtn.addEventListener("click", getRegistration());
