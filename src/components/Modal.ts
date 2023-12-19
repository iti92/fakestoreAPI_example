class Modal {
  private modal = document.getElementById('modal');
  constructor() {}

  public init(): void {
    const closeModalBtn = document.getElementById('closeModalBtn');

    closeModalBtn?.addEventListener('click', () => {
      if (!this.modal) return;
      this.modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === this.modal && this.modal) {
        this.modal.style.display = 'none';
      }
    });
  }

  public open(): void {
    if (!this.modal) return;
    this.modal.style.display = 'block';
  }

  public fillContent(content: Element): void {
    if (!this.modal) return;
    const container = this.modal.querySelector('.modal-container');
    if (container) container.innerHTML = '';
    container?.append(content);
  }
}

export default Modal;
