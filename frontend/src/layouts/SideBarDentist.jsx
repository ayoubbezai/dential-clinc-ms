import React, { useState, useCallback, lazy, Suspense } from 'react';
import { MdMenu, MdMenuOpen, MdLogout } from "react-icons/md";
import LogoImg from '../assets/logos/logo_1-removebg-preview.webp';
import { Button } from '@/components/designSystem/button';
import { useAuth } from '@/hooks/Auth/useAuth';
import { useTranslation } from 'react-i18next';

const SideBarLinks = lazy(() => import('@/components/sideBar/SideBarLinksDentist'));

const SideBarDentist = () => {
    const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
    const { logout } = useAuth();
    const { t } = useTranslation("sidebar");

    const toggleSidebar = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            {/* Mobile overlay when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <div className={`
                ${isOpen ? "w-56" : "w-20"} 
                bg-white/70 
                max-h-screen 
                overflow-y-auto 
                z-50 
                min-h-screen 
                flex 
                flex-col 
                justify-between 
                transition-all 
                duration-300 
                fixed lg:relative
                shadow-lg
                ${isOpen ? 'left-0' : '-left-16 lg:left-0'} // Handles mobile positioning
            `}>
                <div className='flex justify-center flex-col items-center relative pb-1 pt-3'>
                    <button
                        className={`absolute top-4 ${!isOpen ? "right-6" : "right-4"} bg-gray-100 p-1 rounded-full hover:bg-gray-200 transition-colors`}
                        onClick={toggleSidebar}
                        aria-label={t('sidebar.toggle')}
                    >
                        {isOpen ? <MdMenuOpen size={20} className="text-gray-600" /> : <MdMenu size={20} className="text-gray-600" />}
                    </button>

                    {isOpen ? (
                        <>
                            <div className="flex flex-col items-center mb-3 flex-shrink-0">
                                <img src={LogoImg} alt="logo" width="56" height="56" className="object-contain" loading="eager" />
                                <h1 className='uppercase text-black font-semibold text-[18px]'>
                                    <span className='text-[#3E7EA1]'>Dr</span> Chebaani
                                </h1>
                            </div>
                            <Suspense fallback={<p>{t('loadingLinks')}</p>}>
                                <SideBarLinks isOpen={isOpen} />
                            </Suspense>
                        </>
                    ) : (
                        <div className="flex flex-col items-center mt-8">
                            <img src={LogoImg} alt="logo" width="40" height="40" className="object-contain mb-6" loading="eager" />
                            <Suspense fallback={<p>{t('loadingLinks')}</p>}>
                                <SideBarLinks isOpen={isOpen} />
                            </Suspense>
                        </div>
                    )}
                </div>

                {isOpen ? (
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 text-blue-600 text-sm py-2 mb-6 mx-auto hover:bg-blue-50 transition-colors"
                        onClick={logout}
                        aria-label={t('logout')}
                    >
                        <MdLogout size={16} />
                        {t('logout')}
                    </Button>
                ) : (
                    <button
                        onClick={logout}
                        className="flex items-center justify-center mb-6 mx-auto p-2 text-blue-500 hover:bg-red-50 rounded-full transition-colors"
                        title={t('sidebar.logout')}
                        aria-label={t('sidebar.logout')}
                    >
                        <MdLogout size={20} />
                    </button>
                )}
            </div>
        </>
    );
};

export default SideBarDentist;