import { toggleIframe } from './iframe';

interface PopapData {
	name: string;
	clear?: boolean;
}

const closePopap = (data: PopapData = { name: '', clear: false }): void => {
	const { name, clear } = data;

	const popap: HTMLElement = document.querySelector(`[data-${name}]`);
	if (!popap) return;

	const close = popap.querySelector(`[data-${name}-close]`);

	const closePopup = () => {
		if (!popap.classList.contains('active')) return;

		popap.classList.remove('active');

		toggleIframe({
			el: popap,
			clear: clear
		});
	};

	const handleKeydown = (event: KeyboardEvent) => event.key === 'Escape' && closePopup();

	close && close.addEventListener('click', closePopup);
	document.addEventListener('keydown', handleKeydown);
};

export default closePopap;
