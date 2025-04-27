
function FilterkeyWord_all_table() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll("#dataTable tbody tr");
  
      rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(filter) ? "" : "none";
      });
    });
    }