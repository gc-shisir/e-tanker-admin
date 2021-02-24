const supplierForm = document.querySelector(".supplier-form");
let userId;
console.log(supplierForm);

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      userId = user.uid;
      console.log("user:", userId);
      // console.log("user created" + JSON.stringify(user));
      return user.uid;
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage, "eror found");
    });
}

function addSupplier(e) {
  e.preventDefault();
  // console.log(e.target);
  const name = document.querySelector("#name").value;
  const companyName = document.querySelector("#company-name").value;
  const email = document.querySelector("#email").value;
  const contact = document.querySelector("#contact").value;
  const address = document.querySelector("#address").value;
  const uid = createUser(email, "123456");
  console.log(userId);
  db.collection("suppliers")
    .doc()
    .set({
      name: name,
      company_name: companyName,
      email: email,
      location: address,
      phone_number: contact,
    })
    .then(() => {
      console.log("Document successfully written!");
      let message = {
        msg: "Supplier Added Successfully",
        bg: "bg-success",
      };
      localStorage.setItem("message", JSON.stringify(message));
      window.location = "suppliers.html";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  db.collection("customer");
}

// Event listeners
supplierForm.addEventListener("submit", addSupplier);
