"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FiHelpCircle } from "react-icons/fi"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PortionCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    age: "",
    activity: "",
    gender: "",
    neutered: "",
    meals: ""
  })

  const [result, setResult] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleActivityChange = (value) => {
    setFormData((prev) => ({ ...prev, activity: value }))
  }

  const calculatePortion = () => {
    const newErrors = {}
    // Weight validation
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight."
    }
    // Age validation
    if (formData.age === "" || isNaN(Number(formData.age)) || Number(formData.age) < 0) {
      newErrors.age = "Please enter a valid age."
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
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setResult(null)
      return
    }
    // Calculation logic
    const weightKg = Number(formData.weight) / 2.2
    const age = Number(formData.age)
    const neutered = formData.neutered.toLowerCase()
    let multiplier = 1.6 // default neutered adult
    if (age === 0) {
      multiplier = 2.0 // 4 months to 1 year
    } else if (age < 0.33) {
      multiplier = 3.0 // 0-4 months
    } else if (neutered === "no" || neutered === "false" || neutered === "intact") {
      multiplier = 1.8
    }
    const rer = 70 * Math.pow(weightKg, 0.75)
    let mer = rer * multiplier
    const meals = Number(formData.meals) || 1
    const caloriesPerMeal = Math.round(mer / meals)
    setResult(`Your dog needs about ${Math.round(mer)} kcal per day (${caloriesPerMeal} kcal per meal, ${meals} meal${meals > 1 ? 's' : ''} per day).`)
  }

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-16 pb-16">
        <Card className="max-w-xl w-full rounded-3xl shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
              <span className="text-2xl">🐾</span> Portion Calculator
            </CardTitle>
            <p className="text-gray-500 mt-2 text-sm">
              Let's find out how much food your dog needs!  
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-10">
            <div className="flex flex-col gap-y-4">
              <div className="mb-2">
                <Label htmlFor="weight" className="text-sm text-gray-700">Weight</Label>
                <Input id="weight" type="number" placeholder="Enter weight (lbs)" value={formData.weight} onChange={handleChange} className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2" />
                {errors.weight && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.weight}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label htmlFor="age" className="text-sm text-gray-700">Age <span className='text-sm text-gray-400'>for puppies ages 4 months - 1 year put 0</span></Label>
                <Input id="age" type="number" placeholder="Enter age (years)" value={formData.age} onChange={handleChange} className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2" />
                {errors.age && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.age}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-2">
                <Label className="text-sm text-gray-700">Activity Level</Label>
                <Select value={formData.activity} onValueChange={handleActivityChange}>
                  <SelectTrigger className="mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Choose activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="low" className="cursor-pointer">Low</SelectItem>
                    <SelectItem value="medium" className="cursor-pointer">Medium</SelectItem>
                    <SelectItem value="high" className="cursor-pointer">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-2">
                <Label htmlFor="gender" className="text-sm text-gray-700">Gender</Label>
                <Select value={formData.gender} onValueChange={value => setFormData(prev => ({ ...prev, gender: value, neutered: "" }))}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="male" className="cursor-pointer">Male</SelectItem>
                    <SelectItem value="female" className="cursor-pointer">Female</SelectItem>
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
                <Select value={formData.neutered} onValueChange={value => setFormData(prev => ({ ...prev, neutered: value }))}>
                  <SelectTrigger className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
                    <SelectValue placeholder={formData.gender === "female" ? "Spayed?" : "Neutered?"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="yes" className="cursor-pointer">Yes</SelectItem>
                    <SelectItem value="no" className="cursor-pointer">No</SelectItem>
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
                  <span className="text-s text-gray-400">Treats should make up no more than 10% of the diet per day.</span>
                </div>
                <Input id="meals" type="number" placeholder="e.g. 2" value={formData.meals} onChange={handleChange} className="mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2" />
                {errors.meals && (
                  <Alert variant="destructive" className="mt-3 bg-red-100 text-black border-red-200 animate-slide-in">
                    <AlertDescription>{errors.meals}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button onClick={calculatePortion} className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl mt-4">
                🐶 Calculate Portion
              </Button>
              {result && (
                <div className="mt-8 p-6 rounded-xl bg-green-50 border border-green-200 text-center shadow text-green-700 text-lg font-medium flex flex-col items-center gap-2">
                  <span>{result}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
