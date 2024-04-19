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

  // Start rotating the background
  const formElement = document.getElementById('form');
  let rotationAngle = 180;
  const rotationInterval = setInterval(() => {
    rotationAngle += .2;

    if (rotationAngle == 360) {
      rotationAngle = -359.9;
    }
    
    formElement.style.background = `linear-gradient(${rotationAngle}deg, #f1f3f7 0%, rgb(229,233,241) 53%, #d2e0f4 83%, #c7d1e0 99%), #f1f3f7`;
  }, 5);

  fetch('https://aitranscribe.replit.app/transcribe', {
    method: 'POST',
    body: formData
  })
    .then(response => response.blob())
    .then(blob => {
      clearInterval(rotationInterval); // Stop rotating the background

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