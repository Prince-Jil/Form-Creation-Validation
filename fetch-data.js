
        // Define the async function to fetch user data
        async function fetchUserData() {
            // Define the API URL
            const apiUrl = 'https://jsonplaceholder.typicode.com/users';
            
            // Select the data container element
            const dataContainer = document.getElementById('api-data');
            
            try {
                // Fetch data from the API
                const response = await fetch(apiUrl);
                
                // Convert response to JSON
                const users = await response.json();
                
                // Clear the loading message
                dataContainer.innerHTML = '';
                
                // Create and append user list
                const userList = document.createElement('ul');
                
                // Loop through users and create list items
                users.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = user.name;
                    userList.appendChild(listItem);
                });
                
                // Append the user list to the data container
                dataContainer.appendChild(userList);
                
            } catch (error) {
                // Handle errors
                dataContainer.innerHTML = '';
                dataContainer.textContent = 'Failed to load user data.';
                dataContainer.className = 'error';
                console.error('Error fetching user data:', error);
            }
        }
        
        // Invoke fetchUserData when DOM is fully loaded
        document.addEventListener('DOMContentLoaded', fetchUserData);
