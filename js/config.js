// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDhVEvtA3n2XOqW4JAv0C5pTJiZ-nt26bY",
  authDomain: "etanker-1cd83.firebaseapp.com",
  databaseURL: "https://etanker-1cd83.firebaseio.com",
  projectId: "etanker-1cd83",
  storageBucket: "etanker-1cd83.appspot.com",
  messagingSenderId: "520979045137",
  appId: "1:520979045137:web:5f0c99ee39af6cc6780ab0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const db=firebase.firestore();