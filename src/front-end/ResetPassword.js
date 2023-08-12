import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function ResetPassword() {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }
    
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        console.log(token);
        if (token) {
            axios.post('http://localhost:4000/accounts/validate-reset-token', { token })
            .then(response => {
                console.log('token verify response:', response.data);
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(error => {
                setTokenStatus(TokenStatus.Invalid);
                console.error('Error verifying token:', error);
            });
        }
    }, []);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        const onSubmit = async ({ password, confirmPassword }, { setSubmitting }) => {
            try {
                const response = await axios.post('http://localhost:4000/accounts/reset-password', { token, password, confirmPassword });
                console.log('reset paswword successful:', response.data);
            } catch (error) { 
                setSubmitting(false);
                console.error('Error:', error);
            } finally {
                setSubmitting(false);
            }
        };

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"> </span>}
                                    Reset Password
                                </button>
                                <Link to="/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
            default:
                return <div>Url is not valid</div>    
        }
    }

    return (
        <div>
            <h3 className="card-header">Reset Password</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export default ResetPassword;