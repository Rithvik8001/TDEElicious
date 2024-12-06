import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 text-orange-600">
            TDEElicious
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold mb-8 text-orange-500">
            Where Science Meets Snack Cravings
          </p>
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-8">
            <p className="text-lg text-gray-700 mb-4 font-medium">
              Ready to uncover the secret recipe for your body's energy needs?{" "}
              <span className="font-extrabold">TDEElicious</span> isn't just
              another calorie calculator – it's your passport to a world where
              nutrition meets fun!
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We've whisked together the latest nutritional science with a
              generous helping of food-loving enthusiasm to create a tool that's
              as enjoyable as it is informative.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Whether you're looking to{" "}
              <span className="font-bold">shed a few pounds</span>,{" "}
              <span className="font-bold">bulk up</span>, or simply{" "}
              <span className="font-bold">maintain your delicious self</span>,
              TDEElicious serves up personalized insights with a side of smiles.
              Let's turn those numbers into knowledge and those goals into
              reality, all while keeping your taste buds and your sense of humor
              satisfied!
            </p>
          </div>
          <Link href="/calculator">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-3xl text-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Discover Your Flavor of Fitness
              <Utensils className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </header>
      <footer className="text-center py-4 text-gray-600 font-medium">
        Built with ❤️ by <span className="underline">Rithvik</span>
      </footer>
    </div>
  );
}
