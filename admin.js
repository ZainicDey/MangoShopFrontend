$(document).ready(function() {
    const adminToken = 'YOUR_ADMIN_AUTH_TOKEN';  // Replace with your actual admin token

    // Function to handle Add Mango form submission
    $('#add-mango-form').on('submit', function(event) {
        event.preventDefault();

        // Create a FormData object to hold the form data
        var formData = new FormData();
        formData.append('name', $('#name').val());
        formData.append('description', $('#description').val());
        formData.append('price', $('#price').val());
        formData.append('quantity', $('#quantity').val());
        formData.append('image', $('#image')[0].files[0]);

        // Assume seller is selected through a dropdown menu with the seller ID
        var seller = $('#seller').val();
        formData.append('seller', JSON.stringify({id: seller}));  // Adjust based on how seller is structured

        // Send the form data to the API endpoint
        $.ajax({
            url: 'https://mangoshopbd.onrender.com/adminmangoes/',  // Adjusted URL for mango post
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Token ' + adminToken,  // Replace with your actual admin token
            },
            success: function(response) {
                alert('Mango added successfully!');
                // Optionally, clear the form or take other actions
                $('#add-mango-form')[0].reset();
            },
            error: function(xhr, status, error) {
                alert('Error adding mango: ' + xhr.responseText);
            }
        });
    });

    // Function to handle Order Status Update
    $('#order-list').on('change', '.order-status', function() {
        var orderId = $(this).data('order-id');
        var newStatus = $(this).val();

        // Send the status update to the API endpoint
        $.ajax({
            url: 'https://mangoshopbd.onrender.com/adminorders/',  // Adjusted URL for order status update
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id: orderId,
                status: newStatus
            }),
            headers: {
                'Authorization': 'Token ' + adminToken,  // Replace with your actual admin token
            },
            success: function(response) {
                alert('Order status updated successfully!');
            },
            error: function(xhr, status, error) {
                alert('Error updating order status: ' + xhr.responseText);
            }
        });
    });
});
