// transcribe.js
document.getElementById('submit').addEventListener('click', uploadFile);

function uploadFile() {
  const fileInput = document.getElementById('file_input');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  startLoading(); // Start the loading animation

  fetch('https://quicktranscribe-backend.onrender.com/transcribe', {
    method: 'POST',
    body: formData
  })
    .then(response => response.blob())
    .then(blob => {
      
      stopLoading(); // Stop the loading animation

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcription.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clear the form
      fileInput.value = '';
      formElement.style.background = 'linear-gradient(#f1f3f7 0%, #d7dce7)';
    })
    .catch(error => {
      clearInterval(rotationInterval); // Stop rotating the background

      console.error('Error:', error);
      alert('An error occurred while processing the file');
    });
}


function startLoading() {
  /* HTML: <div class="loader"></div> */
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';
}

function stopLoading() {
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';
}