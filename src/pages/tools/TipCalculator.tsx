import { useState, useMemo } from "react";
import { Percent } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  const result = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const tipAmount = (bill * tipPercentage) / 100;
    const total = bill + tipAmount;
    const perPerson = total / splitCount;
    const tipPerPerson = tipAmount / splitCount;

    return {
      tipAmount,
      total,
      perPerson,
      tipPerPerson,
    };
  }, [billAmount, tipPercentage, splitCount]);

  const tipPresets = [10, 15, 18, 20, 25];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate tips and split bills with ease"
      icon={Percent}
      iconColor="bg-teal-500/10 text-teal-600 dark:text-teal-400"
      tips={[
        "Standard tip is 15-20% for good service",
        "Split the bill evenly among your party",
        "Custom tip percentage available",
        "See per-person breakdown instantly",
      ]}
    >
      <div className="space-y-6">
        {/* Bill Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              className="w-full input-modern pl-8 text-2xl font-mono"
            />
          </div>
        </div>

        {/* Tip Percentage */}
        <div>
          <label className="block text-sm font-medium mb-2">Tip Percentage</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tipPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setTipPercentage(preset)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tipPercentage === preset
                    ? "gradient-bg text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={50}
              value={tipPercentage}
              onChange={(e) => setTipPercentage(parseInt(e.target.value))}
              className="flex-1"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={tipPercentage}
              onChange={(e) =>
                setTipPercentage(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))
              }
              className="w-20 input-modern text-center font-mono"
            />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>

        {/* Split Count */}
        <div>
          <label className="block text-sm font-medium mb-2">Split Between</label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
              disabled={splitCount <= 1}
            >
              -
            </Button>
            <span className="text-3xl font-bold w-12 text-center">{splitCount}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSplitCount(splitCount + 1)}
            >
              +
            </Button>
            <span className="text-muted-foreground">
              {splitCount === 1 ? "person" : "people"}
            </span>
          </div>
        </div>

        {/* Results */}
        {parseFloat(billAmount) > 0 && (
          <div className="pt-6 border-t border-border space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Tip Amount</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(result.tipAmount)}
                </p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(result.total)}
                </p>
              </div>
            </div>

            {splitCount > 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">
                    Tip Per Person
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(result.tipPerPerson)}
                  </p>
                </div>
                <div className="gradient-bg rounded-xl p-4">
                  <p className="text-sm text-primary-foreground/80 mb-1">
                    Total Per Person
                  </p>
                  <p className="text-xl font-bold text-primary-foreground">
                    {formatCurrency(result.perPerson)}
                  </p>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-4 bg-secondary/30 rounded-xl text-sm text-muted-foreground">
              <p>
                Bill: {formatCurrency(parseFloat(billAmount))} + Tip:{" "}
                {formatCurrency(result.tipAmount)} ({tipPercentage}%) = Total:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(result.total)}
                </span>
                {splitCount > 1 && (
                  <span>
                    {" "}
                    ÷ {splitCount} ={" "}
                    <span className="font-semibold text-foreground">
                      {formatCurrency(result.perPerson)}
                    </span>{" "}
                    each
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TipCalculator;
