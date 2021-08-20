import React from 'react'
import Modal from 'react-modal';

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


export const CalendarModal = () => {
    return (
         <Modal
                isOpen={false}
                //onAfterOpen={afterOpenModal}
               // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                 >
                    <h1>Hola Mundo</h1>
                    <hr></hr>
                    <span>Hola de Nuevo</span>
        </Modal>
     
    )
}
