'use strict';

import { h, render, Component } from 'preact';
import Header from '../components/Header';
import Intro from '../components/Intro';
import PublicationsItems from '../components/Publications.Items';
import Footer from '../components/Footer';

class Layout extends Component {

	constructor() {
		super();
		this.state = {
			intro: h('div'),
			figurines: h('div'),
			artbooks: h('div'),
			fanzines: h('div'),
			footer: h('div'),
		};
	}

	componentDidMount() {
		fetch('/datas/Links.json')
			.then(res => {
				return res.json();
			})
			.then(json => {
				this.setState({
					footer: <Footer links={json._} />,
				});
			})
			.catch(err => {
				console.log('error', err);
			});
		fetch('/datas/Page.Publications.json')
			.then(res => {
				return res.json();
			}).then(json => {
				this.setState({
					figurines: <PublicationsItems type="figurines" title={json.figurines_title} subtitle={json.figurines_subtitle} />,
					artbooks: <PublicationsItems type="artbooks" title={json.artbooks_title} subtitle={json.artbooks_subtitle} />,
					fanzines: <PublicationsItems type="fanzines" title={json.fanzines_title} subtitle={json.fanzines_subtitle} />,
					intro: <Intro text={json.intro} />,
				});
			}).catch(err => {
				console('error', err);
			});
	}

	render({}, state) {		
		return (
			<div>
				<Header title="Publications" back={{href: '/', text: 'Retour à l\'accueil'}} />
				{state.intro}
				{state.figurines}
				{state.artbooks}
				{state.fanzines}
				{state.footer}
			</div>
		);
	}

}

render(<Layout />, document.querySelector('#main'));