import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'coconut',
    id: null,
    name: null,
    logindate:null,
    timestamp: null
    };

    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNickName = this.handleChangeNickName.bind(this);
    this.handleSubmitId = this.handleSubmitId.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
  }

    handleChangeId(event) {
    this.setState({id: event.target.value});
    }

    handleChangeName(event) {
     this.setState({name: event.target.value});
     this.setState({logindate: new Date().toISOString()})
     // soll: 2022-07-26T06:26:01.489+00:00
     //ist toISOString: 2022-07-27T05:17:09.385Z
    }

    handleChangeNickName(event) {
      this.setState({nickname: event.target.value});
    }

    handleSubmitId(event) {
        alert('Your Id is: ' + this.state.id);
        event.preventDefault();
    }

    handleSubmitName(event) {
      alert('Your name is: ' + this.state.name);
      event.preventDefault();
      //const fetch = require('node-fetch');
      const axios = require('axios')
      let config = {
          headers: {
              "Content-Type": "application/json"
          }
      }
      let data = {
         "id": this.state.id,
         "name": this.state.name,
         "nickname": this.state.nickname,
         "logindate":this.state.logindate
      }
      axios.post("http://192.168.2.121:8080/api/account",data,config)
        .then(function (response) {
          console.log(response);
        })
    }

  render() {
    return (
    <div className="App">
        <form onSubmit={this.handleSubmitName}>
         <label>
          Type in your Id:
           <input value={this.state.id} onChange={this.handleChangeId} />
          Type in your given and last name:
          <input value={this.state.name} onChange={this.handleChangeName} />
          Type in your nickname:
            <input value={this.state.nickname} onChange={this.handleChangeNickName} />
          </label>
                <button type="submit" >senden</button>
        </form>
      <hr/>
      The complete content is: {this.state.id}, {this.state.name}, {this.state.nickname}, {this.state.logindate}

      <hr/>
    </div>
    );
  }
}

export default App;
// See also https://reactjs.org/docs/forms.html