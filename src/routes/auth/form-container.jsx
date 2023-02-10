import { Navigate } from "react-router-dom";

import { isAuth } from "../../utils/auth";

function FormContainer({ title, description, children }) {
	if (isAuth()) {
		return <Navigate to='/feed' />;
	}

	return (
		<div className='lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-'>
			<h1 className='lg:text-3xl text-xl font-semibold  mb-6'>{title}</h1>
			<p className='mb-2 text-black text-lg'>{description}</p>
			{children}
		</div>
	);
}
export default FormContainer;
