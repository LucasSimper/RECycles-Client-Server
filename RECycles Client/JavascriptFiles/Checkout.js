class transaction {
    constructor(productID, emailID, status) {
        this.productID = productID;
        this.emailID = emailID;
        this.status = status;
    }
}

document.getElementById("checkOut").addEventListener("click", checkOut);



function checkOut() {

    if (localStorage.getItem("Order") == 0) {
        alert("Please place a Product into your Cart");
        return false;
    }

    var transaction1 = new transaction(
        localStorage.getItem("Order"),
        localStorage.getItem("currentUserEmail"),
        "Being Processed"
    );

    $.ajax({
        url: "http://localhost:4000/Transactions" + "",
        type: 'POST',
        data: JSON.stringify(transaction1),
        dataType: 'json',
        contentType: "application/json", // added data type
    });

    RemoveFromCart();

    alert("Thank you for your purchase! You can find your order on your profile page :)")
}