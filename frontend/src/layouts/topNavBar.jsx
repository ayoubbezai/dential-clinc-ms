import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/Auth/useAuth';
const TopNavBar = ({ theme, toggleTheme }) => {
    const { t, i18n } = useTranslation('common');
    const { user } = useAuth();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-2 flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t('welcome')}, Dr. {user?.name}
            </div>

            <div className="flex items-center gap-4">
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    title={t('toggle_theme')}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Language dropdown */}
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <Globe size={20} className="text-gray-600 dark:text-gray-300" />
                        <select
                            onChange={handleLanguageChange}
                            value={i18n.language}
                            className="bg-transparent text-sm text-gray-800 dark:text-gray-100 border-none focus:outline-none"
                        >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
