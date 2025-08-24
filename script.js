 
// ...existing code...

function checkForUpdates() {
  const msg = document.getElementById('updateMessage');
  if (!msg) return;
  // simple demonstration behavior
  msg.textContent = 'No new updates found. Last checked: ' + new Date().toLocaleString();
}

/**
 * showYear(yearId)
 * - hides all .year-content and shows the one with id=yearId
 * - marks matching sidebar button as active
 */
function showYear(yearId) {
  document.querySelectorAll('.year-content').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(yearId);
  if (!target) return;
  target.classList.add('active');

  document.querySelectorAll('.sidebar button').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclick.includes(yearId));
  });

  const content = document.querySelector('.content-area');
  if (content) content.scrollTop = 0;
}

/**
 * uploadFile(subject)
 * - finds the file input inside the currently visible .year-content and triggers it
 */
function uploadFile(subject) {
  const activeSection = document.querySelector('.year-content.active');
  if (!activeSection) {
    alert('Select a semester first.');
    return;
  }

  // prefer file input with id containing subject, fallback to first file input
  let input = activeSection.querySelector(`input[type="file"][id*="${subject}"]`);
  if (!input) input = activeSection.querySelector('input[type="file"]');

  if (!input) {
    alert('No upload field found in this semester.');
    return;
  }

  input.click();

  // optional: handle change
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert('Selected file: ' + file.name + '\n(Implement upload handling separately)');
      // implement actual upload logic here (fetch/XHR to server) if needed
    }
  };
}

// expose functions for inline onclick attributes
window.showYear = showYear;
window.uploadFile = uploadFile;
window.checkForUpdates = checkForUpdates;