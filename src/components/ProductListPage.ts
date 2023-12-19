import IProduct from 'src/types/productInterfaces';
import ProductCard from './ProductCard';

class ProductListPage {
  constructor() {}

  public initPLPLoaders(): void {
    this.fillContainer(null);
  }

  public createPLP(data: IProduct[]): void {
    this.fillContainer(data);
  }

  private removePLPLoaders(): void {
    const loaders = document.querySelectorAll('.product-card.is-loading');
    loaders.forEach((item) => item.remove());
  }

  private fillContainer(data: IProduct[] | null): void {
    this.removePLPLoaders();
    const container = document.querySelector('.container');
    const quantity = data === null ? 20 : data.length;
    for (let i = 0; i < quantity; i++) {
      const productCard = new ProductCard();
      const element = productCard.create(data ? data[i] : null);
      container?.insertAdjacentElement('beforeend', element);
    }
  }
}

export default ProductListPage;
