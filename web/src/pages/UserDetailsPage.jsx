import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Building, Globe, CreditCard, AlertCircle } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { userService } from '../api/userService';
import Header from '../components/Header';

const UserDetailsPage = ({ userId, onNavigateBack }) => {
  const { getUserById } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        // First try to get user from context (for locally added users)
        let userData = getUserById(userId);

        // If not found locally, fetch from API
        if (!userData) {
          userData = await userService.fetchUserById(userId);
        }

        setUser(userData);
      } catch (err) {
        console.error('Error loading user details:', err);
        setError('Failed to load user details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [userId, getUserById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
        <Header 
          title="User Details" 
          showSearch={false}
          showBackButton={true}
          onBackClick={onNavigateBack}
        />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-2 font-sora">
              Loading User Details
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter">
              Fetching user information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
        <Header 
          title="User Details" 
          showSearch={false}
          showBackButton={true}
          onBackClick={onNavigateBack}
        />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-20">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-2 font-sora">
              User Not Found
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter mb-4">
              {error || 'The requested user could not be found.'}
            </p>
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors duration-150 font-inter mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E6E6E6] dark:border-[#333333] p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827] dark:text-white font-sora">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  const DetailRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] transition-colors duration-150">
      {Icon && <Icon size={16} className="text-[#6B7280] dark:text-[#9CA3AF] flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB] font-inter">
          {label}
        </p>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-inter truncate">
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
      <Header 
        title="User Details" 
        showSearch={false}
        showBackButton={true}
        onBackClick={onNavigateBack}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* User Profile Header */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E6E6E6] dark:border-[#333333] p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#111827] dark:text-white mb-2 font-sora">
                {user.name}
              </h1>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] font-inter mb-2">
                @{user.username}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#312E81] text-[#4338CA] dark:text-[#A5B4FC] text-sm font-medium font-inter">
                  ID: {user.id}
                </span>
                {user.company?.name && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F0FDF4] dark:bg-[#14532D] text-[#166534] dark:text-[#BBF7D0] text-sm font-medium font-inter">
                    {user.company.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <InfoCard icon={Mail} title="Contact Information">
            <div className="space-y-1">
              <DetailRow label="Email Address" value={user.email} icon={Mail} />
              <DetailRow label="Phone Number" value={user.phone} icon={Phone} />
              {user.website && (
                <DetailRow label="Website" value={user.website} icon={Globe} />
              )}
            </div>
          </InfoCard>

          {/* Address Information */}
          <InfoCard icon={MapPin} title="Address Information">
            <div className="space-y-1">
              {user.address && (
                <>
                  <DetailRow label="Street" value={user.address.street} />
                  <DetailRow label="Suite" value={user.address.suite} />
                  <DetailRow label="City" value={user.address.city} icon={MapPin} />
                  <DetailRow label="Zipcode" value={user.address.zipcode} />
                </>
              )}
            </div>
          </InfoCard>

          {/* Company Information */}
          <InfoCard icon={Building} title="Company Information">
            <div className="space-y-1">
              {user.company && (
                <>
                  <DetailRow label="Company Name" value={user.company.name} icon={Building} />
                  <DetailRow label="Catchphrase" value={user.company.catchPhrase} />
                  <DetailRow label="Business" value={user.company.bs} />
                </>
              )}
            </div>
          </InfoCard>

          {/* Additional Information */}
          <InfoCard icon={CreditCard} title="Additional Information">
            <div className="space-y-1">
              <DetailRow label="User ID" value={user.id} />
              <DetailRow label="Username" value={user.username} icon={User} />
              {user.website && (
                <DetailRow label="Website" value={user.website} icon={Globe} />
              )}
            </div>
          </InfoCard>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-lg transition-all duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] hover:border-[#D1D5DB] dark:hover:border-[#505050] active:scale-[0.99] mx-auto font-inter"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;