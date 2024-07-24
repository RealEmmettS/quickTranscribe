// transcribe.js

// When the website initially loads, stop the loading animation
window.onload = function() {
  const loader = document.getElementById('loader');
  
  //remove d-flex class (if it exists)
  loader.classList.remove('d-flex');
  //add d-none class
  loader.classList.add('d-none');
}

function startLoading() {
  const loader = document.getElementById('loader');

  loader.classList.remove('d-none');
  loader.classList.add('d-flex');
}

function stopLoading() {
  const loader = document.getElementById('loader');

  loader.classList.remove('d-flex');
  loader.classList.add('d-none');
}

//////////////

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
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing the file: ' + error);
    });
}