// Configuration
const targetLocation = { lat: 51.2917504, lon: 6.0981248}; // Replace with your desired latitude and longitude my house: ,6.0965782
const allowedRadius = 0.05; // Radius in kilometers (50 meters)
const correctAnswer = "Tom"; // Replace with your desired answer
// const correctAnswer2 = "Tom"; // Replace with your desired answer
// const correctAnswer3 = "Tom"; // Replace with your desired answer
// const correctAnswer4 = "Tom"; // Replace with your desired answer

// Utility: Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
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
                    targetLocation.lat,
                    targetLocation.lon
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
                        'You are not at the correct location. Please move closer. Your current location: Latitude:' + userLat + ', Longitude: ' + userLon;
                }
            },
            (error) => {
                locationMessage.textContent =
                    "Error retrieving location. Please ensure location services are enabled.";
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

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        window.location.href = "successHobbits1.html"; // Replace with your success page
    }
    // else if (userAnswer.toLowerCase() === correctAnswer2.toLowerCase()) {
    //     window.location.href = "successHobbits2.html"; // Replace with your success page
    // }
    // else if (userAnswer.toLowerCase() === correctAnswer3.toLowerCase()) {
    //     window.location.href = "successElves1.html"; // Replace with your success page
    // } 
    // else if (userAnswer.toLowerCase() === correctAnswer4.toLowerCase()) {
    //     window.location.href = "successElves2.html"; // Replace with your success page
    // } 
    else {
        alert("Incorrect answer. Try again.");
    }
}

// Initialize location check on page load
window.onload = checkLocation;
