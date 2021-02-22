const customerForm = document.querySelector(".customer-form");
const message = document.querySelector(".message");

function codeGenerator() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let code = "";
}

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log("user created" + user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage, "eror found");
    });
}

function passwordResetEmail(email) {
  const userEmail = email;
  admin
    .auth()
    .generatePasswordResetLink(userEmail, actionCodeSettings)
    .then((link) => {
      // Construct password reset email template, embed the link and send
      // using custom SMTP server.
      return sendCustomPasswordResetEmail(email, displayName, link);
    })
    .catch((error) => {
      // Some error occurred.
      console.log("Error sending email");
    });
}

async function addCustomer(e) {
  e.preventDefault();
  // console.log(e.target);
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const contact = document.querySelector("#contact").value;
  const address = document.querySelector("#address").value;
  await createUser(email, "123456");
  await db
    .collection("customers")
    .doc("LA")
    .set({
      name: name,
      email: email,
      address: address,
      phone: contact,
    })
    .then(() => {
      console.log("Document successfully written!");
      let message = {
        msg: "Customer Added Successfully",
        bg: "bg-success",
      };
      localStorage.setItem("message", JSON.stringify(message));
      window.location.href = "customers.html";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  // db.collection('customer')
}

// Event listeners
customerForm.addEventListener("submit", addCustomer);
