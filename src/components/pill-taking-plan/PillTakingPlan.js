import React from 'react';
import './pill-taking-plan.scss';
import { ReactComponent as PlaneIcon } from "../../assets/icons/plane.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/next.svg";
import * as placeNameFormatter from "../../services/placeNameFormatter"

export const PillTakingPlan = ({
                                   lastPillDateTimeInStandardTimezone,
                                   lastPillDateTimeInDestinationTimezone,

                                   firstPillDateTimeInDestinationTimezone,
                                   firstPillDateTimeInStandardTimezone,

                                   arrivalDateTimeWithDestinationOffset,
                                   arrivalDateTimeWithStandardOffset,

                                   destinationCityInfo,
                                   standardCityInfo,

                                   timeDifferenceInMinutes
}) => {

    const standardCityName = placeNameFormatter.getPlaceFullName(standardCityInfo);
    const destinationCityName = placeNameFormatter.getPlaceFullName(destinationCityInfo);

    return (
        <div className="PillTakingPlan_wrapper">
            <h1 className="PillTakingPlan_title">Pill taking plan</h1>

            <div className="PillTakingPlan_cards_wrapper">

                <div className="PillTakingPlan_cards_card">
                    <div className="PillTakingPlan_cards_card_title">Last pill <strong>before </strong>the arrival:</div>
                    <div className="PillTakingPlan_cards_card_time">
                         {lastPillDateTimeInStandardTimezone.format("HH:mm")}
                    </div>
                    <div className="PillTakingPlan_cards_card_date">
                        {lastPillDateTimeInStandardTimezone.format("DD-MM-YYYY")}
                    </div>
                    <div className="PillTakingPlan_cards_card_place">
                        Time in {standardCityName}
                    </div>
                    <div className="PillTakingPlan_cards_card_otherPlace">
                        Date and time in <strong>{destinationCityName}</strong>:
                        <br/>
                        {lastPillDateTimeInDestinationTimezone.format('DD-MM-YYYY HH:mm')}
                    </div>
                </div>

                <div className="PillTakingPlan_cards_transition_wrapper">
                    <ArrowIcon className="PillTakingPlan_cards_transition_icon" />
                </div>

                <div className="PillTakingPlan_cards_card PillTakingPlan_cards_card--arrival">
                    <PlaneIcon className="PillTakingPlan_cards_card--arrival_icon" />

                    <div className="PillTakingPlan_cards_card_title">You arrive in {destinationCityName} at:
                        <br/>
                    <strong className="PillTakingPlan_cards_card--arrival_timezoneChange">  {timeDifferenceInMinutes === 0 ? 'NO TIMEZONE CHANGE' : 'CHANGE OF TIMEZONE'}</strong>
                    </div>

                    <div>
                        <div className="PillTakingPlan_cards_card_time PillTakingPlan_cards_card_time--arrival">
                            {arrivalDateTimeWithDestinationOffset.format("HH:mm")}
                        </div>

                        <div className="PillTakingPlan_cards_card_date PillTakingPlan_cards_card_date--arrival">
                            {arrivalDateTimeWithDestinationOffset.format("DD-MM-YYYY")}
                        </div>

                        <div className="PillTakingPlan_cards_card_place">
                            Time in {destinationCityName}
                        </div>
                    </div>

                    <div className="PillTakingPlan_cards_card_otherPlace">
                        Date and time in <strong>{standardCityName}</strong>:
                        <br/>
                        {arrivalDateTimeWithStandardOffset.format("DD-MM-YYYY HH:mm")}
                    </div>

                 </div>

                <div  className="PillTakingPlan_cards_transition_wrapper">
                    <ArrowIcon className="PillTakingPlan_cards_transition_icon" />
                </div>

                <div className="PillTakingPlan_cards_card">

                    <div className="PillTakingPlan_cards_card_title">First pill <strong>after</strong> the arrival:</div>
                    <div className="PillTakingPlan_cards_card_time">
                        {firstPillDateTimeInDestinationTimezone.format("HH:mm")}
                    </div>
                    <div className="PillTakingPlan_cards_card_date">
                        {firstPillDateTimeInDestinationTimezone.format("DD-MM-YYYY")}
                    </div>
                    <div className="PillTakingPlan_cards_card_place">Time in {destinationCityName}</div>
                    <div className="PillTakingPlan_cards_card_otherPlace">
                        Date and time in <strong>{standardCityName}</strong>:
                        <br/>
                        {firstPillDateTimeInStandardTimezone.format('DD-MM-YYYY HH:mm')}
                    </div>

                </div>

            </div>
        </div>
    )
};
