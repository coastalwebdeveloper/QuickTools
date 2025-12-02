import { useState, useMemo } from "react";
import { CreditCard } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);
  const [tenureType, setTenureType] = useState<"months" | "years">("months");

  const result = useMemo(() => {
    const months = tenureType === "years" ? tenure * 12 : tenure;
    const monthlyRate = rate / 12 / 100;

    if (monthlyRate === 0) {
      const emi = principal / months;
      return {
        emi,
        totalPayment: principal,
        totalInterest: 0,
        months,
      };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalPayment,
      totalInterest,
      months,
    };
  }, [principal, rate, tenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const principalPercentage = (principal / result.totalPayment) * 100;
  const interestPercentage = (result.totalInterest / result.totalPayment) * 100;

  return (
    <ToolLayout
      title="EMI Calculator"
      description="Calculate your loan EMI and total interest payable"
      icon={CreditCard}
      iconColor="bg-lime-500/10 text-lime-600 dark:text-lime-400"
      tips={[
        "EMI = Equated Monthly Installment",
        "Adjust sliders to see how changes affect EMI",
        "Lower interest rates significantly reduce total payment",
        "Shorter tenure means higher EMI but less total interest",
      ]}
    >
      <div className="space-y-8">
        {/* Principal Amount */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium">Loan Amount</label>
            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
              {formatCurrency(principal)}
            </span>
          </div>
          <Slider
            value={[principal]}
            onValueChange={(value) => setPrincipal(value[0])}
            min={10000}
            max={10000000}
            step={10000}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$10K</span>
            <span>$10M</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium">Interest Rate (% p.a.)</label>
            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
              {rate}%
            </span>
          </div>
          <Slider
            value={[rate]}
            onValueChange={(value) => setRate(value[0])}
            min={1}
            max={30}
            step={0.5}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium">Loan Tenure</label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {tenure} {tenureType}
              </span>
              <div className="flex gap-1 p-1 bg-secondary rounded">
                <button
                  onClick={() => setTenureType("months")}
                  className={`px-2 py-1 text-xs rounded ${
                    tenureType === "months"
                      ? "bg-card shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Months
                </button>
                <button
                  onClick={() => setTenureType("years")}
                  className={`px-2 py-1 text-xs rounded ${
                    tenureType === "years"
                      ? "bg-card shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Years
                </button>
              </div>
            </div>
          </div>
          <Slider
            value={[tenure]}
            onValueChange={(value) => setTenure(value[0])}
            min={1}
            max={tenureType === "years" ? 30 : 360}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>{tenureType === "years" ? "30 years" : "360 months"}</span>
          </div>
        </div>

        {/* Results */}
        <div className="pt-6 border-t border-border space-y-6">
          {/* EMI Display */}
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Monthly EMI</p>
            <p className="text-5xl font-bold gradient-text">
              {formatCurrency(result.emi)}
            </p>
          </div>

          {/* Breakdown Chart */}
          <div className="space-y-3">
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-primary transition-all duration-300"
                style={{ width: `${principalPercentage}%` }}
              />
              <div
                className="bg-accent transition-all duration-300"
                style={{ width: `${interestPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Interest</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Principal</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(principal)}
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-xl font-bold text-accent">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(result.totalPayment)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default EMICalculator;
