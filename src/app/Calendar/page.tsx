'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './style.css'
import CalenHandle from '@/service/calendar';
import CreateNew from './createNew/page';
import NewForm from "@/app/Calendar/newEvent/inputForm";
export default function CalendarPage() {
    const [events,setEvents] = useState([])
    const [loadData,setLoadData] = useState(false)
    const [formikData,setFormikData] = useState()
    //
    const [show, setShow] = useState(false);
    const [newForm, setNewForm] = useState(false)
    const [newFormData , setNewFormData] = useState<string> ('')
    //
    useEffect(() => {
    CalenHandle.getData().then( (res)=>
    setEvents (res.data)).catch(function (error)
    {
        console.log(error);
    });
    },[loadData])
    const handleDrop = useCallback((info: any) => {
        CalenHandle.handleDrop(info)
    }, []);
    const eventSources = useMemo(() => [
        {
            googleCalendarId: 'vi.vietnamese#holiday@group.v.calendar.google.com',
            className: 'google-calendar',
            editable: false,
        },
        { events }
    ], [events]);

//
//
    return (
        <div style={{textAlign:'center',height:'auto'}}>
            <NewForm newFormData={ newFormData} newForm = {newForm} setNewForm={ setNewForm} setLoadData ={setLoadData}/>
            <CreateNew setLoadData ={setLoadData} formikData = {formikData} setFormikData = {setFormikData} show = {show} setShow={setShow}/>
            <FullCalendar
                timeZone='UTC'
                aspectRatio={2.6}
                expandRows={true}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,googleCalendarPlugin ]}
                locale={'vi'}
                firstDay={1}
                initialView={"dayGridMonth"}
                editable = {true}
                droppable  = {true}
                eventOverlap={true}
                googleCalendarApiKey = {'AIzaSyCNf6Z8PPTVcSgh0gYDJgph0DhvTejz41I'}
                eventSources={eventSources}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay',
                    center: 'title',
                    right: 'prev,today,next',
                }}
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày',
                }}
                dayHeaderFormat={{weekday: 'short',}}
                eventDrop={(info) => handleDrop(info)}
                eventResize = {(info) => handleDrop(info)}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false,
                    omitZeroMinute: true,
                }}
                eventDragStart={(info) => {
                    const mirror = document.querySelector('.fc-event-dragging') as HTMLElement;
                    if (mirror) {
                        const offsetX = 16;
                        const offsetY = 16;
                        mirror.style.left = `${info.jsEvent.pageX - offsetX}px`;
                        mirror.style.top = `${info.jsEvent.pageY - offsetY}px`;
                    }
                }}
                eventClick={(info) =>{
                    const target = info.jsEvent.target as HTMLElement;
                    if (target.closest('a.google-calendar')) {
                        info.jsEvent.preventDefault();
                        return; }
                    CalenHandle.showCreateNew(info, setShow,setFormikData);}}
                dateClick={(info) =>{setNewFormData(info.dateStr);setNewForm(true)}}
            />
        </div>

    );
}
