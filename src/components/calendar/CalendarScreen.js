import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { AddNewFab } from '../../components/ui/AddNewFab'
 

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const dispatch = useDispatch()
    const  eventsList  = useSelector(state => state.calendar.events)
    const [lastView, setLastView] = useState(localStorage.getItem('lasView') || 'month')

    console.log(eventsList);

    const onDobleClick = (e) => {
      
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {

        dispatch(eventSetActive(e))
        dispatch( uiOpenModal() )
        
    }

    const  onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lasView', e)
        
    }

    const eventStyleGetter = () => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius:'0px',
            opacity: 0.8,
            display:'block',
            color:'white'
        }

        return { style }
    }

    return (
        
        <div className="calendar-screen">
            <Navbar />
           
            <Calendar
                localizer={localizer}
                events={ eventsList  }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDobleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab  />
            <CalendarModal />
        </div>
    )
}
