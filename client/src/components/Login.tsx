import Button from '@mui/material/Button'
export default function Login(){
	const submit = () => {

	}

	return (
		<div className="bg-slate-700 p-10 mx-auto max-w-xl max-h-xl">
			<p className='text-center m-10 text-cyan-500 text-xl'>Log In</p>

			<form id="loginForm" className="" action={submit}>
				<div className='w-full h-full flex-col mx-auto my-10 text-center'>
					<input className='w-60 h-10 bg-gray-500 my-1 rounded-xs' type="text" id="username" placeholder="Username" required/>
					<input className='w-60 h-10 bg-gray-500 my-1 rounded-xs' type="password" id="password" placeholder="Password" required/>
				</div>

				<div className='mx-auto w-fit max-w-xs'>
					<Button type="submit" className='text-cyan-500 bg-slate-700' variant="contained">
						Login
					</Button>
				</div>

				<p id="error" className="hidden">Invalid username or password.</p>

				<div className="login-links">
					<a href="forgot.html" className="forgot-link">Forgot Password?</a>

					<p className="signup-text">
					Don’t have an account?
					<a href="signup.html" className="mx-1 text-cyan-500">Sign Up</a>
				</p>
				</div>
			</form>
		</div>
	)
}
