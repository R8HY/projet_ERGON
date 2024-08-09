import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

class Guest extends Component {
    constructor(props) {
        super(props);
        this.fetchGuest = this.fetchGuest.bind(this)
    }
    state = {
        nom: '',
        prenom: '',
        contact: '',
        dateRDV: ''
    }

    handleNom = e => {
        this.setState({
            nom: e.target.value
        })
    }

    handlePrenom = e => {
        this.setState({
            prenom: e.target.value
        })
    }

    handleContact = e => {
        this.setState({
            contact: e.target.value
        })
    }

    handleDate = e => {
        this.setState({
            dateRDV: e.target.value
        })
    }

    componentWillMount() {
        this.fetchGuest()
    }

    fetchGuest() {
        console.log('fetching')
        fetch('http://127.0.0.1:8000/store/ClientGuest/?format=json')
            .then(response => response.json())
            .then(data =>
                console.log('Data:', data))
    }


    handleSubmit = e => {
        e.preventDefault();
        const { nom, prenom, contact, dateRDV } = this.state;

        // Créez un objet contenant les données du formulaire
        const formData = {
            nom: nom,
            prenom: prenom,
            contact: contact,
            rdv: dateRDV
        };

        // Envoyez les données du formulaire au serveur Django
        fetch('http://127.0.0.1:8000/store/ClientGuest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Utilisez JSON pour le contenu
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse du serveur:', data);
                // Utilisez this.props.history.push pour passer les données à la page ListeClients
                this.props.history.push({
                    pathname: '/ListeClients',
                    state: { data: formData }
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi de la requête:', error);
                // Gérez l'erreur si nécessaire
            });
    }
    
    render() {
        return (
            <div>
                <h1>FORMULAIRE</h1>
                <form onSubmit={this.handleSubmit}>
                    <Fragment>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nom</label>
                            <input type="text" value={this.state.nom} onChange={this.handleNom} />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Prenom</label>
                            <input type="text" value={this.state.prenom} onChange={this.handlePrenom} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Contact</label>
                            <input type="text" value={this.state.contact} onChange={this.handleContact} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Date de RDV</label>
                            <input type="text" value={this.state.dateRDV} onChange={this.handleDate} />
                        </div>
                        <Link to="/ListeClients">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Valider</button>
                        </Link>
                    </Fragment>
                </form>
            </div>
        )
    }
}

export default Guest