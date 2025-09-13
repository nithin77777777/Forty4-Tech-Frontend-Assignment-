import React, { useState } from 'react';
import { Search, Users, ArrowLeft } from 'lucide-react';

const Header = ({ 
  title = "User Dashboard", 
  searchValue = "", 
  onSearchChange = () => {}, 
  showSearch = true,
  showBackButton = false,
  onBackClick = () => {}
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border-b border-[#E5E7EB] dark:border-[#374151] px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button and title */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="p-2 rounded-lg transition-all duration-150 hover:bg-[#F3F4F6] dark:hover:bg-[#374151] active:bg-[#E5E7EB] dark:active:bg-[#4B5563] active:scale-95"
            >
              <ArrowLeft size={20} className="text-[#6B7280] dark:text-[#9CA3AF]" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white font-sora">
              {title}
            </h1>
          </div>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-64 h-10 pl-10 pr-4 rounded-lg border transition-all duration-200 font-inter text-sm text-[#111827] dark:text-white placeholder-[#6B7280] dark:placeholder-[#9CA3AF] bg-white dark:bg-[#374151] ${
                  isSearchFocused
                    ? "border-[#4F46E5] dark:border-[#6366F1] ring-2 ring-[#4F46E5]/20 dark:ring-[#6366F1]/20"
                    : "border-[#D1D5DB] dark:border-[#4B5563] hover:border-[#9CA3AF] dark:hover:border-[#6B7280]"
                }`}
              />
              <Search
                size={16}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                  isSearchFocused
                    ? "text-[#4F46E5] dark:text-[#6366F1]"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              />

              {/* Search results indicator */}
              {searchValue && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-[#10B981] dark:bg-[#34D399] rounded-full animate-pulse" />
                </div>
              )}
            </div>
          )}

          {/* User count badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#374151] text-sm font-medium text-[#4B5563] dark:text-[#D1D5DB] font-inter">
            <div className="w-2 h-2 bg-[#10B981] dark:bg-[#34D399] rounded-full" />
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;