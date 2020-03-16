import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {SERVER_URL} from '../constants.js';
import AddTask from './AddTask.js';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

class Tasklist extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: [], open: false, message: ''};
    }

    componentDidMount() {
        this.fetchTasks();
    }

    // Fetch all Tasks
    fetchTasks = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/tasks',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    tasks: responseData._embedded.tasks,
                });
            })
            .catch(err => console.error(err));
    };

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    // Delete Task
    onDelClick = (link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            {
                method: 'DELETE',
                headers: {'Authorization': token}
            }
        )

        .then(res => {
            this.setState({open: true, message: 'Task deleted'});
            this.fetchTasks();
        })
        .catch(err => {
            this.setState({open: true, message: 'Error when deleting'});
            console.error(err)
        })
    };

    // Add new task
    addTask(task) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/tasks',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(task)
            })
            .then(res => this.fetchTasks())
            .catch(err => console.error(err))
    }

    // Update task
    updateTask(task, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(task)
            })
            .then(res =>
                this.setState({open: true, message: 'Changes saved'})
            )
            .catch(err =>
                this.setState({open: true, message: 'Error when saving'})
            )
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.tasks];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({tasks: data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.tasks[cellInfo.index] ? this.state.tasks[cellInfo.index][cellInfo.column.id]:''
                }}

            />
        );
    };

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: this.renderEditable
        }, {
            Header: 'Status',
            accessor: 'status',
            Cell: this.renderEditable
        }, {
            Header: ' Created',
            accessor: 'createdDate',
            Cell: this.renderEditable
        }, {
            Header: 'Description',
            accessor: 'description',
            Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) => (<Button size="small" variant="text" color="primary" onClick={() => {
                this.updateTask(row, value)
            }}>Save</Button>)
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<Button size="small" variant="text" color="secondary" onClick={() => {
                this.confirmDelete(value)
            }}>Delete</Button>)
        }];

        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddTask addTask={this.addTask} fetchTasks={this.fetchTasks}/>
                    </Grid>
                    <Grid item style={{padding: 20}}>
                        <CSVLink data={this.state.tasks} separator=";">Export CSV</CSVLink>
                    </Grid>
                </Grid>

                <ReactTable data={this.state.tasks} columns={columns}
                            filterable={true} pageSize={10}/>
                <Snackbar
                    open={this.state.open} onClose={this.handleClose}
                    autoHideDuration={1500} message={this.state.message}/>
            </div>
        );
    }
}

export default Tasklist;