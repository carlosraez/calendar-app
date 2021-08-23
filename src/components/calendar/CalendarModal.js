import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours')
const end = now.clone().add(1, 'hours')


export const CalendarModal = () => {

    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui)

    const [dateStart, setDateStart] = useState( now.toDate())
    const [dateEnd, setDateEnd] = useState( end.toDate())
    const [titleValid, setTitleValid] = useState( true )

    const [formValues, setFormValues] = useState({
        title:'Evento',
        notes:'',
        startDate: now.toDate(),
        endDate: end.toDate() 
    })

    const { title, notes, startDate, endDate } = formValues


    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
          
            [target.name]: target.value,
        })
     
    }

    const handleStartDateChange = (e) => {
        setDateStart( e )
        setFormValues({
            ...formValues,
            startDate: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd( e )
        setFormValues({
            ...formValues,
            endDate: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const momentStart = moment( startDate )
        const endStart = moment( endDate )
       
        if (momentStart.isSameOrAfter( endStart )) {
           
            Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
            return;
        }

        if (title.trim().length < 2 ) {
            setTitleValid( false )
            return
        }

        //grabar base de datos
        dispatch( eventAddNew({
            ...formValues,
            id: new Date().getTime() //generamos id temporalmente
        }) )

        setTitleValid(true)
        closeModal()
        
    }

    const closeModal = () => {
        dispatch( uiCloseModal() )
    }

    return (
         <Modal
                isOpen={ modalOpen }
                onRequestClose={ closeModal }
                style={ customStyles }
                closeTimeoutMS={ 200 }
                className="modal"
                overlayClassName="modal-fondo"
                 >
                <h1> Nuevo evento </h1>
                    <hr />
                    <form 
                    onSubmit={ handleSubmitForm }
                    className="container">

                        <div className="form-group">
                            <label>Fecha y hora inicio</label>
                            <DateTimePicker
                                 onChange={ handleStartDateChange }
                                 value={ dateStart }
                                 className="form-control"
                             />
                        </div>

                        <div className="form-group">
                            <label>Fecha y hora fin</label>
                            <DateTimePicker
                                 onChange={ handleEndDateChange }
                                 value={ dateEnd }
                                 minDate= { dateStart }
                                 className="form-control"
                             />
                        </div>

                        <hr />
                        <div className="form-group">
                            <label>Titulo y notas</label>
                            <input 
                                type="text" 
                                className={`form-control ${ !titleValid && 'is-invalid'}`}
                                placeholder="Título del evento"
                                name="title"
                                autoComplete="off"
                                value={ title }
                                onChange={ handleInputChange }
                            />
                            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                        </div>

                        <div className="form-group">
                            <textarea 
                                type="text" 
                                className="form-control"
                                placeholder="Notas"
                                rows="5"
                                name="notes"
                                value={ notes }
                                onChange={ handleInputChange }
                            ></textarea>
                            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>
                        

                    </form>
       
        </Modal>
     
    )
}
