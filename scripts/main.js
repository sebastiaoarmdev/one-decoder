'use strict';


const keys = [
	['e', 'enter'],
	['i', 'imes'],
	['a', 'ai'],
	['o', 'ober'],
	['u', 'ufat'],
];
const messageTextArea = document.getElementById('message');
const resultTextArea = document.getElementById('result');
const cryptButton = document.getElementById('crypt-button');
const decryptButton = document.getElementById('decrypt-button');
const pasteButton = document.getElementById('paste-button');
const copyButton = document.getElementById('copy-button');
const copiedMessageSpan = document.getElementById('copied-message');

function cryptMessage(message) {
	for (let i = 0; i < keys.length; i++) {
		const oldKey = keys[i][0];
		const newKey = keys[i][1];
		
		if (message.includes(keys[i][0])) {
			message = message.replaceAll(oldKey, newKey);
		}
	}
	
  return message;
}

function decryptMessage(message) {
	for (let i = 0; i < keys.length; i++) {
		const oldKey = keys[i][1];
		const newKey = keys[i][0];
		
		if (message.includes(keys[i][1])) {
			message = message.replaceAll(oldKey, newKey);
		}
	}
  
  return message;
}

function isValidMessage(message) {
	const regex = /^(?=[a-z])[a-z\s]+$/;	
	const isValid = regex.test(message);
	
	return isValid;
}

function setButtons() {
	const canWork = isValidMessage(messageTextArea.value);
	
	cryptButton.disabled = !canWork;
	decryptButton.disabled = !canWork;	
}

messageTextArea.addEventListener('input', setButtons);

cryptButton.addEventListener('click', function (e) {
	const cryptedMessage = cryptMessage(messageTextArea.value);
	resultTextArea.value = cryptedMessage;	
	copiedMessageSpan.style.display = 'none';
});

decryptButton.addEventListener('click', function (e) {
	const decryptedMessage = decryptMessage(messageTextArea.value);
	resultTextArea.value = decryptedMessage;
	copiedMessageSpan.style.display = 'none';
});

pasteButton.addEventListener('click', async function (e) {
	const message = await navigator.clipboard.readText();
	messageTextArea.value = message;
	setButtons();
});

copyButton.addEventListener('click', function (e) {
	navigator.clipboard.writeText(resultTextArea.value);
	copiedMessageSpan.style.display = 'inline';
});