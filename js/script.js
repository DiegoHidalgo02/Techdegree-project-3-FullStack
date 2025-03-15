// DOM element selections for form inputs
const nameInput = document.querySelector("input#name");          // Name input field
const emailInput = document.querySelector("input#email");        // Email input field
const jobTittleInput = document.querySelector("select#title");   // Job title dropdown
const otherJobRoleInput = document.querySelector("input#other-job-role"); // Custom job role input

// T-shirt design selections
const designIput = document.querySelector("select#design");      // Design dropdown
const colorInput = document.querySelector("select#color");       // Color dropdown

// Activities registration elements
const TotalAmout = document.querySelector("#activities-cost");   // Total cost display
const RegisterActivitiesBox = document.querySelector("#activities-box"); // Activities container
const activitiesInput = RegisterActivitiesBox.querySelectorAll("input"); // Activity checkboxes

// Payment method elements
const paymentSelection = document.querySelector("#payment");     // Payment method dropdown
const paymentMethods = document.querySelector(".payment-methods"); // Payment methods container
const methods = paymentMethods.querySelectorAll('.payment-methods > div:not([class="payment-method-box"])'); // Individual payment sections

// Form element
const form = document.querySelector("form");

// Credit card specific inputs
const expMonthInput = document.querySelector("#exp-month");      // Expiration month
const expYearInput = document.querySelector("#exp-year");        // Expiration year
const cardNumberInput = document.querySelector("#cc-num");       // Card number
const zipCodeInput = document.querySelector("#zip");             // Zip code
const cvvInput = document.querySelector("#cvv")                  // CVV number

// Form validation state variables
let nameControll = false;        // Tracks name field validation
let emailControll = false;       // Tracks email field validation
let cardNumberControll = false;  // Tracks card number validation
let zipCodeControll = false;     // Tracks zip code validation
let cvvControll = false;         // Tracks CVV validation
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Function for changing the content of dropdown Menu
function changeColorDropDownMenu(userSelection){

    Array.from(colorInput.children).forEach(optionElement => { //loop on the array of option
        
        if(optionElement.dataset.theme){  //controll if had a theme dataset

            const optionElementTheme = optionElement.dataset.theme; //crate a varibale with option current dataset theme

            if(userSelection !== optionElementTheme){ //controll if it is not equal to the selection of user in the desing input

                optionElement.hidden = true; //if is not equal set element hidden attribute to true

            }else{

                optionElement.hidden = false; //else if is equal set element hidden attribute to false

            }

        }
        
    })

    colorInput.querySelector("option:nth-child(2)").selected = true;

}

//Event Listeners
window.addEventListener("DOMContentLoaded", ()=>{ //when content of the page is complete loaded do this...
    nameInput.focus(); //On page load, the cursor appears in the "Name" field, ready for a user to type.
    otherJobRoleInput.style.display = "none"; //Other job role" text field displays/hides when a user selects/deselects "Other" from the Job Role menu.
    colorInput.disabled = true; //The "Color" field is disabled when the page loads.

    // When the page loads, "Credit Card" is selected in the payment field, 
    Array.from(paymentSelection.children).forEach(e => { //loop on all type of payment methods

        if(e.value === "credit-card"){ //if the current element of loop has a value that is "credit card"

            e.selected = true; //set it selected attribute to true
        }

    })

    // and the credit card section is the only payment section displayed in the form’s UI.
    methods.forEach(element => { //loop on all type of payment methods
        if(element.id !== "credit-card"){  //if the current element id is not equal to "credit-card"
            element.style.display = "none"; //set the current element style.display attribute to "none"
        }

    });
});

jobTittleInput.addEventListener("change", e => { //when a job role is selected in Job Role input

    if(e.target.value === "other"){ //if the option element selected has the value attribute equal to "others"

        otherJobRoleInput.style.display = "block"; //the hidden input other job role is displayed

    }else{

        otherJobRoleInput.style.display = "none";

    }

});

designIput.addEventListener("change", e=>{ //When the user select a desing
    colorInput.disabled = false; //When user selected a option the color filed is enable
    changeColorDropDownMenu(e.target.value);//call the fuction that update the color dropdown menu base in the user selection
    const firstElement = Array.from(colorInput.children).find(element => element.hidden === false);
    firstElement.selected = true;
});

RegisterActivitiesBox.addEventListener("change", e => {

    const activities = RegisterActivitiesBox.querySelectorAll('input:not([name="all"])'); //Store all activities except the main activities on array

    if(e.target.name !== "all"){ //controll if the selected activity is not the main

        //if its true
        activities.forEach(element => { //loop on all activities to disable the activity that has an euqal date to the selected task

            const controll1 = e.target.dataset.dayAndTime == element.dataset.dayAndTime //controll that activity date is equaL to another activity
            const controll2 = e.target !== element //control not to target the selected element

            if(e.target.checked === true){ //I check that the change that has occurred is a selection of the input field and not a deselection

                if(controll1 && controll2){ //apply the controlls

                    element.disabled = true; //disable element 
                    element.parentNode.classList.add("disabled"); //add to the element disabled the class disabled
        
                }

            }else{
            
            //If you have unchecked a activity
            
                if(controll1 && controll2){ //apply the controlls

                    element.disabled = false; //set the disabled attribute of the current element to false
                    element.parentNode.classList.remove("disabled"); //remove from current element the class disabled

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

paymentSelection.addEventListener("change", e => { //When user select/change a payment method

    methods.forEach(method => { //loop through all the payment methods

        if(e.target.value !== method.id){ //if the option selected has an value attribute  not equal to the current method id

            method.style.display = "none"; //set the display attribute of current element to "none"

        }else{
            //if  the option selected has an value attribute equal to the current method id
            method.style.display = "block"; //set the display of the current element to "block"

        }
    })

})

activitiesInput.forEach(input => { //when the user select or remove the selection 

    input.addEventListener("focus", event => {
        input.parentNode.classList.add("focus") //add class to the parent node of the input the class focus
    })
    input.addEventListener("blur", event => {
        input.parentNode.classList.remove("focus");//remove class to the parent node of the input the class focus
    })

})
///////////////////////////////////////////////////////////

/**
 * Validates a name using regex patterns
 * @param {string} name - The name to validate
 * @returns {Object} Object containing:
 * - test: boolean indicating if name matches required format (starts with capital letter, followed by lowercase letters)
 * - match: array of any invalid characters found (numbers or special characters)
 */
//REGEX Validation Functions
function isValidName(name){
    const regexTest = /^[A-Za-z{1}][a-z]+$/; // Pattern: Start with capital letter, followed by lowercase letters
    const regexMatch = /([0-9])|([^a-zA-Z0-9])/g // Pattern: Find any numbers or special characters
    return {
        test: regexTest.test(name),
        match: name.match(regexMatch)
    }
}

/**
 * Validates an email address with detailed error checking
 * @param {string} email - The email address to validate
 * @returns {Object|false} False if no @ found, otherwise object containing:
 * - test: boolean for overall email format validation
 * - match: object with invalid characters found in username and domain parts
 */
function isValidEmail(email){
    // Main email format validation (username@domain.tld)
    const regexTest = /^[a-zA-Z0-9.]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-z]{2,}$/i

    // Patterns to find invalid characters in username and domain
    const invalidUsername = /([^a-zA-Z0-9.])/g; // Only allows letters, numbers, dots in username
    const invalidDomain = /([^a-zA-Z0-9.-])/g; // Only allows letters, numbers, dots, hyphens in domain

    let username;
    let domain;

    if(email.includes("@")){
        // Split email into username and domain parts
        [username, domain] = email.split('@');
        domain = domain.split(".")[0]; // Get domain without TLD

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

/**
 * Validates a credit card number
 * @param {string} cardNumber - The card number to validate
 * @returns {Object} Object containing:
 * - test: boolean indicating if number matches format (16 digits in groups of 4)
 * - match: array of any non-numeric characters found
 */
function isValidCardNumber(cardNumber){

    const regexTest = /^(\d{4})(\d{4})(\d{4})(\d{1,4})$/; // Pattern: 4 groups of 4 digits
    const regexMatch = /([a-zA-Z]|[^a-zA-Z0-9])/g;  // Find any non-numeric characters

    return {
        test: regexTest.test(cardNumber),
        match: cardNumber.match(regexMatch)
    }
}

/**
 * Validates a zip code
 * @param {string} zipCode - The zip code to validate
 * @returns {Object} Object containing:
 * - test: boolean indicating if code is exactly 5 digits
 * - match: array of any non-numeric characters found
 */
function isValidZipCode(zipCode){

    const regexTest = /^\d{5}$/g; // Pattern: Exactly 5 digits
    const regexMatch = /([a-zA-Z]|[^a-zA-Z0-9])/g; //// Find any non-numeric characters

    return {
        test: regexTest.test(zipCode),
        match: zipCode.match(regexMatch)
    }

}

/**
 * Validates a CVV security code
 * @param {string} cvv - The CVV to validate
 * @returns {Object} Object containing:
 * - test: boolean indicating if CVV is exactly 3 digits
 * - match: array of any non-numeric characters found
 */
function isValidCVV(cvv){
    const regexTest = /(^[\d]{3})$/; // Pattern: Exactly 3 digits
    const regexMatch =  /([a-zA-Z]|[^a-zA-Z0-9])/g; // Find any non-numeric characters

    return {
        test: regexTest.test(cvv),
        match: cvv.match(regexMatch)
    }
}
/////////////////////////////////

//Controll REGEX Validation Functions
function showOrHideTip(show, element){
    //This feature handles the display of errors when writing to input fields

    //It accepts 2 values, a boolean that indicates whether the element should be shown or not and the element to be shown or hidden
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
                
                // Handle different input types with specific error messages
                switch (nameInput) {
                    case "Name":
                        nameControll = false;
                        if(text.length > 1){// Show different error messages based on input length
                           tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})`; 
                        }else{
                            tooltip.textContent = `${nameInput} field cannot be 1  character`;
                        }
                        break;
                    case "Email":
                        emailControll = false;
                        if(validText.match){ // Show specific error messages for invalid email format
                            tooltip.textContent = `${nameInput} field contains invalid characters: on ${validText.match.username ? `username: ${validText.match.username}` : ""} ${validText.match.domain ? `, domain: ${validText.match.domain}` : "" }` 
                        }else{
                            tooltip.textContent = `${nameInput} address must be formatted correctly`
                        }
                        break;
                    case "Card Number":
                        cardNumberControll = false;
                        // Validate credit card number length and characters
                        text.length > 16 || text.length < 13 ? tooltip.textContent = "Credit card number must be between 13 - 16 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})` 
                        break;
                    case "Zip Code":
                        zipCodeControll = false;
                        // Validate zip code length and characters
                        text.length > 5 || text.length < 5 ? tooltip.textContent = "Zip Code must be 5 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})`;
                        break;
                    case "CVV":
                         // Validate CVV length and characters
                        text.length > 3 || text.length < 3 ? tooltip.textContent = "CVV must be 3 digits" : tooltip.textContent = `${nameInput} field contains invalid characters:(${validText.match})` 
                        break;
                    default:
                        break;
                }
                // Show tooltip for invalid input
                showTip = true;
                    
            }else{
                 // If validation passes, update control flags
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
            // Show error message for empty field
            tooltip.textContent = `${nameInput} field cannot be blank`;
            showTip = true;
        }
        // Toggle tooltip visibility based on validation results
        showOrHideTip(showTip, tooltip);

    }

}
//////////////////////////////////////////////////


//Listener for validation
//All this listener function whena are trigered call the createListener function
nameInput.addEventListener("input", createListener(isValidName, "Name"));
emailInput.addEventListener("input", createListener(isValidEmail, "Email"));
cardNumberInput.addEventListener("input", createListener(isValidCardNumber, "Card Number"));
zipCodeInput.addEventListener("input", createListener(isValidZipCode, "Zip Code"));
cvv.addEventListener("input", createListener(isValidCVV, "CVV"));
////////////////////////////////////////////////////////////////////


//Function form validation
function anActivityIsSelected(){
    const activitiesInputs = RegisterActivitiesBox.querySelectorAll("input");// Get all activity checkboxes
    const isSelected = Array.from(activitiesInputs).some( element => element.checked === true);// Check if any activity is selected
    const element = document.querySelector("#activities-box");// Get activities container for validation feedback

    // Update UI validation feedback and return result
    if(isSelected){
        userFeedbackValidation(element, isSelected);
        return isSelected;
    }else{
        userFeedbackValidation(element, isSelected);
        return isSelected
    }


}

function creditCardSelected(){
    //Checks if credit card is selected as payment method
    //Searches through payment dropdown options for credit card selection
    return Array.from(paymentSelection.children).some( element => element.value === "credit-card" && element.selected === true);
}

function creditCardControll(){

    if(cardNumberControll && zipCodeControll && cvvControll){// Check if all credit card fields are true
        // Update UI validation feedback for all fields
        [cardNumberInput, zipCodeInput, cvv].forEach(element => userFeedbackValidation(element, true));
        return true;

    }else{
         // Show validation errors for invalid fields
        userFeedbackValidation(cardNumberInput, cardNumberControll);
        userFeedbackValidation(zipCodeInput, zipCodeControll);
        userFeedbackValidation(cvv, cvvControll);
        return false;

    }

}

function nameInputControll(){
    // Validates name input field 
    if(nameControll){ // Uses the global nameControll flag set by real-time validation
        userFeedbackValidation(nameInput, nameControll);// updates UI feedback
        return true;
    }else{
        userFeedbackValidation(nameInput, nameControll);// updates UI feedback
        return false
    }
}

function emailInputControll(){

    if(emailControll){ //Uses the global emailControll flag set by real-time validation
        userFeedbackValidation(emailInput, emailControll);// updates UI feedback
        return true
    }else{
        userFeedbackValidation(emailInput, emailControll)// updates UI feedback
        return false;
    }

}

function userFeedbackValidation(element, verification){

    const section = element.parentNode;// Get parent section that contains the input
    const tooltip = section.querySelector(".hint")// Find the hint element for error messages

    if(verification){
        // Success state: Add valid class, remove error class
        section.classList.add("valid");
        section.classList.remove("not-valid");
    }else{
        // Error state: Add error class, remove valid class, show tooltip
        section.classList.add("not-valid");
        section.classList.remove("valid");
        showOrHideTip(true, tooltip);
    }   
}
////////////////////////////////////



//Submit Controll
form.addEventListener("submit", event => {

    //All control functions are called and their result is assigned to a constant
    const nameCtrl = nameInputControll();
    const emailCtrl = emailInputControll();
    const activityCtrl = anActivityIsSelected();
    const creditCardCtrl = creditCardControll();

    //The function that checks whether credit card has been selected as the payment method is called
    if(creditCardSelected()){
        
        if(!(nameCtrl && emailCtrl && activityCtrl && creditCardCtrl)){ //If at least one check failed, the form is not submitted.
            event.preventDefault();
        }
    
    }else{//If you have not selected credit card as the payment method, the credit card fields are not checked

        if(!(nameCtrl && emailCtrl && activityCtrl)){//If at least one check failed, the form is not submitted.
            event.preventDefault();
        }

    }



}) 