import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const UserCard = ({ user, onClick }) => {
  if (!user) return null;

  return (
    <div 
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E6E6E6] dark:border-[#333333] p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[#D1D5DB] dark:hover:border-[#505050] active:scale-[0.99] group"
      onClick={onClick}
    >
      {/* User Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 group-hover:scale-110">
          {user.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-1 font-bricolage truncate">
          {user.name}
        </h3>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-inter">
          @{user.username}
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#D1D5DB] group/item hover:text-[#111827] dark:hover:text-white transition-colors duration-150">
          <Mail size={16} className="text-[#6B7280] dark:text-[#9CA3AF] group-hover/item:text-[#4F46E5] dark:group-hover/item:text-[#818CF8] transition-colors duration-150 flex-shrink-0" />
          <span className="font-inter truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#D1D5DB] group/item hover:text-[#111827] dark:hover:text-white transition-colors duration-150">
          <Phone size={16} className="text-[#6B7280] dark:text-[#9CA3AF] group-hover/item:text-[#10B981] dark:group-hover/item:text-[#34D399] transition-colors duration-150 flex-shrink-0" />
          <span className="font-inter truncate">{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#D1D5DB] group/item hover:text-[#111827] dark:hover:text-white transition-colors duration-150">
          <MapPin size={16} className="text-[#6B7280] dark:text-[#9CA3AF] group-hover/item:text-[#F59E0B] dark:group-hover/item:text-[#FBBF24] transition-colors duration-150 flex-shrink-0" />
          <span className="font-inter truncate">{user.address?.city || 'Unknown City'}</span>
        </div>
      </div>

      {/* Company Badge */}
      {user.company?.name && (
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-[#374151]">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#312E81] text-[#4338CA] dark:text-[#A5B4FC] text-xs font-medium font-inter">
            {user.company.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;