import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      input: ""
    };
    this.getData = this.getData.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    let promise = axios.get("https://swapi.co/api/people");
    promise.then(response => {
      // console.log(response.data.results);
      this.setState({ people: response.data.results });
    });
  }
  getData() {
    let num = this.state.input;
    axios.get(`https://swapi.co/api/people/?page=${num}`).then(res => {
      this.setState({ people: res.data.results });
    });
  }
  handleInput(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    let people = this.state.people.map((e, i) => {
      return <h2 key={i}>{e.name}</h2>;
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">HTTP and AXIOS example</h1>
        </header>
        <input placeholder="Pick a # 1-3" onChange={this.handleInput} />
        <button onClick={this.getData}> Get Data </button>
        {people}
      </div>
    );
  }
}
export default App;