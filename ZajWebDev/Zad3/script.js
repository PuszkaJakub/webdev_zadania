console.log('Witam w moim kalkulatorze');

// Sprawdzanie czy na ekranie jest blad
function isErrorOnScreen() {
	let screen = document.getElementById('screen');

	return (
		screen.textContent === 'Error' ||
		screen.textContent === 'Infinity' ||
		screen.textContent === '-Infinity' ||
		screen.textContent === 'INFINITY'
	);
}

function writeOnScreen(c) {
	let screen = document.getElementById('screen');

	if (isErrorOnScreen()) {
		screen.textContent = '0';
	}

	let numbers = screen.textContent.split(/[+\-*/]/);
	let lastNumber = numbers[numbers.length - 1];
	let lastChar = screen.textContent.substr(screen.textContent.length - 1);
	console.log(lastChar);

	if (c === '.' && lastNumber.includes('.')) {
		return;
	} else if (
		['/', '*', '-', '+'].includes(c) &&
		['/', '*', '-', '+'].includes(lastChar)
	) {
		screen.textContent = screen.textContent.slice(0, -1) + c;
	} else if (lastNumber === '0' && !['/', '*', '-', '+', '.'].includes(c)) {
		screen.textContent = screen.textContent.slice(0, -1) + c;
	} else if (screen.textContent === '0') {
		if (['/', '*', '-', '+', '.'].includes(c)) {
			screen.textContent += c;
		} else {
			screen.textContent = c;
		}
	} else {
		screen.textContent += c;
	}
}

// Czyszczenie calego wyrazenia
function clearScreenFull() {
	let screen = document.getElementById('screen');
	screen.textContent = '0';
}

// Czyszczenie jednego znaku
function clearScreenDigit() {
	let screen = document.getElementById('screen');

	if (isErrorOnScreen()) {
		clearScreenFull();
		return;
	}

	if (screen.textContent.length > 1) {
		screen.textContent = screen.textContent.slice(0, -1);
	} else {
		screen.textContent = '0';
	}
}

function calcResult() {
	let screen = document.getElementById('screen');
	try {
		let result = new Function('return ' + screen.textContent)();
		if (Number.isNaN(result)) {
			screen.textContent = 'Error';
		} else {
			screen.textContent = result;
		}
	} catch (error) {
		screen.textContent = 'Error';
	}
}

// Inicjalizacja
function init() {
	let container = document.getElementById('container');

	let screen = document.createElement('div');
	screen.setAttribute('id', 'screen');
	screen.textContent = '0';
	container.appendChild(screen);

	let keyboard = document.createElement('div');
	keyboard.setAttribute('id', 'keyboard');

	const buttons = [
		'',
		'',
		'C',
		'DEL',
		'7',
		'8',
		'9',
		'/',
		'4',
		'5',
		'6',
		'*',
		'1',
		'2',
		'3',
		'-',
		'0',
		'.',
		'=',
		'+',
	];

	// Dodawanie przyciskow do funkcji
	buttons.forEach(button => {
		if (button === '') {
			const placeholder = document.createElement('div');
			placeholder.classList.add('placeholder');
			keyboard.appendChild(placeholder);
			return;
		}

		const btn = document.createElement('button');
		btn.textContent = button;
		btn.setAttribute('value', button);

		if (button === 'C') {
			btn.classList.add('btn', 'action-btn');
			btn.addEventListener('click', e => {
				clearScreenDigit();
			});
		} else if (button === 'DEL') {
			btn.classList.add('btn', 'action-btn');
			btn.addEventListener('click', e => {
				clearScreenFull();
			});
		} else if (['/', '*', '-', '+'].includes(button)) {
			btn.classList.add('btn', 'operator-btn');
			btn.addEventListener('click', e => {
				writeOnScreen(btn.getAttribute('value'));
			});
		} else if (button === '=') {
			btn.classList.add('btn', 'equal-btn');
			btn.addEventListener('click', calcResult);
		} else {
			btn.classList.add('btn', 'num-btn');
			btn.addEventListener('click', e => {
				writeOnScreen(btn.getAttribute('value'));
			});
		}

		keyboard.appendChild(btn);
	});

	container.appendChild(keyboard);

	// Obsluga klawiatury
	document.addEventListener('keydown', event => {
		const key = event.key;

		if (
			(key >= '0' && key <= '9') ||
			['/', '*', '-', '+', '.'].includes(key)
		) {
			writeOnScreen(key);
		}
		else if (key === '=' || key === 'Enter') {
			event.preventDefault();
			calcResult();
		}

		else if (key === 'Backspace') {
			clearScreenDigit();
		} else if (key === 'Escape') {
			clearScreenFull();
		}
	});
}

init();
