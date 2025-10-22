'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import {useEffect, useState} from "react";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './style.css'
// import { start } from 'repl';
import axios from 'axios';
import CalenHandle from '@/service/calendar';
import CreateNew from './createNew/page';
import NewForm from "@/app/Calendar/newEvent/inputForm";
import {any} from "prop-types";
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
    CalenHandle.getData().then(function (res) {
    setEvents (res.data)}).catch(function (error) 
    {
        console.log(error);
    });
    },[loadData])
// 
    const [currentView, setView] = useState('dayGridMonth');
    const viewStatusHandler = (view: string) => {
        if(view) {
            setView(view);
        }
    }
// 
    return (
        <div style={{ height: '100%' ,overflowY: 'hidden' }}>
            <NewForm newFormData={ newFormData} newForm = {newForm} setNewForm={ setNewForm} setLoadData ={setLoadData}/>
            <CreateNew setLoadData ={setLoadData} formikData = {formikData} setFormikData = {setFormikData} show = {show} setShow={setShow}/>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,googleCalendarPlugin ]}
                locale={'vi'}
                firstDay={1}
                initialView="dayGridMonth"
                editable = {true}
                droppable  = {true}
                eventOverlap={true}
                googleCalendarApiKey = {'AIzaSyCNf6Z8PPTVcSgh0gYDJgph0DhvTejz41I'}
                eventSources={[
                    {
                        googleCalendarId: 'vi.vietnamese#holiday@group.v.calendar.google.com',
                        className : 'google-calendar',
                        editable : false,
                        eventDataTransform : (eDat) => {
                            return {...eDat, url: undefined}
                        }
                    },
                    {
                    events :events
                    }
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
                eventDrop={(info) => {
                    console.log('Sự kiện mới:', info.event.id);
                    CalenHandle.handleDrop(info,setLoadData)
                    // setEvents(prev => ({...prev,start: info.event.start,end: info.event.end}))
                }}
                eventResize = {(info) => {
                    CalenHandle.handleDrop(info,setLoadData)
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false,
                    omitZeroMinute: true,
                }}
                eventClick={(info) =>{CalenHandle.showCreateNew(info, setShow,setFormikData);}}
                dateClick={(info) =>{console.log(info.dateStr);setNewFormData(info.dateStr);setNewForm(true)}}
            />
        </div>
    );
}
