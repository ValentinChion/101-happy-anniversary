'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import Confetti from 'react-confetti';

const FloatingShape = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
      },
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        fontSize: '4rem',
        userSelect: 'none',
      }}
    >
      {children}
    </motion.div>
  );
};

export default function RockPaperScissorsTournament() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdecd0] flex flex-col items-center justify-center p-4 overflow-hidden">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={400}
        recycle
        zIndex={1000}
      />
      <div className="flex items-center justify-center">
        <FloatingShape>✊</FloatingShape>
        <FloatingShape>✋</FloatingShape>
        <FloatingShape>✌️</FloatingShape>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl relative z-10 bg-opacity-90 backdrop-blur-sm bg-white">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            >
              <CardTitle className="text-3xl sm:text-4xl font-extrabold text-center text-primary">
                Rock Paper Scissors Tournament
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center text-2xl font-bold text-primary"
            >
              Join us for an epic battle of wits and luck!
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Tonight</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>8:30 PM</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center text-muted-foreground"
            >
              Prove your mastery of rock, paper, and scissors in this thrilling
              tournament. Will you emerge as the ultimate champion?
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
