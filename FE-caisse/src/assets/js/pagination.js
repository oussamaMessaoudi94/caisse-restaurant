function pagination() {
    const data = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Name ${i + 1}`,
        country: `Country ${i % 5 + 1}`
      }));
    
      const rowsPerPage = 10;
      let currentPage = 1;
    
      function displayTable(page) {
        const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";
    
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = data.slice(start, end);
    
        for (const row of pageData) {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${row.id}</td><td>${row.name}</td><td>${row.country}</td>`;
          tbody.appendChild(tr);
        }
      }
    
      function setupPagination() {
        const pageCount = Math.ceil(data.length / rowsPerPage);
        const pagination = document.getElementById("paginationControls");
        pagination.innerHTML = "";
    
        for (let i = 1; i <= pageCount; i++) {
          const btn = document.createElement("button");
          btn.textContent = i;
          btn.classList.toggle("active", i === currentPage);
          btn.addEventListener("click", () => {
            currentPage = i;
            displayTable(currentPage);
            setupPagination();
          });
          pagination.appendChild(btn);
        }
      }
    
      // Initial load
      displayTable(currentPage);
      setupPagination();
}