import LoginImage from "../../assets/images/auth/katarzyna-zygnerska-8MMRENQwM6g-unsplash.jpg";
import logo from "../../assets/logos/logo_2-removebg-preview.png";
import { useLogin } from "../../hooks/Auth/useLogin";
import LoadingButton from "@/components/small/LoadingButton";
import { PasswordInput } from "@/components/small/PasswordInput";
import { Input } from "@/components/designSystem/input";
import { Label } from "@/components/designSystem/label";

const Login = () => {
    const {
        emailRef,
        passwordRef,
        handleSubmitLogin,
        showPassword,
        setShowPassword,
        loading,
        error,
        message,
    } = useLogin();

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            <div className="hidden md:block md:w-1/2 relative overflow-hidden">
                <img
                    src={LoginImage}
                    alt="Decorative background"
                    className="w-full h-full object-cover absolute inset-0 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="h-16 object-contain"
                        />
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                            {/* <p className="text-gray-500 mt-2 text-sm">
                                Don't have an account?{' '}
                                <a href="#" className="text-primary font-medium hover:underline">
                                    Contact admin
                                </a>
                            </p> */}
                        </div>

                        {/* Status Messages */}
                        {error && (
                            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">
                                {error.message || "Login failed. Please check your credentials."}
                            </div>
                        )}
                        {!error && message && (
                            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm">
                                {message || "Login successful!"}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmitLogin} className="space-y-5">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    ref={emailRef}
                                    required
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                                />
                            </div>

                            <PasswordInput
                                passwordRef={passwordRef}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />

                            <div>
                                {LoadingButton(loading, "Sign in", {
                                    className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                })}
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;