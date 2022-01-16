import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';
import {contractABI, contractAddress} from '../utils/constants'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount]  = useState("");
    const [formData, setFormData] =useState({ addressTo: '', amount: '', keyword: '', message: ''})
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTrasactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTrasactions] = useState([]);


    const handleChange = (e, name) => {
        setFormData((prevState)=>({
            ...prevState, [name]: e.target.value
        }))
    }

    const getAllTransaction = async() =>
    {
        try {
            if(!ethereum) return toast("Please install metamask");
            const transactionContract = getEthereumContract();
            const avialableTransactions = await transactionContract.getAllTransaction();
            const structuredTransactions = avialableTransactions.map((transaction)=>({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() *1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex)/(10**18)
            }))
           setTrasactions(structuredTransactions.reverse());
        } catch (error) {
            console.log(error);
        }        
    }

    const checkIfWalletIsConnected = async() =>
    {
        try {
            if(!ethereum) return toast("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length)
            { 
                setCurrentAccount(accounts[0]);
                getAllTransaction();

            }else{
                console.log("No Account found");
            }
            console.log(accounts);
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
        
    }

    const checkIfTransactionsExists = async() =>
    {
        try {

            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    
    const connectWallet = async () =>{
        try {
            if(!ethereum) return toast("Please install metamask");
            
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } 
        catch (error) {
            console.log(error);
            throw toast(error.message);
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return toast("Please install metamask");            
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000(GWEI) --> Eth 0.000021
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            toast.success("Transaction Successful")
            toast.info("Please reload the page to view the latest transaction")
            const transactionCount = await transactionContract.getTransactionCount();
            setTrasactionCount(transactionCount.toNumber());
        } 
        catch (error) {
            console.log(error);
            throw toast(error.message);
        }
    } 

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}