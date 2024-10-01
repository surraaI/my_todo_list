import './css/styles.css';
import sidebar from './components/sidebar';
import header from './components/header';
import footer from './components/footer';

// Ensure header is appended first
document.body.appendChild(header);

// Get content wrapper
const contentWrapper = document.getElementById('content-wrapper');

// Ensure sidebar is appended after header and before content
document.body.appendChild(sidebar);
document.body.appendChild(contentWrapper);

// Finally append the footer
document.body.appendChild(footer);