import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Read extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        account: 'Achim',
        id: null,
        error: null,
        isLoaded: false,
        accountList: [],
        accounts:[],
        content: [],
        data: []
    };
    this.onInputchangeName = this.onInputchangeName.bind(this);
    this.onInputchangeId = this.onInputchangeId.bind(this);
    this.handleGET = this.handleGET.bind(this);
}

componentDidMount() {
    this.handleAccounts()
    this.handleGET()
}

onInputchangeName(event) {
    this.setState({
    account: event.target.value
    });
    console.log("Id von " + this.state.account + " ist: " + this.state.id);
}

onInputchangeId(event) {
var myinput = document.getElementById('selectAccount');  //optional Method
    this.setState({
    id: event.target.value
    });
console.log("Id von " + this.state.account + " ist: " + this.state.id);
console.log("myinput von " + this.state.account + " ist: " + ReactDOM.findDOMNode(myinput).value);
}

handleAccounts() {
	fetch("http://192.168.2.121:8080/api/accounts/")
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
			.then (console.log("Fetch accountList: " + JSON.stringify(this.state.accountList)))
}

handleGET(id) {
	console.log("handleGET: "+ "http://localhost:8080/api/account/" + id)
	fetch("http://192.168.2.121:8080/api/account/" + id)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
					isLoaded: true,
						data: (result)
					})
				},
				(error) => {
					this.setState({
					    isLoaded: true,
						error
					});
				}
			)
			return this.state.data;
}


render()
{
const { error, isLoaded, data } = this.state;
var accountlist = this.state.accountList;
var accountString =JSON.stringify(accountlist);
var greensniperimg ="https://greensniper.files.wordpress.com/2011/03/portrait-greensniper.jpg?w=388"
console.log("accountlist: " + JSON.stringify(accountlist));
if (this.state.isLoaded) {
        return (
            <div className="Read">
                    Current Time: {new Date().toLocaleTimeString()}
                ... Hammurabi ... <br/>
                accountlist = {JSON.stringify(accountlist)}
                <br/><br/>
                Please insert your Hive-account name: @
                <input
                            name="account"
                            type="text"
                            //value={this.state.account}
                            onChange={this.onInputchangeName}
                />
                       <button value={this.state.account} onClick={this.onInputchangeName}>Submit</button>
                <br/> <br/>
                <div>Der Name lautet: {this.state.account} </div>
                {
                  accountlist &&
                    accountlist.map((account) => {
                      return (
                        <div className="box" >
                          <br />
                               <select id="selectAccount" value={this.state.id} onChange={this.onInputchangeId}>
                                        {  this.state.content= account.content.map
                                          ((b) => (
                                            <option value={b.id}>
                                            {b.name}
                                            </option>)
                                            )
                                        }
                                        </select>
                          {account.content &&
                            account.content.map((d) => {
                              return (
                                <div key={account.xxx}>
                                  -- {d.name} -- <br />
                                  {d.nickname} <br/>
                                  {d.id}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })
                }
                <button onClick={this.handleGET} className="btn btn-primary">Account</button>
                <hr />
                ID =        {JSON.stringify(data.id)} <br/>
                Name =      {JSON.stringify(data.name)} <br/>
                Nickname =  {JSON.stringify(data.nickname)} <br/>
                Logindate = {JSON.stringify(data.logindate)} <br/>
                <img src={greensniperimg} />
                <hr />
           </div>
        )
     }
}}

export default Read;
