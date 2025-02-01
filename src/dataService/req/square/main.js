import { useQuery } from '@tanstack/react-query';
import fetchData from '@/lib/fetch';

export const usePayments = (locationId) =>
  useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const data = await fetch('/api/square');
      const jsonRes = await data.json();

      const ordersNbr =
        jsonRes?.orders?.reduce((acc, order) => {
          order?.line_items?.map((item) => {
            const money = item.total_money.amount;

            if (money >= 600) {
              acc += 1;
            } else {
              acc += 0.5;
            }
          });

          return acc;
        }, 0) || 0;

      console.log(ordersNbr);

      return Math.ceil(ordersNbr);
    },
    refetchInterval: 30000,
  });
