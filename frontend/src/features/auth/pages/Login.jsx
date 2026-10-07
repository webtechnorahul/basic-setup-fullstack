import { useState } from 'react';
import '../styles/Login.css'; // Importing normal CSS file
import { useAuth } from '../hooks/useAuth';
import Loading from '../../../app/shared/components/Loading';
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {loading,Login,error,setError}=useAuth();
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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const user=await Login({email:formData.email,password:formData.password});
      if (user) {
        navigate('/dashboard');
      }
    }
  };
  if(loading){
    return <Loading/>
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to manage your account.</p>
        {error && <div className="error-alert" role="alert" aria-live="assertive">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="name@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password" className="forgot-link">Forgot?</a>
            </div>
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

          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>

        <p className="redirect-text">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
