import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({ passwordRef, showPassword, setShowPassword }) => {
    return (
        <div className="relative w-full">
            <Label className="my-2 ">Password</Label>
            <Input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border-[#D0D5DD] text-sm pr-10 placeholder:text-xs"
                required
                minLength={6}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[37px] cursor-pointer text-gray-500"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
};
