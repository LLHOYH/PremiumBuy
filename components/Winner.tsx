'use client'

import React, { useEffect, useState } from 'react';
import { Sparkles, Gift, PartyPopper } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Address, createWalletClient, custom, Hex, pad } from 'viem';
import { celoAlfajores } from 'viem/chains';
import { useChainId, useChains,useAccount, useWriteContract } from 'wagmi'; // Add this import

import abi from '../utils/lotteryABI.json'
import { getContractByChain, getExplorerByChain } from '@/utils/chainaddress';
import { LoadingSpinner } from './LoadingSpinner';
import Link from 'next/link';
  
const LOTTERY_ABI = abi;

const WinnerAnnouncement = ({winnerTicket}:{winnerTicket:string}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");
  const chains = useChains(); // Much simpler!
  const chainId=useChainId();
  const { address: userAddress, isConnected } = useAccount(); // Get wallet connection status and address
  const { data:hash, writeContract, isPending, error: writeError ,isSuccess} = useWriteContract();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(()=>{
    console.log(hash)
  },[hash])

  useEffect(() => {
    console.log('error ',writeError)
    if (writeError) {
      setIsClaimLoading(false);
      setClaimError(writeError.message);
    }
  }, [writeError]);

  useEffect(() => {
    console.log('success ',isSuccess)
    if (isSuccess) {
      setIsClaimLoading(false);
      setClaimSuccess(true);
    }
  }, [isSuccess]);

  const handleClaimPrize = async () => {
    if (!window.ethereum) {
      setClaimError("Please install a Web3 wallet");
      return;
    }
    const currentChain=chains.find(c=>c.id===chainId);

    if(!currentChain) return;

    const token_contract=getContractByChain(chainId) as Address;

    console.log(currentChain)
    console.log(chainId)
    try {
      setIsClaimLoading(true);
      setClaimError("");

      const round_number=1;
      const reward_level=1;
      const merkle_proof = [
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ] as Hex[];
      
      const result = await writeContract({
        address: token_contract,
        abi: LOTTERY_ABI,
        functionName: 'claimReward',
        args: [
          BigInt(round_number),
          BigInt(reward_level),
          merkle_proof
        ],
      });

      console.log("Transaction result:", result);

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
    }
  };

  const numbers = !!winnerTicket ? winnerTicket.split(',').map(num => num.trim()) : null;

  return (
    <Card className="bg-gradient-to-b from-yellow-100 to-amber-100 flex items-center justify-center p-4">
      <div 
        className={`max-w-lg transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <PartyPopper className="w-8 h-8 text-yellow-500 animate-bounce" />
            <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
            <PartyPopper className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
          
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

        {numbers && 
          <CardContent>
            <div className="flex justify-center gap-4 py-2">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-lg"
                >
                  {number}
                </div>
              ))}
            </div>
          </CardContent>
      }
          <div className="text-3xl font-bold text-amber-600 mb-8">
            6 usdc
          </div>

          <button
            onClick={handleClaimPrize}
            disabled={!isClaimLoading && !!hash}
            className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3 text-white transform transition-all hover:scale-105 active:scale-95 ${!isClaimLoading && hash ? 'from-zinc-200 to-zinc-300':'from-amber-500 to-yellow-500'}`}
          >
            <div className="relative flex items-center justify-center gap-2 min-w-[250px]">
              {isClaimLoading && <LoadingSpinner/>}
              {!isClaimLoading && !hash &&
                <>
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">Click to Claim Your Prize</span>
                </>
              }
              {
                !isClaimLoading && hash && 
                <>
                <Gift className="w-5 h-5" />
                <span className="font-semibold">You have Claimed</span>
                </>
              }
            </div>

            <div className="absolute inset-0 flex transform transition-all group-hover:translate-x-full duration-500">
              <div className="h-full w-1/3 rotate-12 transform bg-white/20"></div>
            </div>
          </button>

          <p className="mt-6 text-sm text-amber-700">
            Please claim your prize within 90 days
          </p>

          
          {
            hash && 
              <div className="mt-6 text-sm text-amber-700 text-wrap truncate flex gap-2">
              Hash: 
              <Link href={`${getExplorerByChain(chainId)}${hash}`} className='hover:underline' target='_blank'>
                {hash}
              </Link>
            </div>
          }
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