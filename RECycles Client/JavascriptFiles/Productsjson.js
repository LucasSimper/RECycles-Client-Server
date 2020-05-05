//behøvede variabler defineres - specifikationer ud for
const productsElement = document.getElementById("productsApp"); //elementet hvori produkter skrives ind
const mensFilter = document.getElementById("mensFilter"); // de tre filtre defineres
const womensFilter = document.getElementById("womensFilter"); // --
const childrensFilter = document.getElementById("childrensFilter"); // --

$.ajax({
    url: "http://localhost:4000/items",
    async: false,
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        console.log(res);
        window.bigboy = res;
    }
});
/*Denne funktion viser produkter baseret på den i funktionen definerede type - namely deres køn i dette tilfælde*/
function display(type) {
    productsElement.innerHTML = ""; //sørger for at productsElement html elementet er tomt

    if (!type) {
        bigboy.forEach(function(product) {
            productsElement.innerHTML += createProductCard(product);
        });
        Array.from(document.querySelectorAll('button[data-id]')).forEach(function(button) {
            button.addEventListener('click', addToCart);
        });
        return;

    } /*Hele denne funktion er for at loade all products til at starte med,
     samt tilføje eventlisteners til knapperne - derfor if(!type), da type er undefined før filter type defineres nedenfor)*/

    bigboy
        .filter(function(dataset) {
            return dataset.gender === type;
        }) /*Filter på dataen jf. deres type defineret som gender fra JSON*/
        .forEach(function(product) {
            productsElement.innerHTML += createProductCard(product);
        }); /*tager hvert instance fra ovenstående array af products og skriver dem ind i productsElement med createProductsCard(product)*/
    Array.from(document.querySelectorAll('button[data-id]')).forEach(function(button) {
        button.addEventListener('click', addToCart);
    }); //sørger for eventlisteners for addToCart
}
function addToCart() {
    if (localStorage.getItem("loggedIn") === "true") {
        console.log(this.dataset.id);
        this.remove();
        localStorage.setItem("Order" ,this.dataset.id);
    }
    else {
        alert("Please log in before adding Items to your cart!");
        location.href = "Login.html";
    }
}
function createProductCard(product) {
    return `
        <div class="ProductCard">
            <img src="${product.image}" alt="img" />
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <p><button type="button" class="addToCart" data-id="${product.id}" id="${product.id}">Add to Cart</button></p>
        </div>
    `;
}

function displayAll() {
    display();
    ButtonsLoaded = true;
}
function displayMens() {
    display("Mens");
    ButtonsLoaded = true;
}
function displayWomens() {
    display("Womens");
    ButtonsLoaded = true;
}
function displayChildrens() {
    display("Childrens");
    ButtonsLoaded = true;
}

[mensFilter, womensFilter, childrensFilter].forEach(element =>
    element.addEventListener("change", genderFilter, "")
);
function genderFilter() {
    if (mensFilter.checked) {
        displayMens();
    } else if (womensFilter.checked) {
        displayWomens();
    } else if (childrensFilter.checked) {
        displayChildrens();
    } else if (mensFilter.checked && womensFilter.checked) {
        displayMens();
        displayWomens();
    } else if (mensFilter.checked && childrensFilter.checked) {
        displayMensChildrens();
    } else if (womensFilter.checked && childrensFilter.checked) {
        displayWomensChildrens();
    } else {
        displayAll();
    }
}
displayAll(); //funktionen displayAll bliver kørt, og produkterne loades ind.
