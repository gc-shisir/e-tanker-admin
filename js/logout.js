// Logout
document.querySelector('.logout-button').addEventListener('click',(e)=>{
  console.log("clicked");
  auth.signOut().then(()=>{
    console.log("Logout successful");
    window.location='index.html'
  }).catch(()=>{
    console.log("Logout Failed");
  })
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.auth.Auth.Persistence.LOCAL	
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
    console.log("user has logged out");
    window.location='index.html';
  }
});