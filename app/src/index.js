import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {tasks:this.props.tasks};
    this.onHandleClick = this.onHandleClick.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleClick(task){
    this.setState(prevState =>{
      const index = prevState.tasks.indexOf(task);
      prevState.tasks.splice(index, 1);
      return prevState.tasks;
    })
  }
  onHandleSubmit(detail){
    this.setState(prevState =>{
      const prevTasks = prevState.tasks;
      const newId = (prevTasks.length !== 0)? (prevTasks[prevTasks.length - 1].id + 1) : 0;
      prevState.tasks.push({"id": newId, "detail": detail});
      return {tasks: prevState.tasks}
    })
  }

  render(){
    return ( 
      <div>
        <h1>Todo</h1>
        <h2>Add Item</h2>
        <AddItemForm 
          onHandleSubmit={this.onHandleSubmit}/>
        <h2>Item List</h2>
        <ul>
            {this.props.tasks.map(task => (
              <DetailItem 
              key={task.id}
              task={task}
              onHandleClick={this.onHandleClick}
               />
            ))}
        </ul>
      </div>);
  }
}

class AddItemForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {value:""};
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChange(e){
    this.setState({value:e.target.value});
  }
  onHandleSubmit(e){
    this.props.onHandleSubmit(this.state.value);
    this.setState({value:""});
    e.preventDefault();
  }
  render(){
    return <form onSubmit={this.onHandleSubmit}>
              <input type="text" onChange={this.onHandleChange} value={this.state.value}></input> 
              <input type="submit"></input>
            </form>
  }

}
class DetailItem extends React.Component{

  constructor(props){
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleClick(e){
    this.props.onHandleClick(this.props.task);
  }

  render(){
    return <li>
              <button onClick={this.onHandleClick}>x</button>
              &nbsp;{this.props.task.detail}
            </li>
  }
}

const tasks = [];


ReactDOM.render(
  <Todo 
    tasks={tasks}
  />,
  document.getElementById('root')
);
