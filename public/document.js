document.addEventListener('DOMContentLoaded', function() {
    const detailsLinks = document.querySelectorAll('.details-link');
    
    detailsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const collegeId = this.getAttribute('data-id');
            fetchCollegeDetails(collegeId);
        });
    });
    
    function fetchCollegeDetails(id) {
        fetch('colleges.json')
            .then(response => response.json())
            .then(data => {
                const college = data.find(col => col.id == id);
                if (college) {
                    showDetails(college);
                } else {
                    alert('College details not found.');
                }
            })
            .catch(error => console.error('Error fetching college details:', error));
    }
    
    function showDetails(college) {
        const content = document.querySelector('.content');
        content.innerHTML = `
            <h1>${college.name}</h1>
            <p><strong>Location:</strong> ${college.location}</p>
            <p><strong>Stream:</strong> ${college.stream}</p>
            <p><strong>Rating:</strong> ${college.rating}</p>
            <p><strong>Fee Structure:</strong> ${college.fee}</p>
            <p><strong>Class Details:</strong> ${college.classes}</p>
            <a href="dashboard.html">Back</a> <!-- Update the href to your homepage URL -->
        `;
    }
});
