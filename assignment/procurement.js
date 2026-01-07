// ==========================================
// PROCUREMENT FORM
// ==========================================

// Safe localStorage access
let user = null;
try {
  user = JSON.parse(localStorage.getItem("kglUser"));
} catch (err) {
  console.warn("localStorage unavailable or corrupted:", err);
}

// ROLE PROTECTION (Logical Fix #1)
if (!user || user.role !== "manager") {
  alert("Access denied. Managers only.");
  window.location.href = "../index.html";
}

// FORM ELEMENT
const form = document.getElementById("procurementForm");

// RUNTIME ERROR HANDLING
if (!form) {
  console.error("Procurement form not found in DOM");
  alert("System error: Procurement form failed to load.");
  throw new Error("Procurement form missing");
}

// FORM SUBMISSION
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  try {
    // GET FORM VALUES
    const produceName = document.getElementById("produceName").value.trim();
    const produceType = document.getElementById("produceType").value.trim();
    const sourceType = document.getElementById("sourceType").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const tonnage = Number(document.getElementById("tonnage").value);
    const dealerName = document.getElementById("dealerName").value.trim();
    const dealerContact = document.getElementById("dealerContact").value.trim();
    const branch = document.getElementById("branch").value;
    const sellingPrice = Number(document.getElementById("sellingPrice").value);

    // ===============================
    // VALIDATIONS
    // ===============================
    if (!/^[a-zA-Z0-9 ]+$/.test(produceName)) {
      alert("Produce name must be alphanumeric and not empty.");
      return;
    }

    if (!/^[a-zA-Z ]{2,}$/.test(produceType)) {
      alert(
        "Produce type must contain letters only and be at least 2 characters.",
      );
      return;
    }

    if (!date || !time) {
      alert("Date and time must not be empty.");
      return;
    }

    if (Number.isNaN(tonnage) || tonnage < 1000) {
      alert("Tonnage must be numeric and at least 1000 KG.");
      return;
    }

    if (!/^[a-zA-Z0-9 ]{2,}$/.test(dealerName)) {
      alert("Dealer name must be alphanumeric and at least 2 characters.");
      return;
    }

    if (!/^07\d{8}$/.test(dealerContact)) {
      alert("Enter a valid Ugandan phone number (07XXXXXXXX).");
      return;
    }

    if (!branch) {
      alert("Please select a branch.");
      return;
    }

    if (Number.isNaN(sellingPrice) || sellingPrice <= 0) {
      alert("Selling price must be a valid numeric value.");
      return;
    }

    // ===============================
    // LOAD & UPDATE STOCK
    // ===============================
    const stock = JSON.parse(localStorage.getItem("kglStock")) || [];

    // Merge stock if produce exists in same branch
    const existingStock = stock.find(
      (item) => item.produceName === produceName && item.branch === branch,
    );

    if (existingStock) {
      existingStock.tonnage += tonnage;
    } else {
      stock.push({
        produceName,
        produceType,
        sourceType,
        date,
        time,
        tonnage,
        dealerName,
        dealerContact,
        branch,
        sellingPrice,
      });
    }

    localStorage.setItem("kglStock", JSON.stringify(stock));

    alert("Produce procurement recorded successfully.");
    form.reset();
  } catch (error) {
    console.error("Procurement error:", error);
    alert("An unexpected system error occurred. Please try again.");
  }
});
