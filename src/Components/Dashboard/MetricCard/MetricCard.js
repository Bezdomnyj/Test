import './MetricCard.css';
import { useContext, useMemo } from 'react';
import BaseChart from './BaseChart/BaseChart';
import { DashboardContext } from '../../../Contexts/DashboardContext';

const MetricCard = props => {

    const {
        metricIndex,
        monthsLabel
    } = props;

    const dashboardContext = useContext(DashboardContext);

    const chartMetric = useMemo(() => 'Utenti Attivi', [])

    const metric = useMemo(
        () => {
            return dashboardContext !== null ? dashboardContext.metrics[metricIndex] : null;
        }, [metricIndex, dashboardContext]
    )

    return (
        <div className='metric-container'>
            <div className='metric-title'>{metric.name}</div>
            { metric ? 
                metric.name == chartMetric ? 
                    <BaseChart metricData={metric.data} monthsLabel={monthsLabel}/>
                    :
                    <BaseChart metricData={metric.data} monthsLabel={monthsLabel}/>
                : null
            }
        </div>
    )
}

export default MetricCard;
