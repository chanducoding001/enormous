import React from 'react'
import * as Yup from 'yup';
import { registerFormData } from './authUtils';
import useFormHook from '../hooks/useFormHook';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    name:'',
    email:'',
    password:''
  };
  const onSubmit = async (values) => {
    console.log(values);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_AUTH_TAIL_URL}${import.meta.env.VITE_REGISTER_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 🛠 Important: Set content type
                },
                body: JSON.stringify(values),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text(); // 🛠 Get error message from server
            console.log("Registration failed:", errorMessage);
            return;
        }

        console.log("✅ Registration successful");
        navigate("/login"); // Redirect to login page

    } catch (error) {
        console.error("❌ Network error:", error);
    }
};

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email format').required('Email is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
  });

  
  return (
    <div className='container makeCenter'>
      {
        useFormHook({
          initialValues,
          onSubmit,
          validationSchema,
          formData:registerFormData,
          title:'Register Page'
        })
      }
    </div>
  )
}

export default RegisterPage;
