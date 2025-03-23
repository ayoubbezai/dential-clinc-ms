import LoginImage from "../../assets/images/auth/ozkan-guner-kEbwxfC33qY-unsplash.jpg"
import logo from "../../assets/logos/logo_2-removebg-preview.png"
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
        <div className={`flex  md:bg-primary`}
            style={{
                backgroundImage: `url(${LoginImage})`,
                backgroundSize: "cover",
                backgroundPosition: "left",
            }}>
            <style>
                {`
      @media (min-width: 767px) {
        div {
          background-image: none !important;
        }
      }
    `}
            </style>
            <div className="w-1/2 hidden md:flex ">
                <img src={LoginImage} alt="" className="hidden md:flex h-screen " />
            </div>
            <div className="md:w-2/3 min-h-[100vh] flex flex-col md:justify-center w-full items-center ">
                <img src={logo} alt="logo" className="w-52 mb-8   " />
                <div className="bg-white  rounded-2xl p-8 w-100 px-12">
                    <h2 className="font-bold text-xl my-3">Login to your account</h2>
                    {error && <p className="text-danger">{error.message || "Login failed."}</p>}
                    {!error && message && <p className="text-success">{message || "login in successfuly"}</p>}

                    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
                        <div>
                            <Label className="my-2 text-sm">email</Label>
                            <Input ref={emailRef}
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

                </div>
            </div>
        </div>
    );
};

export default Login;
