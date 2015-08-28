import rxws from 'rxws';
import each from 'lodash';
import SockJSBackend from 'rxws/lib/SockJSBackend';

let hasConnected = false;

function getBlankRequest() {
	return {
		address: 'http://localhost/ws',
		method: 'get',
		resource: '',
		headers: [
			{
				key: 'apiVersion',
				value: '1.2.1'
			}
		],
		parameters: [
			{
				key: '',
				value: ''
			}
		],
		body: ''
	}
}

export function getDefaultRequest(force=false) {
	if (force) {
		return getBlankRequest();
	}

	//let storageItem = chrome.storage.local.get('rxws-tester-resource');

	return getBlankRequest();
}

export function saveRequest(request) {
	//chrome.storage.local.set('rxws-tester-resource', JSON.stringify(request));
}

export function	sendRequest(request, getRequest) {
	if (!hasConnected) {
		rxws.setBackend(SockJSBackend, request.address, {}, (request) => {
			getRequest(request);
			return request;
		});
		hasConnected = true;
	}

	let headers = {};
	request.headers.forEach((header) => {
		if (header.key) {
			let value;

			try {
				value = Number.parseFloat(header.value, 10)
			} catch(error) {
				value = header.value;
			}

			if (value+'' === header.value) {
				headers[header.key] = value;
			} else {
				headers[header.key] = header.value;
			}
		}
	});

	let parameters = {};
	request.parameters.forEach((param) => {
		if (param.key) {
			let value;

			try {
				value = Number.parseFloat(param.value, 10)
			} catch(error) {
				value = param.value;
			}

			if (value+'' === param.value) {
				parameters[param.key] = value;
			} else {
				parameters[param.key] = param.value;
			}
		}
	});

	if (!request.parameters.length) {
		parameters = null;
	}

	let rxRequest = {
		...headers,
		method: request.method,
		resource: request.resource,
		data: request.body ? JSON.parse(request.body): ''
	}

	if (parameters) rxRequest.parameters = parameters;
	return rxws(rxRequest)
}
