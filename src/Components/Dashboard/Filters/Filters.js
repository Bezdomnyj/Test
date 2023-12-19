import './Filters.css';
import { useCallback, useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../../../Contexts/DashboardContext';

const Filters = () => {

    const [startingMonth, setStartingMonth] = useState(0);
    const [endingMonth, setEndingMonth] = useState(11);

    const dashboardContext = useContext(DashboardContext);

    const monthHandler = useCallback(
        (changeEvent, type) => {
            switch (type) {
                case 'starting':
                    setStartingMonth(parseInt(changeEvent.target.value))
                    break;
                case 'ending':
                    setEndingMonth(parseInt(changeEvent.target.value))
                    break;
                default:
                    break;
            }
        }, []
    )

    useEffect(
        () => {
            const hiddenMonths = (Array.from(dashboardContext.monthsLabel.keys())).filter(
                element => {
                    return parseInt(element) < startingMonth || parseInt(element) > endingMonth
                }
            )
            dashboardContext.setHiddenMonths(hiddenMonths);
        }, [startingMonth, endingMonth]
    )

    return (
        <>
            <div className='filters-title'>Filtra per intervallo di data</div>
            <form className='input-container'>
                <select className='filters-select' name="startingMonth" onChange={(e) => monthHandler(e, 'starting')}>
                    {
                        dashboardContext.monthsLabel.map(
                            (monthLabel, index) => {
                                return (
                                    <option className='filters-option' selected={index == startingMonth} value={dashboardContext.monthsLabel.indexOf(monthLabel)} disabled={index > endingMonth}>{monthLabel}</option>
                                )
                            }
                        )
                    }
                </select>
                <select className='filters-select' name="endingMonth" onChange={(e) => monthHandler(e, 'ending')}>
                    {
                        dashboardContext.monthsLabel.map(
                            (monthLabel, index) => {
                                return (
                                    <option className='filters-option' selected={index == endingMonth} value={dashboardContext.monthsLabel.indexOf(monthLabel)} disabled={index <= startingMonth}>{monthLabel}</option>
                                )
                            }
                        )
                    }</select>
            </form>
        </>
    )
}

export default Filters;
