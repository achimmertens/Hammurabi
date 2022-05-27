import './App.css';
import Accounts from './accounts.json';
import React from 'react';
import Records from './records.json';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		    breed: 'abys',			account: 'Anika',
			error: null,
			isLoaded: false,
			accountList: [],
			data: []
		};
	}

	componentDidMount() {
		this.handleAccounts()
	}



handleAccounts() {
	//fetch ("https://api.thecatapi.com/v1/breeds")
	fetch("http://localhost:8080/api/accounts/")
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

			})
			.then (console.log("accountList: " + JSON.stringify(this.state.accountList)))

	// console.log("BreedList[0].id: " + JSON.stringify(this.state.breedList[0].id));
}


getAccounts(url) {
return fetch(url).then((response) => response.json());
}



render()
{
const { error, isLoaded, data } = this.state;
var accountlist = this.state.accountList;
var accountString =JSON.stringify(accountlist);


console.log("accountlist: " + JSON.stringify(accountlist));

var greensniperimg ="https://greensniper.files.wordpress.com/2011/03/portrait-greensniper.jpg?w=388"


        return (
            <div className="App">
                    Current Time: {new Date().toLocaleTimeString()}
                ... Hammurabi ... <br/>
                accountlist = {JSON.stringify(accountlist)} <br/><br/>

                accountString = {accountString} <br/><br/>



                <br /><br/>
                <br/> <br/>

                <select id="selectAccount" value={'Anika'} onChange={this.handleChangeBreed}>
                						{accountlist.map
                						  ((b) => (
                                          	<option value={b.content[0].name}>{b.content[0].nickname}</option>))
                						}
                						</select>
                <br/> <br/>
                huhu
                <br/> <br/>

                {
                  accountlist &&
                    accountlist.map((account) => {
                      return (
                        <div className="box" key={account.content[0].id}>
                          <strong>account.content[0].name = {account.content[0].name}</strong> <br />
                          <br />
                          <br />

                               <select id="selectAccount" value={'Anika'} onChange={this.handleChangeBreed}>
                                        {account.content.map
                                          ((b) => (
                                            <option value={b.name}>{b.nickname}</option>))
                                        }
                                        </select>
                          {account.content &&
                            account.content.map((data) => {
                              return (
                                <div key={account.id}>
                                  -- {data.name} -- <br />
                                  {data.nickname}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })
                }
                <img src={greensniperimg} />
                <hr />
           </div>
        )
}
}

export default App;