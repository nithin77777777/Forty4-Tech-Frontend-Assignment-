import React, { useState } from 'react';
import { Plus, X, User, Mail, Phone, MapPin, Building } from 'lucide-react';

const AddUserForm = ({ onAddUser, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    company: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Structure data to match JSONPlaceholder format
      const userData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: {
          city: formData.city.trim() || 'Unknown City'
        },
        company: {
          name: formData.company.trim() || 'No Company'
        }
      };

      await onAddUser(userData);
      
      // Reset form on success
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        city: '',
        company: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding user:', error);
      setErrors({ submit: 'Failed to add user. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: 'name', label: 'Full Name', icon: User, placeholder: 'Enter full name', required: true },
    { name: 'username', label: 'Username', icon: User, placeholder: 'Enter username', required: true },
    { name: 'email', label: 'Email', icon: Mail, placeholder: 'Enter email address', required: true, type: 'email' },
    { name: 'phone', label: 'Phone', icon: Phone, placeholder: 'Enter phone number', required: true },
    { name: 'city', label: 'City', icon: MapPin, placeholder: 'Enter city', required: false },
    { name: 'company', label: 'Company', icon: Building, placeholder: 'Enter company name', required: false }
  ];

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E6E6E6] dark:border-[#333333] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#111827] dark:text-white font-sora">
          Add New User
        </h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg transition-all duration-150 hover:bg-[#F3F4F6] dark:hover:bg-[#374151] active:bg-[#E5E7EB] dark:active:bg-[#4B5563] active:scale-95"
        >
          <X size={20} className="text-[#6B7280] dark:text-[#9CA3AF]" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.name} className={field.name === 'email' || field.name === 'phone' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-[#374151] dark:text-[#D1D5DB] mb-2 font-inter">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className={`w-full h-11 pl-10 pr-4 rounded-lg border transition-all duration-200 font-inter text-sm text-[#111827] dark:text-white placeholder-[#6B7280] dark:placeholder-[#9CA3AF] bg-white dark:bg-[#374151] ${
                      errors[field.name]
                        ? "border-red-500 dark:border-red-400 ring-2 ring-red-500/20"
                        : "border-[#D1D5DB] dark:border-[#4B5563] focus:border-[#4F46E5] dark:focus:border-[#6366F1] focus:ring-2 focus:ring-[#4F46E5]/20 dark:focus:ring-[#6366F1]/20"
                    }`}
                    disabled={isSubmitting || isLoading}
                  />
                  <Icon
                    size={16}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      errors[field.name]
                        ? "text-red-500 dark:text-red-400"
                        : "text-[#6B7280] dark:text-[#9CA3AF]"
                    }`}
                  />
                </div>
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-inter">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 font-inter">
              {errors.submit}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-gradient-to-b from-[#4F46E5] to-[#4338CA] text-white font-semibold text-sm transition-all duration-150 hover:from-[#5B51E8] hover:to-[#4F46E5] active:from-[#4338CA] active:to-[#3730A3] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding User...
              </>
            ) : (
              <>
                <Plus size={16} />
                Add User
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || isLoading}
            className="h-11 px-6 rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold text-sm transition-all duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#4B5563] active:bg-[#F3F4F6] dark:active:bg-[#6B7280] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;