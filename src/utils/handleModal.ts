import Modal from '../components/Modal';
import ListGroup from '../components/ListGroup';
import list from '../constants/list';
import { getAllCategories, getSingleProduct } from '../services/getData';
import ProductCard from '../components/ProductCard';

class HandleModal {
  private modal: Modal;
  constructor() {
    this.modal = new Modal();
  }

  public init(): void {
    this.modal.init();
    this.modalWithMenu();
    this.modalWithFilters();
    this.modalWithCategories();
    this.openModalWithProduct();
  }

  private modalWithMenu(): void {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (!hamburgerMenu) return;
    const listGroup = new ListGroup();
    const content = listGroup.create(list.menu);
    hamburgerMenu.addEventListener('click', () => {
      this.modal.fillContent(content);
      this.modal.open();
    });
  }

  private async openModalWithProduct(): Promise<void> {
    const product = new ProductCard();
    document.addEventListener('open-modal', async (event) => {
      const customEvent = event as CustomEvent;
      let element = product.create(null, true);
      this.modal.fillContent(element);
      this.modal.open();
      const data = await getSingleProduct(customEvent.detail);
      if (!data) return;
      element = product.create(data, true);
      this.modal.fillContent(element);
    });
  }

  private modalWithFilters(): void {
    const filter = document.querySelector('.filter');
    const listGroup = new ListGroup();
    const content = listGroup.create(list.filters);
    if (!filter) return;
    filter.addEventListener('click', (event) => {
      this.modal.fillContent(content);
      this.modal.open();
    });
  }

  private async modalWithCategories(): Promise<void> {
    const breadcrumbs = document.querySelector('.category');
    const listGroup = new ListGroup();
    const categories = await getAllCategories();
    if (!breadcrumbs || !categories) return;
    const content = listGroup.create(categories);
    breadcrumbs.addEventListener('click', () => {
      this.modal.fillContent(content);
      this.modal.open();
    });
  }
}

export default HandleModal;
