window.addEventListener('load', () => {
    fetch('http://localhost:8080/products').then(response => response.json()).then(products => {
        const productListDiv = document.getElementById('productList');
        productListDiv.innerHTML = ''; // Rensa eventuellt tidigare innehåll
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.textContent = `${product["Produkt"]}: ${product["Pris"]} SEK (Antal i lager: ${product["Antal i lager"]})`;
            productListDiv.appendChild(productDiv);
        });
    }).catch(error => {
        console.error('Något gick fel: ' + error.message);
    });
});