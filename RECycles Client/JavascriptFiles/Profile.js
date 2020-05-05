//tjekker om en bruger er logged fordi for at se ens profile skal man være logged in, hvis man ikke er logged in bliver man redirected til Login siden
if (localStorage.getItem("loggedIn") === "true") {
}
else {
    location.href = "Login.html";
}

currentUserEmailProfile = localStorage.getItem("currentUserEmail");

$.ajax({
    url: "http://localhost:4000/Users" + "/" + currentUserEmailProfile,
    async: false,
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        // console.log(res);
        window.existingUserProfiles = res;
    }
});

$.ajax({
    url: "http://localhost:4000/Transactions" + "/" + currentUserEmailProfile,
    async: false,
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
       console.log(res);
        window.existingUserTransactions = res;
    }
});


var profileFirst = "Welcome" + " " + existingUserProfiles.firstName + "!";
var profileName = existingUserProfiles.firstName + " " + existingUserProfiles.lastName;
var profileEmail = existingUserProfiles.email;
var profileNumber = existingUserProfiles.phoneNumber;


document.getElementById('profileFirst').innerHTML = profileFirst;
document.getElementById('profileName').innerHTML = profileName;
document.getElementById('profileEmail').innerHTML = profileEmail;
document.getElementById('profileNumber').innerHTML = profileNumber;


// console.log(existingUserTransactions.productID(0));

document.getElementById('profileTransactions').innerHTML = (JSON.stringify(existingUserTransactions));


document.getElementById("LogOut").addEventListener("click", LogOut);
//denne function logger brugeren ud ved at sætte loggedIn som undefined og dermed ikke === true

function LogOut() {
    localStorage.setItem("loggedIn", "");
    location.href = "index.html";
    localStorage.setItem("currentUserEmail", "");
}
