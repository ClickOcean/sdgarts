const pulseAnim = () => {
	const els = document.querySelectorAll<HTMLElement>('[data-pulse-anim]');
	if (!els.length) return;

	els.forEach((el) => {
		const time = Number(el.dataset.pulseAnim);

		setInterval(() => {
			el.classList.add('anim');

			setTimeout(() => el.classList.remove('anim'), time / 2);
		}, time);
	});
};

export default pulseAnim;
