import { ScheduleXCalendar } from '@schedule-x/react';

import '@schedule-x/theme-default/dist/index.css';
import Eventlist from '../../components/common/Eventlist';
import useCalendar from '@/hooks/useCalendar';
import { Button } from '@/components/ui/button';


function Schedule() {

    const { events, calander } = useCalendar()

    return (

        <div className='flex w-full justify-around flex-col  '>
           
                <Button className={"text-white text-[13px] w-28 my-3 ml-20"}>+ Add Events</Button>

            {/* <Eventlist events={events} /> */}
            <ScheduleXCalendar calendarApp={calander} />
        </div>

    );
}

export default Schedule;