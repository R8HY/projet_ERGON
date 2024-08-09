import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { format, parseISO, parse } from 'date-fns';
import {IconClockCancel, IconUserPlus} from '@tabler/icons';
import {Select, FormControl, MenuItem} from '@mui/material';
import {IconClockHour1, IconClockHour2, IconClockHour3,IconClockHour4,IconClockHour5,IconClockHour6,IconClockHour7,
        IconClockHour8,IconClockHour9,IconClockHour10,IconClockHour11,IconClockHour12} from '@tabler/icons';
import ConfirmModal from "ui-component/Components/Modals/ConfirmModal";
import MessageModal from "ui-component/Components/Modals/MessageModal";
import FormModal from "ui-component/Components/Modals/FormModal";
import FormSociete from "ui-component/Components/Client/Forms/FormSociete";
import FormParticulier from "ui-component/Components/Client/Forms/FormParticulier";
import SearchSection from "ui-component/Components/SearchSection/index";

function ListeRdv() {
  const [data, setData] = useState([]);
  const [rdvData, setRdvData] = useState([]);
  const [selectedData, setSelectedData] = useState(0);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormDeleted, setShowFormDeleted] = useState(false);
  const [showFormClient, setShowFormClient] = useState(false);
  const [showFormSociete, setShowFormSociete] = useState(false);
  const [particulierAdded, setParticulierAdded] = useState(false);
  const [societeAdded, setSocieteAdded] = useState(false);
  const [showFormParticulier, setShowFormParticulier] = useState(false);
  const [rdvDeleted, setRdvDeleted] = useState(false);
  const [clientFormStep, setClientFormStep] = useState(0);
  const [categorie, setCategorie] = useState("Particulier");
  const [submitted, setSubmitted] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/store/RendezVous/";

    Promise.all([fetch(apiUrl)])
      .then(([response1]) => Promise.all([response1.json()]))
      .then(([artData]) => {
        artData = artData.filter(
          data=>data.nom.toLowerCase().includes(inputSearch.toLowerCase())||
          data.prenom.toLowerCase().includes(inputSearch.toLowerCase())||
          data.motif.toLowerCase().includes(inputSearch.toLowerCase())||
          data.dateRdv.toLowerCase().includes(inputSearch.toLowerCase())
        )
        setData(artData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data, inputSearch]);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    if(rdvDeleted==true){
      setShowFormDeleted(true);
      setRdvDeleted(false);
    }
  }, [rdvDeleted]);

  useEffect(() => {
    if(particulierAdded==true){
      setShowFormParticulier(true);
      setParticulierAdded(false);
    }
  }, [particulierAdded]);

  useEffect(() => {
    if(societeAdded==true){
      console.log("bien");
      setShowFormSociete(true);
      setSocieteAdded(false);
    }
  }, [societeAdded]);

  useEffect(() => {
    if(showFormClient===false){setClientFormStep(0);setCategorie("Particulier")}
  }, [showFormClient]);

  const deleteRdv = () =>{
    axios.delete(`http://127.0.0.1:8000/store/RendezVous/${selectedData}`)
    .then(() => {
      setShowFormDelete(false);
      setRdvDeleted(true);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la requête:", error);
    });
    setShowFormDelete(false);
  };

  const getClock = (h) => {
    var heure = parseInt(h);
    if(heure===0)heure='12';
    if(heure>12)heure=heure-12;
    return heure;
  }

  const askingForDelete = (id) => {
    setSelectedData(id);
    setShowFormDelete(true);
  }

  const isPast = (date) => {
    const newDate = parse(date, "dd/MM/yyyy hh:mm", new Date());
    const today = new Date();
    const formatedDate = format(newDate, "dd/MM/yyyy");
    const formatedToday = format(today, "dd/MM/yyyy");
    return  formatedDate<formatedToday;
  }

  const getSplittedDate = (date) => {
    date = date.split('Z')[0];
    const datePart = date.split('T')[0];
    const TimePart = date.split('T')[1];
    const d = datePart.split('-')
    const t = TimePart.split(':')
    const result = d.concat(t);
    return result;
  }

  const handleShowForm = (item) => {
    setShowFormClient(true); 
    setRdvData(item);
  }

  return (
    
      <div className="container h-100">
              <ConfirmModal showForm={showFormDelete} setShowForm={setShowFormDelete}
                message="Supprimer le rendez-vous ?" onConfirm={()=>deleteRdv()} />
              <MessageModal showForm={showFormDeleted} setShowForm={setShowFormDeleted}
                message="Le rendez-vous a bien été supprimé"/>
              <MessageModal showForm={showFormSociete} setShowForm={setShowFormSociete}
                message="Client enregistré dans la liste des sociétés"/>
              <MessageModal showForm={showFormParticulier} setShowForm={setShowFormParticulier}
                message="Client enregistré dans la liste des particuliers"/>
              <FormModal 
                onSubmit={()=>setSubmitted(true)}
                onNextStep={()=>setClientFormStep(clientFormStep+1)} 
                onPreviousStep={()=>setClientFormStep(clientFormStep-1)} 
                showForm={showFormClient} 
                setShowForm={setShowFormClient} 
                steps={2}>
                  {clientFormStep===0&&<FormControl className="mt-4" fullWidth>
                    <Select labelId="selectable" value={categorie} onChange={(e)=>setCategorie(e.target.value)}>
                          Choisissez une catégorie
                          <MenuItem value="Particulier">Particulier</MenuItem>
                          <MenuItem value="Société">Société</MenuItem>
                    </Select>
                  </FormControl>}
                  {clientFormStep===1&&(categorie==="Particulier"?
                    <FormParticulier rdvData={rdvData} setShowMessage={()=>setParticulierAdded(true)} submitted={submitted} setSubmitted={setSubmitted}/>:
                    <FormSociete rdvData={rdvData} setShowMessage={()=>setSocieteAdded(true)} submitted={submitted} setSubmitted={setSubmitted}/>)}
              </FormModal>
              <div style={{marginBottom:"20px", display:"flex", justifyContent:"center"}}>
                  <SearchSection value={inputSearch} setValue={setInputSearch}/>
              </div>
        
        <table className="table rounded text-center h-100">
          <tbody>
            {data.map((item, index) => (
              <>
                
                <tr key={index}>
                  {!isPast(format(parseISO(item.dateRdv), "dd/MM/yyyy hh:mm"))?
                    <>
                      {getClock(getSplittedDate(item.dateRdv)[3])===1 && <td><IconClockHour1 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===2 && <td><IconClockHour2 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===3 && <td><IconClockHour3 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===4 && <td><IconClockHour4 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===5 && <td><IconClockHour5 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===6 && <td><IconClockHour6 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===7 && <td><IconClockHour7 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===8 && <td><IconClockHour8 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===9 && <td><IconClockHour9 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===10 && <td><IconClockHour10 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===11 && <td><IconClockHour11 color="#5e3295"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===12 && <td><IconClockHour12 color="#5e3295"/></td>}
                      <td style={{color:"#5e3295"}}>{getSplittedDate(item.dateRdv)[2]}/{getSplittedDate(item.dateRdv)[1]}/{getSplittedDate(item.dateRdv)[0]}
                        <br/>{getSplittedDate(item.dateRdv)[3]}:{getSplittedDate(item.dateRdv)[4]}</td>
                      <td style={{width:"40%", color:"black"}}>{item.motif}</td>
                      <td style={{color:"#444"}}>{item.nom} {item.prenom}</td>
                      <td style={{color:"#444"}}>{item.contact}</td>
                      <td style={{width:"12%"}}><IconClockCancel style={{marginRight:"25px"}} color="red" onClick={()=>askingForDelete(item.id)}/>
                        <IconUserPlus onClick={()=>handleShowForm(item)} color="blue"/></td>
                    </>:
                    <>
                      {getClock(getSplittedDate(item.dateRdv)[3])===1 && <td><IconClockHour1 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===2 && <td><IconClockHour2 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===3 && <td><IconClockHour3 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===4 && <td><IconClockHour4 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===5 && <td><IconClockHour5 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===6 && <td><IconClockHour6 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===7 && <td><IconClockHour7 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===8 && <td><IconClockHour8 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===9 && <td><IconClockHour9 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===10 && <td><IconClockHour10 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===11 && <td><IconClockHour11 color="gray"/></td>}
                      {getClock(getSplittedDate(item.dateRdv)[3])===12 && <td><IconClockHour12 color="gray"/></td>}
                      <td style={{color:"gray"}}>{getSplittedDate(item.dateRdv)[2]}/{getSplittedDate(item.dateRdv)[1]}/{getSplittedDate(item.dateRdv)[0]}
                        <br/>{getSplittedDate(item.dateRdv)[3]}:{getSplittedDate(item.dateRdv)[4]}</td>
                      <td style={{width:"40%", color:"gray"}}>{item.motif}</td>
                      <td style={{color:"gray"}}>{item.nom} {item.prenom}</td>
                      <td style={{color:"gray"}}>{item.contact}</td>
                      <td style={{width:"12%", color:"gray"}}>
                        <IconClockCancel style={{marginRight:"25px"}} color="gray" onClick={()=>askingForDelete(item.id)}/>
                        <IconUserPlus onClick={()=>handleShowForm(item)} color="gray"/>
                        </td>
                    </>}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    
    
  );
}

export default ListeRdv;