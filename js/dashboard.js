const supplierCountSelector=document.querySelector('.supplier-count');
const customerCountSelector=document.querySelector('.customer-count');

// const supplierCount=localStorage.getItem('supplierCount');
// const customerCount=localStorage.getItem('customerCount');

function getSupplierCount(){
  rowInit = 0;
    db.collection("suppliers")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          supplierData = doc.data();
          // console.log("Supplier id:",doc.id)
          ++rowInit;
          
        });
        console.log(rowInit);
        supplierCountSelector.textContent=rowInit;
      });
}

function getCustomerCount(){
  rowInit = 0;
    db.collection("customers")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          supplierData = doc.data();
          // console.log("Supplier id:",doc.id)
          ++rowInit;         
        });
        console.log(rowInit);
        customerCountSelector.textContent=rowInit;
      });
}

getSupplierCount();
getCustomerCount();


 

// supplierCountSelector.textContent=supplierCount;
// customerCountSelector.textContent=customerCount;