"use client"

import { useState } from "react"
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
import { FaPaw, FaFire, FaUtensils, FaDog, FaVenus, FaMars, FaBalanceScale, FaArrowDown, FaArrowUp, FaCheckCircle, FaTimesCircle, FaCalculator } from "react-icons/fa"
import { MdOutlineRamenDining } from "react-icons/md"
import { GiSittingDog } from "react-icons/gi"
import { TbDog } from "react-icons/tb"

export default function PortionCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    lifeStage: "",
    gender: "",
    neutered: "",
    meals: "",
    treats: "",
    bodyCondition: ""
  })

  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [id]: undefined }))
  }

  const handleActivityChange = (value) => {
    setFormData((prev) => ({ ...prev, activity: value }))
    setErrors((prev) => ({ ...prev, activity: undefined }))
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const calculatePortion = () => {
    const newErrors = {}
    // Weight validation
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight."
    }
    // Life stage validation
    if (!formData.lifeStage) {
      newErrors.lifeStage = "Please select your dog's life stage."
    }
    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender."
    }
    // Neutered/Spayed validation
    if (!formData.neutered) {
      newErrors.neutered = `Please select if your dog is ${formData.gender === "female" ? "spayed" : "neutered"}.`
    }
    // Meals validation
    if (!formData.meals || isNaN(Number(formData.meals)) || Number(formData.meals) < 1 || !Number.isInteger(Number(formData.meals))) {
      newErrors.meals = "Please enter a valid number of meals (1 or more)."
    }
    // Treats validation
    if (!formData.treats) {
      newErrors.treats = "Please select if you feed treats."
    }
    // Body condition validation
    if (!formData.bodyCondition) {
      newErrors.bodyCondition = "Please select your dog's body condition."
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setResult(null)
      return
    }

    // Calculation logic
    const weightKg = Number(formData.weight) / 2.2
    const neutered = formData.neutered.toLowerCase()
    
    // Determine multiplier based on life stage and body condition
    let multiplier = 1.6 // default neutered adult
    if (formData.lifeStage === "puppy-0-4") {
      multiplier = 3.0 // 0-4 months
    } else if (formData.lifeStage === "puppy-4-12") {
      multiplier = 2.0 // 4 months to 1 year
    } else if (formData.bodyCondition === "underweight") {
      multiplier = 1.7
    } else if (formData.bodyCondition === "overweight") {
      multiplier = 1.0
    } else if (neutered === "no" || neutered === "false" || neutered === "intact") {
      multiplier = 1.8
    }

    // Calculate RER and MER
    const rer = 70 * Math.pow(weightKg, 0.75)
    let mer = rer * multiplier

    // Adjust for treats if applicable
    if (formData.treats === "yes") {
      mer = mer * 0.9 // Reduce by 10% for treats
    }

    const meals = Number(formData.meals) || 1
    const caloriesPerMeal = Math.round(mer / meals)
    
    setResult({
      daily: Math.round(mer),
      perMeal: caloriesPerMeal,
      meals: meals
    })
  }

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-16 pb-16">
        <Card className="max-w-xl w-full rounded-3xl shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
            Portion Calculator
            </CardTitle>
            <p className="text-gray-500 mt-2 text-sm">
              Let's find out how much food your dog needs!  
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-10">
            <div className="flex flex-col gap-y-4">
              <div className="mb-2">
                <Label htmlFor="weight" className="text-sm text-gray-700">Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder="Enter weight (lbs)" value={formData.weight} onChange={handleChange} className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2" />
                {errors.weight && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.weight}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label htmlFor="lifeStage" className="text-sm text-gray-700">Life Stage</Label>
                <Select value={formData.lifeStage} onValueChange={value => handleSelectChange('lifeStage', value)}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder="Select life stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="puppy-0-4" className="flex items-center gap-2 cursor-pointer">
                      <TbDog className="inline text-base" /> Puppy (0-4 months)
                    </SelectItem>
                    <SelectItem value="puppy-4-12" className="flex items-center gap-2 cursor-pointer">
                      <FaDog className="inline text-base" /> Adolescent (4-12 months)
                    </SelectItem>
                    <SelectItem value="adult" className="flex items-center gap-2 cursor-pointer">
                      <GiSittingDog className="inline text-base" /> Adult (12+ months)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.lifeStage && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.lifeStage}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label htmlFor="gender" className="text-sm text-gray-700">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="male" className="flex items-center gap-2 cursor-pointer">
                      <FaMars className="inline text-base" /> Male
                    </SelectItem>
                    <SelectItem value="female" className="flex items-center gap-2 cursor-pointer">
                      <FaVenus className="inline text-base" /> Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.gender}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label htmlFor="neutered" className="text-sm text-gray-700">{formData.gender === "female" ? "Spayed?" : "Neutered?"}</Label>
                <Select value={formData.neutered} onValueChange={(value) => handleSelectChange('neutered', value)}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder={formData.gender === "female" ? "Spayed?" : "Neutered?"} />
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
                {errors.neutered && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.neutered}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="meals" className="text-sm text-gray-700">Meals per day</Label>
                </div>
                <Input id="meals" type="number" placeholder="e.g. 2" value={formData.meals} onChange={handleChange} className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2" />
                {errors.meals && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.meals}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label htmlFor="bodyCondition" className="text-sm text-gray-700">Body Condition</Label>
                <Select value={formData.bodyCondition} onValueChange={(value) => handleSelectChange('bodyCondition', value)}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder="Select body condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ideal" className="flex items-center gap-2 cursor-pointer">
                      <FaBalanceScale className="inline text-base" /> Ideal Weight
                    </SelectItem>
                    <SelectItem value="underweight" className="flex items-center gap-2 cursor-pointer">
                      <FaArrowDown className="inline text-base" /> Underweight
                    </SelectItem>
                    <SelectItem value="overweight" className="flex items-center gap-2 cursor-pointer">
                      <FaArrowUp className="inline text-base" /> Overweight
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.bodyCondition && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.bodyCondition}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="treats" className="text-sm text-gray-700">Do you feed treats?</Label>
                  <span className="text-s text-gray-400">Treats should make up no more than 10% of the diet per day.</span>
                </div>
                <Select value={formData.treats} onValueChange={(value) => handleSelectChange('treats', value)}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
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
                {errors.treats && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.treats}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button onClick={calculatePortion} className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl mt-4 flex items-center justify-center gap-2">
                <FaCalculator className="text-lg" />
                Calculate Portion
              </Button>
              {result && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-center shadow-lg animate-fade-in">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 text-green-700">
                      <FaPaw className="text-2xl" />
                      <h3 className="text-2xl font-bold">Daily Calorie Requirements</h3>
                    </div>
                    <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1 text-gray-600">
                          <FaFire className="text-lg" /> Total Daily Calories:
                        </span>
                        <span className="text-lg font-bold text-emerald-600">{result.daily} kcal</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MdOutlineRamenDining className="text-lg" /> Calories per Meal:
                        </span>
                        <span className="text-lg font-bold text-emerald-600">{result.perMeal} kcal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-600">
                          <FaUtensils className="text-lg" /> Meals/Day:
                        </span>
                        <span className="text-lg font-bold text-emerald-600">{result.meals} {result.meals > 1 ? 'meals' : 'meal'}</span>
                      </div>
                    </div>
                    <div className="mt-8 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-4 w-full">
                      <p className="font-semibold text-gray-700 mb-1">Disclaimer:</p>
                      <p className="leading-relaxed opacity-80">
                        These calorie recommendations are estimates only. Please monitor your dog's weight and body condition, and consult your veterinarian for personalized advice.
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
  )
}
