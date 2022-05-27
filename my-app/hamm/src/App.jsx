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
			accountList4: [],
			content: [],
			breedList: [],
				data: []
		};

	}

	componentDidMount() {
			this.handleBreeds()
		this.handleAccounts()
		/*
		this.getAccounts("http://localhost:8080/api/accounts/").then((res) =>
		{
          console.log("Res = " + JSON.stringify(res));
          this.state.accountList4=res;
          }
        );
        */
	}

handleBreeds() {
	fetch ("https://api.thecatapi.com/v1/breeds")
	//fetch("http://localhost:8080/api/accounts/")
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
            .then(function (response) {
                if (response.ok) {
                  response.json().then(function (data) {
                    console.log("data = " + data);
                    console.log("data[0] = " + data[0].url);
                    })
                    }
                    else {
                          // Console log if error
                          console.log("Help!");
                          }
                    })
			console.log("BreedList: " + JSON.stringify(this.state.breedList));
	// console.log("BreedList[0].id: " + JSON.stringify(this.state.breedList[0].id));


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

 var portfolio_list = this.state.accountList.map( (element) => {
            return (
                <div >
                    {element}
                </div>
            );
        });



var accountlist = this.state.accountList;
var accountlist2 = [{"content":[{"id":"4","name":"Anika","nickname":"Ani","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"5","name":"Ayleen","nickname":"Smyleen","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"10","name":"Artur","nickname":"Art","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"1","name":"Achim","nickname":"Greensniper","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"2","name":"Annette","nickname":"Schnuffel","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"20","name":"Annewandstehn","nickname":"Annew","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"21","name":"AxelSchweiß","nickname":"Aschwei","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"22","name":"RosaUnterhose","nickname":"Rosau","logindate":"2022-05-18T06:26:01.489+00:00"},{"id":"23","name":"RudiMente","nickname":"Rudim","logindate":"2022-05-18T06:26:01.489+00:00"}],"pageable":{"sort":{"empty":true,"sorted":false,"unsorted":true},"offset":0,"pageSize":9,"pageNumber":0,"paged":true,"unpaged":false},"last":true,"totalPages":1,"totalElements":9,"number":0,"size":9,"sort":{"empty":true,"sorted":false,"unsorted":true},"first":true,"numberOfElements":9,"empty":false}]//var accountlist = this.state.accountList;
var accountlist3 = [{"content":[{"id":"4","name":"Anika","nickname":"Ani","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"5","name":"Ayleen","nickname":"Smyleen","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"10","name":"Artur","nickname":"Art","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"1","name":"Achim","nickname":"Greensniper","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"2","name":"Annette","nickname":"Schnuffel","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"20","name":"Annewandstehn","nickname":"Annew","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"21","name":"AxelSchweiß","nickname":"Aschwei","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"22","name":"RosaUnterhose","nickname":"Rosau","logindate":"2022-05-18T06:26:01.489+00:00"},{"id":"23","name":"RudiMente","nickname":"Rudim","logindate":"2022-05-18T06:26:01.489+00:00"}],"pageable":{"sort":{"empty":true,"sorted":false,"unsorted":true},"offset":0,"pageNumber":0,"pageSize":9,"unpaged":false,"paged":true},"last":true,"totalElements":9,"totalPages":1,"number":0,"size":9,"sort":{"empty":true,"sorted":false,"unsorted":true},"numberOfElements":9,"first":true,"empty":false}]
var accountlist4 = this.state.accountList4.content;

var breedList = this.state.breedList;
//var breedContent = JSON.parse(breedList[0].name);

				 this.state.accountList.forEach(element => {
                        console.log("Element = " + JSON.stringify(element.name))
                        });


var accountlist = this.state.accountList;
var accountString =JSON.stringify(accountlist);


var content = accountlist2[0].content;  // accountlist2[0].content funktioniert, accountlist[0].content nicht !?
var totalPages = (accountlist2[0].numberOfElements);
var content2 = [{"id":"4","name":"Anika","nickname":"Ani","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"5","name":"Ayleen","nickname":"Smyleen","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"10","name":"Artur","nickname":"Art","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"1","name":"Achim","nickname":"Greensniper","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"2","name":"Annette","nickname":"Schnuffel","logindate":"2022-05-02T06:26:01.489+00:00"},{"id":"20","name":"Annewandstehn","nickname":"Annew","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"21","name":"AxelSchweiß","nickname":"Aschwei","logindate":"2022-05-12T06:26:01.489+00:00"},{"id":"22","name":"RosaUnterhose","nickname":"Rosau","logindate":"2022-05-18T06:26:01.489+00:00"},{"id":"23","name":"RudiMente","nickname":"Rudim","logindate":"2022-05-18T06:26:01.489+00:00"}]
var contentString = accountString[0].content;



console.log("accountlist: " + JSON.stringify(accountlist));
console.log("accountlist2: " + JSON.stringify(accountlist2));
console.log("content2: " + JSON.stringify(content2));
console.log("contentString: " + JSON.stringify(contentString));
console.log("totalPages: " + totalPages);
console.log("portfolio_list : " + portfolio_list);
/*

                						*/


var greensniperimg ="https://greensniper.files.wordpress.com/2011/03/portrait-greensniper.jpg?w=388"


        return (
            <div className="App">
                    Current Time: {new Date().toLocaleTimeString()}
                ... Hammurabi ... <br/>
                accountlist = {JSON.stringify(accountlist)} <br/><br/>
                accountlist2 = {JSON.stringify(accountlist2)} <br/><br/>
                accountString = {accountString} <br/><br/>
                content = {JSON.stringify(content)} <br/> <br/>
                contentString = {contentString} <br/><br/>
                <select value={this.state.breed} onChange={this.handleChangeBreed}>
                						{this.state.breedList.map(b => (<option value={b.id}>{b.name}</option>))}
                					</select>



                <br /><br/>

                accountlist[0] = {JSON.stringify(content[0].name)}
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