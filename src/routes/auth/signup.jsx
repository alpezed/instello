import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../utils/axios";
import FormContainer from "./form-container";

function Signup() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async formData => {
		try {
			await axios.post("/auth/signup", formData);
			toast.success("Successfully sign up!");
			navigate("/login");
		} catch (error) {
			if (error?.response?.data?.error?.code === 11000) {
				toast.error("User already exists!");
				return;
			}
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<FormContainer
			title='Sign Up'
			description='Register to manage your account'
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex lg:flex-row flex-col lg:space-x-2'>
					<input
						type='text'
						placeholder='First Name'
						className='bg-gray-200 mb-2 shadow-none  dark:bg-gray-800'
						style={{ border: "1px solid #d3d5d8 !important" }}
						{...register("firstName", { required: true })}
					/>
					{errors.firstName && (
						<p className='uk-form-group uk-form-danger'>
							This field is required
						</p>
					)}
					<input
						type='text'
						placeholder='Last Name'
						className='bg-gray-200 mb-2 shadow-none  dark:bg-gray-800'
						style={{ border: "1px solid #d3d5d8 !important" }}
						{...register("lastName", { required: true })}
					/>
					{errors.lastName && (
						<p className='uk-form-group uk-form-danger'>
							This field is required
						</p>
					)}
				</div>
				<input
					type='text'
					placeholder='Email'
					className='bg-gray-200 mb-2 shadow-none  dark:bg-gray-800'
					style={{ border: "1px solid #d3d5d8 !important" }}
					{...register("email", { required: true })}
				/>
				{errors.email && (
					<p className='uk-form-group uk-form-danger'>This field is required</p>
				)}
				<input
					type='password'
					placeholder='Password'
					className='bg-gray-200 mb-2 shadow-none  dark:bg-gray-800'
					style={{ border: "1px solid #d3d5d8 !important" }}
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<p className='uk-form-group uk-form-danger'>This field is required</p>
				)}
				<input
					type='password'
					placeholder='Confirm Password'
					className='bg-gray-200 mb-2 shadow-none  dark:bg-gray-800'
					style={{ border: "1px solid #d3d5d8 !important" }}
					{...register("passwordConfirm", { required: true })}
				/>
				{errors.passwordConfirm && (
					<p className='uk-form-group uk-form-danger'>This field is required</p>
				)}
				<div className='flex justify-start my-4 space-x-1'>
					<div className='checkbox'>
						<input type='checkbox' id='agree' />
						<label htmlFor='agree'>
							<span className='checkbox-icon' /> I Agree
						</label>
					</div>
					<Link to='/terms-condition'> Terms and Conditions</Link>
				</div>
				<button
					type='submit'
					className='bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full'
				>
					Login
				</button>
				<div className='text-center mt-5 space-x-2'>
					<p className='text-base'>
						Do you have an account? <Link to='/login'> Login </Link>
					</p>
				</div>
			</form>
		</FormContainer>
	);
}

export default Signup;
