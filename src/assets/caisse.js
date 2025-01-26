function caisse(){
    document.addEventListener("DOMContentLoaded", () => {
        const items = document.querySelectorAll(".item");
        const orderList = document.getElementById("order-list");
        const totalPrice = document.getElementById("total-price");
        
        let total = 0;
    
        items.forEach(item => {
            item.addEventListener("click", () => {
                const name = item.getAttribute("data-name");
                const price = parseFloat(item.getAttribute("data-price"));
    
                const listItem = document.createElement("li");
                listItem.textContent = `${name} - $${price}`;
                orderList.appendChild(listItem);
    
                total += price;
                totalPrice.textContent = total.toFixed(2);
            });
        });
    
        document.querySelector(".checkout").addEventListener("click", () => {
            alert(`Total amount to pay: $${total.toFixed(2)}`);
            orderList.innerHTML = "";
            totalPrice.textContent = "0";
            total = 0;
        });
    });
}
