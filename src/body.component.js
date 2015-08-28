import React from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import './body.style.css';

export default class Body extends React.Component {
	render() {
		let options = {
			lineNumbers: true,
			autoCloseBrackets: true,
			matchBrackets: true,
			foldGutter: true,
			comment: true,
			mode: "application/json",
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
		};

		return (
			<div>
				<div className="cps-form-group">
					<label className="cps-col-xs-2 cps-control-label">Request Body</label>
					<div className='cps-row'>
						<div className="cps-col-xs-8">
							<CodeMirror value={this.props.body} onChange={this.updateBody.bind(this)} options={options}></CodeMirror>
						</div>
					</div>
				</div>
			</div>
		)
	}

	updateBody(val) {
		this.props.updateBody(val);
	}
}
