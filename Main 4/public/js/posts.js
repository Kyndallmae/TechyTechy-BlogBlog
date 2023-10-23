const addPost = async function (event) {
    event.preventDefault();

    const postBody = document.querySelector('#post-body').value.trim();
    const postTitle = document.querySelector('#post-title').value.trim();
    const postDate = new Date().toLocaleString();

    // Uses the logout module to logout
    const response = await fetch('/post', {
        method: 'POST',
        body: JSON.stringify({ postBody, postTitle, postDate }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // Redirects to the homepage
        document.location.replace('/dashboard');

    } else {
        alert(response.statusText);
    }
};

const editPost = async function (event) {
    event.preventDefault();

    const postId = new URL(window.location.href).pathname.split('/').pop();
    const postText = document.querySelector('#post-text').value.trim();
    const postTitle = document.querySelector('#post-title').value.trim();

    // Uses the logout module to logout
    const response = await fetch(`/edit/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ postText, postTitle }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // Redirects to the homepage
        document.location.replace('/dashboard');

    } else {
    alert(response.statusText);
    }
};

const deletePost = async function (event) {
    event.preventDefault();

    const postId = new URL(window.location.href).pathname.split('/').pop();

    // Uses the logout module to logout
    const response = await fetch(`/api/posts${postId}`, {
        method: 'DELETE',
        force: true,
        cascade: true,
    });
    if (response.ok) {
        // Redirects to the homepage
        document.location.replace('/dashboard');
    
    } else {
    alert(response.statusText);
    }
};

const postForm = document.querySelector('.post-form');
const editForm = document.querySelector('.edit-form');
const deleteForm = document.querySelector('.delete-btn');

if (postForm) {
    postForm.addEventListener('submit', addPost);

} else if (editForm) {
    editForm.addEventListener('submit', editPost);

} else if (deleteForm) {
    deleteForm.addEventListener('submit', deletePost);
}
