import { fillPLP, themeHandler, mobileViewHandler } from './utils/helpers';
import HandleModal from './utils/handleModal';
import './style.scss';

async function initApplication(): Promise<void> {
  const handleModal = new HandleModal();
  handleModal.init();
  themeHandler();
  mobileViewHandler();
  fillPLP();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope,
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
}

window.addEventListener('load', initApplication);
