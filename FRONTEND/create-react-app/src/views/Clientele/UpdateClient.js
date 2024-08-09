import React from 'react';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Alert } from 'react-bootstrap';
//import FormSociete from 'ui-component/ui-template/template/Client/FormSociete';
// import FormGuest from 'ui-component/Components/FormGuest';
//import FormParticulier from 'ui-component/ui-template/template/Client/FormParticulier';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import FormGuest from 'ui-component/Components/FormGuest';

// Composant de la page
const Typography = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [showSuccess, setShowSuccess] = useState(false);
    // const {id} = useParams();
    const params = useParams()
    const [values, setValues] = useState({
        nom:'',
        prenom:'',
        contact:'',
        nomSociete: "",
        date_naissance: "",
        domiciliation: "",
        email: "",
        nif: "",
        stat: "",
    })

    const [valeur, setValeur] = useState({
        nom:'',
        prenom:'',
        contact:'',
        date_naissance: '',
        lieu_naissance: '',
        num_CIN: '',
        cin_date_delivrance: '',
        certificat_residence: '',
        lieu_residence: '',
        email: '',
    })

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl =`http://127.0.0.1:8000/store/Client/${params.idClient}`;
    // Make the GET request using the fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
        console.log(data.categorie)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.idClient]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/store/Societe/${params.idClient}`)
        .then(res =>{
            setValues({...values, nom:res.data.nom, prenom:res.data.prenom,
                            contact:res.data.contact, nomSociete:res.data.nomSociete,
                            date_naissance:res.data.date_naissance, domiciliation:res.data.domiciliation,
                            email:res.data.email, nif:res.data.nif, stat:res.data.stat})
                            setShowSuccess(true); // Afficher le message de succès après la suppression
        })
    }, [params.idClient])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/store/Particulier/${params.idClient}`)
        .then(res =>{
            setValeur({...valeur, nom:res.data.nom, prenom:res.data.prenom,
                            contact:res.data.contact,date_naissance:res.data.date_naissance,
                            lieu_naissance:res.data.lieu_naissance,email:res.data.email,  num_CIN:res.data. num_CIN,
                            cin_date_delivrance:res.data.cin_date_delivrance, certificat_residence:res.data. certificat_residence, 
                            lieu_residence:res.data. lieu_residence})
        })
    }, [params.idClient])

    const handleSubmitSociete = (e) =>{
        e.preventDefault();
        axios.patch(`http://127.0.0.1:8000/store/Societe/${params.idClient}/`, values)
        // .then(response => {
        //     // Gérer la réponse après la suppression réussie
        //     navigate('/Clients')
        //     console.log("Modification réussie", response);
        //     // setData(prevData => prevData.filter(item => item.id !== id));
        //     setShowSuccess(true); // Afficher le message de succès après la suppression
        //     setTimeout(() => {
        //       setShowSuccess(false); // Masquer le message après un certain délai (ici 3 secondes)
        //     }, 3000);
        .then(response => {
            setShowSuccess(true); // Afficher le message de succès après la modification
            setTimeout(() => {
                setShowSuccess(false); // Masquer le message après un certain délai (par exemple, 3000ms)
                navigate('/Clients');
                console.log("Modification réussie", response);
            }, 3000);
          })

    }

    const handleSubmitParticulier = (e) =>{
        e.preventDefault();
        axios.patch(`http://127.0.0.1:8000/store/Particulier/${params.idClient}/`, valeur)
        .then(
            navigate('/Clients')
        )

    }
  return (
    <div>
        <MainCard title="Liste des Clients">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
            {showSuccess && (
        <Alert variant="success">L’élément a été modifié avec succès!</Alert>
      )}
            {data.categorie === 'Société' ? (
                <div>
                    <h1>FORMULAIRE</h1>
                    <form onSubmit={handleSubmitSociete} className="form-particulier">
                        <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="nom" className="form-label">
                                Nom
                            </label>
                            <input type="text" className="form-control" value={values.nom} onChange={e =>setValues({...values, nom:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">
                                Prénom
                            </label>
                            <input type="text" className="form-control" value={values.prenom} onChange={e =>setValues({...values, prenom:e.target.value})}/>
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="contact" className="form-label">
                                Contact
                            </label>
                            <input type="text" className="form-control"  value={values.contact} onChange={e =>setValues({...values, contact:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="nomSociete" className="form-label">
                                Nom de la société
                            </label>
                            <input type="text" className="form-control" value={values.nomSociete} onChange={e =>setValues({...values, nomSociete:e.target.value})}/>
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="domiciliation" className="form-label">
                                Domiciliation
                            </label>
                            <input type="text" className="form-control" value={values.domiciliation} onChange={e =>setValues({...values, domiciliation:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input type="text" className="form-control" value={values.email} onChange={e =>setValues({...values, email:e.target.value})}/>
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="nif" className="form-label">
                                NIF
                            </label>
                            <input type="text" className="form-control" value={values.nif} onChange={e =>setValues({...values, nif:e.target.value})}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="stat" className="form-label">
                                STAT
                            </label>
                            <input type="text" className="form-control" value={values.stat} onChange={e =>setValues({...values, stat:e.target.value})}/>
                            </div>
                        </div>
                        </div>

                        <button className="btn btn-primary" type="submit">Valider</button>
                    </form>
                </div>
            ) : data.categorie === 'Particulier' ? (
                <div>
                    <h1>FORMULAIRE</h1>
                    <form onSubmit={handleSubmitParticulier} className="form-particulier">
                        <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="nom" className="form-label">
                            Nom
                            </label>
                            <input type="text" className="form-control" value={valeur.nom} onChange={e =>setValeur({...valeur, nom:e.target.value})}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="prenom" className="form-label">
                            Prénom
                            </label>
                            <input type="text" className="form-control"  value={valeur.prenom} onChange={e =>setValeur({...valeur, prenom:e.target.value})}/>
                        </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="contact" className="form-label">
                            Contact
                            </label>
                            <input type="text" className="form-control"  value={valeur.contact} onChange={e =>setValeur({...valeur, contact:e.target.value})}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="date_naissance" className="form-label">
                            Date de naissance
                            </label>
                            <input type="text" className="form-control"  value={valeur.date_naissance} onChange={e =>setValeur({...valeur, date_naissance:e.target.value})}/>
                        </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="lieu_naissance" className="form-label">
                            Lieu de naissance
                            </label>
                            <input type="text" className="form-control" value={valeur.lieu_naissance} onChange={e =>setValeur({...valeur, lieu_naissance:e.target.value})}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="num_CIN" className="form-label">
                            Numéro CIN
                            </label>
                            <input type="text" className="form-control" value={valeur.num_CIN} onChange={e =>setValeur({...valeur, num_CIN:e.target.value})}/>
                        </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="cin_date_delivrance" className="form-label">
                            Date de délivrance de CIN
                            </label>
                            <input type="text" className="form-control" value={valeur.cin_date_delivrance} onChange={e =>setValeur({...valeur, cin_date_delivrance:e.target.value})}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="certificat_residence" className="form-label">
                            Certificat de résidence
                            </label>
                            <input type="text" className="form-control" value={valeur.certificat_residence} onChange={e =>setValeur({...valeur, certificat_residence:e.target.value})}/>
                        </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="lieu_residence" className="form-label">
                            Lieu de résidence
                            </label>
                            <input type="text" className="form-control" value={valeur.lieu_residence} onChange={e =>setValeur({...valeur, lieu_residence:e.target.value})}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                            Adresse email
                            </label>
                            <input type="text" className="form-control" value={valeur.email} onChange={e =>setValeur({...valeur, email:e.target.value})}/>
                        </div>
                        </div>

                        <button className="btn btn-primary" type="submit">Valider</button>
                    </form>
                    </div>
            ) : (
                // Autre contenu par défaut si la catégorie ne correspond ni à "societe" ni à "particulier"
                null
            )}
            </Grid> 
        </Grid>
        </MainCard>
  </div>

  );
};

export default Typography;