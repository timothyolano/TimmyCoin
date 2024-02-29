


"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>
 //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
 
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };


return (
  <main style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url('https://www.billboard.com/wp-content/uploads/2022/09/kanye-west-paris-2022-jan-billboard-1548.jpg?w=942&h=623&crop=1')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    <button 
      onClick={() => {connectWallet();}}
      className="p-3 bg-red-600 text-white rounded"
      style={{transition: 'background-color 0.3s ease'}}
      onMouseEnter={(e) => {e.target.style.backgroundColor = '#ff6347'}}
      onMouseLeave={(e) => {e.target.style.backgroundColor = '#ba181b'}}
    >
      {walletKey != "" ? walletKey : " Connect wallet"}
    </button>

    <br></br>
  
    <div style={{backgroundColor: '#44767E', padding: '20px', borderRadius: '5px', textAlign: 'center'}}>
  <br></br>
  <form style={{textAlign: "center"}}>
    <label>Input Any Amount To Mint</label><br></br>
  </form>
  <br></br>
  <input
    type="number"
    value={mintingAmount || ""}
    onChange={(e) => mintAmountChange(e)}
    style={{color: "black"}}
  />
  <br></br>
  <br></br>
  <button
    onClick={() => {mintCoin();}}
    className="p-3 bg-red-600 text-white rounded"
    style={{transition: 'background-color 0.3s ease'}}
    onMouseEnter={(e) => {e.target.style.backgroundColor = '#ff6347'}}
    onMouseLeave={(e) => {e.target.style.backgroundColor = '#ba181b'}}
  >
    Mint Token
  </button>
</div>
    <br></br>

    <div style={{backgroundColor: '#44767E', padding: '20px', borderRadius: '5px', textAlign: 'center'}}>
      <form style={{textAlign: "center"}}>
        <label>Input Any Amount To Stake</label><br></br>
      </form>
      <br></br>
      <input 
        type="number"
        value={stakingAmount || ""}
        onChange={(e) => stakeAmountChange(e)}
        style={{color: "Black"}}
      />
      <br></br>
      <br></br>
      <button
        onClick={() => {stakeCoin();}}
        className="p-3 bg-red-600 text-white rounded"
        style={{transition: 'background-color 0.3s ease',}}
        onMouseEnter={(e) => {e.target.style.backgroundColor = '#ff6347'}}
        onMouseLeave={(e) => {e.target.style.backgroundColor = '#ba181b'}}
      >
        Stake Token
      </button>
    </div>
  
    <div>
    <br></br>
      <button
        onClick={() => {withdrawCoin();}}
        className="p-3 bg-red-600 text-white rounded"
        style={{transition: 'background-color 0.3s ease'}}
        onMouseEnter={(e) => {e.target.style.backgroundColor = '#ff6347'}}
        onMouseLeave={(e) => {e.target.style.backgroundColor = '#ba181b'}}
      >
        Withdraw Token
      </button> 
    </div>
  </main>
); 
}