console.log('Witam w moim kalkulatorze');

let firstNumber = 0,
	secondNumber = 0,
	operation = '';

function writeOnScreen(c) {
	let screen = document.getElementById('screen');
	if (c === '.' && screen.textContent.includes('.')) {
		return;
	}
	if (screen.textContent === '0') {
		screen.textContent = c;
	} else {
		screen.textContent += c;
	}
}

function addOperation(c) {
    if(operation === ''){
        let screen = document.getElementById('screen');
        firstNumber = screen.textContent

    }
    else(operation = c)
}

function clearScreenFull() {
	let screen = document.getElementById('screen');
	screen.textContent = '0';
}

function clearScreenDigit() {
	let screen = document.getElementById('screen');
	if (screen.textContent.length > 1) {
		screen.textContent = screen.textContent.slice(0, -1);
	} else {
		screen.textContent = '0';
	}
}

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

	buttons.forEach(button => {
		if (button === '') {
			const placeholder = document.createElement('div');
			placeholder.classList.add('placeholder');
			keyboard.appendChild(placeholder);
			return;
		}
		const btn = document.createElement('button');
		btn.textContent = button;

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
		} else if (['/', '*', '-', '+', '='].includes(button)) {
			btn.classList.add('btn', 'operator-btn');
		} else {
			btn.classList.add('btn', 'num-btn');
			btn.addEventListener('click', e => {
				writeOnScreen(btn.textContent);
			});
		}

		keyboard.appendChild(btn);
	});

	container.appendChild(keyboard);
}

init();
