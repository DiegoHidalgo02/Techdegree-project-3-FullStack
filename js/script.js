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
