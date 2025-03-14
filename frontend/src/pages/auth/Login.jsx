import LoginImage from "../../assets/images/auth/ozkan-guner-kEbwxfC33qY-unsplash.jpg"
import logo from "../../assets/logos/logo_2-removebg-preview.png"

import { useLogin } from "../../hooks/useLogin";
import LoadingButton from "@/components/small/LoadingButton";
import { PasswordInput } from "@/components/small/PasswordInput";

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
        <div className="flex bg-back">
            <div className="w-1/2 hidden md:flex ">
                <img src={LoginImage} alt="" className="hidden md:flex h-screen " />
            </div>
            <div className="md:w-2/3 flex flex-col md:justify-center w-full items-center ">
                <img src={logo} alt="logo" className="w-52 mb-8   " />
                <div className="bg-red-500  rounded-2xl p-8 w-100 px-12">
                    <h2 className="font-bold text-xl my-3">Login to your account</h2>
                    {error && <p className="text-danger">{error.message || "Login failed."}</p>}
                    {!error && message && <p className="text-success">{message || "login in successfuly"}</p>}

                    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="my-2 text-sm">email</label>
                            <input ref={emailRef}
                                required
                                type="email"
                                placeholder="Enter your email"
                                className="border-[#D0D5DD] text-xs placeholder:text-xs " />
                        </div>
                        <PasswordInput
                            passwordRef={passwordRef}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        {LoadingButton(loading, "login now")}
                    </form>
                    <button className=""  >hiii</button>

                </div>

            </div>

        </div>
    );
};

export default Login;
