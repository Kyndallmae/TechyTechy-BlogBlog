window.addEventListener('DOMContentLoaded', (event) => {
    const foundPostId = window.location.pathname.split('/')[2];
    console.log(foundPostId);
 });
 
 const comment = async function (event) {
    event.preventDefault();

    const postId = window.location.pathname.split('/')[2];
    const commentText = document.querySelector('#comment-text').value.trim();

    try {
       // Uses logout module to handle logout
       const response = await fetch(`/${postId}/comment`, {
          method: 'POST',
          body: JSON.stringify({ postId, commentText }),
          headers: { 'Content-Type': 'application/json' },
       });
 
       if (response.ok) {
          // Redirects the browser to the homepage
          document.location.reload();
       }
    } catch (err) {}
 };
 
 document.querySelector('.comment-form').addEventListener('submit', comment);