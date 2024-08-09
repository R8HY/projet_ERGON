import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'
// import { format, parseISO, parse } from 'date-fns';
import {IconBrandCouchdb, IconBallon} from '@tabler/icons';
import {MeetingRoom} from '@mui/icons-material';
import { Grid } from '@mui/material';

function ListePayement({salle, decorations, produits}) {
  const [showScrollbar1, setShowScrollbar1] = useState(false);
  const [showScrollbar2, setShowScrollbar2] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  // const getClock = (h) => {
  //   var heure = parseInt(h);
  //   if(heure===0)heure='12';
  //   if(heure>12)heure=heure-12;
  //   return heure;
  // }

  // const isPast = (date) => {
  //   const newDate = parse(date, "dd/MM/yyyy hh:mm", new Date());
  //   const today = new Date();
  //   const formatedDate = format(newDate, "dd/MM/yyyy");
  //   const formatedToday = format(today, "dd/MM/yyyy");
  //   return  formatedDate<formatedToday;
  // }

  // const getSplittedDate = (date) => {
  //   date = date.split('Z')[0];
  //   const datePart = date.split('T')[0];
  //   const TimePart = date.split('T')[1];
  //   const d = datePart.split('-')
  //   const t = TimePart.split(':')
  //   const result = d.concat(t);
  //   return result;
  // }

  return (
        <Grid container className="h-100">
          {salle.length>0&&<Grid data-aos="zoom-in" container className="h-100 myContainer mb-4 d-flex">
            <div style={{width:"100%", height:"50px"}}>
              <table className="table rounded text-center h-100">
                <tbody>
                  {salle.map((item, index) => (
                    <tr key={index}>
                          <td><MeetingRoom/></td>
                          <td style={{width:"40%", color:"black"}}>{item.nomSalle}</td>
                          <td style={{color:"#444"}}></td>
                          <td style={{color:"#444"}}></td>
                          <td style={{color:"#444"}}>{item.prixSalle} Ariary</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </Grid>}
          {produits.length>0&&<Grid data-aos="zoom-in" container className="h-100 myContainer mb-4">
            <div style={{width:"100%", height:"230px", overflowY:showScrollbar1?"auto":"hidden"}}
              onMouseOver={()=>setShowScrollbar1(true)}
              onFocus={()=>setshowScrollbar1(true)}
              onMouseOut={()=>setShowScrollbar1(false)}
              onBlur={()=>setshowScrollbar1(false)}>
              <table className="table rounded text-center">
                <tbody>
                  {produits.map((item, index) => (
                    <tr key={index}>
                          <td><IconBrandCouchdb/></td>
                          <td style={{width:"40%", color:"black"}}>{item.nomP}</td>
                          <td style={{color:"#444"}}>{item.prix_unitaireP} Ariary</td>
                          <td style={{color:"#444"}}>{item.quantite}</td>
                          <td style={{color:"#444"}}>{parseInt(item.quantite)*parseInt(item.prix_unitaireP)} Ariary</td>
                    </tr>
                  ))}
                </tbody>
              </table>    
            </div>
          </Grid>}
          {decorations.length>0&&<Grid  data-aos="zoom-in" container className="h-100 myContainer">
            <div style={{width:"100%", height:"230px", overflowY:showScrollbar2?"auto":"hidden"}}
              onMouseOver={()=>setShowScrollbar2(true)}
              onFocus={()=>setShowScrollbar2(true)}
              onMouseOut={()=>setShowScrollbar2(false)}
              onBlur={()=>setShowScrollbar2(false)}>
              <table className="table rounded text-center">
                <tbody>
                  {decorations.map((item, index) => (
                    <tr key={index}>
                          <td><IconBallon/></td>
                          <td style={{width:"40%", color:"black"}}>{item.nomDecoration}</td>
                          <td style={{color:"#444"}}>{item.prixDecoration} Ariary</td>
                          <td style={{color:"#444"}}>{item.quantite}</td>
                          <td style={{color:"#444"}}>{parseInt(item.quantite)*parseInt(item.prixDecoration)} Ariary</td>
                    </tr>
                  ))}
                </tbody>
              </table>          
            </div>
          </Grid>}
        </Grid>
  );
}

export default ListePayement;