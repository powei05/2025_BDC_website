import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Theater() {
  const [step, setStep] = useState(0);

  
  const components = [
    <Cineman key="cineman" />,
    <Movie key="movie" />,
    <Dashboard key="dashboard" />
  ];

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step} // 為切換動畫設關鍵 key
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {components[step]}
        </motion.div>
      </AnimatePresence>
      <button onClick={() => setStep((step + 1) % components.length)}>
        Next
      </button>
    </div>
  );
}


function Cineman() {
  return <div>
    
  </div>
}

function Movie() {
  return <h1>Movie Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}