"use client"

import { useState } from "react"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaPaw, FaFire, FaUtensils, FaDog, FaBalanceScale, FaCheckCircle, FaTimesCircle, FaCalculator } from "react-icons/fa"
import { MdOutlineRamenDining } from "react-icons/md"
import { GiSittingDog } from "react-icons/gi"
import { TbDog } from "react-icons/tb"


export default function PortionCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "lbs",
    lifeStage: "",
    meals: "",
    treats: "",
  })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorSummary, setErrorSummary] = useState([])
  const [dirty, setDirty] = useState(false)
  const firstErrorRef = useRef(null)


  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: undefined }))
    setErrorSummary("")
    if (result) setDirty(true)
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setErrorSummary("")
    if (result) setDirty(true)
  }

  // const handleUnitToggle = () => {
  //   setFormData((prev) => {
  //     let newWeight = prev.weight
  //     if (prev.weight) {
  //       if (prev.weightUnit === "lbs") {
  //         newWeight = (Number(prev.weight) / 2.2).toFixed(2)
  //       } else {
  //         newWeight = (Number(prev.weight) * 2.2).toFixed(2)
  //       }
  //     }
  //     return {
  //       ...prev,
  //       weight: newWeight,
  //       weightUnit: prev.weightUnit === "lbs" ? "kg" : "lbs"
  //     }
  //   })
  //   setErrors((prev) => ({ ...prev, weight: undefined }))
  //   setErrorSummary("")
  // }


  // Calculation logic extracted for testability
  function getPortionResult(formData) {

    //convert weight to kg
    let weightKg = Number(formData.weight)
    if (formData.weightUnit === "lbs") {
      weightKg = weightKg / 2.2
    }
    const neutered = (formData.neutered || "").toLowerCase()
    let multiplier = 1.6 // default neutered adult
    if (formData.lifeStage === "puppy-0-4") {
      multiplier = 3.0
    } else if (formData.lifeStage === "puppy-4-12") {
      multiplier = 2.0
    } else if (neutered === "no" || neutered === "false" || neutered === "intact") {
      multiplier = 1.8
    }
    const rer = 70 * Math.pow(weightKg, 0.75)
    let mer = rer * multiplier
    const meals = Number(formData.meals) || 1
    let treatCalories = 0
    let caloriesPerMeal = 0
    if (formData.treats === "yes") {
      treatCalories = mer * 0.1
      caloriesPerMeal = Math.round((mer - treatCalories) / meals)
    } else {
      caloriesPerMeal = Math.round(mer / meals)
    }
    return {
      daily: Math.round(mer),
      perMeal: caloriesPerMeal,
      meals: meals
    }
  }

  const calculatePortion = () => {
    setLoading(true)
    setTimeout(() => {
      const newErrors = {}
      let summary = []
      // Weight validation
      if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
        newErrors.weight = "Please enter a valid weight."
        summary.push("Weight is required and must be a positive number.")
      }
      // Life stage validation
      if (!formData.lifeStage) {
        newErrors.lifeStage = "Please select your dog's life stage."
        summary.push("Life stage is required.")
      }
      // Meals validation
      if (!formData.meals || isNaN(Number(formData.meals)) || Number(formData.meals) < 1 || !Number.isInteger(Number(formData.meals))) {
        newErrors.meals = "Please enter a valid number of meals (1 or more)."
        summary.push("Meals per day must be an integer greater than 0.")
      }
      // Treats validation
      if (!formData.treats) {
        newErrors.treats = "Please select if you feed treats."
        summary.push("Treats selection is required.")
      }

      setErrors(newErrors)
      setErrorSummary(summary)
      if (Object.keys(newErrors).length > 0) {
        setResult(null)
        setLoading(false)
        // Focus first error
        if (firstErrorRef.current) {
          firstErrorRef.current.scrollIntoView({ behavior: "smooth" })
        }
        return
      }
      setResult(getPortionResult(formData))
      setDirty(false)
      setLoading(false)
    }, 500)
  }

  const handleReset = () => {
    setFormData({
      weight: "",
      weightUnit: "lbs",
      lifeStage: "",
      gender: "",
      neutered: "",
      meals: "",
      treats: "",
      bodyCondition: ""
    })
    setResult(null)
    setErrors({})
    setErrorSummary("")
    setDirty(false)
  }

  return (
    <>
      <div className="py-10 bg-white flex items-center justify-center px-4">
        <Card className="max-w-xl w-full rounded-3xl shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2 mb-2">
              Dog Food Portion Calculator
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Disclaimer: This calculator provides a starting point for your dog’s daily feeding needs. Monitor weight and consult your veterinarian for personalized advice. For a more detailed calculator, visit   <a href="https://vetcalculators.com/calories.html" className="underline text-primary-dark" target="_blank" rel="noopener noreferrer">
    Vetcalculators Calorie Requirements Calculator
  </a>.
            </p>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="flex flex-col gap-y-4">
              {errorSummary && errorSummary.length > 0 && (
                <Alert variant="destructive" className="mb-2 bg-red-100 text-black border-red-200 animate-slide-in" ref={firstErrorRef}>
                  <AlertDescription>
                    <ul className="list-disc list-inside text-left">
                      {errorSummary.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* dog weight input */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="weight" className="text-sm text-secondary">Weight</Label>
                  <span className="text-xs text-gray-400" title="Enter your dog's weight. You can switch units.">?</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Input id="weight" type="number" min="1" step="1" placeholder={`Enter weight in ${formData.weightUnit}`} value={formData.weight} onChange={handleChange} aria-label={`Dog weight in ${formData.weightUnit}`}
                    className={`mt-1 w-40 bg-gray-100 border rounded-xl px-4 py-2 transition-colors duration-200 ${errors.weight ? 'border-red-400 ring-2 ring-red-300/60 focus:border-red-500 focus:ring-4 focus:ring-red-400/40 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)]' : 'border-gray-200'}`} />
                  <div className="w-28">
                    <Select
                      value={formData.weightUnit}
                      onValueChange={newUnit => {
                        setFormData(prev => {
                          let newWeight = prev.weight;
                          if (prev.weight) {
                            if (newUnit === "kg" && prev.weightUnit === "lbs") {
                              newWeight = (Number(prev.weight) / 2.2).toFixed(2);
                            } else if (newUnit === "lbs" && prev.weightUnit === "kg") {
                              newWeight = (Number(prev.weight) * 2.2).toFixed(2);
                            }
                          }
                          return { ...prev, weight: newWeight, weightUnit: newUnit };
                        });
                      }}
                    >
                      <SelectTrigger
                        className={`mt-1 text-secondary bg-gray-100 border rounded-xl px-4 py-2 pr-8 transition-colors duration-200 appearance-none text-sm focus:outline-none flex items-center justify-between ${errors.weight ? 'border-red-400 ring-2 ring-red-300/60 focus:border-red-500 focus:ring-4 focus:ring-red-400/40 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)]' : 'border-gray-200'}`}
                        aria-label="Select weight unit"
                      >
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              
              </div>

              {/* life stage input */}
              <div className="mb-2">
                <Label htmlFor="gender" className="text-sm text-secondary">Life Stage</Label>
                <Select value={formData.lifeStage} onValueChange={value => handleSelectChange('lifeStage', value)}>
                  <SelectTrigger className={`mt-1 bg-gray-100 border rounded-xl px-4 py-2 transition-colors duration-200 ${errors.lifeStage ? 'border-red-400 ring-2 ring-red-300/60 focus:border-red-500 focus:ring-4 focus:ring-red-400/40 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)]' : 'border-gray-200'}`}>
                    <SelectValue placeholder="Select life stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="neutered-adult" className="flex items-center gap-2 cursor-pointer">
                      <GiSittingDog className="inline text-base" /> Neutered Adult
                    </SelectItem>
                    <SelectItem value="intact-adult" className="flex items-center gap-2 cursor-pointer">
                      <GiSittingDog className="inline text-base" /> Intact Adult
                    </SelectItem>
                    <SelectItem value="puppy-0-4" className="flex items-center gap-2 cursor-pointer">
                      <TbDog className="inline text-base" /> Puppy (0-4 months)
                    </SelectItem>
                    <SelectItem value="puppy-4-12" className="flex items-center gap-2 cursor-pointer">
                      <FaDog className="inline text-base" /> Adolescent (4-12 months)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* meals input */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="meals" className="text-sm text-secondary">Meals per day</Label>
                  <span className="text-xs text-gray-400" title="How many times do you feed your dog per day?">?</span>
                </div>
                <Input id="meals" type="number" min="1" step="1" placeholder="e.g. 2" value={formData.meals} onChange={handleChange} aria-label="Meals per day"
                  className={`w-28 mt-1 bg-gray-100 border rounded-xl px-4 py-2 transition-colors duration-200 ${errors.meals ? 'border-red-400 ring-2 ring-red-300/60 focus:border-red-500 focus:ring-4 focus:ring-red-400/40 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)]' : 'border-gray-200'}`} />
              </div>

              {/* treats input */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="treats" className="text-sm text-secondary">Do you feed treats?</Label>
                  <span className="text-sm text-muted-foreground">Treats should make up no more than 10% of the diet per day.</span>
                </div>
                <Select value={formData.treats} onValueChange={(value) => handleSelectChange('treats', value)}>
                  <SelectTrigger className={`mt-1 bg-gray-100 border rounded-xl px-4 py-2 transition-colors duration-200 ${errors.treats ? 'border-red-400 ring-2 ring-red-300/60 focus:border-red-500 focus:ring-4 focus:ring-red-400/40 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)]' : 'border-gray-200'}`}>
                    <SelectValue placeholder="Select if you feed treats" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="yes" className="flex items-center gap-2 cursor-pointer">
                      <FaCheckCircle className="inline text-base" /> Yes
                    </SelectItem>
                    <SelectItem value="no" className="flex items-center gap-2 cursor-pointer">
                      <FaTimesCircle className="inline text-base" /> No
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* action buttons */}
              {result && dirty && (
                <Alert variant="warning" className="mb-2 bg-primary-light text-secondary border-primary-dark animate-slide-in">
                  <AlertDescription>
                    <span className="font-semibold text-secondary">Inputs have changed.</span> 
                    <p className="text-gray-500">Please click "Calculate Portion" again to update your results.</p>
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex gap-2 mt-2">
                <Button onClick={calculatePortion} className="" disabled={loading} aria-busy={loading} aria-disabled={loading}>
                  <FaCalculator className="text-lg" />
                  {loading ? "Calculating..." : "Calculate Portion"}
                </Button>
                <Button type="button" variant="outline" onClick={handleReset} disabled={loading} aria-disabled={loading}>
                  Reset
                </Button>
              </div>
              {result && (
                <div className="mt-8 p-6 rounded-2xl bg-primary-light border border-green-200 text-center shadow-lg animate-fade-in">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 text-primary-dark mb-2">
                      <FaPaw className="text-2xl" />
                      <h3 className="text-2xl font-bold">Your Dog's Daily Nutrition</h3>
                    </div>
                    <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md flex flex-col">
                      {/* Calories Section */}
                      <h4 className="text-xl font-bold text-primary-dark mb-2 text-left">Calories</h4>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-secondary font-medium">
                            <FaFire className="text-lg text-primary" /> Total Daily Calories
                          </span>
                          <span className="text-xl font-bold text-primary-dark">{result.daily} <span className="text-base font-semibold text-gray-500">kcal</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-secondary font-medium">
                            <MdOutlineRamenDining className="text-lg text-primary" /> Calories per Meal
                          </span>
                          <span className="text-xl font-bold text-primary-dark">{result.perMeal} <span className="text-base font-semibold text-gray-500">kcal</span></span>
                        </div>
                        {formData.treats === "yes" && (
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-secondary font-medium">
                              <FaCheckCircle className="text-lg text-primary" /> Treats (10% of daily calories)
                            </span>
                            <span className="text-xl font-semibold text-gray-500">{Math.round(result.daily * 0.1)} <span className="text-base font-semibold text-gray-500">kcal</span></span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-gray-200 my-3"></div>
                      {/* Portion Section */}
                      <h4 className="text-xl font-bold text-primary-dark mb-2 text-left">Chicken & Rice Portion</h4>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-secondary font-medium">
                            <FaUtensils className="text-lg text-primary" /> Meals/Day
                          </span>
                          <span className="text-xl font-semibold text-gray-500">{result.meals} <span className="text-base font-semibold text-gray-500">{result.meals > 1 ? 'meals' : 'meal'}</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-secondary font-medium">
                            <FaBalanceScale className="text-lg text-primary" /> Meal Size
                          </span>
                          {(() => {
                            // 1 recipe = 957 kcal = 2.69 lbs = 1219g, 1 cup = 250g
                            const recipeKcal = 957;
                            const recipeGrams = 2.69 * 453.592; // 1219g
                            const kcalPerGram = recipeKcal / recipeGrams;
                            const perMealKcal = result.perMeal;
                            let portionGrams = perMealKcal / kcalPerGram;
                            let portionCups = portionGrams / 250;
                            return (
                              <span className="flex flex-col items-end min-w-[160px]">
                                {portionGrams > 0 ? (
                                  <span className="text-lg font-bold text-primary-dark text-right">{portionGrams.toFixed(0)}g | {portionCups.toFixed(2)} cup{portionCups.toFixed(2) !== '1.00' ? 's' : ''}</span>
                                ) : '--'}
                              </span>
                            );
                          })()}
                        </div>
                        {/* Meals per recipe section */}
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-secondary font-medium">
                            <FaBalanceScale className="text-lg text-primary" /> Meals per Recipe
                          </span>
                          {(() => {
                            // 1 recipe = 957 kcal
                            const perMealKcal = result.perMeal;
                            const recipeKcal = 957;
                            let mealsPerRecipe = recipeKcal / perMealKcal;
                            return (
                              <span className="text-xl font-semibold text-gray-500">
                                {mealsPerRecipe > 0 ? mealsPerRecipe.toFixed(1) : '--'} <span className="text-base font-semibold text-gray-500">meal{mealsPerRecipe.toFixed(1) !== '1.0' ? 's' : ''}</span>
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-4 w-full text-left">
                      <h4 className="text-lg font-semibold text-primary-dark mb-1">Disclaimer</h4>
                      <p className="leading-relaxed opacity-80">
                        As a general rule, feed your Adult Dog 1-2 times per day. Factors such as age, activity level, breed all play a part in the necessary feeding quantities of all dogs. Use the suggested guidelines below, adjust the feeding quantities as necessary to maintain your pet’s ideal body score (BCS). Please consult with your veterinarian or contact hello@grublify.com if you have specific questions about how much to feed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
