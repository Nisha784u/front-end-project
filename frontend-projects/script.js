document.addEventListener("DOMContentLoaded", function () {
  let total = 0;
  let subtotal = 0;
  let taxRate = 0.10; // 10%
  let discount = 0;

  function updateTotals() {
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    const tax = subtotal * taxRate;
    document.getElementById("tax").innerText = tax.toFixed(2);

    // Subtract discount from subtotal before calculating the total
    const discountedSubtotal = subtotal - discount;
    document.getElementById("discount").innerText = discount.toFixed(2);

    const finalTotal = discountedSubtotal + tax;
    document.getElementById("total").innerText = finalTotal.toFixed(2);
  }

  function updateTotal() {
    document.getElementById("total").innerText = total.toFixed(2);
    updateTotals();
  }

  function addItem(description, quantity, price) {
    const table = document.getElementById("invoice-items");
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerText = description;
    cell2.innerText = quantity;
    cell3.innerText = `$${price.toFixed(2)}`;

    const itemTotal = quantity * price;
    cell4.innerText = `$${itemTotal.toFixed(2)}`;

    subtotal += itemTotal;
    total += itemTotal;
    updateTotal();
  }

  document.getElementById("add-item").addEventListener("click", function () {
    const description = prompt("Enter item description:");
    const quantity = parseFloat(prompt("Enter quantity:"));
    const price = parseFloat(prompt("Enter price per unit:"));

    if (isNaN(quantity) || isNaN(price)) {
      alert("Invalid input. Please enter valid numbers.");
      return;
    }

    addItem(description, quantity, price);
  });

  document.getElementById("generate-pdf").addEventListener("click", function () {
    const element = document.getElementById("invoice");
    html2pdf().from(element).save();
  });

  // Get payment method and add it to the PDF
  document.getElementById("payment-method").addEventListener("change", function () {
    const selectedPaymentMethod = document.getElementById("payment-method").value;
    const paymentElement = document.getElementById("payment-details");
    paymentElement.innerText = `Payment Method: ${selectedPaymentMethod}`;
  });

  // Display thank-you message in the PDF
  document.getElementById("thank-you").addEventListener("click", function () {
    const thankYouElement = document.getElementById("thank-you-details");
    thankYouElement.innerText = "Thank you for your business!";
  });
});

