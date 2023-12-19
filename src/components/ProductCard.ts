import IProduct from 'src/types/productInterfaces';
import lazyImageLoader from '../utils/lazyImageLoader';

class ProductCard {
  private preview = false;
  constructor() { }

  private formatPrice(price: number): string {
    return (Math.round(price * 100) / 100).toFixed(2);
  }

  private createCardSkeleton(): Element {
    const skeletonHtmlString = `
      <div class="product-image-container"></div>
      <div class="product-title"></div>
      <div class="product-description"></div>
      <div class="product-price"></div>
      <div class="product-details"></div>
    `;
    const productSkeleton = document.createElement('div');
    productSkeleton.classList.add('product-card', 'is-loading');
    if (this.preview) productSkeleton.classList.add('preview');
    productSkeleton.innerHTML = skeletonHtmlString;
    return productSkeleton;
  }

  private createCard(data: IProduct): Element {
    const productHtmlString = `
      <div class="product-image-container">
        <img
        class="product-image"
        data-src="${data.image}"
        alt="${data.title}"
        />
      </div>
      <div class="product-title">${data.title}</div>
      <div class="product-description">${this.preview && data.description}</div>
      <div class="product-cta">
        <div class="product-price">$ ${this.formatPrice(data.price)}</div>
        <div class="buy-button"><i class="gg-shopping-cart"></i></div>
      </div>
      <div class="product-details">
        <div class="quantity">${data.rating.count} sold</div>
        <div class="rating"><span>★</span> ${data.rating.count}</div>
      </div>
      `;
    const product = document.createElement('div');
    product.classList.add('product-card');
    if (this.preview) product.classList.add('preview');
    product.innerHTML = productHtmlString;
    if (!this.preview) {
      product.addEventListener('click', (event) => {
        const customEvent = new CustomEvent('open-modal', { detail: data.id });
        document.dispatchEvent(customEvent);
      });
    }
    const image = product.querySelector('img');
    if (image) lazyImageLoader(image);
    return product;
  }

  public create(data: IProduct | null, preview: boolean = false): Element {
    this.preview = preview;
    return data === null ? this.createCardSkeleton() : this.createCard(data);
  }
}

export default ProductCard;
