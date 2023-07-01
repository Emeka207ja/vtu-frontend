import moment from 'moment-timezone';

export const genReqId = (): string => {
  const lagosTimezone = 'Africa/Lagos';
  const currentDate = moment().tz(lagosTimezone);

  const year = currentDate.format('YYYY');
  const month = currentDate.format('MM');
  const day = currentDate.format('DD');
  const hour = currentDate.format('HH');
  const minute = currentDate.format('mm');

  const requestID = `${year}${month}${day}${hour}${minute}`;

  const additionalString = 'ad8ef08acd8fc0f';
  const finalRequestID = requestID + additionalString;

  return finalRequestID;
};
