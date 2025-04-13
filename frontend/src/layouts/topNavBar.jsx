import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';

const TopNavBar = ({ user, theme, toggleTheme, changeLanguage }) => {
    return (
        <div className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-2 flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Welcome, Dr. {user?.name || "User"}
            </div>

            <div className="flex items-center gap-4">
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Toggle Theme"
                >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Language switch */}
                <button
                    onClick={changeLanguage}
                    className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Change Language"
                >
                    <Globe size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopNavBar;
