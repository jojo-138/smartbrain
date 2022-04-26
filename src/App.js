import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Signin from './components/Signin';
import BGParticles from './components/BGParticles';
import Navigation from './components/Navigation';
import Register from './components/Register';
import InputBar from './components/InputBar';
import Rank from './components/Rank';
import ImageRecognition from './components/ImageRecognition';

const initialState = {
  route: 'signin',
  input: '',
  box: [],
  key: [],
  user: {},
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      input: '',
      box: [],
      key: [],
      user: {},
    }
  }

  onRouteChange = (route) => {
    this.setState({ route });
    if (route === 'signin') {
      this.setState(initialState);
    }
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  updateInput = (input) => {
    this.setState({ input });
    this.setState({ box: [] });
    this.setState({ key: [] });
  }

  onClickDetectButton = () => {
    fetch('http://localhost:3001/apiCall', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ box: this.calculateBoundingBox(data) });
      this.setState({ key: data.map(box => box.id)})
      if (data.length) {
        fetch('http://localhost:3001/imageEntry', {
          method: 'put',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              entries: data
            }
          }));
        })
        .catch(err => console.log('Unable to update entries.', err))
      }
    })
    .catch(err => console.log('Error with API connection.', err))
  }

  calculateBoundingBox = (data) => {
    let image = document.getElementById('imageInput');
    let width = image.width;
    let height = image.height;
    let boundingBoxArray = data.map(box => box.bounding_box);
    let stateBoxArray = boundingBoxArray.map(box => {
      return ({
        topRow: height * box.top_row,
        leftCol: width * box.left_col,
        bottomRow: height - (height * box.bottom_row),
        rightCol: width - (width * box.right_col),
      })
    })
    return stateBoxArray;
  }

  render () {
    return (
      <div className="App mt3">
        <BGParticles />
        <Navigation onRouteChange={this.onRouteChange} currentRoute={this.state.route}/>
        { this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
          : this.state.route === 'register'
            ? <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
            : <div className="home">
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <InputBar onClickDetectButton={this.onClickDetectButton} updateInput={this.updateInput}/>
                <ImageRecognition imageURL={this.state.input} faceBox={this.state.box} boxID={this.state.key}/>
              </div>
        }
      </div>
    );
  }
}

export default App;