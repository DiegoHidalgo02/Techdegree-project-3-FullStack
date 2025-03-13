const nameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#email");

const jobTittleInput = document.querySelector("select#title");
const otherJobRoleInput = document.querySelector("input#other-job-role");

const designIput = document.querySelector("select#design");
const colorInput = document.querySelector("select#color");

const TotalAmout = document.querySelector("#activities-cost");

const RegisterActivitiesBox = document.querySelector("#activities-box");
const activitiesInput = RegisterActivitiesBox.querySelectorAll("input");

const paymentSelection = document.querySelector("#payment");
const paymentMethods = document.querySelector(".payment-methods");
const methods = paymentMethods.querySelectorAll('.payment-methods > div:not([class="payment-method-box"])');

const form = document.querySelector("form");

const expMonthInput = document.querySelector("#exp-month");
const expYearInput = document.querySelector("#exp-year");
const cardNumberInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv")

let nameControll = false;
let emailControll = false;
let cardNumberControll = false;
let zipCodeControll = false;
let cvvControll = false;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Function for event listener
function changeColorDropDownMenu(userSelection){

    console.log(colorInput.children);

    Array.from(colorInput.children).forEach(optionElement => {

        if(optionElement.dataset.theme){

            const optionElementTheme = optionElement.dataset.theme;

            if(userSelection !== optionElementTheme){

                optionElement.hidden = true;

            }else{

                optionElement.hidden = false;

            }

        }
        
    })

}

//Event Listeners
window.addEventListener("DOMContentLoaded", ()=>{
    nameInput.focus();
    otherJobRoleInput.style.display = "none";
    colorInput.disabled = true;
    Array.from(paymentSelection.children).forEach(e => {

        if(e.value === "credit-card"){

            e.selected = true;
        }

    })
    methods.forEach(element => {

        if(element.id !== "credit-card"){
            element.style.display = "none";
        }

    });
});


///////////////////////////////////////////////

jobTittleInput.addEventListener("change", e => {

    if(e.target.value === "other"){

        otherJobRoleInput.style.display = "block";

    }else{

        otherJobRoleInput.style.display = "none";

    }

});

designIput.addEventListener("change", e=>{
    console.log(e.target.value);
    colorInput.disabled = false;
    colorInput.querySelector("option:nth-child(2)").selected = true;
    changeColorDropDownMenu(e.target.value);
});

RegisterActivitiesBox.addEventListener("change", e => {

    const activities = RegisterActivitiesBox.querySelectorAll('input:not([name="all"])');

    if(e.target.name !== "all"){

        activities.forEach(element => {

            const controll1 = e.target.dataset.dayAndTime == element.dataset.dayAndTime
            const controll2 = e.target !== element

            if(e.target.checked === true){

                if(controll1 && controll2){

                    element.disabled = true; 
                    element.parentNode.classList.add("disabled");
        
                }

            }else{

                if(controll1 && controll2){

                    element.disabled = false;
                    element.parentNode.classList.remove("disabled");

                }

            }
    
    
        });

    }



    let totalAmountElement = document.querySelector("#activities-cost");
    const regexForTotalAmount = /(\d+)/gm;
    let currentValue = +totalAmountElement.textContent.match(regexForTotalAmount);
    const amountElementSelected = +e.target.dataset.cost;

    if(e.target.checked !== false){

        currentValue += amountElementSelected;
        
        totalAmountElement.textContent = `Total: $${currentValue}`; 


    }else{

        currentValue -= amountElementSelected;

        totalAmountElement.textContent = `Total: $${currentValue}`;
        
    }

    
})

paymentSelection.addEventListener("change", e => {

    methods.forEach(method => {

        if(e.target.value !== method.id){

            method.style.display = "none";

        }else{

            method.style.display = "block";

        }
    })

})

activitiesInput.forEach(input => {

    input.addEventListener("focus", event => {
        input.parentNode.classList.add("focus")
    })
    input.addEventListener("blur", event => {
        input.parentNode.classList.remove("focus");
    })

})
///////////////////////////////////////////////////////////

//REGEX Validation Functions
function isValidName(name){
    const regexTest = /^[A-Za-z{1}][a-z]+$/;
    const regexMatch = /([0-9])|([^a-zA-Z0-9])/g
    return {
        test: regexTest.test(name),
        match: name.match(regexMatch)
    }
}

function isValidEmail(email){
    const regexTest = /^[a-zA-Z0-9.]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-z]{2,}$/i
    const invalidUsername = /([^a-zA-Z0-9.])/g;
    const invalidDomain = /([^a-zA-Z0-9.-])/g;

    let username;
    let domain;

    if(email.includes("@")){

        [username, domain] = email.split('@');
        domain = domain.split(".")[0];

        return {
            test: regexTest.test(email),
            match: {
                    username: username.match(invalidUsername),
                    domain: domain.match(invalidDomain)
                } 
        }


    }

    return false;


}

function isValidCardNumber(cardNumber){

    const regexTest = /^(\d{4})(\d{4})(\d{4})(\d{1,4})$/;
    const regexMatch = /([a-zA-Z]|[^a-zA-Z0-9])/g;

    return {
        test: regexTest.test(cardNumber),
        match: cardNumber.match(regexMatch)
    }
}

function isValidZipCode(zipCode){

    const regexTest = /^\d{5}$/g;
    const regexMatch = /([a-zA-Z]|[^a-zA-Z0-9])/g;

    return {
        test: regexTest.test(zipCode),
        match: zipCode.match(regexMatch)
    }

}

function isValidCVV(cvv){
    const regexTest = /(^[\d]{3})$/;
    const regexMatch =  /([a-zA-Z]|[^a-zA-Z0-9])/g;

    return {
        test: regexTest.test(cvv),
        match: cvv.match(regexMatch)
    }
}
/////////////////////////////////

//Controll REGEX Validation Functions
function showOrHideTip(show, element){
    show ? element.style.display = "block" : element.style.display = "none"; 
}

function createListener(validatorTextFunction, nameInput){

    return e => {

        const text = e.target.value; //Extract text from input
        const validText = validatorTextFunction(text); //call apripriate validation function
        let showTip = false; //set tip to false
        const tooltip = e.target.nextElementSibling; //target tipElement

        if(text){ //controll if text isn't empty

            if(!validText.test){ //use the return value (object with global regex validation(.test) and specif regex validation(.match) ) of function to manage the error text on tooltip element

                switch (nameInput) {
                    case "Name":
                        nameControll = false;
                        if(text.length > 1){
                           tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})`; 
                        }else{
                            tooltip.textContent = `${nameInput} field cannot be 1  character`;
                        }
                        break;
                    case "Email":
                        emailControll = false;
                        if(validText.match){
                            tooltip.textContent = `${nameInput} field contains invalid characters: on ${validText.match.username ? `username: ${validText.match.username}` : ""} ${validText.match.domain ? `, domain: ${validText.match.domain}` : "" }` 
                        }else{
                            tooltip.textContent = `${nameInput} address must be formatted correctly`
                        }
                        break;
                    case "Card Number":
                        cardNumberControll = false;
                        text.length > 16 || text.length < 13 ? tooltip.textContent = "Credit card number must be between 13 - 16 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})` 
                        break;
                    case "Zip Code":
                        zipCodeControll = false;
                        text.length > 5 || text.length < 5 ? tooltip.textContent = "Zip Code must be 5 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})`;
                        break;
                    case "CVV":
                        text.length > 3 || text.length < 3 ? tooltip.textContent = "CVV must be 3 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})` 
                        break;
                    default:
                        break;
                }

                showTip = true;
                    
            }else{
    
                 switch (nameInput) {
                    case "Name":
                        nameControll = true;
                        break;
                    case "Email":
                        emailControll = true;
                        break;
                    case "Card Number":
                        cardNumberControll = true;
                        break;
                    case "Zip Code":
                        zipCodeControll = true;
                        break;
                    case "CVV":
                        cvvControll = true;
                        break;
                    default:
                        break;
    
                 }
            }

        }else{

            tooltip.textContent = `${nameInput} field cannot be blank`;
            showTip = true;
        }
        
        showOrHideTip(showTip, tooltip);

    }

}
//////////////////////////////////////////////////


//Listener for validation
nameInput.addEventListener("input", createListener(isValidName, "Name"));
emailInput.addEventListener("input", createListener(isValidEmail, "Email"));
cardNumberInput.addEventListener("input", createListener(isValidCardNumber, "Card Number"));
zipCodeInput.addEventListener("input", createListener(isValidZipCode, "Zip Code"));
cvv.addEventListener("input", createListener(isValidCVV, "CVV"));
////////////////////////////////////////////////////////////////////


//Function form validation
function anActivityIsSelected(){
    const activitiesInputs = RegisterActivitiesBox.querySelectorAll("input");
    const isSelected = Array.from(activitiesInputs).some( element => element.checked === true);
    const element = document.querySelector("#activities-box");

    if(isSelected){
        userFeedbackValidation(element, isSelected);
        return isSelected;
    }else{
        userFeedbackValidation(element, isSelected);
        return isSelected
    }


}

function creditCardSelected(){
    return Array.from(paymentSelection.children).some( element => element.value === "credit-card" && element.selected === true);
}

function creditCardControll(){

    if(cardNumberControll && zipCodeControll && cvvControll){

        [cardNumberInput, zipCodeInput, cvv].forEach(element => userFeedbackValidation(element, true));
        return true;

    }else{

        userFeedbackValidation(cardNumberInput, cardNumberControll);
        userFeedbackValidation(zipCodeInput, zipCodeControll);
        userFeedbackValidation(cvv, cvvControll);
        return false;

    }

}

function nameInputControll(){
    if(nameControll){
        userFeedbackValidation(nameInput, nameControll);
        return true;
    }else{
        userFeedbackValidation(nameInput, nameControll);
        return false
    }
}

function emailInputControll(){

    if(emailControll){
        userFeedbackValidation(emailInput, emailControll);
        return true
    }else{
        userFeedbackValidation(emailInput, emailControll)
        return false;
    }

}

function userFeedbackValidation(element, verification){

    const section = element.parentNode;
    const tooltip = section.querySelector(".hint")

    if(verification){
        section.classList.add("valid");
        section.classList.remove("not-valid");
    }else{
        section.classList.add("not-valid");
        section.classList.remove("valid");
        showOrHideTip(true, tooltip);
    }   
}
////////////////////////////////////