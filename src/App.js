import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person'

class App extends Component {

  state = {
    persons: [
      { id: 'sgdy', name: 'xyz', age: 29 },
      { id: 'sfsd', name: 'abc', age: 59 },
      { id: 'yuyt', name: 'bcd', age: 62 }
    ],
    otherState: 'someValue',
    showPerson: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 29 },
        { name: 'abc', age: 59 },
        { name: 'bcd', age: 24 }
      ]
    })
  }

  changeNameHandler = (event) => {
    this.setState({
      persons: [
        { name: 'abx', age: 29 },
        { name: event.target.value, age: 59 },
        { name: 'bcd', age: 24 }
      ]
    })
  }

  togglePersonHandler = () => {
    console.log(this);
    const personVisibility = this.state.showPerson;
    this.setState({ showPerson: !personVisibility })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  changeNameHandlerinTextfield = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;
    let persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  render() {
    const style = {
      border: '1px solid blue',
      backgroundColor: 'green',
      padding: '10px 20px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;
    if (this.state.showPerson) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person name={person.name}
                age={person.age}
                key={person.id}
                change={(event) => this.changeNameHandlerinTextfield(event, person.id)}
                click={() => this.deletePersonHandler(index)} />
            })
          }
        </div>
      )

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button style={style} onClick={this.togglePersonHandler}>Button</button>
          {persons}
        </div>
      </StyleRoot>
    )
  }

}
export default Radium(App);


