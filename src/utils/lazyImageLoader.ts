function lazyImageLoader(img: HTMLImageElement): void {
  const loadImg: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const imgElement = entry.target as HTMLImageElement;
      if (imgElement instanceof HTMLImageElement) {
        imgElement.src = imgElement.dataset.src || '';
        observer.unobserve(imgElement);
      }
    });
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0.1,
  });

  imgObserver.observe(img);
}

export default lazyImageLoader;
