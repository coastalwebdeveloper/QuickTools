import { useState } from "react";
import { Scale } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toolContentData } from "@/lib/toolContent";

const BMICalculator = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    let bmiValue: number;

    if (unit === "metric") {
      const heightM = parseFloat(height) / 100;
      const weightKg = parseFloat(weight);
      if (!heightM || !weightKg) return;
      bmiValue = weightKg / (heightM * heightM);
    } else {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      const weightLbs = parseFloat(weight);
      if (!totalInches || !weightLbs) return;
      bmiValue = (weightLbs / (totalInches * totalInches)) * 703;
    }

    setBmi(Math.round(bmiValue * 10) / 10);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500", bg: "bg-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-500" };
  };

  const category = bmi ? getBMICategory(bmi) : null;

  const getPointerPosition = (bmi: number) => {
    // Map BMI to percentage (15-40 range)
    const min = 15;
    const max = 40;
    const percentage = ((Math.min(Math.max(bmi, min), max) - min) / (max - min)) * 100;
    return percentage;
  };

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and understand your weight category"
      icon={Scale}
      iconColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
      tips={[
        "BMI is a general indicator and may not be accurate for athletes",
        "Normal BMI range is 18.5 to 24.9",
        "Consult a healthcare provider for personalized advice",
        "BMI doesn't distinguish between muscle and fat mass",
      ]}
    >
      <div className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <button
            onClick={() => setUnit("metric")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              unit === "metric"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              unit === "imperial"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Imperial (lb/ft)
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unit === "metric" ? (
            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="input-modern"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="5"
                  className="input-modern"
                />
                <span className="self-center text-muted-foreground">ft</span>
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="10"
                  className="input-modern"
                />
                <span className="self-center text-muted-foreground">in</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Weight ({unit === "metric" ? "kg" : "lb"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "70" : "154"}
              className="input-modern"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button onClick={calculateBMI} className="w-full btn-primary py-6 text-lg">
          Calculate BMI
        </Button>

        {/* Result */}
        {bmi && category && (
          <div className="space-y-6 pt-6 border-t border-border animate-fade-in">
            {/* BMI Value */}
            <div className="text-center">
              <p className="text-6xl font-bold text-foreground">{bmi}</p>
              <p className={`text-xl font-semibold mt-2 ${category.color}`}>
                {category.label}
              </p>
            </div>

            {/* BMI Scale */}
            <div className="space-y-2">
              <div className="relative h-4 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-blue-500" />
                <div className="flex-1 bg-green-500" />
                <div className="flex-1 bg-yellow-500" />
                <div className="flex-1 bg-red-500" />
              </div>
              {/* Pointer */}
              <div className="relative h-4">
                <div
                  className="absolute -top-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-foreground transition-all duration-500"
                  style={{ left: `calc(${getPointerPosition(bmi)}% - 8px)` }}
                />
              </div>
              {/* Labels */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            {/* BMI Ranges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { range: "< 18.5", label: "Underweight", color: "bg-blue-500/10 border-blue-500/30" },
                { range: "18.5 - 24.9", label: "Normal", color: "bg-green-500/10 border-green-500/30" },
                { range: "25 - 29.9", label: "Overweight", color: "bg-yellow-500/10 border-yellow-500/30" },
                { range: "≥ 30", label: "Obese", color: "bg-red-500/10 border-red-500/30" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-3 rounded-lg border ${item.color}`}
                >
                  <p className="font-semibold text-foreground">{item.range}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <ToolContent
          title="BMI Calculator"
          {...toolContentData["bmi-calculator"]}
        />
      </div>
    </ToolLayout>
  );
};

export default BMICalculator;
