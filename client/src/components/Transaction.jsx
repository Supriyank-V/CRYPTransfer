import React, {useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from "../utils/shortenAddress";
import {FcRefresh} from 'react-icons/fc';

const TransactionCard = ({addressTo, addressFrom, timestamp,message, keyword, amount}) =>{
    
    const url= "https://media.giphy.com/media/L59aKIC2MFyfUfrz3n/giphy.gif?quality=90&strip=all&zoom=1&resize=500%2C284"

    return (
        <div className='bg-[#353535] m-4 flex flex-1 border-2
            min-w-fit
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl hover:shadow-slate-500
            hover:bg-red-900
        '>
            <div className='flex flex-col items-center w-full mt-2'>
                <div className='w-full mb-2'>
                    <hr className='pb-2'/>
                    <p className='text-white text-2xl text-center font-bold pb-2'>{keyword}</p>
                    <hr className='pb-4'/>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}` }
                    target="_blank" rel="noopener noreferrer"
                    >
                        <p className='text-white text-sm'><b>From:</b> {shortenAddress(addressFrom)} </p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`}
                    target="_blank" rel="noopener noreferrer"
                    >
                        <p className='text-white text-sm'><b>To:</b> {shortenAddress(addressTo)} </p>
                    </a>
                    <p className='text-white text-sm'><b>Amount:</b> {amount} ETH</p>
                    {message && (
                        <>
                        <p className='text-white text-sm min-h-[40px]'><b>Message:</b> {message}</p>
                        </>
                    )}
                    <img
                        src={url}
                        alt="gif"
                        className="w-full h-64 mt-2 border-2 rounded-md sm:object-fill  object-center"
                    />
                    <div className='bg-green-600 mt-4 p-2 w-full rounded-md justify-center'>
                        <p className='text-white font-bold text-center'>
                            {timestamp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Transaction  = () => {

    const {currentAccount, transactions} = useContext(TransactionContext);

    const refreshTransactions = () => {
        window.location.reload(false);
    }
    
    return (
        <div className='flex w-full justify-center items-center 2xl:px-20 bg-black'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
                {currentAccount ? (
                    <h3 className=' flex text-white text-3xl text-center my-2 justify-center items-center '>Latest Transactions<FcRefresh className='cursor-pointer' onClick={refreshTransactions}/></h3>
                ) : (
                    <h3 className='text-white text-3xl text-center my-2'>Please connnect your account to see the latest Transactions</h3>
                )}
                {currentAccount &&(
                    <div className='flex flex-wrap justify-center items-center h-[600px] mt-10 overflow-y-scroll'>
                    {transactions.map((transaction, i)=>(
                        <TransactionCard key={i} {...transaction}/>
                    ))}
                </div>
                )}                
            </div>
        </div>
    );
}

export default Transaction;