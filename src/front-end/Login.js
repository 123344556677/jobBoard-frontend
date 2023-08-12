import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const onSubmit = async (fields, { setStatus, setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:4000/accounts/authenticate', fields);
            console.log('login successful:', response.data);
            localStorage.setItem('jwtToken', response.data.jwtToken);
        } catch (error) { 
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Login</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" type="text" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field id="password" name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"> </span>}
                                    Login
                                </button>
                                <Link to="/register" className="btn btn-link">Register</Link>
                            </div>
                            <div className="form-group col text-right">
                                <Link to="/forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Login;