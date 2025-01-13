import type { EmotionKey } from '@models/common';

export type DailyAmountType = {
  date: string;
  amount: number;
};
export type EmotionAmountTotalType = {
  emotion: EmotionKey;
  amount: number;
};
export type DashboardDataType = {
  dailyAmount: DailyAmountType[];
  emotionAmountTotal: EmotionAmountTotalType[];
  satisfactionAverage: number;
};
