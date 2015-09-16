import React from 'react';
import Headers from './headers.component';
import Parameters from './parameters.component';
import BodyValue from './body.component';
import Inspector from 'react-json-inspector';
import DOMify from 'react-domify';

import 'react-json-inspector/json-inspector.css';

import { getDefaultRequest, saveRequest, sendRequest } from './request.resource';

export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			error: '',
			rawRequest: '',
			request: getDefaultRequest()
		}
	}

	componentDidMount() {
		chrome.storage.local.get('data', (data) => {
			console.log(data);
			if (data.data) {
				this.setState({
					request: data.data
				});
			}
		})
	}

	render() {
		let request = this.state.request;

		let response = this.state.response ? (
			<div className='cps-row'>
				<div className='cps-col-xs-2'></div>
				<div className='cps-col-xs-8'>
					<div className='cps-subheader'>Response</div>
					<DOMify value={this.state.response}/>
				</div>
			</div>
		) : null;

		let rawRequest = this.state.rawRequest ? (
			<div className='cps-row cps-margin-top-24'>
				<div className='cps-col-xs-2'></div>
				<div className='cps-col-xs-8'>
					<div className='cps-subheader'>Raw Request</div>
					<DOMify value={this.state.rawRequest}/>
				</div>
			</div>
		) : null;

		let error = this.state.error ? (
			<div className='cps-row'>
				<div className='cps-col-xs-2'></div>
				<div className='cps-col-xs-8'>
					<div className='cps-subheader cps-warning'>Error</div>
					<DOMify value={this.state.error}/>
				</div>
			</div>
		) : null;

		return (
			<div>
				<form className="cps-form-horizontal">
					<div className="cps-form-group">
						<label  className="cps-col-xs-2 cps-control-label">Server Address</label>
						<div className="cps-col-xs-3">
							<input value={request.address} onChange={this.changeServerAddress.bind(this)} type="text" className="cps-form-control" placeholder="Enter a websocket server"/>
							<span className="cps-help-block">Include the socket suffix: http://localhost/ws</span>
						</div>
					</div>
					<div className="cps-form-group cps-has-feedback">
						<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label">Method</label>
						<div className="cps-col-xs-3">
							<select onChange={this.changeMethod.bind(this)} value={request.method} className="cps-form-control">
								<option value="get">GET</option>
								<option value="post">POST</option>
								<option value="put">PUT</option>
								<option value="patch">PATCH</option>
								<option value="delete">DELETE</option>
								<option value="head">HEAD</option>
							</select>
						</div>
					</div>
					<div className="cps-form-group">
						<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label">Resource</label>
						<div className="cps-col-xs-3">
							<input onChange={this.changeResource.bind(this)} value={request.resource} type="text" className="cps-form-control" placeholder=""/>
						</div>
					</div>

					<Headers headers={request.headers} updateHeaders={this.changeHeaders.bind(this)}/>
					<Parameters parameters={request.parameters} updateParameters={this.changeParameters.bind(this)}/>
					<BodyValue body={request.body} updateBody={this.changeBody.bind(this)}/>
					<div className="cps-form-group">
						<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label"></label>
						<button onClick={this.executeRequest.bind(this)} type='button' className='cps-btn +primary cps-margin-left-8'>SEND</button>
						<button onClick={this.clearRequest.bind(this)} type='button' className='cps-btn +secondary'>CLEAR</button>
					</div>
					{response}
					{error}
					{rawRequest}
				</form>
			</div>
		)
	}

	updateRequest(newRequest) {
		let req = {
			...this.state.request,
			...newRequest
		}

		this.setState({
			request: req
		})

		chrome.storage.local.set({'data': req});
	}

	changeMethod(e) {
		this.updateRequest({
			method: e.currentTarget.value
		})
	}

	changeServerAddress(e) {
		this.updateRequest({
			address: e.currentTarget.value
		})
	}

	changeResource(e) {
		this.updateRequest({
			resource: e.currentTarget.value
		})
	}

	changeBody(body) {
		this.updateRequest({
			body
		})
	}

	changeHeaders(headers) {
		this.updateRequest({
			headers
		})
	}

	changeParameters(parameters) {
		this.updateRequest({
			parameters
		})
	}

	executeRequest() {
		saveRequest(this.state.request);
		sendRequest(this.state.request, (request) => {
			this.setState({
				rawRequest: request
			})
		})
		.subscribe((resp) => {
			this.setState({
				response: resp,
				error: ''
			})
		}, (err) => {
			this.setState({
				error: err,
				response: ''
			})
		})
	}

	clearRequest() {
		this.setState({
			request: getDefaultRequest(true),
			error: '',
			response: '',
			rawRequest: ''
		})
	}
}
