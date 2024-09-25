document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');  // Hamburger menu icon
    const mobileSidebar = document.querySelector('.mobile-sidebar');  // Mobile sidebar element
    const closeSidebar = document.querySelector('.close-sidebar');    // Close sidebar button
    const menuItems = document.querySelectorAll('.mobile-sidebar .menu-item > a');  // Menu items within the sidebar
    const submenuContainer = document.querySelector('.submenu-container');  // Submenu container
    const closeSubmenu = document.querySelector('.close-submenu');  // Close submenu button

    let activeMenuItem = null;  // Track currently active menu item

    // Function to close the mobile sidebar
    function closeSidebarMenu() {
        mobileSidebar.classList.remove('active');  // Hide the sidebar
        submenuContainer.classList.remove('active');  // Close submenu if it's open
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');  // Remove active state from the last active menu item
            activeMenuItem = null;  // Reset active menu item
        }
    }

    // Open the mobile sidebar when hamburger menu is clicked
    hamburgerMenu.addEventListener('click', () => {
        mobileSidebar.classList.add('active');  // Show the sidebar
    });

    // Close the mobile sidebar when the close button is clicked
    closeSidebar.addEventListener('click', () => {
        closeSidebarMenu();  // Call function to close the sidebar
    });

    // Close the submenu when the close submenu button is clicked
    closeSubmenu.addEventListener('click', () => {
        submenuContainer.classList.remove('active');  // Hide the submenu container
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');  // Remove active state from the last active menu item
            activeMenuItem = null;  // Reset active menu item
        }
    });

    // Loop through each menu item in the sidebar
    menuItems.forEach(item => {
        // Add click event to each menu item
        item.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent the default behavior of the link
            const menuItem = item.parentElement;  // Get the parent menu item element
            const submenu = menuItem.querySelector('.submenu');  // Get the submenu within the current menu item

            // If there is an active menu item and it's not the current one, close it
            if (activeMenuItem && activeMenuItem !== menuItem) {
                activeMenuItem.classList.remove('active');  // Remove active class from the previous menu item
                activeMenuItem.querySelector('.submenu').style.display = 'none';  // Hide the previous submenu
            }

            // Toggle the submenu of the current menu item
            if (submenu) {
                const isActive = menuItem.classList.contains('active');  // Check if the current menu item is active
                menuItem.classList.toggle('active', !isActive);  // Toggle active state
                submenu.style.display = isActive ? 'none' : 'block';  // Show or hide the submenu based on active state
                activeMenuItem = isActive ? null : menuItem;  // Update the active menu item reference
            }
        });
    });

    // Close the sidebar when the window is resized to a larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {  // Check if the window width is greater than 768px
            closeSidebarMenu();  // Close the sidebar if on a larger screen
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Cart array to hold items
    let cart = [];

    // Add to Cart button event
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            // Add the product to the cart
            cart.push({
                name: productName,
                price: productPrice
            });

            // Update the cart display and total price
            updateCartDisplay();

            // Update the cart count
            cartCountElement.textContent = cart.length;
        });
    });

    // Function to update cart display
    function updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-items');
        const totalContainer = document.querySelector('.cart-total');
        cartContainer.innerHTML = '';  // Clear cart display

        let totalPrice = 0;

        // Loop through the cart and display each item
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button> <!-- Remove button -->
            `;
            cartContainer.appendChild(itemElement);

            // Calculate total price
            totalPrice += item.price;
        });

        // Display total price
        totalContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Attach remove functionality to each remove button
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);  // Remove item from cart
                updateCartDisplay();    // Update the cart display
                cartCountElement.textContent = cart.length; // Update cart count
            });
        });
    }

    // Show cart when the cart icon is clicked
    const cartIcon = document.querySelector('.cart');
    cartIcon.addEventListener('click', () => {
        document.querySelector('.cart-display').classList.toggle('active');
    });
});
