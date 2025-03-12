import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";

const Login = () => {
    const { login, error } = useAuth();
    const role = useRole(); // ✅ Now using the custom hook

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await login(email, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <p>Role: {role}</p> {/* ✅ Role comes from useRole() */}

            {error && <p style={{ color: "red" }}>{error.message || "Login failed."}</p>}
            {error?.errors?.email && <p style={{ color: "red" }}>{error.errors.email[0]}</p>}

            <form onSubmit={handleSubmitLogin}>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
