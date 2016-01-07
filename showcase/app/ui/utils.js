import Config from '../config';

export function setTitle(pageTitle) {
	document.getElementById('page-title').textContent = pageTitle + ' - ' + Config.appName;
}

export function focusFirst(element) {
	var elementTypes = 'a[href], area[href], input, select, textarea, ' +
		'button, iframe, object, embed, *[tabindex], *[contenteditable]';
	$(element).find(elementTypes).not('[tabindex=-1], [disabled], :hidden').first().focus();
}

export function emptyToNull(key, value) {
	return ('' === value) ? null : value;
}
