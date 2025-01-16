// Configuration
const targetLocationBV = { lat: 51.2843126, lon: 6.0962855}; // Replace with your desired latitude and longitude my house:
const targetLocationAmberH1 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:
const targetLocationPeterH2 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:
const targetLocationIsaH3 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:
const targetLocationBasiE1 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:
const targetLocationAgnetenE2 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:
const targetLocationSanderE3 = { lat: 51.2917511, lon: 6.0981211}; // Replace with your desired latitude and longitude my house:

const allowedRadius = 0.05; // Radius in kilometers (50 meters)
const correctAnswerAmberH1 = "9"
const correctAnswerPeterH2 = "Zoetermeer"
const correctAnswerIsaH3 = "56"
const correctAnswerBasiE1 = ""
const correctAnswerAgnetenE2 = ""
const correctAnswerSanderE3 = ""

// Utility: Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6365.168; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

// Check the user's location
function checkLocation() {
    const locationMessage = document.getElementById("locationMessage");
    const answerField = document.getElementById("answerField");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const distance = getDistance(
                    userLat,
                    userLon,
                    targetLocationBV.lat,
                    targetLocationBV.lon
                );
                console.log("User Latitude: " + userLat);
                console.log("User Longitude: " + userLon);
                console.log("User distance: " + distance);

                if (distance <= allowedRadius) {
                    answerField.disabled = false;
                    locationMessage.textContent =
                        "You are in the correct location. You can now enter your answer.";
                } else {
                    answerField.disabled = true;
                    locationMessage.textContent =
                        'You are not at the correct location. Please move closer. Your current distance: ' + distance ;
                }
            },
            (error) => {
                locationMessage.textContent =
                    "Error retrieving location. Please ensure location services are enabled.";
            },
            {
                enableHighAccuracy: true,  // Request the highest possible accuracy
                timeout: 10000,            // Set timeout (10 seconds in this example)
                maximumAge: 0              // Don't use cached position
            }
        );
    } else {
        locationMessage.textContent =
            "Geolocation is not supported by this browser.";
    }
}

// Check the user's answer
function checkAnswer(event) {
    event.preventDefault(); // Prevent form submission
    const userAnswer = document.getElementById("answerField").value.trim();


    if (userAnswer.toLowerCase() === correctAnswerAmberH1.toLowerCase() || userAnswer.toLowerCase() === correctAnswerSanderE3.toLowerCase()) {
        window.location.href = "successStart.html"; // Replace with your success page
    }
    if (userAnswer.toLowerCase() === correctAnswerPeterH2.toLowerCase()) {
        window.location.href = "successHobbits2.html"; // Replace with your success page
    }
    else if (userAnswer.toLowerCase() === correctAnswerIsaH3.toLowerCase()) {
        window.location.href = "successEnd.html"; // Replace with your success page
    } 
    else if (userAnswer.toLowerCase() === correctAnswerBasiE1.toLowerCase()) {
        window.location.href = "successStart.html"; // Replace with your success page
    } 
    else if (userAnswer.toLowerCase() === correctAnswerAgnetenE2.toLowerCase()) {
        window.location.href = "successElves2.html"; // Replace with your success page
    }
    else {
        alert("Incorrect answer. Try again.");
    }
}

// Reattempt location check every 1 second if the user is not at the correct location
setInterval(checkLocation, 1000);

// Initialize location check on page load
window.onload = checkLocation;
