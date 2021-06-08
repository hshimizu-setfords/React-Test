import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {tasks:this.props.tasks};
    this.onHandleDeleteClick = this.onHandleDeleteClick.bind(this);
    this.onHandleTaskClick = this.onHandleTaskClick.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleTaskClick(task){
    this.setState(prevState =>{
      const index = prevState.tasks.indexOf(task);
	  if(index !== -1)
		prevState.tasks[index].done = !prevState.tasks[index].done;
      return {tasks: prevState.tasks};
    })
  }
  onHandleDeleteClick(task){
    this.setState(prevState =>{
      const index = prevState.tasks.indexOf(task);
	  if(index !== -1)
		prevState.tasks.splice(index, 1);
      return {tasks: prevState.tasks};
    })
  }
  onHandleSubmit(detail){
    this.setState(prevState =>{
      const prevTasks = prevState.tasks;
      const newId = (prevTasks.length !== 0)? (prevTasks[prevTasks.length - 1].id + 1) : 0;
      prevState.tasks.push({"id": newId, "detail": detail, "done":false});
      return {tasks: prevState.tasks}
    })
  }

  render(){
    return ( 
      <div class="container">
        <h1>Todo List</h1>
        <AddItemForm 
          onHandleSubmit={this.onHandleSubmit}
		  />
        <ul>
            {this.props.tasks.map(task => (
              <DetailItem 
              key={task.id}
              task={task}
              onHandleDeleteClick={this.onHandleDeleteClick}
			  onHandleTaskClick={this.onHandleTaskClick}
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
              <input 
			  	type="text"
				onChange={this.onHandleChange}
				value={this.state.value}
			  	placeholder="Input Your Task"></input> 
              <input type="submit" value="+"></input>
            </form>
  }

}
class DetailItem extends React.Component{

  constructor(props){
    super(props);
    this.onHandleDeleteClick = this.onHandleDeleteClick.bind(this);
    this.onHandleTaskClick = this.onHandleTaskClick.bind(this);
  }

  onHandleDeleteClick(e){
    this.props.onHandleDeleteClick(this.props.task);
  }

  onHandleTaskClick(e){
    this.props.onHandleTaskClick(this.props.task);
  }

  render(){
	  let className = (this.props.task.done) ? "done" : "";
    return <li  onClick={this.onHandleTaskClick}>
				<span className={className}>{this.props.task.detail}</span>
				<button class="delete-btn" onClick={this.onHandleDeleteClick}>×</button>
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
