import { useState } from "react";
import { Calendar } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toolContentData } from "@/lib/toolContent";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    const nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: daysUntilBirthday,
    });
  };

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age down to the day"
      icon={Calendar}
      iconColor="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      tips={[
        "Enter your date of birth to calculate",
        "See your age in years, months, and days",
        "View total days and weeks lived",
        "Find out how many days until your next birthday",
      ]}
    >
      <div className="space-y-6">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full input-modern"
          />
        </div>

        {/* Calculate Button */}
        <Button onClick={calculateAge} className="w-full btn-primary py-6 text-lg">
          Calculate Age
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-6 pt-6 border-t border-border animate-fade-in">
            {/* Main Age Display */}
            <div className="text-center">
              <div className="flex justify-center gap-4 md:gap-8">
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-primary">
                    {result.years}
                  </p>
                  <p className="text-muted-foreground">Years</p>
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-foreground">
                    {result.months}
                  </p>
                  <p className="text-muted-foreground">Months</p>
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-foreground">
                    {result.days}
                  </p>
                  <p className="text-muted-foreground">Days</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {result.totalDays.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Days</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {result.totalWeeks.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Weeks</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {result.totalMonths.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Months</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">
                  {result.nextBirthday}
                </p>
                <p className="text-sm text-muted-foreground">
                  Days to Birthday
                </p>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-sm text-center">
                You've lived approximately{" "}
                <span className="font-semibold">
                  {(result.totalDays * 24).toLocaleString()} hours
                </span>{" "}
                or{" "}
                <span className="font-semibold">
                  {(result.totalDays * 24 * 60).toLocaleString()} minutes
                </span>
                !
              </p>
            </div>
          </div>
        )}

        <ToolContent
          title="Age Calculator"
          {...toolContentData["age-calculator"]}
        />
      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;
