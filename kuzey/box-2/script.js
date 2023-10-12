// Arama çubuğunu ve öneri listesini seçiyoruz
const searchInput = document.getElementById("input-box");
const suggestionList = document.getElementById("result-box");
const searchButton = document.getElementById("search-button");
const searchBox = document.querySelector(".search-box");

// Arama çubuğuna tıklanınca önerileri gösterme işlemi
searchInput.addEventListener("focus", () => {
  suggestionList.style.display = "block"; // Öneri listesini görünür yap
  suggestionList.innerHTML = ""; // Önceki önerileri temizle

  // Burada önerileri dinamik olarak düğme olarak oluşturabilirsiniz
  const suggestions = ["Oksijen", "Su", "Kükürt"];
  suggestions.forEach((suggestion) => {
    const button = document.createElement("button"); // Düğme oluştur
    button.textContent = suggestion; // Düğmenin metnini ayarla
    button.addEventListener("click", () => {
      searchInput.value = suggestion; // Düğmeye tıklandığında arama kutusuna ekleyin
      suggestionList.style.display = "none"; // Öneri listesini gizle
    });
    suggestionList.appendChild(button); // Düğmeyi öneri listesine ekle
  });
});
document.addEventListener("click", (event) => {
  if (event.target !== searchInput) {
    suggestionList.style.display = "none"; // Öneri listesini gizle
  }
});
searchInput.addEventListener("focus", () => {
  searchBox.style.width = "75%"; // Tıklanınca uzunluğu %75'e ayarla
});

searchButton.addEventListener("click", () => {
  searchBox.style.width = "300px"; // "search-button" butonuna tıklandığında varsayılan kısa uzunluğa geri dön
});