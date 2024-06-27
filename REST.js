
// Function to fetch and render posts
function fetchAndRenderPosts(url) {
    const resultDiv = document.getElementById('results');
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(posts => {
            let htmlContent = '';
            if (Array.isArray(posts)) {
                posts.forEach(post => {
                    htmlContent += `
                        <div class="post">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>
                    `;
                });
            } else {
                htmlContent = `
                    <div class="post">
                        <h2>${posts.title}</h2>
                        <p>${posts.body}</p>
                    </div>
                `;
            }
            resultDiv.innerHTML = htmlContent;
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>Error fetching posts: ${error}</p>`;
            resultDiv.style.display = 'block';
        });
}

// Get all posts
document.getElementById('getAllPosts').addEventListener('click', function() {
    fetchAndRenderPosts('http://jsonplaceholder.typicode.com/posts');
});

// Get post with id of 10
document.getElementById('getSinglePost').addEventListener('click', function() {
    fetchAndRenderPosts('http://jsonplaceholder.typicode.com/posts/10');
});

// Create a new post
document.getElementById('createPost').addEventListener('click', function() {
    const newPost = {
        title: 'New Post',
        body: 'This is a new post.',
        userId: 1
    };

    fetch('http://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(post => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>New post created with ID: ${post.id}</p>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error creating post: ${error}</p>`;
    });
});

// Replace the post with id of 12
document.getElementById('updatePost').addEventListener('click', function() {
    const updatedPost = {
        id: 12,
        title: 'Updated Post',
        body: 'This is an updated post.',
        userId: 1
    };

    fetch('http://jsonplaceholder.typicode.com/posts/12', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(post => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post updated successfully:</p><pre>${JSON.stringify(post, null, 2)}</pre>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error updating post: ${error}</p>`;
    });
});

// Delete the post with id of 12
document.getElementById('deletePost').addEventListener('click', function() {
    fetch('http://jsonplaceholder.typicode.com/posts/12', {
        method: 'DELETE'
    })
    .then(response => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post deleted successfully.</p>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Error deleting post: ${error}</p>`;
    });
});