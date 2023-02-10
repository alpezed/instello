import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useProfile, useProfileMutation } from "../../../hooks/useProfile";

function AccountBasic() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data } = useProfile();
	const profileMutation = useProfileMutation(() => {
		setIsSubmitting(false);
		// toast.success("Profile Updated Successfully");
	});
	const { register, setValue, handleSubmit } = useForm();

	useEffect(() => {
		if (data) {
			Object.keys(data).forEach(field => setValue(field, data[field]));
		}
	}, [data, setValue]);

	const onSubmitProfile = data => {
		// toast.success("Updating profile...");
		setIsSubmitting(true);
		profileMutation.mutate(data);
	};

	return (
		<>
			<div>
				<h3 className='text-xl mb-2'> Basic</h3>
				<p> Lorem ipsum dolor sit amet nibh consectetuer adipiscing elit</p>
			</div>
			<div className='bg-white rounded-md lg:shadow-lg shadow col-span-2'>
				<form onSubmit={handleSubmit(onSubmitProfile)}>
					<div className='grid grid-cols-2 gap-3 lg:p-6 p-4'>
						<div>
							<label htmlFor='fistName'> First name</label>
							<input
								id='fistName'
								type='text'
								placeholder='Your name..'
								className='shadow-none bg-gray-100'
								{...register("firstName")}
							/>
						</div>
						<div>
							<label htmlFor='lastName'> Last name</label>
							<input
								id='lastName'
								type='text'
								placeholder='Your name..'
								className='shadow-none bg-gray-100'
								{...register("lastName")}
							/>
						</div>
						<div className='col-span-2'>
							<label htmlFor='email'> Email</label>
							<input
								type='email'
								id='email'
								placeholder='Your email..'
								className='shadow-none bg-gray-100'
								{...register("email")}
							/>
						</div>
						<div className='col-span-2'>
							<label htmlFor='about'>About me</label>
							<textarea
								id='about'
								rows={3}
								className='shadow-none bg-gray-100 p-[10px]'
								{...register("bio")}
							/>
						</div>
						<div className='col-span-2'>
							<label htmlFor='location'> Location</label>
							<input
								type='text'
								id='location'
								placeholder
								className='shadow-none bg-gray-100'
								{...register("location")}
							/>
						</div>
						<div>
							<label htmlFor='workingAt'> Working at</label>
							<input
								id='workingAt'
								type='text'
								placeholder
								className='shadow-none bg-gray-100'
								{...register("workingAt")}
							/>
						</div>
						<div>
							<label htmlFor='relationship'>Relationship</label>
							<select
								id='relationship'
								className='shadow-none bg-gray-100 px-[10px]'
								{...register("status")}
							>
								<option value='none'>None</option>
								<option value='single'>Single</option>
								<option value='in-relationship'>In a relationship</option>
								<option value='married'>Married</option>
								<option value='engaged'>Engaged</option>
							</select>
						</div>
					</div>
					<div className='bg-gray-10 p-6 pt-0 flex justify-end space-x-3'>
						<button
							type='button'
							className='p-2 px-4 rounded bg-gray-50 text-red-500'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className={`button bg-blue-700 ${
								isSubmitting ? "opacity-75" : ""
							}`}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default AccountBasic;
