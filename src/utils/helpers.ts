import { getAllProducts } from '../services/getData';
import ProductListPage from '../components/ProductListPage';

function themeHandler(): void {
  const themeSwitch = document.querySelector('.theme-switch') as HTMLElement;
  const themeIcon = document.querySelector('.theme-switch-icon') as HTMLElement;

  if (!themeSwitch || !themeIcon) return;

  themeSwitch?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (themeIcon.classList.contains('gg-sun')) {
      themeIcon.classList.add('gg-moon');
      themeIcon.classList.remove('gg-sun');
      localStorage.setItem('theme', 'light-theme');
    } else {
      themeIcon.classList.add('gg-sun');
      themeIcon.classList.remove('gg-moon');
      localStorage.setItem('theme', 'dark-theme');
    }
  });

  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  const themeFromLocalStorage = localStorage.getItem('theme');
  const isDarkTheme = () => {
    if (themeFromLocalStorage === 'light-theme') {
      return false;
    } else if (themeFromLocalStorage === 'dark-theme') {
      return true;
    } else if (darkThemeMq.matches === true) {
      return true;
    } else {
      return false;
    }
  };

  if (isDarkTheme()) {
    themeIcon.classList.add('gg-sun');
    document.body.classList.add('dark-theme');
  } else {
    themeIcon.classList.add('gg-moon');
  }
}

function mobileViewHandler(): void {
  const mobileMenu = document.querySelector('.menu-list') as HTMLElement;
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (!mobileMenu || !hamburgerMenu) return;

  hamburgerMenu?.addEventListener('click', () => {
    if (mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
    } else {
      mobileMenu.style.display = 'block';
    }
  });
}

async function fillPLP(): Promise<void> {
  const plp = new ProductListPage();
  plp.initPLPLoaders();
  const data = await getAllProducts();
  if (data && data.length > 1) {
    plp.createPLP(data);
  }
}

export { themeHandler, mobileViewHandler, fillPLP };
