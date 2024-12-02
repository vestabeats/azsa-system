import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { setCredentials } from '../redux/slices/authSlice';
import Loading from '../components/Loading';

// Define the types for the form inputs
type FormValues = {
    passportnumber: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth); // Replace `any` with the correct type if available
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  

  // Redirect to dashboard if the user is logged in
 {/* useEffect(() => {
    user && navigate('/dashboard');
  }, [user, navigate]);*/}

  // Handle form submission
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await login(data).unwrap();
      console.log(result);
      if (result) {
        dispatch(setCredentials(result));
      }
      toast.success("login successfully", { className: 'toast-success' })
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Login failed', { className: 'toast-error' });
    }
  };

  

  return (
    <div className='w-full min-h-screen  flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
    <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
    <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
      <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
        Empowering Students, Shaping Futures!
        </span>
        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-green-700'>
          <span>AZSA</span>
          <span>Students-Portal</span>
        </p>

    
    <div className='cell'>
              <div className='circle rotate-in-up-left '>
             
              </div>
            </div>
      </div>
    </div>
    {/* right side */}
    <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
        <div className=''>
          <p className='text-green-600 text-3xl font-bold text-center'>
            Welcome back!
          </p>
          <p className='text-center text-base text-gray-700 '>
            Keep all your credential safe
          </p>
        </div>
        <div className='flex flex-col gap-y-5'>
          <Textbox
            placeholder='Enter your passport number'
            type='text'
            name='passportnumber'
            label='Passport Number'
            className='w-full rounded-full'
            register={register("passportnumber", {
              required: "Passport Number Address is required!",
            })}
            error={errors.passportnumber ? errors.passportnumber.message : ""}
          />
          <Textbox
            placeholder='Enter your password'
            type='password'
            name='password'
            label='Password'
            className='w-full rounded-full'
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          

          {isLoading ? <Loading/> :<Button
            type='submit'
            label='Submit'
            className='w-full h-10 bg-green-700 text-white rounded-full hover:bg-green-600'
          />}
        </div>
        </form>
    </div>

    </div>
</div>
  );
};

export default Login;
