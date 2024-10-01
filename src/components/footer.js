// Create the footer element
const footer = document.createElement('footer');
footer.style.position = 'fixed';
footer.style.left = '0';
footer.style.bottom = '0';
footer.style.width = '100%';
footer.style.backgroundColor = '#333';
footer.style.color = 'white';
footer.style.textAlign = 'center';
footer.style.padding = '10px 0';

// Create the paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = '© 2023 Sura\'s Todo List. All rights reserved.';

// Append the paragraph to the footer
footer.appendChild(paragraph);

// Export the footer to be used in index.js
export default footer;