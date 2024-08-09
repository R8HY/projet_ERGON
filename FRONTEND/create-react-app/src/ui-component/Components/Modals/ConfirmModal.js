import { Button} from '@mui/material';
import { Modal } from 'react-bootstrap'; 
import logo from 'assets/images/logoErgon.png';

function ConfirmModal({showForm, setShowForm, message, onConfirm, onCancel}) {

  const confirm = () =>{
    onConfirm();
    setShowForm(false)
  }

  const cancel = () =>{
    onCancel();
    setShowForm(false)
  }
  return (
    <Modal show={showForm} onHide={onCancel?()=>cancel():()=>setShowForm(false)} centered>
        <Modal.Body>
            <img src={logo} style={{width:"80px", height:"60px"}} alt="Logo"/>
            <p className="mt-2 mb-5 text-center">{message}</p>
            <div style={{float:"right"}}>
              <Button variant="secondary" onClick={onConfirm?()=>confirm():()=>setShowForm(false)}>Ok</Button>
              <Button variant="secondary" onClick={onCancel?()=>cancel():()=>setShowForm(false)}>Annuler</Button>
            </div>
        </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;