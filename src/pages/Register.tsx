import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userAPI } from '../features/users/userAPI';
import {  useNavigate } from 'react-router';
import { toast } from 'sonner';

type RegisterInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    password: string;
    confirmPassword: string;
};

const schema = yup.object({
    firstName: yup.string().max(50, 'Max 50 characters').required('First name is required'),
    lastName: yup.string().max(50, 'Max 50 characters').required('Last name is required'),
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    phoneNumber: yup.string().max(50, 'Max 50 characters').required('PhoneNumber is required'),
    address: yup.string().max(50, 'Max 100 characters').required('address is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

function Register() {

    const navigate = useNavigate();
    const [createCustomer, {isLoading}] = userAPI.useCreateCustomerMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<RegisterInputs> = async(data) => {
        const { ...userData } = data;
        console.log(userData);

        try {
            const response = await createCustomer(data).unwrap()
            console.log('Registration successful:', response);
            toast.success('Registration successful! Please check your email for verification code.');
             setTimeout(() => {
                navigate('/register/verify', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
            
            
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 ">
            <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
                <h1 className="text-3xl font-bold mb-6 text-center">Account Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        type="text"
                        {...register('firstName')}
                        placeholder="First Name"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.firstName && (
                        <span className=" text-red-700 text-sm">{errors.firstName.message}</span>
                    )}

                    <input
                        type="text"
                        {...register('lastName')}
                        placeholder="Last Name"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.lastName && (
                        <span className=" text-red-700 text-sm">{errors.lastName.message}</span>
                    )}

                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                        // readOnly={!!emailFromState}
                    />

                    {errors.email && (
                        <span className=" text-red-700 text-sm">{errors.email.message}</span>
                    )}
                      <input
                        type="number"
                        {...register('phoneNumber')}
                        placeholder="PhoneNumber"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.phoneNumber && (
                        <span className=" text-red-700 text-sm">{errors.phoneNumber.message}</span>
                    )}
                      <input
                        type="text"
                        {...register('address')}
                        placeholder="Address"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.address && (
                        <span className=" text-red-700 text-sm">{errors.address.message}</span>
                    )}

                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.password && (
                        <span className=" text-red-700 text-sm">{errors.password.message}</span>
                    )}

                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        className='input border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg '
                    />

                    {errors.confirmPassword && (
                        <span className=" text-red-700 text-sm">{errors.confirmPassword.message}</span>
                    )}

                    <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>
                       {isLoading ? (
                                <>
                                    <span className="loading loading-bars loading-xl" /> Registering...
                                </>
                            ) : "Register"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;