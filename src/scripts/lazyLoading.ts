const lazyLoading = async () => {
	const lazyImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-img-lazy]');
	if (!lazyImages.length) return;

	const showImage = (image: HTMLImageElement) => (image.style.opacity = '1');

	const loadImage = (image: HTMLImageElement) => {
		const src = image.dataset.src;
		if (!src) return;

		image.src = src;

		if (image.complete) {
			showImage(image);
		} else {
			image.addEventListener('load', () => showImage(image));
			image.addEventListener('error', () => console.error(`Ошибка загрузки изображения: ${src}`));
		}

		image.removeAttribute('data-img-lazy');
	};

	if ('IntersectionObserver' in window) {
		const options: IntersectionObserverInit = {
			root: null,
			rootMargin: '100px',
			threshold: 0.1
		};

		const lazyImageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const lazyImage = entry.target as HTMLImageElement;
					loadImage(lazyImage);
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		}, options);

		lazyImages.forEach((lazyImage) => {
			lazyImage.style.opacity = '0';
			lazyImageObserver.observe(lazyImage);
		});
	} else {
		lazyImages.forEach((lazyImage) => {
			lazyImage.style.opacity = '0';
			loadImage(lazyImage);
		});
	}
};

export default lazyLoading;
