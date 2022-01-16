const Loader  = () => {
    return (
        <div className="flex flex-col justify-center items-center py-3">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700"/>
            <p className="text-white text-semibold text-sm pt-6">Sending Transaction ... Please wait</p>
        </div>
    );
}

export default Loader;