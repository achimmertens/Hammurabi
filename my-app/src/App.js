import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Account: '',
			error: null,
			isLoaded: false,
		};
		this.handleGET = this.handleGET.bind(this);
		this.handleChangeAccount = this.handleChangeAccount.bind(this);
	}

	componentDidMount() {
		this.handleAccounts()
	}

	handleChangeAccount(event) {
		this.setState({ account: event.target.value });
	}

		handleAccounts() {
    		fetch("https://api.thecatapi.com/v1/breeds")
    			.then(res => res.json())
    			.then(
    				(result) => {
    					this.setState({
    						isLoaded: true,
    						breedList: result
    					})
    				},
    				(error) => {
    					this.setState({
    						isLoaded: true,
    						error
    					});
    				}
    			)
    	}