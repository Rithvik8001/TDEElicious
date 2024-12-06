"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Flame,
  Activity,
  Pizza,
  Carrot,
  Coffee,
  Utensils,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function calculateTDEE(data: any) {
  const { age, gender, weight, height, activityLevel, bodyFat } = data;
  let bmr;

  if (bodyFat) {
    const leanBodyMass = weight * (1 - bodyFat / 100);
    bmr = 370 + 21.6 * leanBodyMass;
  } else {
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  const activityMultipliers: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const tdee = bmr * activityMultipliers[activityLevel];
  return Math.round(tdee);
}

function calculateBMI(weight: number, height: number) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
}

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getBMIRange(category: string) {
  switch (category) {
    case "Underweight":
      return "Below 18.5";
    case "Normal weight":
      return "18.5 - 24.9";
    case "Overweight":
      return "25 - 29.9";
    case "Obese":
      return "30 or greater";
    default:
      return "";
  }
}

function getActivityLevelDescription(level: string) {
  const descriptions: { [key: string]: string } = {
    sedentary: "Couch Potato",
    light: "Casual Stroller",
    moderate: "Energizer Bunny",
    active: "Gym Enthusiast",
    very_active: "Superhuman",
  };
  return descriptions[level] || level;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const data = Object.fromEntries(searchParams.entries());
  const tdee = calculateTDEE(data);
  const bmi = calculateBMI(Number(data.weight), Number(data.height));
  const bmiCategory = getBMICategory(Number(bmi));
  const bmiRange = getBMIRange(bmiCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl space-y-6"
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center text-orange-600"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your TDEElicious Energy Menu
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-extrabold">
              Your Nutritional Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Age</p>
                  <p className="font-bold">{data.age} years young</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Gender</p>
                  <p className="font-bold">{data.gender}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Pizza className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Weight</p>
                  <p className="font-bold">{data.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Carrot className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Height</p>
                  <p className="font-bold">{data.height} cm</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Activity Level
                  </p>
                  <p className="font-bold">
                    {getActivityLevelDescription(data.activityLevel)}
                  </p>
                </div>
              </div>
              {data.bodyFat && (
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Body Fat
                    </p>
                    <p className="font-bold">{data.bodyFat}%</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-extrabold">
              Your Daily Calorie Feast
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-center mb-6">
              <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mr-4" />
              <p className="text-4xl sm:text-6xl font-extrabold text-orange-500">
                {tdee}
              </p>
              <p className="text-xl sm:text-2xl ml-2 font-bold">calories/day</p>
            </div>
            <p className="text-gray-600 mb-4 text-center font-medium">
              This is your daily calorie buffet! To maintain your current
              weight, aim to consume this amount of calories per day.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-orange-100 p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-orange-700">
                  For Weight Loss
                </h3>
                <p className="text-orange-800 font-medium">
                  Mild (0.25 kg/week): {tdee - 250} cal/day
                </p>
                <p className="text-orange-800 font-medium">
                  Moderate (0.5 kg/week): {tdee - 500} cal/day
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-green-700">
                  For Weight Gain
                </h3>
                <p className="text-green-800 font-medium">
                  Mild (0.25 kg/week): {tdee + 250} cal/day
                </p>
                <p className="text-green-800 font-medium">
                  Moderate (0.5 kg/week): {tdee + 500} cal/day
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-extrabold">
              Your BMI Slice
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-center mb-6">
              <p className="text-4xl sm:text-6xl font-extrabold text-orange-500">
                {bmi}
              </p>
            </div>
            <p className="text-xl font-bold text-center mb-2">
              Category: {bmiCategory}
            </p>
            <p className="text-gray-600 text-center mb-4 font-medium">
              BMI Range: {bmiRange}
            </p>
            <div className="mb-4">
              <Progress
                value={Number(bmi)}
                max={40}
                className="h-4 rounded-full bg-orange-200"
              />
              <div className="flex justify-between text-sm mt-1 font-medium">
                <span className="text-blue-500">Underweight</span>
                <span className="text-green-500">Normal</span>
                <span className="text-yellow-500">Overweight</span>
                <span className="text-red-500">Obese</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center font-medium">
              BMI is like the seasoning of your health profile - it adds flavor
              but doesn't tell the whole story!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2 text-yellow-600">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="font-bold text-lg">Disclaimer</h3>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              The results provided by TDEElicious are estimates based on general
              formulas and may not account for individual variations or specific
              health conditions. These calculations should be used as a starting
              point and not as a substitute for professional medical or
              nutritional advice. Always consult with a healthcare provider or
              registered dietitian before making significant changes to your
              diet or exercise routine.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Link href="/calculator">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Utensils className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Recalculate
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-orange-50">
      <Suspense
        fallback={
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">
              Cooking up your results...
            </p>
          </div>
        }
      >
        <ResultsContent />
      </Suspense>
    </div>
  );
}
