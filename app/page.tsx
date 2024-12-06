"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-orange-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TDEElicious
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-orange-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where Science Meets Snack Cravings
          </motion.p>
          <motion.div
            className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
              Ready to uncover the secret recipe for your body's energy needs?{" "}
              <span className="font-bold">TDEElicious</span> isn't just another
              calorie calculator – it's your passport to a world where nutrition
              meets fun!
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              We've whisked together the latest nutritional science with a
              generous helping of food-loving enthusiasm to create a tool that's
              as enjoyable as it is informative.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-medium">
              Whether you're looking to{" "}
              <span className="font-bold">shed a few pounds</span>,{" "}
              <span className="font-bold">bulk up</span>, or simply{" "}
              <span className="font-bold">maintain your delicious self</span>,
              TDEElicious serves up personalized insights with a side of smiles.
              Let's turn those numbers into knowledge and those goals into
              reality – all while keeping your taste buds and your sense of
              humor satisfied!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/calculator">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Discover Your Flavor of Fitness
                <Utensils className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-600 font-medium">
        Made with ❤️ by Rithvik
      </footer>
    </div>
  );
}
