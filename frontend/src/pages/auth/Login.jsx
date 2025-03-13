import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";
import LoginImage from "../../assets/images/auth/473812939_988438703349267_4731828135405535889_n.jpg"
const Login = () => {
    const { login, error } = useAuth();
    const role = useRole();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await login(email, password);
    };

    return (
        <div className="flex">
            <div className="w-1/3">
                <img src={LoginImage} alt="" />
            </div>
            <div className="w-1/2">
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error.message || "Login failed."}</p>}
                {error?.errors?.email && <p style={{ color: "red" }}>{error.errors.email[0]}</p>}

                <form onSubmit={handleSubmitLogin}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>

        </div>
    );
};

export default Login;
