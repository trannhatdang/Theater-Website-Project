export default function Register(){
	return (
		<div className="signup-container">
			<h2>Create Account</h2>

			<form id="signupForm" className="signup-form">
				<input type="text" id="newUsername" placeholder="Username" required/>
				<input type="password" id="newPassword" placeholder="Password" required/>
				<input type="password" id="confirmPassword" placeholder="Confirm Password" required/>

				<button type="submit">Sign Up</button>

				<p id="signupError" className="msg error-msg"></p>
				<p id="signupSuccess" className="msg success-msg"></p>
			</form>

			<p className="login-option">
			Already have an account?
				<a href="login.html">Log in</a>
			</p>
		</div>
	)

}
