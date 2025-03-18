import { ScheduleXCalendar } from '@schedule-x/react';

import '@schedule-x/theme-default/dist/index.css';
import Eventlist from '../../components/common/Eventlist';
import useCalendar from '@/hooks/useCalendar';


function Schedule() {

    const { events, calander } = useCalendar()

    return (

        <div className='flex w-full justify-around flex-col-reverse gap-4 mt-4 '>


            <Eventlist events={events} />
            <ScheduleXCalendar calendarApp={calander} />
        </div>

    );
}

export default Schedule;