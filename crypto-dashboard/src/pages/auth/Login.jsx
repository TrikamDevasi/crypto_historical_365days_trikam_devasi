import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import useAuth from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validators';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const { handleLogin, handleGoogleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target
  const from = location.state?.from?.pathname || '/dashboard';

  const handleDemoLogin = async () => {
    try {
      await handleLogin({
        email: 'user@example.com',
        password: 'user123',
      });
      showSuccess('Access granted. Welcome to terminal as operator!');
      navigate(from, { replace: true });
    } catch (err) {
      showError(typeof err === 'string' ? err : 'A connection error occurred. Please try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
        showSuccess('Access granted. Welcome back!');
        navigate(from, { replace: true });
      } catch (err) {
        showError(typeof err === 'string' ? err : 'Authentication failed. Please verify your credentials.');
      }
    },
  });

  return (
    <div className="glass-panel p-10 sm:p-12 border-t-[4px] border-primary shadow-neon-primary relative overflow-hidden w-full max-w-md mx-auto rounded-3xl">
      {/* Background glow effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="text-center mb-8 relative z-10">
        <h2 className="font-heading font-bold text-3xl text-white tracking-tight drop-shadow-md">System Login</h2>
        <p className="font-sans text-sm text-white/50 mt-2">
          Enter credentials to authenticate secure terminal session
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5 relative z-10">
        <Input
          label="Email Address"
          name="email"
          type="email"
          icon={EmailIcon}
          placeholder="operator@system.io"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
        />

        <Input
          label="Security Password"
          name="password"
          type="password"
          icon={LockIcon}
          placeholder="••••••••"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="flex justify-end text-xs mt-1">
          <a href="#" className="text-primary hover:text-primary-hover hover:underline transition-all">
            Forgot authorization key?
          </a>
        </div>

        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-base shadow-neon-primary/20"
            loading={loading}
          >
            Authenticate Signature
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full py-3 text-base"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Quick Guest Access
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-white/40 text-xs">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  await handleGoogleLogin(credentialResponse.credential);
                  showSuccess('Access granted via Google. Welcome!');
                  navigate(from, { replace: true });
                } catch (err) {
                  showError(typeof err === 'string' ? err : 'Google authentication failed.');
                }
              }}
              onError={() => {
                showError('Google Login Failed');
              }}
              theme="filled_black"
              size="large"
              shape="pill"
            />
          </div>
        </div>
      </form>

      <div className="text-center mt-8 text-sm text-white/50 relative z-10 border-t border-white/5 pt-6">
        Unauthorized operator?{' '}
        <Link to="/register" className="text-accent hover:text-primary font-semibold transition-colors">
          Register new terminal
        </Link>
      </div>
    </div>
  );
};

export default Login;
