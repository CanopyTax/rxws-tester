import React from 'react';

export default class Body extends React.Component {
	render() {
		return (
			<div>
				<div className="cps-form-group">
					<label for="exampleInputEmail1" className="cps-col-xs-2 cps-control-label">Request Body</label>
					<div className='cps-row'>
						<div className="cps-col-xs-8">
							<textarea value={this.props.body} onChange={this.updateBody.bind(this)} style={{height: '200px'}} className='cps-form-control'></textarea>
						</div>
					</div>
				</div>
			</div>
		)
	}

	updateBody(e) {
		this.props.updateBody(e.currentTarget.value);
	}
}
