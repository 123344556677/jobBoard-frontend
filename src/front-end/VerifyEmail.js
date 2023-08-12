import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
    const EmailStatus = {
        Verifying: 'Verifying',
        Verified: 'Verified',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState("");
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        console.log(token);
        if (token) {
            setEmailStatus(EmailStatus.Verifying);
            axios.post('http://localhost:4000/accounts/verify-email', { token })
            .then(response => {
                setEmailStatus(EmailStatus.Verifying);
                console.log('Verification response:', response.data);
                setEmailStatus(EmailStatus.Verified);
            })
            .catch(error => {
                console.error('Error verifying email:', error);
                setEmailStatus(EmailStatus.Failed);
            });
        }
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>;
            case EmailStatus.Verified:
                return <div>Verified. Please LogIn <Link to="/login">here</Link>.</div>;    
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to="/forgot-password">forgot password</Link> page.</div>;
            default:
                return <div>Url is not valid</div>    
        }
    }

    return (
        <div>
            <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export default VerifyEmail;