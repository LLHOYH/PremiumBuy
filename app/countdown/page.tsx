'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Calendar, Clock } from 'lucide-react';
import WinnerAnnouncement from '@/components/Winner';
import { DateTimeDisplay } from '@/components/DatetimeDisplay';



const CountdownPage = () => {
    const drawingDate = new Date('2024-11-16T15:06:00');

    const calculateTimeLeft = () => {
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
    };
    
    
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isDrawing, setIsDrawing] = useState(false);
 
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
      
      if (Object.values(updatedTime).every(value => value === 0)) {
        setIsDrawing(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Next Lottery Drawing</h1>
          <DateTimeDisplay drawingDate={drawingDate} />

        </div>

        {isDrawing && <WinnerAnnouncement/> }

        {isDrawing ? (
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Timer className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold mb-2">Drawing in Progress!</h2>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center p-4">
                <CardTitle className="text-purple-600 text-sm">DAYS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-purple-900">
                  {timeLeft.days.toString().padStart(2, '0')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center p-4">
                <CardTitle className="text-purple-600 text-sm">HOURS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-purple-900">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center p-4">
                <CardTitle className="text-purple-600 text-sm">MINUTES</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-purple-900">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center p-4">
                <CardTitle className="text-purple-600 text-sm">SECONDS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-purple-900">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </p>
              </CardContent>
            </Card>
          </div>
        )}


        <div className="text-center">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Prize Pool</h3>
              <div className="text-3xl font-bold text-purple-600">$1,000,000</div>
              <p className="text-sm text-purple-500 mt-2">Don&apos;t miss your chance to win!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;