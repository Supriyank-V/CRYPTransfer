import React,{useContext} from "react";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { shortenAddress } from "../utils/shortenAddress";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = ({placeholder, name, type, value, handleChange}) => (
        <input
            placeholder={placeholder}
            type={type}
            step="0.0001"
            min={0}
            value={value}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    )

    const Welcome  = () => {
        const {connectWallet,currentAccount,formData,sendTransaction,handleChange, isLoading} = useContext(TransactionContext);        
        
        const connectAccountClick = () => {
            return toast("MetaMask account " + currentAccount + " is connected" );
        }

    const handleSubmit = (e) => {
        if(!currentAccount)
        {
            return toast.error("Please connect your MetaMask Wallet first.")
        }
        const {addressTo, amount, keyword, message} = formData;
        e.preventDefault(); // To prevent React to reload
            if(!addressTo || !amount || !keyword || !message)
                {
                    if(amount <= 0)
                    {
                        return toast.error("Please enter an amount more than 0.");
                    }
                    return toast.error("Please fill all the transaction fields.");
                } 
        toast.success("Do not refresh or close the browser.")
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-20 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                        Welcome !<br/>To CRYPTransfer
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Now you can send <b>ETHEREUM*</b> easily to any part of the world using CRYPTransfer. 
                    </p>
                    {!currentAccount ?(
                    <button 
                        type="button" 
                        onClick={connectWallet} 
                        className="flex flex-row justify-center animate-bounce items-center my-5 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-white hover:border-2 text-white text-base font-semibold hover:text-black "
                        >Connect Wallet
                    </button>    
                    ):(
                        <button  
                        type="button" 
                        onClick={connectAccountClick}
                        className="flex flex-row justify-center items-center my-5 bg-green-600 p-3 rounded-full text-white"
                        >
                            Your MetaMask Wallet is connected
                        </button>
                    )}                 
                    <p className="text-white">Some key points about us:</p>  

                     <ul className="text-white my-6">
                        <li>1. Always Reliable</li>
                        <li>2. It's Secure</li>
                        <li>3. Sends Ethereum (ETH)*</li>
                        <li>4. Transactions can be checked in Etherscan</li>
                        <li>5. Based on Web 3.0</li>
                        <li>6. Has Low Gas Rates</li>
                        <li className="pt-2 text-sm font-bold">*For now it runs for Ropsten Test Network only.</li>
                        <li className="pt-2 text-sm font-bold"><i>Release to MainNet is on hold until full feature is ready.</i></li>
                    </ul>                  
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <div className="p-3 border-8 justify-center items-center flex-col rounded-full h-40 w-40 my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between items-center flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center ">
                                    <SiEthereum fontSize={20} color="#fff"/>
                                </div>
                            </div>
                                <div>
                                    <p className="text-white font-light text-sm">
                                        {shortenAddress(currentAccount)}
                                    </p>
                                    <p className="text-white font-semibold text-lg">
                                        Etherium
                                    </p>
                                </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-76 w-full flex flex-col justify-start items-center white-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount to be transfered (ETH)" name="amount" type="number" min="0" handleChange={handleChange} />
                        <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Message for transaction" name="message" type="text" handleChange={handleChange} />
                    
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        { isLoading ? (
                            <Loader />
                        ):
                        (
                            <button 
                            type="button"
                            onClick={handleSubmit} 
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointe hover:bg-green-600"
                            >
                            Send Now
                            </button>                            
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer
                        position="top-right"
                        autoClose={5000} 
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        toastStyle={{ color:'white', backgroundColor: "black" }}
                    />
        </div>
    );
}

export default Welcome;