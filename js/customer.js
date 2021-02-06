const tableItems=document.querySelector('.table-body');

let output='';
rowInit=0;
db.collection("customers").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    customerData=doc.data();
    // console.log("Supplier id:",doc.id)
    supplierId=doc.id;
    output+=`
      <tr data-id=${supplierId}>
        <td>${++rowInit}</td>
        <td>${customerData.name}</td>
        <td>${customerData.email}</td>
        <td>${customerData.phone_number}</td>
        <td>${customerData.address}</td>
        <td><a href="map.html" class="text-decoration-none">View</a></td>
        <td><a href="#" class="btn btn-primary">Explore</a></td>
      </tr>
    `;
    localStorage.setItem('customerCount',rowInit);
    tableItems.innerHTML=output;
  });
});