import './App.scss';
import React, { useEffect, useState } from 'react';
import cityTimezones from "city-timezones";
import { PillBox } from "./pill-box/PillBox";
import { PillTakingPlan } from "./pill-taking-plan/PillTakingPlan";
import { Form } from "./form/Form";
import * as dateTimeService from "../services/dateTimeService";

const initialValues = {
    standardCityFormValue: "Warsaw",
    destinationCityFormValue: "Bangkok",
    standardCityInfo: {name: "Warsaw", country: "Poland", timezone: "Europe/Warsaw"},
    destinationCityInfo: {name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok"},
};

const  App = () => {
    const [pillTakingTimeInStandardTimezoneFormValue, setPillTakingTimeInStandardTimezoneFormValue] = useState(new Date());
    const [rawArrivalDateTimeFormValue, setRawArrivalDateTimeFormValue] = useState(new Date());
    const [standardCityFormValue, setStandardCityFormValue] = useState(initialValues.standardCityFormValue);
    const [destinationCityFormValue, setDestinationCityFormValue] = useState(initialValues.destinationCityFormValue);

    const [standardCityInfo, setStandardCityInfo] = useState(initialValues.standardCityInfo);
    const [destinationCityInfo, setDestinationCityInfo] = useState(initialValues.destinationCityInfo);

    const [multipleCitiesChoiceInStandardTimezone, setMultipleCitiesChoiceInStandardTimezone] = useState([]);
    const [multipleCitiesChoiceInDestinationTimezone, setMultipleCitiesChoiceInDestinationTimezone] = useState([]);

    const [arrivalDateTimesWithOffsets, setArrivalDateTimesWithOffsets] = useState(null);

    const [timeDifferenceInMinutes, setTimeDifferenceInMinutes] = useState(null);
    const [pillTakingDateTimes, setPillTakingTimes] = useState(null);

    const [areTimezonesSet, setAreTimezonesSet] = useState(false);
    const [allTimesAreCalculate, setAllTimesAreCalculated] = useState(false);


    useEffect(() => {
        setAreTimezonesSet(false);
        const areTimezonesSet = standardCityInfo?.timezone && destinationCityInfo?.timezone;

        if (areTimezonesSet) {
            setArrivalDateTimesWithOffsets(
                {
                    destination: dateTimeService.getArrivalDateAndTimeWithDestinationOffset(rawArrivalDateTimeFormValue, destinationCityInfo.timezone),
                    standard: dateTimeService.getArrivalDateAndTimeWithStandardOffset(rawArrivalDateTimeFormValue,  destinationCityInfo.timezone, standardCityInfo.timezone)
                }
            );

            setAreTimezonesSet(true);
        }
    }, [pillTakingTimeInStandardTimezoneFormValue, rawArrivalDateTimeFormValue, standardCityInfo, destinationCityInfo]);


    useEffect(() => {
        setAllTimesAreCalculated(false);

        if (areTimezonesSet) {
            const timeDiff = dateTimeService.calculateTimeDifference(arrivalDateTimesWithOffsets.destination, arrivalDateTimesWithOffsets.standard);
            setTimeDifferenceInMinutes(timeDiff);

            const pillTakingTimes = dateTimeService.calculatePillTakingTimes(arrivalDateTimesWithOffsets, pillTakingTimeInStandardTimezoneFormValue, destinationCityInfo.timezone, standardCityInfo.timezone);
            setPillTakingTimes(pillTakingTimes);

            setAllTimesAreCalculated(true);
        }

    }, [areTimezonesSet, pillTakingTimeInStandardTimezoneFormValue, arrivalDateTimesWithOffsets]);

    const lookForCitiesWithTimezoneByCity = (e) => {
        const { target } = e;
        const { value } = target;

        return cityTimezones.lookupViaCity(value);
    };

    const setStandardCity = (city) => {
        if (!city) {
            setStandardCityInfo(null);
        } else {
            setStandardCityInfo({name: city.city, country: city.country, timezone: city.timezone});
        }
    };

    const handleStandardCityFormChange = (e) => {
        setStandardCityFormValue(e.target.value);

        setMultipleCitiesChoiceInStandardTimezone([]);
        const citiesInStandardTimezone = lookForCitiesWithTimezoneByCity(e);

        if (citiesInStandardTimezone.length === 1) {
            setStandardCity(citiesInStandardTimezone[0]);
        } else if (citiesInStandardTimezone.length > 1) {
            setMultipleCitiesChoiceInStandardTimezone(citiesInStandardTimezone);
            setStandardCity(null);
        } else {
            setStandardCity(null);
        }
    };

    const setDestinationCity = (city) => {
        if (!city) {
            setDestinationCityInfo(null);
        } else {
            setDestinationCityInfo({name: city.city, country: city.country, timezone: city.timezone});
        }
    };

    const handleDestinationCityFormChange = (e) => {
        setDestinationCityFormValue(e.target.value);

        setMultipleCitiesChoiceInDestinationTimezone([]);
        const destinationCityTimezone = lookForCitiesWithTimezoneByCity(e);

        if (destinationCityTimezone.length === 1) {
            setDestinationCity(destinationCityTimezone[0]);
        } else if (destinationCityTimezone.length > 1) {
            setMultipleCitiesChoiceInDestinationTimezone(destinationCityTimezone);
            setDestinationCity(null);
        } else {
            setDestinationCity(null);
        }
    };

  return (
    <div className="App_wrapper">
            <h1>Pill lost in timezone</h1>

            <Form
                rawArrivalDateTimeFormValue={rawArrivalDateTimeFormValue}
                setRawArrivalDateTimeFormValue={setRawArrivalDateTimeFormValue}

                pillTakingTimeInStandardTimezoneFormValue={pillTakingTimeInStandardTimezoneFormValue}
                setPillTakingTimeInStandardTimezoneFormValue={setPillTakingTimeInStandardTimezoneFormValue}

                standardCityFormValue={standardCityFormValue}
                standardCityInfo={standardCityInfo}
                handleStandardCityFormChange={handleStandardCityFormChange}
                multipleCitiesChoiceInStandardTimezone={multipleCitiesChoiceInStandardTimezone}
                setStandardCity={setStandardCity}

                destinationCityInfo={destinationCityInfo}
                destinationCityFormValue={destinationCityFormValue}
                handleDestinationCityFormChange={handleDestinationCityFormChange}
                multipleCitiesChoiceInDestinationTimezone={multipleCitiesChoiceInDestinationTimezone}
                setDestinationCity={setDestinationCity}
            />

            <PillBox
                timeDifferenceInMinutes={timeDifferenceInMinutes}
                destinationCityInfo={destinationCityInfo}
                areTimezonesSet={areTimezonesSet}
            />

        {allTimesAreCalculate &&
        <PillTakingPlan
            lastPillDateTimeInStandardTimezone={pillTakingDateTimes.lastPillDateTimeInStandardTimezone}
            lastPillDateTimeInDestinationTimezone={pillTakingDateTimes.lastPillDateTimeInDestinationTimezone}
            firstPillDateTimeInDestinationTimezone={pillTakingDateTimes.firstPillDateTimeInDestinationTimezone}
            firstPillDateTimeInStandardTimezone={pillTakingDateTimes.firstPillDateTimeInStandardTimezone}

            arrivalDateTimeWithDestinationOffset={arrivalDateTimesWithOffsets.destination}
            arrivalDateTimeWithStandardOffset={arrivalDateTimesWithOffsets.standard}

            timeDifferenceInMinutes={timeDifferenceInMinutes}

            standardCityInfo={standardCityInfo}
            destinationCityInfo={destinationCityInfo}
        />}


    </div>
  );
};

export default App;
