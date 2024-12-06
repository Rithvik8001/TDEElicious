"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Cake, Apple, Egg, Carrot, Coffee, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { Notification } from "@/components/Notification";

export default function Calculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "",
    bodyFat: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.activityLevel)
      newErrors.activityLevel = "Activity level is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const queryString = new URLSearchParams(formData).toString();
      router.push(`/results?${queryString}`);
    } else {
      setNotification({
        message: "Please fill in all required fields",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-orange-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-10">
            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-orange-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Mix Your Perfect Energy Recipe!
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Label
                    htmlFor="age"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Cake className="w-5 h-5 mr-2 text-orange-500" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    onChange={handleChange}
                    value={formData.age}
                    className={`w-full rounded-full border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.age ? "border-red-500" : ""
                    }`}
                    placeholder="How many candles on your cake?"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                  )}
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label className="text-lg font-semibold text-gray-700 flex items-center">
                    <Apple className="w-5 h-5 mr-2 text-orange-500" />
                    Gender
                  </Label>
                  <RadioGroup
                    defaultValue="male"
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="male"
                        id="male"
                        className="text-orange-500"
                      />
                      <Label htmlFor="male" className="ml-2 font-medium">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="female"
                        id="female"
                        className="text-orange-500"
                      />
                      <Label htmlFor="female" className="ml-2 font-medium">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label
                    htmlFor="weight"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Egg className="w-5 h-5 mr-2 text-orange-500" />
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    onChange={handleChange}
                    value={formData.weight}
                    className={`w-full rounded-full border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.weight ? "border-red-500" : ""
                    }`}
                    placeholder="Light as a feather or heavy as a cake?"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                  )}
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label
                    htmlFor="height"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Carrot className="w-5 h-5 mr-2 text-orange-500" />
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.1"
                    onChange={handleChange}
                    value={formData.height}
                    className={`w-full rounded-full border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.height ? "border-red-500" : ""
                    }`}
                    placeholder="Tall as a beanstalk?"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                  )}
                </motion.div>
                <motion.div
                  className="space-y-2 sm:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Label
                    htmlFor="activityLevel"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Coffee className="w-5 h-5 mr-2 text-orange-500" />
                    Activity Level
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, activityLevel: value })
                    }
                  >
                    <SelectTrigger
                      className={`w-full rounded-full border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                        errors.activityLevel ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="How spicy is your lifestyle?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">
                        Couch Potato (little to no exercise)
                      </SelectItem>
                      <SelectItem value="light">
                        Casual Stroller (1-3 days/week)
                      </SelectItem>
                      <SelectItem value="moderate">
                        Energizer Bunny (3-5 days/week)
                      </SelectItem>
                      <SelectItem value="active">
                        Gym Enthusiast (6-7 days/week)
                      </SelectItem>
                      <SelectItem value="very_active">
                        Superhuman (very active & physical job)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.activityLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.activityLevel}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  className="space-y-2 sm:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label
                    htmlFor="bodyFat"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Coffee className="w-5 h-5 mr-2 text-orange-500" />
                    Body Fat % (optional)
                  </Label>
                  <Input
                    id="bodyFat"
                    name="bodyFat"
                    type="number"
                    step="0.1"
                    onChange={handleChange}
                    value={formData.bodyFat}
                    className="w-full rounded-full border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="What's your secret sauce percentage?"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 px-8 rounded-full text-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Whip Up My TDEE!
                  <Utensils className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
