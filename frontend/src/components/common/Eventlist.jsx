import React from 'react'
import { FaClock, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'; // Icons
import { Button } from '@/components/ui/button';
const Eventlist = ({ events }) => {
    return (
        <div className=' bg-white p-4 w-1/4  rounded-lg shadow-md overflow-y-auto'>
            <div className='flex  justify-between my-3 mb-5 items-center'>
                <h2 className='text-lg font-bold '>Events List</h2>
                <Button size={"sm"} className="text-xs p-2 bg-blue-500 text-white ">Add an event</Button>
            </div>
            {events.map((event, index) => (
                <div
                    key={index}
                    className='mb-4 p-3 rounded-lg shadow-sm bg-blue-50 border-l-4 border-blue-500'
                >
                    <div className='flex flex-row-reverse justify-between items-center'>{/* Edit and Delete Buttons */}
                        <div className='flex justify-end  space-x-2'>
                            <button
                                className='p-1 text-blue-600 hover:text-blue-800'
                            >
                                <FaEdit size={14} />
                            </button>
                            <button
                                className='p-1 text-red-600 hover:text-red-800'
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                        <h3 className='text-xs mb-2 font-semibold text-blue-900'>
                            {event.title}
                        </h3></div>
                    <p className='text-[10px] flex items-center text-blue-600'>
                        <FaClock className='mr-2' /> {event.start}
                    </p>
                    <p className='text-[10px] flex items-center text-blue-600'>
                        <FaClock className='mr-2' /> {event.end}
                    </p>
                    <p className='text-[10px] flex items-center text-blue-600'>
                        <FaMapMarkerAlt className='mr-2' /> {event.location}
                    </p>
                    <p className='text-[10px] flex items-center text-blue-600'>
                        <FaUsers className='mr-2' /> {event.people.join(', ')}
                    </p>

                </div>
            ))}
        </div>
    )
}

export default Eventlist
