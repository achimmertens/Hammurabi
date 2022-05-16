import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breed: 'abys',
			error: null,
			isLoaded: false,
			breedList: [],
			data: []
		};
		this.handleGET = this.handleGET.bind(this);
		this.handleChangeBreed = this.handleChangeBreed.bind(this);
	}

	componentDidMount() {
		this.handleBreeds()
	}

	handleChangeBreed(event) {
		this.setState({ breed: event.target.value });
	}
	handleBreeds() {
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

	handleGET() {
		console.log("Call handleGET")
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
		if (this.state.isLoaded) {
			return (
				<div>
					<h1>Katzen Rassen:</h1><br />
					<button onClick={this.handleGET} className="btn btn-primary">Katze!</button>
					<select value={this.state.breed} onChange={this.handleChangeBreed}>
						{this.state.breedList.map(b => (<option value={b.id}>{b.name}</option>))}
					</select>
					<hr />
					{data.map(d => (<div>
						<ul>
							{d.breeds.map(breed => (<div>
								<li>Zucht: {breed.name}</li>
								<li>Alternative Bezeichnungen: {breed.alt_names}</li>
								<li>Beschreibung:
									<p>{breed.description}</p>
								</li>
								<li>Lebenserwartung: {breed.life_span}</li>
								<li>Herkunft: {breed.origin}</li>
								<li>Wikipedia Link: <a href={breed.wikipedia_url} >{breed.wikipedia_url}</a></li>
								<li>Bild:<br />
									<img alt={d.name} height={d.height * 0.3} width={d.width * 0.3} src={d.url}></img>
								</li>
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