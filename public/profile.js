function goBack() {
    window.history.back();
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('profilePic');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function submitForm() {
    const ageInput = document.getElementById('ageInput');
    const ageValue = parseInt(ageInput.value, 10);

    if (isNaN(ageValue) || ageValue <= 0) {
        alert('Age must be a positive number greater than zero.');
        return;
    }

    // Add your form submission logic here
    alert('Form submitted successfully!');
}
