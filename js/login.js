const errorSection = document.querySelector(".error-message");
let adminEmail;

function getAdminDetails() {}

// Login
document.querySelector(".login-button").addEventListener("click", async (e) => {
  e.preventDefault();

  const inputEmail = document.querySelector(".email").value;
  const inputPassword = document.querySelector(".password").value;

  await auth
    .signInWithEmailAndPassword(inputEmail, inputPassword)
    .then(function (cred) {
      console.log("cred=", cred.user.uid);
      db.collection("admins")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            adminData = doc.data();
            console.log("id", doc.id);
            console.log(adminData);
            // console.log("admin", adminEmail);
            adminEmail = adminData.email;
          });
        });
      if (inputEmail === adminEmail || "shisir@admin.com") {
        window.location = "dashboard.html";
      } else {
        errorSection.textContent = "nothing email or password did not match";
        setTimeout(() => {
          errorSection.textContent = "";
        }, 3000);
      }
      console.log(adminEmail, inputEmail);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode + ":" + errorMessage);
      errorSection.textContent = "Either email or password did not match";
      setTimeout(() => {
        errorSection.textContent = "";
      }, 3000);
    });
});

console.log("login ends");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log(user);
    // User is signed in.
    // var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // window.location ='dashboard.html'
    // ...
  } else {
    // window.location ='index.html'
    // User is signed out.
    // ...
  }
});

console.log("auth ends");
