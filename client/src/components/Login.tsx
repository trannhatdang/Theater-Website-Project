import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
export default function Login(){
	const submit = () => {

	}

	return (

		<Container className=" mx-auto max-w-xl max-h-xl">
			<Paper elevation={1} className='bg-slate-700 p-10'>
				<Typography component='h1' variant='h5' className='text-center m-10 text-cyan-500'>Log In</Typography>

				<Box id="loginForm" className="m-1" onSubmit={submit}>
					<div className='w-full h-full flex-col mx-auto text-center'>
						<TextField className='my-2' placeholder="Username" variant="outlined" fullWidth required autoFocus/>
						<TextField className='my-2' placeholder="Password" variant="outlined" fullWidth required />
					</div>
					<Button type="submit" className='text-white bg-sky-700 mt-1' variant="contained" fullWidth>
						Login
					</Button>

					<Typography id="error" className="hidden">Invalid username or password.</Typography>
					<div className="mt-10">
						<a href="forgot.html" className="forgot-link">Forgot Password?</a>

						<p className="signup-text">
						Don’t have an account?
						<a href="signup.html" className="mx-1 text-cyan-500">Sign Up</a>
					</p>
					</div>
				</Box>
			</Paper>
		</Container>
	)
}
