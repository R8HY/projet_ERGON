import { Button} from '@mui/material';
import { Modal } from 'react-bootstrap'; 
import logo from 'assets/images/logoErgon.png';

function MesssageModal({showForm, setShowForm, message, onClose}) {

  const close = () =>{
    onClose();
    setShowForm(false);
  }
  return (
    <Modal show={showForm} onHide={onClose?()=>close():()=>setShowForm(false)} centered>
        <Modal.Body>
            <img src={logo} style={{width:"80px", height:"60px"}} alt="Logo"/>
            <p className="mt-2 mb-5 text-center">{message}</p>
            <Button style={{float:"right"}} variant="secondary" onClick={onClose?()=>close():()=>setShowForm(false)}>Ok</Button>
        </Modal.Body>
    </Modal>
  );
}

export default MesssageModal;