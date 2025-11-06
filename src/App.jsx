import React, { useState, useCallback } from 'react';

// --- Custom Slider Component ---
// This component bundles a slider with a number input for easy reuse.
function StatSlider({ label, unit, value, min, max, step, onChange, accentColor }) {
  const handleChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="space-y-2">
      <label className="flex justify-between items-center text-sm font-medium text-slate-300">
        <span>{label}</span>
        <span className="text-xs font-mono bg-slate-700 px-2 py-0.5 rounded">
          {value.toFixed(1)} {unit}
        </span>
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ${accentColor || 'accent-blue-500'}`}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value.toFixed(1)}
          onChange={handleChange}
          className="w-28 bg-slate-900 border border-slate-700 text-white text-sm rounded-lg p-2"
        />
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [rpmStart, setRpmStart] = useState(500);
  const [durabilityStart, setDurabilityStart] = useState(0);

  // --- State ---
  // Default budget of 300 points
  const [totalBudget, setTotalBudget] = useState(200);
  
  // Default weight: 1 Durability point is "worth" 10 RPM points.
  const [rpmDurabilityRatio, setRpmDurabilityRatio] = useState(10);
  
  // Default "Balanced" stats: (1500 / 10) + 150 = 150 + 150 = 300
  const [rpm, setRpm] = useState(1500);
  const [durability, setDurability] = useState(150);
  
  const [showAdvanced, setShowAdvanced] = useState(false);

  // --- Calculation Constraints ---
  // These functions enforce the budgeting rule:
  // totalBudget = (rpm / rpmDurabilityRatio) + durability
  
  // We use useCallback to prevent unnecessary re-renders

  const handleTotalBudgetChange = useCallback((newBudget) => {
    setTotalBudget(newBudget);
    // When budget changes, keep durability constant and recalculate RPM
    const newRpm = (newBudget - durability) * rpmDurabilityRatio;
    setRpm(Math.max(0, newRpm));
  }, [durability, rpmDurabilityRatio]);

  const handleRatioChange = useCallback((newRatio) => {
    if (newRatio <= 0) newRatio = 1; // Prevent division by zero
    setRpmDurabilityRatio(newRatio);
    // When ratio changes, keep durability constant and recalculate RPM
    const newRpm = (totalBudget - durability) * newRatio;
    setRpm(Math.max(0, newRpm));
  }, [totalBudget, durability]);

  const handleRpmChange = useCallback((newRpm) => {
    const maxRpm = totalBudget * rpmDurabilityRatio;
    const clampedRpm = Math.max(0, Math.min(newRpm, maxRpm));
    
    setRpm(clampedRpm);
    const newDurability =  totalBudget - (clampedRpm / rpmDurabilityRatio);
    setDurability(newDurability);
  }, [totalBudget, rpmDurabilityRatio]);

  const handleDurabilityChange = useCallback((newDurability) => {
    const clampedDurability = Math.max(0, Math.min(newDurability, totalBudget));
    
    setDurability(clampedDurability);
    const newRpm = (totalBudget - clampedDurability) * rpmDurabilityRatio;
    setRpm(newRpm);
  }, [totalBudget, rpmDurabilityRatio]);

  // --- Preset Functions ---
  const setPreset = (durabilityPercent) => {
    const newDurability = totalBudget * durabilityPercent;
    handleDurabilityChange(newDurability);
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 md:p-8 font-sans text-white">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-white">
          Spinning Top Stat Budget Calculator
        </h1>

        {/* Total Budget */}
        <div className="p-4 bg-slate-900 rounded-lg">
          <StatSlider
            label="Total Build Points"
            unit="Points"
            value={totalBudget}
            min={50}
            max={1000}
            step={1}
            onChange={handleTotalBudgetChange}
            accentColor="accent-green-500"
          />
        </div>
        
        {/* Presets */}
        <div className="space-y-3">
           <label className="text-sm font-medium text-slate-300">Archetype Presets</label>
           <div className="grid grid-cols-3 gap-3">
             <button onClick={() => setPreset(0.75)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
               Tank
             </button>
             <button onClick={() => setPreset(0.5)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
               Balanced
             </button>
             <button onClick={() => setPreset(0.25)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
               Stamina/Power
             </button>
           </div>
        </div>

        {/* Stat Sliders */}
        <div className="space-y-6">
          <StatSlider
            label="Durability"
            unit="HP"
            value={durability + durabilityStart}
            min={durabilityStart}
            max={totalBudget + durabilityStart}
            step={0.1}
            onChange={(value) => handleDurabilityChange(value - durabilityStart)}
            accentColor="accent-blue-500"
          />
          <StatSlider
            label="Max RPM"
            unit="RPM"
            value={rpm + rpmStart}
            min={rpmStart}
            max={totalBudget * rpmDurabilityRatio + rpmStart}
            step={1}
            onChange={(value) => handleRpmChange(value - rpmStart)}
            accentColor="accent-red-500"
          />
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t border-slate-700">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAdvanced}
              onChange={() => setShowAdvanced(!showAdvanced)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-600"
            />
            <span className="text-sm font-medium text-slate-300">Show Advanced Options</span>
          </label>

          {showAdvanced && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg space-y-4">
              <StatSlider
                label="RPM-to-Durability Ratio"
                unit="(X:1)"
                value={rpmDurabilityRatio}
                min={1}
                max={30}
                step={0.1}
                onChange={handleRatioChange}
                accentColor="accent-indigo-500"
              />
              <StatSlider
                label="Starting Durability"
                unit="HP"
                value={durabilityStart}
                min={0}
                max={500}
                step={1}
                onChange={setDurabilityStart}
                accentColor="accent-cyan-500"
              />
              <StatSlider
                label="Starting RPM"
                unit="RPM"
                value={rpmStart}
                min={0}
                max={2000}
                step={10}
                onChange={setRpmStart}
                accentColor="accent-orange-500"
              />
              <p className="text-xs text-slate-400">
                This "weight" determines how many RPM points are considered "equal" to 1 Durability point.
                <br />
                - Your damage model suggests a **default of 10**.
                <br />
                - A *higher* value makes RPM "cheaper" (Stamina builds become stronger).
                <br />
                - A *lower* value makes Durability "cheaper" (Tank builds become stronger).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}