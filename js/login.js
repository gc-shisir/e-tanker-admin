// Login
document.querySelector('.login-button').addEventListener('click',(e)=>{
  e.preventDefault();

  const email=document.querySelector('.email').value;
  const password=document.querySelector('.password').value;
  console.log(email,password);
  
  auth.signInWithEmailAndPassword(email, password)
  .then(function(cred){
    console.log(cred);
    window.location='dashboard.html'
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode+":"+errorMessage);
  });
  
});;

console.log("login ends");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
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