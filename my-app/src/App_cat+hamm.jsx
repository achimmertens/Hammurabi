import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breed: 'abob',
			account: 'Anika',
			error: null,
			isLoaded: false,
			breedList: [],
			accountList: [],
			data: []
		};
		this.handleGET = this.handleGET.bind(this);
		this.handleChangeBreed = this.handleChangeBreed.bind(this);
		console.log("BreedList: " + JSON.stringify(this.state.breedList));
	}

	componentDidMount() {
		this.handleBreeds()
		this.handleAccounts()

	}

	handleChangeBreed(event) {
		this.setState({ breed: event.target.value });
		//console.log("BreedList: " + JSON.stringify(this.state.breedList));
		console.log("BreedList[0].id: " + JSON.stringify(this.state.breedList[0].id));
	}
	handleBreeds() {
	fetch ("https://api.thecatapi.com/v1/breeds")
	//fetch("http://localhost:8080/api/accounts")
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
			console.log("BreedList: " + JSON.stringify(this.state.breedList));
	// console.log("BreedList[0].id: " + JSON.stringify(this.state.breedList[0].id));


}

handleAccounts() {
	//fetch ("https://api.thecatapi.com/v1/breeds")
	fetch("http://localhost:8080/api/accounts")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						accountList: (result)
					})
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
			console.log("accountList: " + JSON.stringify(this.state.accountList));
	// console.log("BreedList[0].id: " + JSON.stringify(this.state.breedList[0].id));
}
	handleGET() {


	    console.log("accountlist = " + JSON.stringify(this.state.accountList));
	    console.log("accountlist.content = " + JSON.stringify(this.state.accountList.content[0]));
		console.log("Call handleGET")


		var myinput = document.getElementById('selectCat');
		console.log("id = " + ReactDOM.findDOMNode(myinput).value);
		console.log("Name vom 4. Element = " + ReactDOM.findDOMNode(myinput).value);



		fetch("http://api.thecatapi.com/v1/images/search?breed_ids=" + this.state.breed)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						data: result
					})
				},
				(error) => {
					this.setState({
						error
					});
				}
			)
	}

	render() {
		const { error, isLoaded, data } = this.state;
		   var accountlist = this.state.accountList;
		console.log("Inhalt von data "+ JSON.stringify(data));
		console.log("Inhalt von breedList" + JSON.stringify(this.state.breedList[5]));
		console.log("Inhalt von accountlist " + JSON.stringify(this.state.accountList[0]));

				 this.state.breedList.forEach(element => {
                        console.log("Element = " + JSON.stringify(element.name))
                        });

			 this.state.accountList.forEach(element => {
                        console.log("Element = " + JSON.stringify(element.name))
                        });
		//console.log("this.state.accountList[0].id   " + this.state.accountList.content[4].id);
		//console.log("this.state.breedList[0]:   " + JSON.stringify(this.state.breedList[0].id));
		if (this.state.isLoaded) {
			return (
				<div>
					<h1>Katzen Rassen:</h1><br />
					<button onClick={this.handleGET} className="btn btn-primary">Katze!</button>
					<select id="selectCat" value={this.state.breed} onChange={this.handleChangeBreed}>
						{this.state.breedList.map(b => (<option value={b.id}>{b.name}</option>))}
						</select>
					<button onClick={this.handleGET} className="btn btn-primary">Account</button>
					<select id="selectAccount" value={this.state.account} onChange={this.handleChangeBreed}>
						{this.state.accountList.map(a => (<option value={a.content.id}>{a.content.name}</option>))}
						</select>
					<hr />
					{data.map(d => (<div>
						<ul>
							{d.breeds.map(breed => (<div>
								<li>name: {breed.content.name}</li>
								<li>id: {breed.id}</li>
								<li>nickname: {breed.content.nickname}</li>
								<li>logindate: {breed.content.logindate}</li>
							</div>))}
						</ul>
					</div>
					))}
				</div>);
		}
		else {
			return (
				<div>
					<h1>Lade...</h1>
				</div>);
		}
	}
}

export default App;