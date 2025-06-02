import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>DentalMS - Clinic Management System</title>
                <meta name="description" content="Modern dental practice management software" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-teal-600">
                            DentalMS
                        </Link>

                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">
                                Features
                            </Link>
                            <Link href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors">
                                Pricing
                            </Link>
                            <Link href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                                Contact
                            </Link>
                            <Link
                                href="/login"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-teal-50 to-teal-100 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-6">
                            Modern Dental Practice Management
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Streamline your clinic operations with our all-in-one solution
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#demo"
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                            >
                                Request Demo
                            </Link>
                            <Link
                                href="#features"
                                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-bold py-3 px-8 rounded-lg transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-teal-600 mb-12">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-teal-600 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact" className="py-16 bg-teal-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Contact us today for a personalized demo
                        </p>
                        <form className="max-w-md mx-auto">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 rounded-lg text-gray-800"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-8 rounded-lg transition-colors w-full"
                            >
                                Request Demo
                            </button>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p>© {new Date().getFullYear()} DentalMS. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

// Data for features
const features = [
    {
        icon: '📅',
        title: 'Appointment Scheduling',
        description: 'Easily manage patient appointments with our intuitive calendar.'
    },
    {
        icon: '📁',
        title: 'Patient Records',
        description: 'Secure digital records accessible from anywhere.'
    },
    {
        icon: '💳',
        title: 'Billing & Invoicing',
        description: 'Automated billing and insurance claim processing.'
    },
    {
        icon: '📊',
        title: 'Analytics',
        description: 'Track practice performance with real-time dashboards.'
    },
    {
        icon: '🦷',
        title: 'Treatment Plans',
        description: 'Create and manage comprehensive treatment plans.'
    },
    {
        icon: '🔒',
        title: 'Security',
        description: 'HIPAA compliant data protection for patient privacy.'
    }
];