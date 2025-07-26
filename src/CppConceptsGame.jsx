// Web-based Interactive Game to Teach C++ Pointer Concepts (React App)
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion } from "framer-motion";

const levels = [
  {
    title: "Level 1: Null Pointer Check",
    description:
      "You are given a pointer. Check if it's null before accessing it.",
    code: `int* ptr = nullptr;
if (/* ?? */) {
    std::cout << *ptr << std::endl;
}`,
    question: "What should you check before dereferencing the pointer?",
    options: [
      "ptr == 0",
      "*ptr == 0",
      "ptr != nullptr",
      "ptr = nullptr"
    ],
    correct: "ptr != nullptr"
  },
  {
    title: "Level 2: Object vs Pointer",
    description:
      "Decide whether to use an object or a pointer for dynamic allocation.",
    code: `class Car {
public:
  void start() { std::cout << "Car started!" << std::endl; }
};

Car car;
car.start();

Car* carPtr = new Car();
carPtr->start();
delete carPtr;` ,
    question: "When should you use 'new' to create objects dynamically on the heap?",
    options: [
      "Always",
      "When object lifetime needs to extend beyond the scope",
      "Never",
      "Only in embedded systems"
    ],
    correct: "When object lifetime needs to extend beyond the scope"
  },
  {
    title: "Level 3: Memory Management",
    description:
      "Avoid memory leaks by deleting heap-allocated objects.",
    code: `void createCar() {
  Car* car = new Car();
  car->start();
  // Missing delete!
}`,
    question: "What is missing in this code to prevent a memory leak?",
    options: [
      "return car;",
      "delete car;",
      "car = nullptr;",
      "car->stop();"
    ],
    correct: "delete car;"
  }
];

export default function CppConceptsGame() {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const current = levels[level];

  function checkAnswer(option) {
    setSelected(option);
    setResult(option === current.correct);
  }

  function nextLevel() {
    setSelected(null);
    setResult(null);
    setLevel((l) => Math.min(l + 1, levels.length - 1));
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🧠 C++ Concepts Game (Web Edition)
      </motion.h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <p>{current.description}</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            {current.code}
          </pre>
          <p className="font-medium">{current.question}</p>
          <div className="grid grid-cols-2 gap-2">
            {current.options.map((option, idx) => (
              <Button
                key={idx}
                variant={
                  selected === option
                    ? result
                      ? "success"
                      : "destructive"
                    : "outline"
                }
                onClick={() => checkAnswer(option)}
                disabled={!!selected}
              >
                {option}
              </Button>
            ))}
          </div>
          {selected && level < levels.length - 1 && (
            <Button onClick={nextLevel} className="mt-4">
              Next Level
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}