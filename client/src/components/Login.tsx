import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Login() {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login
  };

  return (
    <Container className="flex justify-center items-center min-h-screen">
      <Paper elevation={6} className="bg-slate-800 p-12 w-full max-w-md">
        <Typography
          component="h1"
          variant="h4"
          className="text-center mb-8 font-bold text-cyan-400"
        >
          Log In
        </Typography>

        <Box
          component="form"
          id="loginForm"
          className="flex flex-col gap-4"
          onSubmit={submit}
        >
          <TextField
            placeholder="Username"
            variant="outlined"
            fullWidth
            required
            autoFocus
            InputProps={{ className: "bg-white rounded" }}
          />
          <TextField
            placeholder="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            InputProps={{ className: "bg-white rounded" }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold mt-2"
          >
            Login
          </Button>

          <Typography
            id="error"
            className="text-red-500 text-center mt-2 hidden"
          >
            Invalid username or password.
          </Typography>

          <div className="flex flex-col items-center mt-4 text-white">
            <a href="forgot.html" className="text-cyan-300 hover:underline mb-2">
              Forgot Password?
            </a>
            <p>
              Don’t have an account?{' '}
              <a href="signup.html" className="text-cyan-400 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}