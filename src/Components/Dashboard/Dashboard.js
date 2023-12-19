import './Dashboard.css';
import { useEffect, useMemo, useState } from 'react'
import { DashboardContext } from '../../Contexts/DashboardContext';
import Filters from './Filters/Filters';
import MetricCard from './MetricCard/MetricCard';

const Dashboard = () => {

    const [metrics, setMetrics] = useState(null);
    const [hiddenMonths, setHiddenMonths] = useState([]);

    const dashboardTitle = useMemo(
        () => 'Metriche', []
    );

    const monthsLabel = useMemo(
        () => [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ], []
    );
    
    useEffect(
        () => {
            fetch('/data.json')
                .then(
                    result => result.json()
                )
                .then(
                    data => setMetrics(data.metrics)
                )
        }, []
    )

    return (
        <>
            {metrics !== null ?
                <DashboardContext.Provider value={{ metrics, setMetrics, monthsLabel, hiddenMonths, setHiddenMonths }}>
                    <div className='dashboard-title'>{dashboardTitle}</div>
                    <div className='filters-container'>
                        <Filters />
                    </div>
                    <div className='metrics'>
                        {/* Ho scelto di passare l'index della metrica per non ripetere i dati contenuti nel Context */}
                        { metrics.map(
                            (_, index) => <MetricCard key={`metric-${index}`} metricIndex={index}/>
                        )} 
                    </div>
                </DashboardContext.Provider>
                :
                <div>Loader</div>
            }
        </>
    )
}

export default Dashboard;