import moment, {DurationInputArg1, DurationInputArg2, Moment} from 'moment';
import logger from '../../../config/logger';

export const isoDateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export function onGetAddedDate({
  date,
  amount,
  unit,
}: {
  date: string | Moment;
  amount: DurationInputArg1;
  unit: DurationInputArg2;
}): string {
  logger.debug(
    {
      date,
      amount,
      unit,
    },
    'Getting added date',
  );
  const addedDate = moment(date, isoDateFormat)
    .add(amount, unit)
    .format(isoDateFormat);
  logger.info(
    {
      addedDate,
    },
    'Got added date',
  );
  return addedDate;
}
