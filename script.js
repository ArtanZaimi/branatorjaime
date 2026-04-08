// =====================================================
// BranatorJaime – Online Pharmacy Script
// =====================================================

// --- Medication data ---
const medications = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    type: "tablet",
    category: "pain-relief",
    description: "Effective relief from mild to moderate pain and fever.",
    price: "$4.99",
    icon: "💊",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    type: "capsule",
    category: "antibiotics",
    description: "Broad-spectrum antibiotic for bacterial infections.",
    price: "$9.99",
    icon: "🔵",
  },
  {
    id: 3,
    name: "Children's Ibuprofen",
    type: "syrup",
    category: "pain-relief",
    description: "Gentle fever & pain relief for children aged 3 months+.",
    price: "$6.49",
    icon: "🍶",
  },
  {
    id: 4,
    name: "Vitamin D3 1000 IU",
    type: "tablet",
    category: "vitamins",
    description: "Supports bone health and immune system function.",
    price: "$7.99",
    icon: "🌿",
  },
  {
    id: 5,
    name: "Amlodipine 5mg",
    type: "tablet",
    category: "cardiovascular",
    description: "Calcium channel blocker for high blood pressure.",
    price: "$12.99",
    icon: "❤️",
  },
  {
    id: 6,
    name: "Metformin 500mg",
    type: "tablet",
    category: "diabetes",
    description: "First-line treatment for type 2 diabetes management.",
    price: "$8.49",
    icon: "🩸",
  },
  {
    id: 7,
    name: "Cetirizine 10mg",
    type: "tablet",
    category: "allergy",
    description: "Non-drowsy antihistamine for allergy symptoms.",
    price: "$5.99",
    icon: "🤧",
  },
  {
    id: 8,
    name: "Omeprazole 20mg",
    type: "capsule",
    category: "digestive",
    description: "Proton pump inhibitor for heartburn and acid reflux.",
    price: "$10.49",
    icon: "🫁",
  },
  {
    id: 9,
    name: "Hydrocortisone 1%",
    type: "cream",
    category: "skincare",
    description: "Mild corticosteroid cream for skin inflammation.",
    price: "$6.99",
    icon: "🧴",
  },
  {
    id: 10,
    name: "Azithromycin 500mg",
    type: "tablet",
    category: "antibiotics",
    description: "Macrolide antibiotic for respiratory & skin infections.",
    price: "$14.99",
    icon: "💊",
  },
  {
    id: 11,
    name: "Insulin Glargine",
    type: "injectable",
    category: "diabetes",
    description: "Long-acting insulin for type 1 & type 2 diabetes.",
    price: "$34.99",
    icon: "💉",
  },
  {
    id: 12,
    name: "Cough Syrup DM",
    type: "syrup",
    category: "allergy",
    description: "Dextromethorphan-based cough suppressant.",
    price: "$7.49",
    icon: "🍶",
  },
  {
    id: 13,
    name: "Omega-3 Fish Oil",
    type: "capsule",
    category: "vitamins",
    description: "Supports heart health and reduces triglycerides.",
    price: "$11.99",
    icon: "🔵",
  },
  {
    id: 14,
    name: "Eye Drops Lubricant",
    type: "drops",
    category: "skincare",
    description: "Instant relief for dry and irritated eyes.",
    price: "$8.99",
    icon: "💧",
  },
  {
    id: 15,
    name: "Oral Rehydration Salts",
    type: "powder",
    category: "digestive",
    description: "Electrolyte powder for dehydration and diarrhea.",
    price: "$3.99",
    icon: "🫙",
  },
  {
    id: 16,
    name: "Atorvastatin 20mg",
    type: "tablet",
    category: "cardiovascular",
    description: "Statin medication for lowering cholesterol levels.",
    price: "$15.49",
    icon: "❤️",
  },
];

// --- State ---
let activeType = "all";
let activeCategory = "all";
let searchQuery = "";

// --- Render products ---
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");

  const filtered = medications.filter((med) => {
    const matchesType = activeType === "all" || med.type === activeType;
    const matchesCategory =
      activeCategory === "all" || med.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      med.name.toLowerCase().includes(searchQuery) ||
      med.description.toLowerCase().includes(searchQuery) ||
      med.type.toLowerCase().includes(searchQuery) ||
      med.category.toLowerCase().includes(searchQuery);
    return matchesType && matchesCategory && matchesSearch;
  });

  resultsCount.textContent =
    filtered.length === medications.length
      ? `${filtered.length} medications`
      : `${filtered.length} of ${medications.length} medications`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  grid.innerHTML = "";
  filtered.forEach((med) => {
    const article = document.createElement("article");
    article.className = "product-card";

    const badgeRow = document.createElement("div");
    badgeRow.className = "product-badge-row";
    const typeSpan = document.createElement("span");
    typeSpan.className = "badge badge-type";
    typeSpan.textContent = capitalize(med.type);
    const catSpan = document.createElement("span");
    catSpan.className = "badge badge-category";
    catSpan.textContent = formatCategory(med.category);
    badgeRow.append(typeSpan, catSpan);

    const body = document.createElement("div");
    body.className = "product-body";
    const iconEl = document.createElement("div");
    iconEl.className = "product-icon";
    iconEl.textContent = med.icon;
    const nameEl = document.createElement("h3");
    nameEl.className = "product-name";
    nameEl.textContent = med.name;
    const descEl = document.createElement("p");
    descEl.className = "product-desc";
    descEl.textContent = med.description;
    body.append(iconEl, nameEl, descEl);

    const footer = document.createElement("div");
    footer.className = "product-footer";
    const priceEl = document.createElement("span");
    priceEl.className = "product-price";
    priceEl.textContent = med.price;
    const cartBtn = document.createElement("button");
    cartBtn.className = "add-cart-btn";
    cartBtn.textContent = "Add to Cart";
    cartBtn.addEventListener("click", addToCart);
    footer.append(priceEl, cartBtn);

    article.append(badgeRow, body, footer);
    grid.appendChild(article);
  });
}

// --- Helpers ---
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCategory(cat) {
  const labels = {
    "pain-relief": "Pain Relief",
    antibiotics: "Antibiotics",
    vitamins: "Vitamins",
    cardiovascular: "Cardiovascular",
    diabetes: "Diabetes",
    allergy: "Allergy & Cold",
    digestive: "Digestive",
    skincare: "Skin Care",
  };
  return labels[cat] || capitalize(cat);
}

// --- Type filter ---
function initTypeFilter() {
  document.querySelectorAll(".type-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".type-card")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.type;
      renderProducts();
    });
  });
}

// --- Category filter ---
function initCategoryFilter() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeCategory = card.dataset.category;
      renderProducts();
    });
  });
}

// --- Search ---
function initSearch() {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");

  input.addEventListener("input", () => {
    searchQuery = input.value.trim().toLowerCase();
    renderProducts();
  });

  btn.addEventListener("click", () => {
    searchQuery = input.value.trim().toLowerCase();
    renderProducts();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchQuery = input.value.trim().toLowerCase();
      renderProducts();
    }
  });
}

// --- Add to cart feedback ---
function addToCart(event) {
  const btn = event.currentTarget;
  const original = btn.textContent;
  btn.textContent = "✓ Added";
  btn.style.background = "#198754";
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = "";
  }, 1500);
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  initTypeFilter();
  initCategoryFilter();
  initSearch();
  renderProducts();
});
