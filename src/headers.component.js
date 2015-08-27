import React from 'react';
import { map } from 'lodash';
import KeyValue from './keyValue.component';

export default class Headers extends React.Component {
	render() {
		let inputs = map(this.props.headers, (header, index) => {
			return (
				<div className="cps-form-group">
					<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label">{index === 0 ? 'Headers' : ''}</label>
					<div className='cps-row'>
						<KeyValue onDelete={this.deleteHeader.bind(this, index)} key={index} keyValue={header.key} value={header.value} onChange={this.updateHeader.bind(this, index)}/>
					</div>
				</div>
			);
		});

		return (
			<div>
				{inputs}
				<div className="cps-form-group">
					<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label"></label>
					<div className='cps-row'>
						<div className="cps-col-xs-2">
						</div>
						<div className="cps-col-xs-2">
							<button type='button' onClick={this.newHeader.bind(this)} className='cps-btn cps-pull-right +secondary'>Add Header</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	updateHeader(index, newHeader) {
		let newHeaders = [
			...this.props.headers
		]

		newHeaders[index] = {
			key: newHeader.keyValue,
			value: newHeader.value
		}

		this.props.updateHeaders(newHeaders);
	}

	newHeader() {
		let newHeaders = [
			...this.props.headers
		]

		newHeaders.push({
			key: '',
			value: ''
		})

		this.props.updateHeaders(newHeaders);
	}

	deleteHeader(index) {
		let newHeaders = [
			...this.props.headers
		]

		newHeaders.splice(index, 1);

		this.props.updateHeaders(newHeaders);
	}
}
