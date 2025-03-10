import LocomotiveScroll from 'locomotive-scroll';

const settings = {
	location: { ...window.location },
	linkParam: 'link'
};

const readMore = (scroll) => {
	const btns = document.querySelectorAll('.descr--read-more');
	if (!btns.length) return;

	btns.forEach((btn) => {
		const originalText = btn.textContent;

		btn.addEventListener('click', () => {
			const parent = btn.parentElement;

			parent.classList.toggle('show');
			parent.classList.contains('show') ? (btn.textContent = 'Hide') : (btn.textContent = originalText);

			scroll.update();
		});
	});
};

const getURLParameters = (url) => Object.fromEntries(new URL(url).searchParams.entries());

const clearSearchParams = () => {
	const newURL = `${settings.location.origin}${settings.location.pathname}`;
	window.history.replaceState(null, '', newURL);
};

const scroll = () => {
	const page = document.querySelector('.page');
	if (!page) return null;

	const parameters = getURLParameters(settings.location.href);

	const locomotiveScroll = new LocomotiveScroll({
		el: page,
		smooth: true,
		multiplier: 1,
		firefoxMultiplier: 50,
		lerp: 0.1,
		touchMultiplier: 2.5,
		smartphone: {
			smooth: true
		},
		tablet: {
			smooth: true
		}
	});

	if (parameters[settings.linkParam]) {
		locomotiveScroll.scrollTo(`#${parameters[settings.linkParam]}`);
		clearSearchParams();
	}

	readMore(locomotiveScroll);

	return locomotiveScroll;
};

export default scroll;
