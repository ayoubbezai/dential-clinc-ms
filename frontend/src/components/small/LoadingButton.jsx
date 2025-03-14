
const LoadingDots = (loading, text) => (
    <button disabled={loading} type="submit" className="bg-[#1570EF] px-16 py-3 my-4 text-white flex items-center justify-center gap-2 hover:bg-[#1570EF]/90">
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
    </button>
);

export default LoadingDots;