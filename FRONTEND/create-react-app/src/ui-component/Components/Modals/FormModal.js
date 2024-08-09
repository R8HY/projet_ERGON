import { Button} from '@mui/material';
import { Modal } from 'react-bootstrap'; 
import logo from 'assets/images/logoErgon.png';
import {useState, useEffect} from 'react';

function FormModal({children, showForm, setShowForm, onSubmit, onCancel, steps, onNextStep, onPreviousStep}) {
    const [step, setStep] = useState(0)

    const next = () =>{
        onNextStep();
        setStep(step+1);
    }

    const previous = () =>{
        onPreviousStep();
        setStep(step-1);
    }

    const submit = () =>{
        onSubmit();
        setShowForm(false);
    }

    const cancel = () =>{
        onCancel();
        setShowForm(false);
    }

    useEffect(() => {
        if(showForm===false)setStep(0);
      }, [showForm]);
    
  return (
    <Modal show={showForm} onHide={onCancel?()=>cancel():()=>setShowForm(false)} centered>
        <Modal.Body>
            <img src={logo} style={{width:"80px", height:"60px"}} alt="Logo"/>
                <div className="mt-3 mb-5">{children}</div>
            <div style={{float:"right"}}>
                {steps?
                    (
                        <>
                            <Button variant="secondary" disabled={step===0}
                                onClick={onPreviousStep?()=>previous():()=>setStep(step-1)}>Précedent</Button>
                            <Button variant="secondary" disabled={step===steps-1}
                                onClick={onNextStep?()=>next():()=>setStep(step+1)}>Suivant</Button>
                        </>
                    )
                    :
                    (
                        <>
                            <Button variant="secondary" onClick={onSubmit?()=>submit():()=>setShowForm(false)}>Envoyer</Button>
                            <Button variant="secondary" onClick={onCancel?()=>cancel():()=>setShowForm(false)}>Annuler</Button>
                        </>
                    )
                }
              
            </div>
        </Modal.Body>
        {
            steps&&
            <Modal.Footer>
                <div style={{float:"right"}}>
                    <Button variant="secondary" disabled={!(step===steps-1)}
                        onClick={onSubmit?()=>submit():()=>setShowForm(false)}>Envoyer</Button>
                    <Button variant="secondary" 
                        onClick={onCancel?()=>cancel():()=>setShowForm(false)}>Annuler</Button>
                </div>
            </Modal.Footer>
            
        }
        
    </Modal>
  );
}

export default FormModal;