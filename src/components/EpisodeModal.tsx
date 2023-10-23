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
      width: '30%',
      height: '20%',
    },
  };

  Modal.setAppElement('#root');

const EpisodeModal =({ isOpen, onRequestClose, modalContent, addBookMark }: any) => {



  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
    ariaHideApp={false}
  >
    <h2>Episode Modal</h2>
    <p>{modalContent}</p>
    <button onClick={onRequestClose}>닫기</button>
    <button onClick={addBookMark}>북마크 추가</button>
  </Modal>
  )
}

export default EpisodeModal