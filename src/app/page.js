'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePayments } from '@/dataService/req/square/main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CounterLevels />
    </QueryClientProvider>
  );
}

function CounterLevels() {
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);

  const levelThresholds = [20, 40, 70, 100, 130];
  const levelTitles = [
    '0 Consos',
    '20 Consos',
    '40 Consos',
    '70 Consos',
    '100 Consos',
    '130 Consos',
  ];
  const levelDescriptions = [
    '😭 Pas encore de réductions 😭',
    '🏁 10% de réduction, ça commence ! 🏁',
    '💵 15% de réduction, les réductions pleuvent 💵',
    '💪 20% de réduction, encore un petit effort 💪',
    "🤑 25% de réduction, mais c'est moins cher que gratuit 🤑",
    '🥃 TOURNÉE DE SHOTS !! 🥃',
  ];

  const { data: consos } = usePayments();

  console.log(consos);

  useEffect(() => {
    const currentLevel =
      levelThresholds.findIndex((threshold) => consos < threshold) + 1;
    setLevel(Math.min(currentLevel, 5));

    const prevThreshold = levelThresholds[currentLevel - 2] || 0;
    const nextThreshold =
      levelThresholds[currentLevel - 1] ||
      levelThresholds[levelThresholds.length - 1];
    const newProgress =
      ((consos - prevThreshold) / (nextThreshold - prevThreshold)) * 100;

    if (newProgress > progress) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }

    setProgress(newProgress);
  }, [consos, progress]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdecd0] p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Happy Hour inversé 🍻
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Counter */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <p className="text-7xl font-bold mb-2 text-[#002d44]">{consos}</p>
            <Badge
              variant="secondary"
              className="text-xl px-4 py-1 bg-[#fdecd0]"
            >
              <p className="text-[#002d44]">Consos</p>
            </Badge>
            <Progress
              value={progress}
              className={`w-full max-w-md ${
                animate ? 'progress-animation' : ''
              }`}
            />
          </div>

          {/* Right Column - Level Descriptions */}
          <div className="flex-1 border-l border-gray-200 pl-8 space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Réductions</h3>
            {levelDescriptions.map((desc, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg transition-colors ${
                  level === index + 1
                    ? 'bg-[#fdecd0] text-secondary-foreground'
                    : 'bg-background'
                }`}
              >
                <h4 className="font-semibold text-lg mb-1">
                  {levelTitles[index]}
                </h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
