import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  // BasicInfo
  name: Yup.string().required('Name is required'),
  dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone is required'),

  // EmploymentDetails
  employeeId: Yup.string().required('Employee ID is required'),
  department: Yup.string().required('Department is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  employmentType: Yup.string().required('Employment Type is required'),
  salary: Yup.number().positive('Salary must be positive').required('Salary is required'),

  // AdditionalInfo
  address: Yup.string().required('Address is required'),
  skills: Yup.string().required('Skills are required'),
  educationLevel: Yup.string().required('Education Level is required'),
});


export const withFormikValidation = (WrappedComponent) => {
    return function WithFormikValidation({ onSubmit, ...props }) {
      return (
        <Formik
          initialValues={props.formData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <WrappedComponent
                formData={values}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
                {...props}
              />
            </Form>
          )}
        </Formik>
      );
    };
  };