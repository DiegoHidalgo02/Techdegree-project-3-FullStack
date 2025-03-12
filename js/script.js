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


