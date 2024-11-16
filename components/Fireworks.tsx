const Fireworks = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full
              before:content-[''] before:absolute before:w-full before:h-full before:rounded-full before:animate-ping before:bg-current
              after:content-[''] after:absolute after:w-full after:h-full after:rounded-full after:animate-ping after:bg-current
              animate-firework-${i + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  };
  
  export default Fireworks;