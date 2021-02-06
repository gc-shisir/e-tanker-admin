
// const explore=document.querySelector('.explore-button');

function getSuppliers(){
  let output='';
  rowInit=0;
  db.collection("suppliers").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      supplierData=doc.data();
      docId=doc.id;
      output+=`
        <tr>
          <td>${++rowInit}</td>
          <td>${supplierData.name}</td>
          <td>${supplierData.email}</td>
          <td>${supplierData.phone_number}</td>
          <td>${supplierData.tanker_count}</td>
          <td><a href="https://www.google.com/maps/place/@${supplierData.latitude},${supplierData.longitude}" class="text-decoration-none" target="_blank">View</a></td>
          <td><button class="btn btn-info text-white explore-button" onclick="exploreTankers(docId)">Explore</button></td>
        </tr>
      `;
      console.log(supplierData);
      console.log(doc.id);
      tableItems.innerHTML=output;
    });
  });
  
}

function getCustomers(){
  db.collection("customers").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data()[1].name);
    });
});

}




getSuppliers();
//  getCustomers();


explore.addEventListener('click',exploreTankers);

// email: "aryalsau7@gmail.com"
// latitude: "27.6985296"
// longitude: "85.2638963"
// name: "Saurav Aryal"
// phone_number: "9860687669"
// tanker_count: "4"