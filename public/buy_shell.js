// JavaScript for handling interactions in Buy & Sell page

// Example: Handle click on details link
document.addEventListener('DOMContentLoaded', function() {
    const detailsLinks = document.querySelectorAll('.details-link');
    
    detailsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const item = this.dataset.item;
            const category = this.dataset.category;
            const price = this.dataset.price;
            const location = this.dataset.location;
            
            alert(`Details for ${item}\nCategory: ${category}\nPrice: ${price}\nLocation: ${location}`);
        });
    });
});
