import { useState } from 'react';
import '../styles/Register.css'; // Importing normal CSS file
import { useAuth } from '../hooks/useAuth';
import Loading from '../../../app/shared/components/Loading';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {loading,error,Register,setError}=useAuth()
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (error) {
      setError(null);
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.FullName.trim()) newErrors.FullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const user=await Register({
        fullName:formData.FullName,
        email:formData.email,
        password:formData.password
      })
      if (user) {
        navigate('/dashboard');
      }
    }
  };

  if(loading){
      return <Loading/>
    }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Sign up to get started today.</p>
        {error && <div className="error-alert" role="alert" aria-live="assertive">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="FullName"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              className={errors.FullName ? 'input-error' : ''}
              placeholder="Enter your username"
            />
            {errors.FullName && <span className="error-text">{errors.FullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              className={errors.email ? 'input-error' : ''}
              placeholder="name@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        <p className="redirect-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
