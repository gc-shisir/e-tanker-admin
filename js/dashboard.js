const supplierCountSelector = document.querySelector(".supplier-count");
const customerCountSelector = document.querySelector(".customer-count");

// const supplierCount=localStorage.getItem('supplierCount');
// const customerCount=localStorage.getItem('customerCount');

function getSupplierCount() {
  supplierRowInit = 0;
  db.collection("suppliers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        supplierData = doc.data();
        ++supplierRowInit;
      });
      // console.log(supplierRowInit);
      supplierCountSelector.textContent = supplierRowInit;
    });
}

function getCustomerCount() {
  customerRowInit = 0;
  db.collection("customers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        customerData = doc.data();
        // console.log(customerData);
        ++customerRowInit;
      });
      console.log(customerRowInit);
      customerCountSelector.textContent = customerRowInit;
    });
}

getSupplierCount();
getCustomerCount();

// supplierCountSelector.textContent=supplierCount;
// customerCountSelector.textContent=customerCount;
