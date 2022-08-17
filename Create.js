import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Table, Form, Button } from 'react-bootstrap'


const getDataformLS = () => {
    const data = localStorage.getItem('forms')
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}
export default function App() {
    const [item, setItem] = useState('');
    const [forms, setForm] = useState(getDataformLS());
    const { register, reset,handleSubmit } = useForm();
    const [firstName, setFirstName] = useState();
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
   // edit form
    const [editForm, setEdit] = useState(false);
    // id state
    const [id, setId] = useState('');

    const onSubmit = (e) => {
        //e.preventDefault()
       console.log(e)
       reset();
        let form = {
            firstName,
            lastname,
            email,
            phone
        }
        setForm([...forms, form])
    }
    // For Delete APi
    const deleteRecord=(user)=>{
        console.log(user)
        const deleteUser=forms.filter((element,index)=>{
            return element.user!==user
        })
        console.log(deleteUser)
        setForm(deleteUser);
    }
    useEffect(() => {
        localStorage.setItem('form', JSON.stringify(forms));
    }, [forms])

    const handleEdit=(user,index)=>{
        setEdit(true)
        setId(index)
        setItem(user.item)
        
    }
    const handleEditSubmit=(e)=>{
        e.preventDefault()
        let details=[...forms];
        let detail=details[id];
        console.log("update",detail)
    }
    return (
        <>
        {editForm===true&&(
        <>
        <Form onSubmit={handleEditSubmit(onSubmit)}>
                <lable>First Name</lable><br />
                <input {...register("firstName", { required: true, maxLength: 20 })}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                <br />
                <lable>Last Name</lable><br />
                <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                /><br />
                <lable>Phone Number</lable><br />

                <input type="number" {...register("phone", { minLength: 10 })} onChange={(e) => setPhone(e.target.value)} /><br />
                <lable>Email</lable><br />
                <input type="email" {...register("email", { minLength: 10 })} onChange={(e) => setEmail(e.target.value)} /><br />
                <br />
                <Button type="submit" >submit</Button><br />
            </Form>
           
           </>
        )}
        {/* new */}
        {editForm===false&&(
        <>
        <Form onSubmit={handleSubmit(onSubmit)} className="des-in">
                <lable>First Name</lable><br />
                <input {...register("firstName", { required: true, maxLength: 20 })}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                <br />
                <lable>Last Name</lable><br />
                <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                /><br />
                <lable>Phone Number</lable><br />

                <input {...register("phone", { minLength: 10 })} onChange={(e) => setPhone(e.target.value)} /><br />
                <lable>Email</lable><br />
                <input {...register("email", { minLength: 10 })} onChange={(e) => setEmail(e.target.value)} /><br />
                <br />
                <Button type="submit" >submit</Button><br />
            </Form>
           </>
        )}
         <h1>Form Detail</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>{forms.map(user => {
                    return (
                        <tr key={user.email}><td>{user.firstName}</td>
                            <td>{user.lastname}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                           <td> <Button variant="warning" onClick={()=>deleteRecord(user.email)}>Delete</Button></td> 
                           <td> <Button variant="secondary"   onClick={()=>handleEdit()}>Edit</Button></td>
                            </tr>
                        )
                })}
                       <Button  onClick={()=>setForm([])}>Delete All</Button>
                </tbody>
            </Table>
            
        </>
    );
}