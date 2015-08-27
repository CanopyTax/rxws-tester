import React from 'react';
import 'canopy-styleguide';

import Form from './form.component';

class App extends React.Component {
	render() {
		return (
			<div>
				<div className="cps-topnav +add-box-shadow">
					<div className="cps-topnav__bar"></div>
					<div className="cps-topnav__content">
						<span className="cps-topnav__content__brand">
							<img src="/images/canopy-logomark.svg" alt="Company Logo"/>
						</span>
						<ul className="cps-topnav__content__menu">
							<li>
								<a href="#" className="+active">RXWS Tester</a>
							</li>
						</ul>
					</div>
				</div>
				<div className='cps-nav-content +full'>
					<div className='cps-flexible-focus cps-card'>
						<div className='cps-card__header cps-subheader'>
							RXWS Tester
						</div>
						<div className='cps-card__body'>
							<Form/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

React.render(<App />, document.getElementById('app'));
