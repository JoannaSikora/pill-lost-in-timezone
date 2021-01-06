import moment from "moment-timezone";

const getLastPillDates = (dayCurrentPillTakingTime, arrivalDateAndTimeWithStandardOffset, dayCurrentPillTakingTimeAtDestination) => {
    let standard;
    let destination;

    if (dayCurrentPillTakingTime <= arrivalDateAndTimeWithStandardOffset) {
        standard = dayCurrentPillTakingTime;
        destination = dayCurrentPillTakingTimeAtDestination;
    } else {
        standard = dayCurrentPillTakingTime.clone().subtract(1, 'day');
        destination = dayCurrentPillTakingTimeAtDestination.clone().subtract(1, 'day');
    }

    return {standard, destination};
};

const getFirstPillDates = (dayCurrentPillTakingTime, arrivalDateAndTimeWithStandardOffset, dayCurrentPillTakingTimeAtDestination) => {
    let standard;
    let destination;

    if (dayCurrentPillTakingTime > arrivalDateAndTimeWithStandardOffset) {
        standard = dayCurrentPillTakingTime;
        destination = dayCurrentPillTakingTimeAtDestination;
    } else {
        standard = dayCurrentPillTakingTime.clone().add(1, 'day');
        destination = dayCurrentPillTakingTimeAtDestination.clone().add(1, 'day');
    }

    return {standard, destination};
};

export const getArrivalDateAndTimeWithDestinationOffset = (rawArrivalDateAndTime, destinationTimezone) => {
    return moment.tz(moment(rawArrivalDateAndTime).format("YYYY-MM-DD HH:mm"), destinationTimezone);
};

export const getArrivalDateAndTimeWithStandardOffset = (rawArrivalDateAndTime, destinationTimezone, standardCityTimezone) => {
    return moment.tz(moment(rawArrivalDateAndTime).format("YYYY-MM-DD HH:mm"), destinationTimezone).clone().tz(standardCityTimezone);
};

export const getPillTakingTime = (standardPillTakingTime) => {
    return moment(standardPillTakingTime).format("HH:mm");
};

export const calculateTimeDifference = (arrivalDateAndTimeWithDestinationOffset, arrivalDateAndTimeWithStandardOffset) => {
    return (arrivalDateAndTimeWithDestinationOffset.utcOffset() - arrivalDateAndTimeWithStandardOffset.utcOffset());
};

export const calculatePillTakingTimes = (arrivalDateTimesWithOffsets, pillTakingTimeInStandardTimezoneFormValue, destinationTimezone, standardTimezone) => {
    const currentPillTakingTime = moment.tz(arrivalDateTimesWithOffsets.standard.clone().format("DD-MM-YYYY") + ' ' + getPillTakingTime(pillTakingTimeInStandardTimezoneFormValue), "DD-MM-YYYY HH:mm", standardTimezone);
    const currentPillTakingTimeAtDestination = moment(currentPillTakingTime).tz(destinationTimezone);


    const lastPillDateTimeInStandardTimezone = getLastPillDates(currentPillTakingTime, arrivalDateTimesWithOffsets.standard, currentPillTakingTimeAtDestination).standard;
    const firstPillDateTimeInStandardTimezone = getFirstPillDates(currentPillTakingTime, arrivalDateTimesWithOffsets.standard, currentPillTakingTimeAtDestination).standard;
    const firstPillDateTimeInDestinationTimezone = getFirstPillDates(currentPillTakingTime, arrivalDateTimesWithOffsets.standard, currentPillTakingTimeAtDestination).destination;
    const lastPillDateTimeInDestinationTimezone = getLastPillDates(currentPillTakingTime, arrivalDateTimesWithOffsets.standard, currentPillTakingTimeAtDestination).destination;

    return {lastPillDateTimeInStandardTimezone, firstPillDateTimeInStandardTimezone, lastPillDateTimeInDestinationTimezone, firstPillDateTimeInDestinationTimezone};
};
