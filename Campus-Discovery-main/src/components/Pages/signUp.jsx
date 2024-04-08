import React, { useRef } from "react";
import { TextInput } from '@mantine/core';
import { Select } from '@mantine/core';
import { Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';

function SignUp() {
    const navigate = useNavigate();
    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const occupationInputRef = useRef()
    
    function addUserHandler(signupData) {
        fetch(
            'https://campus-discovery-d21d2-default-rtdb.firebaseio.com/users.json',
         {
          method: "POST",
          body: JSON.stringify(signupData),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
            return response.json()
        }).then((data) => {
            let expirationDate = new Date()
            expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000);
            document.cookie = `userid=`+data.name+`;expires=`+expirationDate.toUTCString()
            navigate('/events')
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredOccupation = occupationInputRef.current.value
        const signupData = {
            name: enteredName,
            email: enteredEmail,
            occupation: enteredOccupation
        }
        addUserHandler(signupData)
    }
 
    return (
        <div style={{display: "flex", justifyContent : "center", alignItems : "center"}}>
            <div className="backButton" style={{position: 'fixed', top:'10px', left:'10px'}}>
                <Link to={'/'}>
                    <Button className= "backButton" variant="gradient" gradient={{ from: '#003057', to: '#003057' }}>Back To Home</Button>
                </Link>
            </div>
            <form onSubmit={submitHandler}>
                    <TextInput
                        placeholder="Your Name"
                        label="Name" color='red'
                        withAsterisk
                        htmlFor="name"
                        id="name"
                        required
                        ref={nameInputRef}
                    />
                    <TextInput
                        placeholder="@gatech.edu"
                        label="Georgia Tech Email"
                        ref={emailInputRef}
                        htmlFor="email"
                        required
                        id="email"
                    />
                    <Select
                        label="Role"
                        withAsterisk
                        placeholder="Select"
                        data={[
                            { value: 'student', label: 'Student' },
                            { value: 'teacher', label: 'Teacher' },
                            { value: 'organizer', label: 'Organizer' },
                            { value: 'moderator', label: 'Moderator'}
                        ]}
                        ref={occupationInputRef}
                        htmlFor="occupation"
                        required
                        id="occupation"
                    />
                    <div style={{paddingTop: '10px', display: 'flex', justifyContent: 'center'}}>
                        <Button className= "continueButton" 
                        variant="gradient" 
                        gradient={{ from: '#003057', to: '#003057' }}
                        type="submit">
                            Submit
                        </Button>
                    </div>
            </form>
        </div>
    );
}

export default SignUp;