import { useState } from 'react';
import "./login.scss";
import { useNavigate } from 'react-router-dom';
import { logIn, register } from '../../api/authRequests';
import { toast } from 'react-toastify';
import { useInfoContext } from '../../context/context';

const Login = () => {
	const { setCurrentUser } = useInfoContext();
	const [loading, setLoading] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [confirmPass, setConfirmPass] = useState(true);
	const navigate = useNavigate();
	const handleSignup = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const password = formData.get("password");
		const confirmPassword = formData.get("confirmPassword");

		if (password !== confirmPassword) {
			setConfirmPass(false);
			toast.dismiss();
			toast.error("Password is not similar");
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			toast.loading("Please wait...");
			const res = await register(formData);
			const user = res.data.user;
			const token = res.data.token;
			setCurrentUser(user);
			localStorage.setItem("profile", JSON.stringify(user));
			localStorage.setItem("token", token);
			toast.dismiss();
			toast.success("You are welcome!");
			navigate(0);
		} catch (error) {
			toast.dismiss();
			toast.error(error.response?.data?.message || "Xatolik yuz berdi");
		} finally {
			setLoading(false);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			setLoading(true);
			toast.loading("Please wait...");
			const res = await logIn({ email, password });
			const user = res.data.user;
			const token = res.data.token;
			setCurrentUser(user);
			localStorage.setItem("profile", JSON.stringify(user));
			localStorage.setItem("token", token);
			toast.dismiss();
			toast.success("You are welcome!");
			navigate(0);
		} catch (error) {
			toast.dismiss();
			toast.error(error.response?.data?.message || "Xatolik yuz berdi");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='body'>
			<div className="main">
				<input
					type="checkbox"
					id="chk"
					aria-hidden="true"
					onChange={() => setIsSignup(prev => !prev)}
				/>

				<div className="signup">
					<form onSubmit={handleSignup}>
						<label htmlFor="chk" aria-hidden="true">Sign up</label>
						<input className='login-input' type="text" name="username" placeholder="User name" required />
						<input className='login-input' type="text" name="surname" placeholder="Surname" required />
						<input className='login-input' type="email" name="email" placeholder="Email" required />
						<input className='login-input' type="password" name="password" placeholder="Password" required />
						<input className='login-input' type="password" name="confirmPassword" placeholder="Confirm Password" required />
						<button className='login-btn' disabled={loading}>Sign up</button>
					</form>
				</div>

				<div className="login">
					<form onSubmit={handleLogin}>
						<label htmlFor="chk" aria-hidden="true">Login</label>
						<input className='login-input' type="email" name="email" placeholder="Email" required />
						<input className='login-input' type="password" name="password" placeholder="Password" required />
						<button className='login-btn' disabled={loading}>Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;