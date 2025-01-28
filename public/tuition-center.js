document.querySelectorAll('.details-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const centreName = this.getAttribute('data-centre');
        const location = this.getAttribute('data-location');
        const detailsPage = window.open('', '_blank');
        detailsPage.document.write(`
            <html>
            <head>
                <title>${centreName} Details</title>
                <style>
                    body {
                        font-family: sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    h1 {
                        color: #3498db;
                    }
                    .content {
                        background-color: white;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <div class="content">
                    <h1>${centreName} Details</h1>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Contact Email:</strong> <a href="mailto:contact@${centreName.toLowerCase().replace(/ /g, '')}.com">contact@${centreName.toLowerCase().replace(/ /g, '')}.com</a></p>
                    <p><strong>Fee Structure:</strong> INR 50,000 per annum</p>
                    <p><strong>Classes:</strong> 6th to 12th</p>
                    <p>Additional details about ${centreName} can be provided here.</p>
                </div>
            </body>
            </html>
        `);
    });
});

document.getElementById('location-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showNearestCentre, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showNearestCentre(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    let nearestCentre = null;
    let minDistance = Infinity;

    document.querySelectorAll('#centre-table-body tr').forEach(row => {
        const centreLat = parseFloat(row.getAttribute('data-lat'));
        const centreLng = parseFloat(row.getAttribute('data-lng'));

        const distance = getDistance(userLat, userLng, centreLat, centreLng);

        if (distance < minDistance) {
            minDistance = distance;
            nearestCentre = row;
        }
    });

    if (nearestCentre) {
        alert(`The nearest centre is ${nearestCentre.cells[0].textContent} located at ${nearestCentre.cells[1].textContent}.`);
    } else {
        alert("No centres found.");
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Add search functionality
document.getElementById('search-bar').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    document.querySelectorAll('#centre-table-body tr').forEach(row => {
        const centreName = row.cells[0].textContent.toLowerCase();
        const location = row.cells[1].textContent.toLowerCase();
        if (centreName.includes(filter) || location.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Add filter functionality
document.getElementById('filter-btn').addEventListener('click', function() {
    // Implement filter functionality here
    alert("Filter button clicked. Implement your filter logic here.");
});
