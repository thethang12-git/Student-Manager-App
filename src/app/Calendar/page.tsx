'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import {useState} from "react";
export default function CalendarPage() {
    const [currentView, setView] = useState('dayGridMonth');
    const viewStatusHandler = (view: string) => {
        if(view) {
            setView(view);
            console.log(view)
        }
    }
    return (
        <div style={{ height: '100%' ,overflowY: 'hidden' }}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                editable={true}
                initialView="dayGridMonth"
                events={[
                    {title: 'Sự kiện A', date: '2025-10-17'},
                    {title: 'Sự kiện B', date: '2025-10-20'},
                ]}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridDay',
                    center: 'title',
                    right: 'prev,today,next'
                }}
                height={currentView === 'timeGridDay' ? '100%' : '60vh'}
                titleFormat={{year: 'numeric', month: 'numeric'}}
                viewDidMount={(view) => viewStatusHandler(view.view.type)}
                dayHeaderFormat={{weekday: 'short'}}
            />
        </div>
    );
}
