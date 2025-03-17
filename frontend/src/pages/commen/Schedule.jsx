import { ScheduleXCalendar } from '@schedule-x/react';

import '@schedule-x/theme-default/dist/index.css';
import Eventlist from '../../components/common/Eventlist';
import useCalendar from '@/hooks/useCalendar';
import SideBar from '@/layouts/SideBar';


function Schedule() {

    const { events, calander } = useCalendar()

    return (
        <section className='flex gap-4'>
            <SideBar />
            <div className='flex w-full justify-center  gap-4 mt-4 bg-gray-100 max-h-screen'>


                <Eventlist events={events} />


                <ScheduleXCalendar calendarApp={calander} />
            </div>
        </section>

    );
}

export default Schedule;