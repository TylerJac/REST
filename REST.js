/**
 * Fetch data from the given URL and render the posts to the page.
 * @param {string} url - The URL to fetch data from.
 */
function fetchAndRenderPosts(url) {
    // Get the results div and hide previous content
    const resultDiv = document.getElementById('results');
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';

    // Fetch data from the URL
    fetch(url)
        .then(response => response.json()) // Convert response to JSON
        .then(posts => {
            let htmlContent = '';

            // Check if posts is an array or a single object
            if (Array.isArray(posts)) {
                // Iterate over each post and create HTML content
                posts.forEach(post => {
                    htmlContent += `
                        <div class="post">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>
                    `;
                });
            } else {
                // Create HTML content for a single post
                htmlContent = `
                    <div class="post">
                        <h2>${posts.title}</h2>
                        <p>${posts.body}</p>
                    </div>
                `;
            }

            // Set the inner HTML of the result div and display it
            resultDiv.innerHTML = htmlContent;
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            // Handle any errors during fetch and display them
            resultDiv.innerHTML = `<p>Error fetching posts: ${error}</p>`;
            resultDiv.style.display = 'block';
        });
}

/**
 * Event listener for the "Get All Posts" button.
 * Fetches and renders all posts.
 */
document.getElementById('getAllPosts').addEventListener('click', function() {
    fetchAndRenderPosts('http://jsonplaceholder.typicode.com/posts');
});

/**
 * Event listener for the "Get Single Post" button.
 * Fetches and renders the post with ID of 10.
 */
document.getElementById('getSinglePost').addEventListener('click', function() {
    fetchAndRenderPosts('http://jsonplaceholder.typicode.com/posts/10');
});

/**
 * Event listener for the "Create Post" button.
 * Creates a new post and displays the new post's ID.
 */
document.getElementById('createPost').addEventListener('click', function() {
    // Define a new post object
    const newPost = {
        title: 'New Post',
        body: 'This is a new post.',
        userId: 1
    };

    // Send a POST request to create a new post
    fetch('http://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost) // Convert newPost object to JSON string
    })
    .then(response => response.json()) // Convert response to JSON
    .then(post => {
        // Display the new post ID
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>New post created with ID: ${post.id}</p>`;
    })
    .catch(error => {
        // Handle any errors during post creation and display them
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error creating post: ${error}</p>`;
    });
});

/**
 * Event listener for the "Update Post" button.
 * Replaces the post with ID of 12 and displays the updated post.
 */
document.getElementById('updatePost').addEventListener('click', function() {
    // Define an updated post object
    const updatedPost = {
        id: 12,
        title: 'Updated Post',
        body: 'This is an updated post.',
        userId: 1
    };

    // Send a PUT request to update the post with ID 12
    fetch('http://jsonplaceholder.typicode.com/posts/12', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost) // Convert updatedPost object to JSON string
    })
    .then(response => response.json()) // Convert response to JSON
    .then(post => {
        // Display the updated post
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post updated successfully:</p><pre>${JSON.stringify(post, null, 2)}</pre>`;
    })
    .catch(error => {
        // Handle any errors during post update and display them
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error updating post: ${error}</p>`;
    });
});

/**
 * Event listener for the "Delete Post" button.
 * Deletes the post with ID of 12 and displays a success message.
 */
document.getElementById('deletePost').addEventListener('click', function() {
    // Send a DELETE request to delete the post with ID 12
    fetch('http://jsonplaceholder.typicode.com/posts/12', {
        method: 'DELETE'
    })
    .then(response => {
        // Display success message
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post deleted successfully.</p>`;
    })
    .catch(error => {
        // Handle any errors during post deletion and display them
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error deleting post: ${error}</p>`;
    });
});
