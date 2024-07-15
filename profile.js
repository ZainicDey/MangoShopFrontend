document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('authToken');
    console.log(token);
    function order(id){
        fetch()
    }
    if (token) {
        const orderListContainer = document.getElementById('orderlist');
        fetch('https://mangoshopbd.onrender.com/orders/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.json())
        .then(orders => {
            console.log('Fetched orders:', orders);

            // Clear previous content if any
            orderListContainer.innerHTML = '';

            // Iterate over each order item
            orders.forEach(order => {
                // Fetch mango details
                fetch(`https://mangoshopbd.onrender.com/mangoes/${order.mango}/`)
                    .then(response => response.json())
                    .then(mango => {
                        console.log('Fetched mango:', mango);

                        // Format ordered_at date
                        const orderedAtDate = new Date(order.ordered_at);
                        const formattedDate = orderedAtDate.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        });

                        // Create a div for each order item
                        const orderItem = document.createElement('div');
                        orderItem.classList.add('d-flex', 'flex-row', 'justify-content-between', 'align-items-center', 'p-2', 'bg-white', 'mt-4', 'px-3', 'rounded');
                        
                        // Create HTML structure for each order item
                        orderItem.innerHTML = `
                            <div onclick = "details(order.id)" class="mr-1"><img class="rounded" src="${mango.image}" width="70"></div>
                            <div class="d-flex flex-column align-items-center product-details">
                                <span class="font-weight-bold">Order ID: ${order.id}</span>
                                <div class="d-flex flex-row product-desc">
                                    <div class="size mr-1"><span class="text-grey">Name:</span><span class="font-weight-bold">&nbsp;${mango.name}</span></div>
                                    <div class="size mr-1"><span class="text-grey">Quantity:</span><span class="font-weight-bold">&nbsp;${order.quantity}</span></div>
                                    <div class="color"><span class="text-grey">Status:</span><span class="font-weight-bold">&nbsp;${order.status}</span></div>
                                </div>
                                <div class="mt-2"><span class="text-grey">Ordered At:</span><span class="font-weight-bold">&nbsp;${formattedDate}</span></div>
                            </div>
                            <div class="d-flex flex-row align-items-center qty">
                                <div>
                                    <h5 class="text-grey">BDT${mango.price}</h5>
                                </div>
                            </div>
                        `;

                        // Append each order item to the orders list container
                        orderListContainer.appendChild(orderItem);
                    })
                    .catch(error => {
                        console.error('Error fetching mango details:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    }
});
