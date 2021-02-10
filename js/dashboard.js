const supplierCountSelector = document.querySelector(".supplier-count");
const customerCountSelector = document.querySelector(".customer-count");

// const supplierCount=localStorage.getItem('supplierCount');
// const customerCount=localStorage.getItem('customerCount');

function getSupplierCount() {
  rowInit = 0;
  supplierDataArr = [];
  db.collection("suppliers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        supplierData = doc.data();
        supplierDataArr.push(supplierData);
        ++rowInit;
      });
      console.log(rowInit);
      supplierCountSelector.textContent = rowInit;
      console.log(supplierDataArr);
      localStorage.setItem("supplierData", supplierDataArr);
    });
}

function getCustomerCount() {
  rowInit = 0;
  customerDataArr = [];
  db.collection("customers")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        customerData = doc.data();
        customerDataArr.push(customerData);
        ++rowInit;
      });
      console.log(rowInit);
      customerCountSelector.textContent = rowInit;
      console.log(customerDataArr);
      localStorage.setItem("customerData", customerDataArr);
    });
}

getSupplierCount();
getCustomerCount();

// supplierCountSelector.textContent=supplierCount;
// customerCountSelector.textContent=customerCount;
