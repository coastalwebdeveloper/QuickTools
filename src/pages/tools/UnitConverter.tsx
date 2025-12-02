import { useState } from "react";
import { Scale, ArrowLeftRight } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";

type ConversionCategory = "length" | "weight" | "temperature" | "area" | "volume";

interface Unit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const conversionUnits: Record<ConversionCategory, Record<string, Unit>> = {
  length: {
    meter: { name: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
    kilometer: { name: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    centimeter: { name: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    millimeter: { name: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mile: { name: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    yard: { name: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    foot: { name: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    inch: { name: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  },
  weight: {
    kilogram: { name: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
    gram: { name: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    milligram: { name: "Milligram (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    pound: { name: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    ounce: { name: "Ounce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ton: { name: "Ton (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  },
  temperature: {
    celsius: {
      name: "Celsius (°C)",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    fahrenheit: {
      name: "Fahrenheit (°F)",
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32,
    },
    kelvin: {
      name: "Kelvin (K)",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  area: {
    sqMeter: { name: "Square Meter (m²)", toBase: (v) => v, fromBase: (v) => v },
    sqKilometer: { name: "Square Kilometer (km²)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    sqFoot: { name: "Square Foot (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    sqYard: { name: "Square Yard (yd²)", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
    acre: { name: "Acre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    hectare: { name: "Hectare (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  },
  volume: {
    liter: { name: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
    milliliter: { name: "Milliliter (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cubicMeter: { name: "Cubic Meter (m³)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    gallon: { name: "Gallon (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    quart: { name: "Quart (US)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    pint: { name: "Pint (US)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
    cup: { name: "Cup (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  },
};

const categoryLabels: Record<ConversionCategory, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  area: "Area",
  volume: "Volume",
};

const UnitConverter = () => {
  const [category, setCategory] = useState<ConversionCategory>("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const units = conversionUnits[category];

  const convert = (value: string, from: string, to: string, direction: "from" | "to") => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      if (direction === "from") setToValue("");
      else setFromValue("");
      return;
    }

    const baseValue = units[from].toBase(numValue);
    const result = units[to].fromBase(baseValue);
    
    if (direction === "from") {
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
    } else {
      setFromValue(result.toFixed(6).replace(/\.?0+$/, ""));
    }
  };

  const handleFromChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit, "from");
  };

  const handleToChange = (value: string) => {
    setToValue(value);
    convert(value, toUnit, fromUnit, "to");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    const unitKeys = Object.keys(conversionUnits[newCategory]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setFromValue("");
    setToValue("");
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement"
      icon={Scale}
      iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      tips={[
        "Select a category to see available units",
        "Enter a value in either field to convert",
        "Click the swap button to reverse the conversion",
        "Results are calculated in real-time",
      ]}
    >
      <div className="space-y-6">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryLabels) as ConversionCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? "gradient-bg text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Conversion Fields */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                convert(fromValue, e.target.value, toUnit, "from");
              }}
              className="w-full input-modern"
            >
              {Object.entries(units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromChange(e.target.value)}
              placeholder="Enter value"
              className="w-full input-modern text-lg font-mono"
            />
          </div>

          {/* Swap Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={swapUnits}
            className="self-center mt-6 rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>

          {/* To */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                convert(fromValue, fromUnit, e.target.value, "from");
              }}
              className="w-full input-modern"
            >
              {Object.entries(units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={toValue}
              onChange={(e) => handleToChange(e.target.value)}
              placeholder="Result"
              className="w-full input-modern text-lg font-mono"
            />
          </div>
        </div>

        {/* Quick Reference */}
        {fromValue && toValue && (
          <div className="p-4 bg-secondary/50 rounded-xl text-center animate-fade-in">
            <p className="text-lg">
              <span className="font-semibold">{fromValue}</span>{" "}
              <span className="text-muted-foreground">{units[fromUnit].name}</span>
              {" = "}
              <span className="font-semibold text-primary">{toValue}</span>{" "}
              <span className="text-muted-foreground">{units[toUnit].name}</span>
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
