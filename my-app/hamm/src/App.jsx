import './App.css';
import React from 'react';

class App extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        account: 'Anika',
        error: null,
        isLoaded: false,
        accountList: [],
        data: []
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
}

componentDidMount() {
    this.handleAccounts()
}

onInputchange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
}


onSubmitForm() {
console.log(this.state)
console.log(this.state.accountList[0].content[0].name)
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
                Please insert your Hive-account name: @
                <input
                            name="account"
                            type="text"
                            value={this.state.account}
                            onChange={this.onInputchange}
                />
                <div>

                            <button onClick={this.onSubmitForm}>Submit</button>

                </div>
                <br/> <br/>

                <select id="selectAccount" value={this.state.account} onChange={this.handleChangeBreed}>
                						{accountlist.map
                						  ((b) => (
                                          	<option value={b.content[0].name}>{b.content[0].nickname}</option>))
                						}
                						</select>
                <br/> <br/>


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

                               <select id="selectAccount" value={this.state.account} onChange={this.handleChangeBreed}>
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