import { ScheduleXCalendar } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
import useCalendar from '@/hooks/useCalendar';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from 'react';

function Schedule() {
    const { calander } = useCalendar();
    const [selected, setSelected] = useState("view");

    return (
        <div className='flex flex-col w-full items-center  '>
            {/* Styled Toggle Switch */}
            <div className="bg-gray-100 p-[6px] rounded-full flex shadow-md my-4">
                <ToggleGroup
                    type="single"
                    value={selected}
                    onValueChange={(val) => val && setSelected(val)}
                    className="flex w-64 relative"
                >
                    {/* Animated Background Toggle */}
                    <div className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-transform duration-200 ease-in-out
                        ${selected === "edit" ? "translate-x-full" : "translate-x-0"}`}
                    ></div>

                    {/* View Events Button */}
                    <ToggleGroupItem
                        value="view"
                        className={`w-1/2 px- py-2 text-sm font-medium text-center relative z-10 transition-colors duration-200
                            ${selected === "view" ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        View Events
                    </ToggleGroupItem>

                    {/* Edit Event Button */}
                    <ToggleGroupItem
                        value="edit"
                        className={`w-1/2 px-5 py-2 text-sm font-medium text-center relative z-10 transition-colors duration-200
                            ${selected === "edit" ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Edit Event
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {selected === "view" ? <ScheduleXCalendar calendarApp={calander} /> : "edit events"}


        </div>
    );
}

export default Schedule;
