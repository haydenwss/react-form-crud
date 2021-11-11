import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext()

const EmployeeContextProvider  = (props) => {

    const [employees, setEmployees] = useState([
        {id:uuidv4(), name: 'Testy Name 1', email: 'testyname1@mail.com', address: '123 Fake Street', phone: '250-555-5555'},
        {id:uuidv4(), name: 'Testy Name 2', email: 'testyname2@mail.com', address: '1232 Fake Street', phone: '250-555-5556'}
])

useEffect(()=> {
    setEmployees(JSON.parse(localStorage.getItem('employees')))
},[])

useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
})

const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));

const addEmployee = (name, email, address, phone) => {
    setEmployees([...employees , {id:uuidv4(), name, email, address, phone}])
}

const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
}

const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
}

    return (
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;