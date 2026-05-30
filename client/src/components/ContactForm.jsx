
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Basic validation rules
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when user types
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // try {
    //   const response = await fetch('https://she-can-backend-wexr.onrender.com/, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();
    try {
  const response = await fetch('https://she-can-backend-wexr.onrender.com/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  }); // <-- Pehle }, fir ) aur fir ;

  const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setSubmitStatus(data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus('Failed to connect to server. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

z
  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100/80 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-xl text-emerald-600 mb-3 font-semibold text-xl">
            🌱
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">She Can Foundation</h2>
          <p className="text-sm text-slate-500 mt-1">We'd love to hear from you. Let's get in touch!</p>
        </div>

        {/* Success Banner */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-center font-medium animate-fade-in animate-duration-300">
            ✨ Form Submitted Successfully! Thank you.
          </div>
        )}

        {/* Error Banner */}
        {submitStatus && submitStatus !== 'success' && (
          <div className="mb-6 p-4 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl text-center font-medium">
            ⚠️ {submitStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-700 outline-none transition-all duration-200 ${
                errors.name 
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-50' 
                  : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-700 outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-50' 
                  : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">{errors.email}</p>}
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">Your Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-700 outline-none transition-all duration-200 resize-none ${
                errors.message 
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-50' 
                  : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
              }`}
              placeholder="Tell us how we can help..."
            />
            {errors.message && <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm tracking-wide shadow-lg shadow-slate-900/10 transition-all duration-200 active:scale-[0.99] disabled:bg-slate-300 disabled:shadow-none disabled:scale-100 cursor-pointer mt-2"
          >
            {isSubmitting ? 'Sending Request...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}; // <-- This closing bracket was missing!

export default ContactForm;