/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const units = "&units=imperial";
const apiKey = "&appid=5fc2a0145277f33ee05892f4da915091";

// Error messages
const ERROR_MESSAGE = "An error has occured.Please try again.";
const EMPTY_ZIP_CODE_ERROR = "Zip code must not be empty";
const NOT_NUMBER_ZIP_CODE_ERROR = "Zip code must be a number.";
const EMPTY_FEELINGS_ERROR = "Feeling must not be empty.";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '-' + d.getDay() + '-' + d.getFullYear();

// define varibles
let generateBtn = document.getElementById("generate");
let feelingsEntry = document.getElementById("feelings");
let dateLabel = document.getElementById("date");
let tempLabel = document.getElementById("temp");
let contentLabel = document.getElementById("content");
let zipCodeEntry = document.getElementById("zip");

// add event listner on generate button clicked
generateBtn.addEventListener('click', onGenerateClicked);

function onGenerateClicked() {

    // check that all entries are valid
    if (validiteEntries()) {
        // get weather data from the openweather API
        getWeatherData(baseURL, zipCode, apiKey, units).then(function (data) {
            // then make a POST request to add it to the local server
            postData("/addData", createWeatherObject(newDate, data, feelingsEntry.value));
            // update ui by making a GET request to the local server
            updateUI()
        });
    }
}



// helper functions

// function to update ui by making a GET request to the local server
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const data = await request.json();
        dateLabel.innerHTML = `Date : ${data.date}`;
        tempLabel.innerHTML = `Temprature : ${data.temp}`;
        contentLabel.innerHTML = `Feelings : ${data.content}`;

    } catch (error) {
        console.log("error", error);
        alert(ERROR_MESSAGE);
    }
}

// validate that zip code and feeling entries are not empty
function validiteEntries() {
    if (zipCodeEntry.value.trim() == "") {
        alert(EMPTY_ZIP_CODE_ERROR);
        return false;
    }
    if (isNaN(zipCodeEntry.value)) {
        alert(NOT_NUMBER_ZIP_CODE_ERROR);
        return false;
    }
    if (feelingsEntry.value.trim() == "") {
        alert(EMPTY_FEELINGS_ERROR);
        return false;
    }
    return true;
}


// function to create weather object
function createWeatherObject(date, data, feelings) {
    newEntry = {
        date: date,
        temp: data.main.temp,
        content: feelings,
    };
    return newEntry;
}

// POST function
async function postData(url = '', data = {}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

}


// GET Functions

const getWeatherData = async (baseURL, zipCode, apiKey, units) => {
    const res = await fetch(baseURL + zipCode + apiKey + units)
    try {

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
        alert(ERROR_MESSAGE);
    }
}
