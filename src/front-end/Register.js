import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required'),
        role: Yup.string()
            .required('First Name is required') 
    });

    const onSubmit = async (fields, { setStatus, setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:4000/accounts/register', fields);
            console.log('Registration successful:', response.data);
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
                    <h3 className="card-header">Register</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>
                                <Field type="radio" name="role" value="User" checked/>
                                Creative (Solo)
                            </label>
                            <label>
                                <Field type="radio" name="role" value="Agency" />
                                Creative (Agency)
                            </label>
                            <label>
                                <Field type="radio" name="role" value="Employer" />
                                Employer or Recruiter
                            </label>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label htmlFor='firstName'>First Name</label>
                                <Field id="firstName" name="firstName" type="text" className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label htmlFor='lastName'>Last Name</label>
                                <Field id="lastName" name="lastName" type="text" className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='email'>Email</label>
                            <Field id="email" name="email" type="text" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor='password'>Password</label>
                                <Field id="password" name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <Field id="confirmPassword" name="confirmPassword" type="password" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={`form-control ${errors.acceptTerms && touched.acceptTerms ? 'is-invalid' : ''}`} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"> </span>}
                                Register
                            </button>
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
} 

export default Register;