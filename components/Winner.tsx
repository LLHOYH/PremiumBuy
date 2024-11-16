'use client'

import React, { useEffect, useState } from 'react';
import { Sparkles, Gift, PartyPopper } from 'lucide-react';
import { Card } from './ui/card';
import { Address, createWalletClient, custom } from 'viem';
import { celoAlfajores } from 'viem/chains';

  
const LOTTERY_ABI = [
  {
    "inputs": [],
    "name": "claimPrize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const LOTTERY_CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS" as Address;



const WinnerAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const handleClaimPrize = async () => {
    if (!window.ethereum) {
      setClaimError("Please install a Web3 wallet");
      return;
    }

    try {
      setIsClaimLoading(true);
      setClaimError("");

      const walletClient = createWalletClient({
        transport: custom(window.ethereum),
        chain: celoAlfajores
      });

      const [address] = await walletClient.getAddresses();

      const tx = await walletClient.writeContract({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'claimPrize',
        account: address,
      });

      setTxHash(tx);
      setClaimSuccess(true);

    } catch (error: unknown) {
      console.error('Error claiming prize:', error);
      if (error instanceof Error) {
        setClaimError(error.message);
      } else if (typeof error === 'string') {
        setClaimError(error);
      } else {
        setClaimError("Failed to claim prize. Please try again.");
      }
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-b from-yellow-100 to-amber-100 flex items-center justify-center p-4">
      <div 
        className={`max-w-lg transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          {/* Celebration Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <PartyPopper className="w-8 h-8 text-yellow-500 animate-bounce" />
            <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
            <PartyPopper className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
          
          {/* Winner Text */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-amber-600 mb-4 animate-pulse">
              Congratulations!
            </h1>
            <div className="text-2xl font-semibold text-amber-800 mb-2">
              Hey! You are the winner!
            </div>
            <p className="text-amber-700">
              You&apos;ve won the grand prize in our lottery draw!
            </p>
          </div>

          <div className="text-3xl font-bold text-amber-600 mb-8">
            0.01 ETH
          </div>

          <button
            onClick={handleClaimPrize}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3 text-white transform transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative flex items-center justify-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Click to Claim Your Prize</span>
            </div>
            {/* Button shine effect */}
            <div className="absolute inset-0 flex transform transition-all group-hover:translate-x-full duration-500">
              <div className="h-full w-1/3 rotate-12 transform bg-white/20"></div>
            </div>
          </button>

          <p className="mt-6 text-sm text-amber-700">
            Please claim your prize within 90 days
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              <Sparkles 
                className="w-4 h-4 text-yellow-500 opacity-50"
                style={{ transform: `rotate(${Math.random() * 360}deg)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WinnerAnnouncement;