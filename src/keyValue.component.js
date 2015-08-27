import React from 'react';

export default class KeyValue extends React.Component {
	render() {
		let { keyValue, value } = this.props;
		return (
			<div>
				<div className="cps-col-xs-2">
					<input type="text" className="cps-form-control" value={keyValue} onChange={this.onChange.bind(this, 'keyValue')}/>
				</div>
				<div className="cps-col-xs-2">
					<input type="text" className="cps-form-control" value={value} onChange={this.onChange.bind(this, 'value')}/>
				</div>
				<div className="cps-col-xs-2">
					<div className="cps-btn-icon" onClick={this.props.onDelete}>
						<a className="cps-link"><span className="">delete</span></a>
					</div>
				</div>
			</div>
		)
	}

	onChange(el, e) {
		this.props.onChange({
			...this.props,
			[el]: e.currentTarget.value
		})
	}
}
