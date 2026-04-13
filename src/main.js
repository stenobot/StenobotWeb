import { version } from '../package.json';

const versionLabel = document.getElementById('version-label');
if (versionLabel) versionLabel.textContent = `v${version}`;

// Direction to store when navigating away from this page.
const slideDir = { 'nav-blog': 'up', 'nav-music': 'left', 'nav-apps': 'right', 'nav-projects': 'down' };

// Sync hover state between each nav label and its corresponding SVG arrow.
const navConfig = [
  { navId: 'nav-blog',     arrowId: 'arrow-up',    hoverId: 'hover-up' },
  { navId: 'nav-music',    arrowId: 'arrow-left',  hoverId: 'hover-left' },
  { navId: 'nav-apps',     arrowId: 'arrow-right', hoverId: 'hover-right' },
  { navId: 'nav-projects', arrowId: 'arrow-down',  hoverId: 'hover-down' },
];

navConfig.forEach(({ navId, arrowId, hoverId }) => {
  const navLink   = document.getElementById(navId);
  const arrow     = document.getElementById(arrowId);
  const hoverArea = document.getElementById(hoverId);

  if (!navLink || !arrow || !hoverArea) return;

  function activate()   { navLink.classList.add('active');    arrow.classList.add('active'); }
  function deactivate() { navLink.classList.remove('active'); arrow.classList.remove('active'); }

  navLink.addEventListener('mouseenter', activate);
  navLink.addEventListener('mouseleave', deactivate);
  hoverArea.addEventListener('mouseenter', activate);
  hoverArea.addEventListener('mouseleave', deactivate);

  // Store slide direction before the nav link's default navigation fires.
  navLink.addEventListener('click', () => {
    if (slideDir[navId]) sessionStorage.setItem('slideDir', slideDir[navId]);
  });

  // Clicking the SVG arm navigates the same as the nav link.
  hoverArea.addEventListener('click', () => {
    if (slideDir[navId]) sessionStorage.setItem('slideDir', slideDir[navId]);
    if (navLink.target === '_blank') {
      window.open(navLink.href, '_blank', 'noopener');
    } else {
      window.location.href = navLink.href;
    }
  });
});
