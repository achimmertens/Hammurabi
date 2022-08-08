import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'coconut',
    givenname: null,
    lastname: null
    };

    this.handleChangeGivenname = this.handleChangeGivenname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleSubmitGivenname = this.handleSubmitGivenname.bind(this);
    this.handleSubmitLastname = this.handleSubmitLastname.bind(this);
  }

  handleChangeGivenname(event) {
    this.setState({givenname: event.target.value});
  }
    handleChangeLastname(event) {
      this.setState({lastname: event.target.value});
    }

  handleSubmitGivenname(event) {
    alert('Your givenname is: ' + this.state.givenname);
    event.preventDefault();
  }

    handleSubmitLastname(event) {
      alert('Your lastname is: ' + this.state.lastname);
      event.preventDefault();
    }

  onInputchangeName(event) {
      this.setState({
      givenname: event.target.value
      });
      console.log("Id von " + this.state.account + " ist: " + this.state.id);
  }

  render() {
    return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChangeGivenname}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
     <hr/>
           <form onSubmit={this.handleSubmitGivenname}>
             <label>
               Type in your given name:
               <input value={this.state.givenname} onChange={this.handleChangeGivenname} />
             </label>
             <input type="submit" value="Submit" />
           </form>
                      <form onSubmit={this.handleSubmitLastname}>
                        <label>
                          Type in your last name:
                          <input value={this.state.lastname} onChange={this.handleChangeLastname} />
                        </label>
                        <input type="submit" value="Submit" />
                      </form>
     <hr/>
    Your complete name is: {this.state.givenname} {this.state.lastname}.
      </div>


    );
  }
}

export default App;
// See also https://reactjs.org/docs/forms.html