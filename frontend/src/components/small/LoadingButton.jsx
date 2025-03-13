import { Button } from "@/components/ui/button.jsx";

const LoadingDots = (loading, text) => (
    <Button disabled={loading} type="submit" className="bg-[#1570EF] px-16 py-5 my-4 text-white flex items-center justify-center gap-2">
        {loading ? (
            <>
                Loading
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
            </>
        ) : (
            text
        )}
    </Button>
);

export default LoadingDots;