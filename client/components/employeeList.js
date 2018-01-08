import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employeeDetail';
import { Meteor } from 'meteor/meteor';
const perPage = 1;
class EmployeeList extends Component {
    componentWillMount(){
        this.page = 1
    }
    handleButtonClick(){
         Meteor.subscribe('employees', perPage * (this.page + 1));
         this.page +=1
    }
    render(){
        console.log(this.props.employees)
        return (
            <div>
                <div className='employeelist'>
                    {this.props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee}/>)}
                </div>
                <button onClick={this.handleButtonClick.bind(this)} className='btn btn-primary'>Load More...</button>
            </div>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('employees', perPage);
    return { employees: Employees.find({}).fetch() };
}, EmployeeList);