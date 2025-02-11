import { Form, Formik } from 'formik';
import React from 'react'
import ReusableInput from '../reusables/ReusableInput';
import SubmitBtn from '../reusables/SubmitBtn';

const useFormHook = (formProps) => {
    const {initialValues,onSubmit,validationSchema,formData,title} = formProps;
  return (
    <div className='formContainer makeCenter'>
    <h1 className='title'>{title}</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
              {
                formData?.map((e)=>(
                  <ReusableInput
                  key={e.id}
                  name={e.name}
                  placeholder={e.placeholder}
                  type={e.type}
                  />
                ))
              }
              <SubmitBtn
                text='Submit'
                handleClick={()=>{}}
                type='submit'
                />
            </Form>
      </Formik>
    </div>
  )
}

export default useFormHook;
