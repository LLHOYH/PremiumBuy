'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Calendar, Clock, FastForward } from 'lucide-react';
import WinnerAnnouncement from '@/components/Winner';
import { DateTimeDisplay } from '@/components/DatetimeDisplay';
import { Button } from '@/components/ui/button';
import { useAccount, useChainId } from 'wagmi';
import { getNameByChain } from '@/utils/chainaddress';
import TicketDisplay from '@/components/TicketDisplay';
import Fireworks from '@/components/Fireworks';

const CountdownPage = () => {
  const [drawingDate, setDrawingDate] = useState(new Date('2024-11-18T13:00:00'));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isDrawing, setIsDrawing] = useState(false);
  const { address: userAddress, isConnected } = useAccount();
  const chainId=useChainId();
  const [ticketNumber, setTicketNumber] = useState('')
  const [showCelebration, setShowCelebration] = useState(false);
  const [winnerTicker, setWinnerTicket]=useState('')

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = drawingDate.getTime() - now;
  
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
  
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  const generateAlternateTicket = (originalTicket: string) => {
    if (!originalTicket) return '';
    
    const numbers = originalTicket.split(',');
    if (numbers.length !== 3) return '';
  
    // Keep first two numbers
    const firstTwo = numbers.slice(0, 2);
    
    // Generate a different third number (1-9)
    let newThirdNumber;
    do {
      newThirdNumber = Math.floor(Math.random() * 9) + 1; // 1-9
    } while (newThirdNumber === parseInt(numbers[2]));
  
    return [...firstTwo, newThirdNumber].join(',');
  };

  const handleFastForward = () => {
    const newDate = new Date(Date.now() + 6000);
    setDrawingDate(newDate);
    setTimeLeft(calculateTimeLeft());
  };
    
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
      
      if (Object.values(updatedTime).every(value => value === 0)) {
        setIsDrawing(true);
        setShowCelebration(true);
        // Hide celebration after 5 seconds
        setTimeout(() => setShowCelebration(false), 5000);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [drawingDate]); 

  useEffect(()=>{
    async function getTicket(){
      const res = await fetch(`https://testbk-zeta.vercel.app/api/lottery/latest?mode=${getNameByChain(chainId)}&fromAddress=${userAddress}`)

      const data =await res.json();
      console.log(data)
      if(data && data.data?.lotteryNumber) setTicketNumber(data.data?.lotteryNumber)
    }

    if(userAddress) getTicket();
  },[])

  useEffect(()=>{
    if(ticketNumber){
      const winner=generateAlternateTicket(ticketNumber)
      setWinnerTicket(winner);
    }
  },[ticketNumber])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12 px-4 flex justify-center">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Next Lottery Drawing</h1>
          <DateTimeDisplay drawingDate={drawingDate} />
        </div>

        {isDrawing && <WinnerAnnouncement winnerTicket={winnerTicker}/> }

        {isDrawing ? (
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Timer className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold mb-2">Claiming in Progress!</h2>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item) => (
              <Card key={item.label} className="bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200">
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-purple-600 text-sm">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center text-purple-900">
                    {item.value.toString().padStart(2, '0')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      {
        userAddress && ticketNumber && <TicketDisplay  ticketNumbers={ticketNumber}/>
      }
        <div className="text-center">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Prize Pool</h3>
              <div className="text-3xl font-bold text-purple-600">1 USDC</div>
              <p className="text-sm text-purple-500 mt-2">Don&apos;t miss your chance to win!</p>
            </CardContent>
          </Card>
        </div>
      {!isDrawing && (
            <div className="mt-40">
              <Button
                onClick={handleFastForward}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                title='Fast Forward'
              >
                <FastForward className="w-4 h-4" />
                Fast Forward (5s)
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default CountdownPage;