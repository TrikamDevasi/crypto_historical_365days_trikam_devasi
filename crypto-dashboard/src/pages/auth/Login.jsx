import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validators';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target
  const from = location.state?.from?.pathname || '/dashboard';

  const handleDemoLogin = async () => {
    try {
      const result = await handleLogin({
        email: 'user@example.com',
        password: 'user123',
      });
      if (result.success) {
        showSuccess('Access granted. Welcome to terminal as operator!');
        navigate(from, { replace: true });
      } else {
        showError(result.error || 'Authentication failed');
      }
    } catch (err) {
      showError('A connection error occurred. Please try again.');
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
        const result = await handleLogin(values);
        if (result.success) {
          showSuccess('Access granted. Welcome back!');
          navigate(from, { replace: true });
        } else {
          showError(result.error || 'Authentication failed');
        }
      } catch (err) {
        showError('A connection error occurred. Please try again.');
      }
    },
  });

  return (
    <Card className="p-8 border-t-[3px] border-accent-cyan shadow-neon-cyan/5 w-full">
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-2xl text-white tracking-tight">System Login</h2>
        <p className="font-sans text-xs text-white/40 mt-1">
          Enter credentials to authenticate secure terminal session
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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

        <div className="flex justify-end text-xxs mt-1">
          <a href="#" className="text-accent-cyan hover:underline transition-all">
            Forgot authorization key?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4"
          loading={loading}
        >
          Authenticate Signature
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full mt-2.5"
          onClick={handleDemoLogin}
          disabled={loading}
        >
          Quick Guest Access
        </Button>
      </form>

      <div className="text-center mt-6 text-xs text-white/40">
        Unauthorized operator?{' '}
        <Link to="/register" className="text-accent-purple hover:text-accent-cyan font-semibold transition-colors">
          Register new terminal
        </Link>
      </div>
    </Card>
  );
};

export default Login;
