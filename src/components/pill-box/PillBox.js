import React from 'react';
import "./pill-box.scss"
import * as placeNameFormatter from '../../services/placeNameFormatter';

export const PillBox = ({ timeDifferenceInMinutes, destinationCityInfo, areTimezonesSet }) => {
    const isDestinationAheadOrBehindStandardTime = timeDifferenceInMinutes > 0 ? 'ahead' : 'behind';
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const timeDifferenceInHoursAbsAndFloored = Math.floor(Math.abs(timeDifferenceInMinutes / 60));
    const hourOrHours = timeDifferenceInHoursAbsAndFloored > 1 ? 'hours' : 'hour';

    const destinationCityName = placeNameFormatter.getPlaceFullName(destinationCityInfo);

    const getTimezoneTotalTimeDiffText = () => {
        if (timeDifferenceInMinutes === 0) {
            return (
                <React.Fragment>
                    {destinationCityName} is in the same timezone
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {destinationCityName} is
                   <strong> {timeDifferenceInHoursAbsAndFloored} {hourOrHours}</strong> {getTimezoneMinutesDiffText()} {isDestinationAheadOrBehindStandardTime}
                </React.Fragment>
            )
        }
    };

    const getTimezoneMinutesDiffText = () => {
        if (timeDifferenceInHours % 1 === 0) {
            return '';
        } else if (Math.abs(timeDifferenceInHours % 1) === 0.5) {
            return  'and 30 minutes';
        } else if (Math.abs(timeDifferenceInHours % 1) === 0.75) {
            return 'and 45 minutes ';
        } else if (Math.abs(timeDifferenceInHours % 1) === 0.25) {
            return 'and 15 minutes';
        }
    };

    return (
        <div className="PillBox">
            <div className="PillBox_pills--rowUp"></div>
            {areTimezonesSet &&
            <div className="PillBox_timeDifference">
                {getTimezoneTotalTimeDiffText()}
            </div>}
            <div className="PillBox_pills--rowDown"></div>
        </div>
    )
};
