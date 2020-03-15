import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddTask extends React.Component {
  constructor(props) {
      super(props);
      this.btnRef = React.createRef();
      this.state = {name: '', status: '',  createdDate: '', description: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  // Save car and close modal form
  handleSubmit = (event) => {
      event.preventDefault();
      var newTask = {name: this.state.name, status: this.state.status,
          createdDate: this.state.createdDate, description: this.state.description};
      this.props.addTask(newTask);
      this.btnRef.addDialog.hide();
  }

  cancelSubmit = (event) => {
    event.preventDefault();
      this.btnRef.addDialog.hide();
  }
  
  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New task</h3>
          <form>
            <TextField label="Name" placeholder="name"  name="name" onChange={this.handleChange}/><br/>
            <TextField label="Status" placeholder="status" name="status" onChange={this.handleChange}/><br/>
            <TextField label="Created" placeholder="created date" name="createdDate" onChange={this.handleChange}/><br/>
            <TextField label="Description" placeholder="description" name="description" onChange={this.handleChange}/><br/>
            <Button variant="outlined" style={{marginRight: 10}} color="primary" onClick={this.handleSubmit}>Save</Button>
            <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>        
          </form>     
        </SkyLight>
        <div>
            <Button variant="text" color="primary" style={{'margin': '10px'}} onClick={() => this.refs.addDialog.show()}>New Task</Button>
        </div>
      </div>   
    );
  }
}

export default AddTask;