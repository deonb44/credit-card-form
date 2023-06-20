const cardholder = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expiryMonth = document.getElementById("expiry-month");
const expiryYear = document.getElementById("expiry-year");
const expiry = Array.from(document.querySelectorAll(".expiry"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById('submit');
const nameOnCard = document.querySelector(".cardholder-display");
const numOnCard = document.querySelector(".card-number-display");
const expMM = document.querySelector(".expiry-month-display");
const expYY = document.querySelector(".expiry-year-display");
const cvcDisplay = document.querySelector(".cvc-display");
const thankYou = document.getElementById("thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("myForm");
const expiryErrorMsg = document.getElementById("expiry-error");

//extracting first name for the thank you page
function extractFirstWord(cardholder) {
    //Remove leading/trailing whitespace and split input into an array of words
    var words = cardholder.value.trim().split(" ");

    //Return the first word (index 0)
     var firstWord = words[0];

    // capatilize first letter and concatenate it with the rest of the word
    var capitalWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

    //return the capatalized first word
    return capitalWord;
}

function inputName() {
    nameOnCard.innerHTML = cardholder.value;
    var firstName = extractFirstWord(cardholder)
    thankYou.innerHTML = `Thank You, ${firstName}`;
    if (nameOnCard.innerHTML == "") {
        nameOnCard.innerHTML = cardholder.ariaPlaceholder;
    }
}

function inputCardNum() {
    let cardNumberInput = cardNumber.value;
    //not allowing invalid characters
    let formattedCardNumber = cardNumberInput.replace(/[^\d]/g, "");
    formattedCardNumber = formattedCardNumber.substring(0,16);
    //card number in groups of 4
    let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null) {
        formattedCardNumber = cardNumberSections.join(" ");
    }
    // If the formattedCardNumber is different to whats shown change
    if (cardNumberInput !== formattedCardNumber) {
        cardNumber.value = formattedCardNumber;
    }
    numOnCard.innerHTML = cardNumber.value;
    if (cardNumber.value === "") {
        numOnCard.innerHTML = cardNumber.placeholder;
    }
}

function inputMM() {
    let formattedMM = expiry[0].value;
    formattedMM = formattedMM.substring(0,2);
    expiry[0].value = formattedMM;
    if (expiry[0].value === " ") {
        expMM.innerHTML = "00";
    } else {
        expMM.innerHTML = expiry[0].value;
    }
}

function inputYY() {
    let formattedYY = expiry[1].value;
    formattedYY = formattedYY.substring(0,2);
    expiry[1].value = formattedYY;
    if (expiry[1].value === " ") {
        expYY.innerHTML = "00";
    } else {
        expYY.innerHTML = expiry[1].value;
    }
}

function inputCvc() {
    let formattedCvc = cvc.value;
    
    formattedCvc = formattedCvc.substring(0,3);
    cvc.value = formattedCvc;
    if (cvc === "") {
        cvcDisplay.innerHTML = "000";
    } else {
        cvcDisplay.innerHTML = cvc.value;
    }
}

function massValidate() {
    function validateName() {
        let cardholderExp = /^[A-Z a-z]+$/;
        if (cardholder.value.match(cardholderExp)) {
            errorMsg.innerHTML = "";
            cardholder.classList.remove("error");
        } else {
            errorMsg.innerHTML = "Please enter cardholder name!"
            cardholder.classList.add("error");
        }
    }

    function validateCard() {
        let cardNumError = document.getElementById("card-num-error");
        if (cardNumber.value.length > 0 && cardNumber.value.length < 16) {
            cardNumError.innerHTML = "Wrong format!";
            cardNumber.classList.add("error");
        } else if (cardNumber.value == "") {
            cardNumError.innerHTML = "Can't be blank!";
            cardNumber.classList.add("error");
        } else {
            cardNumError.innerHTML = "";
            cardNumber.classList.remove("error");
        }
    }

    function validateExpiry() {
        let expMonth = /^(0[1-9]|1[0-2])$/;
        let expYear = /^[0-9]{2}$/;

        if (expiry[0].value.match(expMonth)) {
            expiryErrorMsg.innerHTML = "";
            expiryMonth.classList.remove("error");}
        // // } else if (
        // //     expiry[0].value.match(expMonth) &&
        // //     expiry[1].value.match(expYear)
        // // ) {
        // //     expiryErrorMsg.innerHTML = "";
        // //     expiryMonth.classList.remove("error");
        // //     expiryYear.classList.remove("error");
        // } else 
        else if (expiry[0].value === "") {
            expiryErrorMsg.innerHTML = "Can't be blank!";
            expiryMonth.classList.add("error");
            
        } else if (expiry[1].value === "") {
            expiryErrorMsg.innerHTML = "Can't be blank!";
            expiryYear.classList.add("error");
        }
        else {
            expiryErrorMsg.innerHTML = "Wrong format!";
            expiryMonth.classList.add("error");
            expiryYear.classList.add("error");
        }

        if (expiry[1].value < 23) {
            expiryErrorMsg.innerHTML = "Wrong format!";
            expiryYear.classList.add("error");
        } else if (expiry[1].value.match(expYear)) {
           
            expiryYear.classList.remove("error");
        } else {
            expiryErrorMsg.innerHTML = "Can't be blank!";
            expiryYear.classList.add("error");
        }
    }


2
    function validateCvc() {
        let cvcErrorMsg = document.getElementById("error-cvc");
        let cvcExp = /^[0-9]{3}$/;
        if (cvc.value === "") {
            cvcErrorMsg.innerHTML = "Can't be blank!";
            cvc.classList.add("error");
        } else if (cvc.value.match(cvcExp)) {
            cvcErrorMsg.innerHTML = "";
            cvc.classList.remove("error")
        } else {
            cvcErrorMsg.innerHTML = "Wrong format!";
            cvc.classList.add("error");
        }
    }
//validating all fields meet criteria before submitting
    validateCard();
    validateName();
    validateExpiry();
    validateCvc();
    if (
        cardholder.value == "" ||
        cardNumber.value == "" ||
        expMM.innerHTML == "00"||
        expYY.innerHTML == "00" ||
        cvcDisplay.innerHTML == "000"||
        cardNumber.value.length < 16 ||
        expiry[0].value > 12 ||
        expiry[1].value < 23 
    ) {
        return false;
    } else {
        return true;
    }

}
//submit button
submit.addEventListener("click", function () {
    massValidate();
    if (massValidate() === false) {
        event.preventDefault();
    } else {
        event.preventDefault();

        form.classList.add("hidden");
        thankYouSection.classList.remove("hidden");
    }

});

//Continue Button
//return all fields to default
continueBtn.addEventListener("click", function () {
    event.preventDefault();
    thankYouSection.classList.add("hidden");
    form.classList.remove("hidden");
    nameOnCard.innerHTML = "Jane Appleseed";
    numOnCard.innerHTML = "0000 0000 0000 0000";
    expMM.innerHTML = "00";
    expYY.innerHTML = "00";
    cvcDisplay.innerHTML = "000";
    cardholder.value = "";
    cardNumber.value = "";
    expiry[0].value = "";
    expiry[1].value = "";
    cvc.value = "";
    expiryErrorMsg.innerHTML = "";
    cardholder.classList.remove("error");
    cardNumError.innerHTML = "";
    errorMsg.innerHTML = ""
    expiryYear.classList.remove("error");
    expiryMonth.classList.remove("error");
    cardholder.classList.remove("error");
    cardNumber.classList.remove("error");
})
