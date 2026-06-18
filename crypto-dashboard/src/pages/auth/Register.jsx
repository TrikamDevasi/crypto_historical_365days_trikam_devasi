import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validators';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...registerData } = values;
        const result = await handleRegister(registerData);
        if (result.success) {
          showSuccess('Registration successful! Session authorized.');
          navigate('/dashboard');
        } else {
          showError(result.error || 'Registration failed');
        }
      } catch (err) {
        showError('A connection error occurred. Please try again.');
      }
    },
  });

  return (
    <Card className="p-8 border-t-[3px] border-accent-purple shadow-neon-purple/5 w-full">
      <div className="text-center mb-6">
        <h2 className="font-heading font-bold text-2xl text-white tracking-tight">System Register</h2>
        <p className="font-sans text-xs text-white/40 mt-1">
          Create credentials to register a new terminal access key
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          label="Operator Name"
          name="name"
          type="text"
          icon={PersonIcon}
          placeholder="Operator Name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
        />

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
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={LockIcon}
          placeholder="••••••••"
          autoComplete="new-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        {/* Role Selector */}
        <div className="space-y-1">
          <label className="text-xxs font-bold text-white/40 uppercase tracking-wider block">
            Authorization Level
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
              <ShieldIcon className="w-4 h-4" />
            </span>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:border-accent-purple/40 focus:bg-white/10 outline-none text-xs text-white transition-all font-sans appearance-none"
            >
              <option value="user" className="bg-bg-secondary text-white">Standard Operator (User)</option>
              <option value="admin" className="bg-bg-secondary text-white">System Admin (Admin)</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="success"
          className="w-full mt-4"
          loading={loading}
        >
          Register Terminal Signature
        </Button>
      </form>

      <div className="text-center mt-6 text-xs text-white/40">
        Already registered?   {' '}
        <Link to="/login" className="text-accent-cyan hover:text-accent-purple font-semibold transition-colors">
          Log in to terminal
        </Link>
      </div>
    </Card>
  );
};

export default Register;
