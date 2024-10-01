// Create a header element
const header = document.createElement('header');
header.style.position = 'fixed';
header.style.left = '0';
header.style.top = '0';
header.style.width = '100%';
header.style.height = '50px';
header.style.backgroundColor = '#4CAF50';
header.style.color = 'white';
header.style.padding = '10px';
header.style.marginTop = '0';
header.style.textAlign = 'center';
header.style.fontFamily = 'Arial, sans-serif';
header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

// Create an h1 element
const h1 = document.createElement('h1');
h1.textContent = 'My Todo List';
h1.style.margin = '0';

// Append the h1 to the header
header.appendChild(h1);

// Export the header to be used in index.js
export default header;