import React from 'react';
import { map } from 'lodash';
import KeyValue from './keyValue.component';

export default class Parameters extends React.Component {
	render() {
		let inputs = map(this.props.parameters, (header, index) => {
			return (
				<div className="cps-form-group" key={index}>
					<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label">{index === 0 ? 'Parameters' : ''}</label>
					<div className='cps-row'>
						<KeyValue onDelete={this.deleteHeader.bind(this, index)} keyValue={header.key} value={header.value} onChange={this.updateHeader.bind(this, index)}/>
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
		let newparameters = [
			...this.props.parameters
		]

		newparameters[index] = {
			key: newHeader.keyValue,
			value: newHeader.value
		}

		this.props.updateParameters(newparameters);
	}

	newHeader() {
		let newparameters = [
			...this.props.parameters
		]

		newparameters.push({
			key: '',
			value: ''
		})

		this.props.updateParameters(newparameters);
	}

	deleteHeader(index) {
		let newparameters = [
			...this.props.parameters
		]

		newparameters.splice(index, 1);

		this.props.updateParameters(newparameters);
	}
}
