import { useFormik } from 'formik';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { profileSchema, changePasswordSchema, getPasswordStrength, PASSWORD_STRENGTH_LABELS, PASSWORD_STRENGTH_COLORS } from '../../utils/validators';

import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

const Profile = () => {
  const { user, handleUpdateProfile, handleChangePassword, loading } = useAuth();
  const [passStrength, setPassStrength] = useState(0);

  const profileForm = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        await handleUpdateProfile(values);
        showSuccess('Profile updated successfully');
      } catch (err) {
        showError(err || 'Failed to update profile');
      }
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleChangePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        showSuccess('Password updated successfully');
        resetForm();
        setPassStrength(0);
      } catch (err) {
        showError(err || 'Failed to update password');
      }
    },
  });

  const handlePasswordChange = (e) => {
    passwordForm.handleChange(e);
    if (e.target.name === 'newPassword') {
      setPassStrength(getPasswordStrength(e.target.value));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Operator Badge */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="p-6 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple p-[2px] mx-auto shadow-neon-cyan/20">
            <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center text-white text-2xl font-bold font-sans">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-white">{user?.name}</h3>
            <span className="text-xxs text-white/40 block mt-0.5">{user?.email}</span>
            <div className="mt-3 flex justify-center">
              <Badge variant={user?.role === 'admin' ? 'purple' : 'info'}>
                Clearance: {user?.role?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <hr className="border-white/5" />

          <div className="text-left text-xxs space-y-2 text-white/60">
            <div className="flex justify-between">
              <span className="font-sans">Security Clearance</span>
              <span className="font-mono text-white capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Account Status</span>
              <span className="font-mono text-accent-green font-bold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Auth Node Signature</span>
              <span className="font-mono text-white truncate max-w-[150px]">{user?._id}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column: Profile forms */}
      <div className="lg:col-span-8 space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <h3 className="font-heading font-bold text-sm text-white mb-4">Operator Configuration</h3>
          
          <form onSubmit={profileForm.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                icon={PersonIcon}
                value={profileForm.values.name}
                onChange={profileForm.handleChange}
                error={profileForm.touched.name && profileForm.errors.name}
              />

              <Input
                label="Email Terminal"
                name="email"
                type="email"
                icon={EmailIcon}
                disabled
                value={profileForm.values.email}
                error={profileForm.touched.email && profileForm.errors.email}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary" loading={loading}>
                Update Configuration
              </Button>
            </div>
          </form>
        </Card>

        {/* Change Password Card */}
        <Card className="p-6">
          <h3 className="font-heading font-bold text-sm text-white mb-4">Modify Encryption Key</h3>
          
          <form onSubmit={passwordForm.handleSubmit} className="space-y-4">
            <Input
              label="Current Password"
              name="oldPassword"
              type="password"
              icon={LockIcon}
              value={passwordForm.values.oldPassword}
              onChange={passwordForm.handleChange}
              error={passwordForm.touched.oldPassword && passwordForm.errors.oldPassword}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="New Encryption Key"
                name="newPassword"
                type="password"
                icon={LockIcon}
                value={passwordForm.values.newPassword}
                onChange={handlePasswordChange}
                error={passwordForm.touched.newPassword && passwordForm.errors.newPassword}
              />

              <Input
                label="Confirm New Key"
                name="confirmNewPassword"
                type="password"
                icon={LockIcon}
                value={passwordForm.values.confirmNewPassword}
                onChange={passwordForm.handleChange}
                error={passwordForm.touched.confirmNewPassword && passwordForm.errors.confirmNewPassword}
              />
            </div>

            {/* Password strength indicator */}
            {passwordForm.values.newPassword && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xxs font-mono">
                  <span className="text-white/40">Key Strength:</span>
                  <span style={{ color: PASSWORD_STRENGTH_COLORS[passStrength] }}>
                    {PASSWORD_STRENGTH_LABELS[passStrength]}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className="h-full flex-1 transition-colors"
                      style={{
                        backgroundColor: step <= passStrength ? PASSWORD_STRENGTH_COLORS[passStrength] : 'rgba(255,255,255,0.05)'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="purple" loading={loading}>
                Update Encryption Key
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
