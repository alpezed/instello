import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import axios from "../../utils/axios";
import FormContainer from "./form-container";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async formData => {
		try {
			const { data } = await axios.post("/auth/login", formData);
			localStorage.setItem("token", data.token);
			localStorage.setItem("userInfo", JSON.stringify(data.data.user));
			localStorage.setItem("userId", data.data.user.id);
			toast.success("Successfully logged in!");
			window.location.href = "/feed";
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<FormContainer title='Login' description='Email or Username'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("email", { required: true })}
					type='text'
					placeholder='example@mydomain.com'
					className='bg-gray-200 mb-2 shadow-none dark:bg-gray-800'
					style={{ border: "1px solid #d3d5d8 !important" }}
				/>
				{errors.email && (
					<p className='uk-form-group uk-form-danger'>Email is required</p>
				)}
				<input
					{...register("password", { required: true })}
					type='password'
					placeholder='***********'
					className='bg-gray-200 mb-2 shadow-none dark:bg-gray-800'
					style={{ border: "1px solid #d3d5d8 !important" }}
				/>
				{errors.password && (
					<p className='uk-form-group uk-form-danger'>Password is required</p>
				)}
				<div className='flex justify-between my-4'>
					<div className='checkbox'>
						<input type='checkbox' id='remember' />
						<label htmlFor='remember'>
							<span className='checkbox-icon' />
							Remember Me
						</label>
					</div>
					<Link to='/forgot'>Forgot Your Password?</Link>
				</div>
				<button
					type='submit'
					className='bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full'
				>
					Login
				</button>
				<div className='text-center mt-5 space-x-2'>
					<p className='text-base'>
						Not registered?{" "}
						<Link to='/register' className>
							Create a account{" "}
						</Link>
					</p>
				</div>
			</form>
		</FormContainer>
	);
}

export default Login;
