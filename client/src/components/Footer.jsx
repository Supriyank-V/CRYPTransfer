const Footer  = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-black">
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Feel free to contact me at:</p>
                <p className="text-white text-sm text-center font-medium mt-2"><i>supriyank.vish@gmail.com</i></p>
            </div>
                <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-left text-xs">@AbertonStudio</p>
                <p className="text-white text-right text-xs">All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;