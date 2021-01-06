import React from 'react';
import DatePicker from "react-datepicker";
import {ReactComponent as CalendarIcon} from '../../assets/icons/calendar.svg'
import {ReactComponent as ClockIcon} from '../../assets/icons/clock.svg'
import {ReactComponent as DestinationIcon} from '../../assets/icons/destination.svg'
import {ReactComponent as HomeIcon} from '../../assets/icons/home.svg'
import "./form.scss";

export const Form = ({
                         rawArrivalDateTimeFormValue,
                         setRawArrivalDateTimeFormValue,

                         pillTakingTimeInStandardTimezoneFormValue,
                         setPillTakingTimeInStandardTimezoneFormValue,

                         standardCityFormValue,
                         handleStandardCityFormChange,
                         standardCityInfo,
                         setStandardCity,
                         multipleCitiesChoiceInStandardTimezone,

                         destinationCityInfo,
                         setDestinationCity,
                         destinationCityFormValue,
                         handleDestinationCityFormChange,
                         multipleCitiesChoiceInDestinationTimezone
}) => {

    const renderMultipleCitiesChoiceBox = (cities, setCity) => {
        if (cities.length < 2) {
            return null;
        }

        return (
            <div className="Form_field_multipleCities_wrapper">
                <div className="Form_field_multipleCities_title">Which city did you mean?</div>
                {cities.map(city => {
                    return<button
                        onClick={() => setCity(city)}
                        key={city.city + city.country}
                        className="Form_field_multipleCities_button">{city.city}, {city.country}</button>
                })}
            </div>
        )
    };

    const renderHint = (cityInfo) => {
        if (!cityInfo) {
            return <span className="Form_field_hint Form_field_hint--danger">You have to choose a city. If you can't find yours, look for a bigger city in the area.</span>
        }
        return (
            <span className="Form_field_hint">You chose {cityInfo.name}, {cityInfo.country}.</span>
        )
    };

    const setRawArrivalDateTimeOrDefault = (date) => {
        if (!date) {
            setRawArrivalDateTimeFormValue(new Date());
            return;
        }

        setRawArrivalDateTimeFormValue(date);
    };

    const setStandardPillTakingTimeOrDefault = (date) => {
        if (!date) {
            setPillTakingTimeInStandardTimezoneFormValue(new Date());
            return;
        }

        setPillTakingTimeInStandardTimezoneFormValue(date);
    };

    return (
        <div className="Form_wrapper">

            <div>

                <h2>STANDARD PLACE</h2>

                <div className="Form_field_wrapper">

                    <div className="Form_field_icon_wrapper" >
                        <HomeIcon className="Form_field_icon" />
                    </div>

                        <div className="form_wrapper">
                            <label htmlFor="your-city" className="form_label">YOU ARE IN:</label>
                            <input
                                id="your-city"
                                required
                                value={standardCityFormValue}
                                onChange={(e) => handleStandardCityFormChange(e)}
                                className="form_control" />
                            {renderHint(standardCityInfo)}
                        </div>

                </div>

                {renderMultipleCitiesChoiceBox(multipleCitiesChoiceInStandardTimezone, setStandardCity)}

                <div className="Form_field_wrapper">
                    <div className="Form_field_icon_wrapper">
                        <ClockIcon className="Form_field_icon" />
                    </div>

                    <div className="form_wrapper">
                        <label htmlFor="pill-taking-time" className="form_label">YOU ARE NORMALLY TAKING YOUR PILL AT:</label>
                        <DatePicker
                            id="pill-taking-time"
                            required
                            className="form_control"
                            selected={pillTakingTimeInStandardTimezoneFormValue}
                            onChange={date => setStandardPillTakingTimeOrDefault(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={5}
                            timeCaption="Time"
                            timeFormat="HH:mm"
                            dateFormat="HH:mm"
                        />
                    </div>
                </div>

            </div>

            <div className="Form_divider"></div>

            <div>
                <h2>DESTINATION PLACE</h2>

                <div className="Form_field_wrapper">
                    <div className="Form_field_icon_wrapper">
                        <DestinationIcon className="Form_field_icon" />
                    </div>

                    <div className="form_wrapper">
                        <label htmlFor="destination-city" className="form_label">YOU WILL BE IN:</label>
                        <input
                            id="destination-city"
                            required
                            value={destinationCityFormValue}
                            onChange={(e) => handleDestinationCityFormChange(e)}
                            className="form_control" />
                        {renderHint(destinationCityInfo)}
                    </div>
                </div>

                {renderMultipleCitiesChoiceBox(multipleCitiesChoiceInDestinationTimezone, setDestinationCity)}

                <div className="Form_field_wrapper">
                    <div className="Form_field_icon_wrapper">
                        <CalendarIcon className="Form_field_icon" />
                    </div>

                    <div className="form_wrapper">
                        <label htmlFor="destination-arrival-time" className="form_label">YOU WILL ARRIVE THERE AT (in destination local time):</label>
                        <DatePicker
                            id="destination-arrival-time"
                            required
                            className="form_control"
                            selected={rawArrivalDateTimeFormValue}
                            onChange={date => setRawArrivalDateTimeOrDefault(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="dd-MM-yyyy HH:mm"
                        />

                        <span className="Form_field_hint">Hint: If you are travelling by plane time on the ticket is usually the time in local destination time</span>
                    </div>
                </div>

            </div>

        </div>

    )
};
