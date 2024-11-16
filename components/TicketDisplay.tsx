import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from 'lucide-react';

const TicketDisplay = ({ ticketNumbers }:{ticketNumbers:string}) => {

  if (!ticketNumbers) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6 pb-6">
          <div className="text-center text-gray-500">
            <Ticket className="w-8 h-8 mx-auto mb-2" />
            <p>No ticket purchased for this round</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const numbers = ticketNumbers.split(',').map(num => num.trim());

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-purple-600 flex items-center justify-center gap-2">
          <Ticket className="w-5 h-5" />
          Your Lottery Ticket
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 py-2">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold shadow-lg"
            >
              {number}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDisplay;