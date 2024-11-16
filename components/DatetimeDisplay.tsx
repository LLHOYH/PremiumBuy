import { Calendar, Clock } from "lucide-react";

export const DateTimeDisplay = ({ drawingDate }:{drawingDate:Date}) => {
    const formatDate = (date:Date) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    };
  
    const formatTime = (date:Date) => {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    };
  
    // For different locales/timezones
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDrawingDate = new Date(drawingDate);
  
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-purple-600">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>{formatDate(localDrawingDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>{formatTime(localDrawingDate)}</span>
        </div>
        {/* <div className="text-sm text-purple-400">
          ({userTimezone})
        </div> */}
      </div>
    );
  };