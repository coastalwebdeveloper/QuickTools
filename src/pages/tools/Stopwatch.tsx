import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Flag } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toolContentData } from "@/lib/toolContent";

const Stopwatch = () => {
  const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  // Timer specific state
  const [timerInput, setTimerInput] = useState({ hours: 0, minutes: 5, seconds: 0 });
  const [timerDuration, setTimerDuration] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (mode === "timer") {
            if (prev <= 0) {
              setIsRunning(false);
              // Play sound or notification
              return 0;
            }
            return prev - 10;
          }
          return prev + 10;
        });
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (mode === "timer" && !isRunning && time === 0) {
      // Start timer with set duration
      const duration =
        timerInput.hours * 3600000 +
        timerInput.minutes * 60000 +
        timerInput.seconds * 1000;
      setTimerDuration(duration);
      setTime(duration);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (mode === "stopwatch" && isRunning) {
      setLaps((prev) => [...prev, time]);
    }
  };

  const handleModeChange = (newMode: "stopwatch" | "timer") => {
    setMode(newMode);
    handleReset();
  };

  const progress = mode === "timer" && timerDuration > 0 
    ? ((timerDuration - time) / timerDuration) * 100 
    : 0;

  return (
    <ToolLayout
      title="Stopwatch & Timer"
      description="Precise stopwatch and countdown timer in one tool"
      icon={Timer}
      iconColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
      tips={[
        "Use stopwatch for measuring elapsed time",
        "Timer counts down from a set duration",
        "Record lap times in stopwatch mode",
        "Precision up to 1/100th of a second",
      ]}
    >
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <button
            onClick={() => handleModeChange("stopwatch")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "stopwatch"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => handleModeChange("timer")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "timer"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Timer
          </button>
        </div>

        {/* Timer Input (only for timer mode when not running) */}
        {mode === "timer" && !isRunning && time === 0 && (
          <div className="flex justify-center gap-4 animate-fade-in">
            <div className="text-center">
              <input
                type="number"
                min={0}
                max={23}
                value={timerInput.hours}
                onChange={(e) =>
                  setTimerInput((prev) => ({
                    ...prev,
                    hours: Math.max(0, Math.min(23, parseInt(e.target.value) || 0)),
                  }))
                }
                className="w-20 text-center input-modern text-2xl font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">Hours</p>
            </div>
            <div className="text-center">
              <input
                type="number"
                min={0}
                max={59}
                value={timerInput.minutes}
                onChange={(e) =>
                  setTimerInput((prev) => ({
                    ...prev,
                    minutes: Math.max(0, Math.min(59, parseInt(e.target.value) || 0)),
                  }))
                }
                className="w-20 text-center input-modern text-2xl font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">Minutes</p>
            </div>
            <div className="text-center">
              <input
                type="number"
                min={0}
                max={59}
                value={timerInput.seconds}
                onChange={(e) =>
                  setTimerInput((prev) => ({
                    ...prev,
                    seconds: Math.max(0, Math.min(59, parseInt(e.target.value) || 0)),
                  }))
                }
                className="w-20 text-center input-modern text-2xl font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">Seconds</p>
            </div>
          </div>
        )}

        {/* Time Display */}
        <div className="relative flex flex-col items-center py-8">
          {/* Progress Ring for Timer */}
          {mode === "timer" && timerDuration > 0 && (
            <svg className="absolute w-64 h-64" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-100"
              />
            </svg>
          )}
          
          <p className="text-6xl md:text-7xl font-mono font-bold text-foreground z-10">
            {formatTime(time)}
          </p>
          
          {mode === "timer" && time === 0 && timerDuration > 0 && (
            <p className="text-xl text-green-500 font-semibold mt-2 animate-pulse">
              Time's up!
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="w-14 h-14 rounded-full"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleStartStop}
            className={`w-20 h-20 rounded-full text-lg ${
              isRunning
                ? "bg-destructive hover:bg-destructive/90"
                : "gradient-bg"
            }`}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
          
          {mode === "stopwatch" && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleLap}
              disabled={!isRunning}
              className="w-14 h-14 rounded-full"
            >
              <Flag className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Laps */}
        {mode === "stopwatch" && laps.length > 0 && (
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium mb-3">Laps</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                >
                  <span className="text-muted-foreground">Lap {index + 1}</span>
                  <span className="font-mono font-medium">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ToolContent
          title="Stopwatch & Timer"
          {...toolContentData["stopwatch"]}
        />
      </div>
    </ToolLayout>
  );
};

export default Stopwatch;
