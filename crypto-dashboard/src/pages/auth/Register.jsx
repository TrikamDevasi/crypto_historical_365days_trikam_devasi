import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validators';
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
        await handleRegister(registerData);
        showSuccess('Registration successful! Session authorized.');
        navigate('/dashboard');
      } catch (err) {
        showError(typeof err === 'string' ? err : 'Registration failed. Please try again.');
      }
    },
  });

  return (
    <div className="glass-panel p-10 sm:p-12 border-t-[4px] border-accent shadow-neon-primary relative overflow-hidden w-full max-w-md mx-auto rounded-3xl">
      {/* Background glow effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="text-center mb-8 relative z-10">
        <h2 className="font-heading font-bold text-3xl text-white tracking-tight drop-shadow-md">System Register</h2>
        <p className="font-sans text-sm text-white/50 mt-2">
          Create credentials to register a new terminal access key
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5 relative z-10">
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
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider block">
            Authorization Level
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
              <ShieldIcon className="w-5 h-5" />
            </span>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-secondary border border-border-color focus:border-accent/80 focus:ring-2 focus:ring-accent/20 outline-none text-sm text-white transition-all font-sans appearance-none shadow-inner"
            >
              <option value="user" className="bg-bg-secondary text-white">Standard Operator (User)</option>
              <option value="admin" className="bg-bg-secondary text-white">System Admin (Admin)</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="success"
            className="w-full py-3 text-base shadow-neon-green/20"
            loading={loading}
          >
            Register Terminal Signature
          </Button>
        </div>
      </form>

      <div className="text-center mt-8 text-sm text-white/50 relative z-10 border-t border-white/5 pt-6">
        Already registered?   {' '}
        <Link to="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
          Log in to terminal
        </Link>
      </div>
    </div>
  );
};

export default Register;
