'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Clock, CalendarDays } from 'lucide-react';

// Set the announcement time to today at 22:00
const TODAY = new Date();
const ANNOUNCEMENT_HOUR = 22;
const ANNOUNCEMENT_MINUTE = 0;

const ANNOUNCEMENT_DATE = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate(),
  ANNOUNCEMENT_HOUR,
  ANNOUNCEMENT_MINUTE
);

function getTimeRemaining(endtime) {
  const total = endtime.getTime() - Date.now();
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, hours, minutes, seconds };
}

export default function RaffleAnnouncement() {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(ANNOUNCEMENT_DATE)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(ANNOUNCEMENT_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdecd0] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center text-primary flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Résultats de la tombola
            <Trophy className="h-8 w-8 text-yellow-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-xl text-muted-foreground">
            Êtes-vous prêt à gagner le gros lot ?
          </p>
          <div className="flex justify-center items-center gap-2 text-primary">
            <CalendarDays className="h-6 w-6" />
            <span className="text-lg font-semibold">
              {ANNOUNCEMENT_DATE.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 text-primary">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-semibold">
              {ANNOUNCEMENT_DATE.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <motion.div
            className="grid grid-cols-3 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {['Hours', 'Minutes', 'Seconds'].map((unit, index) => (
              <motion.div
                key={unit}
                className="bg-secondary rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-3xl font-bold block">
                  {timeRemaining[unit.toLowerCase()]
                    .toString()
                    .padStart(2, '0')}
                </span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-muted-foreground">
              C'est bientôt l'heure !!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
