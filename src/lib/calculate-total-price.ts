import {
  differenceInHours,
  differenceInDays,
  differenceInMonths,
} from 'date-fns';

export function calculateTotalPrice(
  start: string,
  end: string,
  price: number,
  type: string,
) {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate <= startDate) return 0;

  let quantity = 0;

  switch (type) {
    case 'hour':
      quantity = Math.ceil(differenceInHours(endDate, startDate));
      break;
    case 'day':
      quantity = Math.ceil(differenceInDays(endDate, startDate));
      break;
    case 'month':
      quantity = Math.ceil(differenceInMonths(endDate, startDate));
      break;
    default:
      quantity = 0;
  }

  return quantity * price;
}
