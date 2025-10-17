'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import {useState} from "react";
import './style.css'
import {auto} from "@popperjs/core";
export default function CalendarPage() {
    const [currentView, setView] = useState('dayGridMonth');
    const viewStatusHandler = (view: string) => {
        if(view) {
            setView(view);
        }
    }
    return (
        <div style={{ height: '100%' ,overflowY: 'hidden' }}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                locale={'vi'}
                firstDay={1}
                initialView="dayGridMonth"
                editable = {true}
                droppable  = {true}
                eventOverlap={true}
                events={[
                    {title: 'Sự kiện A',  start: '2025-09-01', end: '2025-09-03',textColor:'white'},
                    {title: 'Sự kiện B', date: '2025-10-20'},
                ]}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridDay',
                    center: 'title',
                    right: 'prev,today,next',
                }}
                height={currentView === 'timeGridDay' ? '100%' : '60vh'}
                titleFormat={{month: 'numeric',year: 'numeric'}}
                viewDidMount={(view) => viewStatusHandler(view.view.type)}
                dayHeaderFormat={{weekday: 'short',}}
                // eventDrop={(info) => {
                //     console.log('Sự kiện mới:', info.event.start, info.event.end);
                // }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false,
                    omitZeroMinute: true,
                }}
            />
        </div>
    );
}
