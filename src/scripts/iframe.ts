interface PopapDataToggle {
	el: HTMLElement | null;
	clear?: boolean;
}

interface PopapDataActive {
	el: HTMLElement | null;
}

interface PopapDataCreate {
	parent: HTMLElement | null;
	id: string;
}

const nameIframe: string = 'data-iframe';

export const toggleIframe = (data: PopapDataToggle = { el: null, clear: false }): void => {
	const { el, clear } = data;
	if (!el) return;

	const iframes = el.querySelectorAll<HTMLIFrameElement>(`[${nameIframe}]`);

	iframes?.forEach((iframe) => {
		!clear ? iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*') : iframe.remove();
	});
};

export const activeIframe = (data: PopapDataActive): void => {
	const { el } = data;
	if (!el) return;

	const iframe = el.querySelector<HTMLIFrameElement>(`[${nameIframe}]`);
	if (!iframe) return;

	iframe.classList.remove('hide');

	const videoSrc = iframe.getAttribute('src') || '';
	!videoSrc.includes('autoplay=1') && iframe.setAttribute('src', `${videoSrc}&autoplay=1`);
};

export const createIframe = (data: PopapDataCreate): void => {
	const { parent, id } = data;
	if (!parent) return;

	const iframe = document.createElement('iframe');
	iframe.width = '0';
	iframe.height = '0';
	iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
	iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
	iframe.allowFullscreen = true;
	iframe.setAttribute('data-iframe', '');

	parent.classList.add('active');
	parent.appendChild(iframe);
};
