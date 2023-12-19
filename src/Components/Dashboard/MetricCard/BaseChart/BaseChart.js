import './BaseChart.css';
import { useCallback, useContext, useMemo } from 'react';
import { DashboardContext } from '../../../../Contexts/DashboardContext';

const BaseChart = props => {

    const {
        metricData
    } = props;

    const dashboardContext = useContext(DashboardContext);

    const getMonthByDate = useCallback(
        date => dashboardContext.monthsLabel[new Date(date).getMonth()], [dashboardContext]
    )

    const averageValue = useMemo(
        () => {
            return metricData.reduce((a, b) => a + b.value, 0) / metricData.length;
        }, [metricData]
    )

    return (
        <>
            <div className='chart-container'>
                {metricData.map(
                    (metricElement, index) => {
                        return (
                            <div className={`element-container${dashboardContext.hiddenMonths.includes(index) ? ` hidden` : ''}`} style={{background: metricElement.value > averageValue ? 'green' : 'red'}}>
                                <div className='date'>{getMonthByDate(metricElement.date)}</div>
                                <div className='value'>{metricElement.value}</div>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}

export default BaseChart;