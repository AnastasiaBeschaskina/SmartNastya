import { useState } from "react";
import { Button } from "./components/button.js";
import "./components/button.css";

const questions = [
  {
    question: "Кто лучший wealth-менеджер в SMARTGEN?",
    correctAnswers: ["Настя", "Nastya", "Anastasia"],
  },
  {
    question: "Кого больше всего любят клиенты?",
    correctAnswers: ["Настя", "Nastya", "Anastasia"],
  },
  {
    question: "Кто самый умный в команде?",
    correctAnswers: ["Настя", "Nastya", "Anastasia"],
  },
  {
    question: "Кто не любит шашлыки?",
    correctAnswers: ["Настя", "Nastya", "Anastasia"],
  },
];

export default function FunIntroQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleCheck = () => {
    const answerNormalized = answer.trim().toLowerCase();
    const currentCorrectAnswers = questions[currentQuestion].correctAnswers;

    const isCorrect = currentCorrectAnswers.some(
      (correct) => correct.toLowerCase() === answerNormalized
    );

    if (isCorrect) {
      setShowSuccess(true);
      setError("");

      setTimeout(() => {
        setShowSuccess(false);
        setAnswer("");
        setAttempts(0);
        setCurrentQuestion((prev) => (isLastQuestion ? prev : prev + 1));
      }, 2500); // Показываем успех 1.5 секунды
    } else {
      setAttempts((prev) => {
        const newAttempts = prev + 1;

        if (newAttempts === 1) {
          setError(
            "🔥 Подсказка: начинается на «Анаста» и заканчивается на «сия»"
          );
        } else if (newAttempts === 2) {
          setError(
            "❌ Попробуйте ещё раз, вы обязательно справитесь! «Анаста.....»"
          );
        } else if (answerNormalized.includes("марк")) {
          setError("🔥 Почти! 'Марк' — близко, подумай ещё раз.");
        } else {
          setError("❌ Попробуйте ещё раз, вы обязательно справитесь!");
        }

        return newAttempts;
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-pink-100 to-yellow-100 text-center"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        color: "#111",
        borderRadius: "16px",
        padding: "52px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        margin: "0 auto",
      }}
    >
      {!started ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Привет, коллеги!</h1>
          <h2 className="text-xl mb-6">
            Сегодня вы узнаете всю правду обо мне…
          </h2>
          <Button onClick={() => setStarted(true)}>Начнем</Button>
        </div>
      ) : (
        <div className="max-w-md w-full">
          {showSuccess ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg font-bold text-green-700">
                Верно! Это я 😎
              </p>
              <img src={process.env.PUBLIC_URL + "/стикер лицо.png"} alt="Настя" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={{ textAlign: "center" }}
                />
                {!isLastQuestion && (
                  <Button onClick={handleCheck}>Проверить</Button>
                )}
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
