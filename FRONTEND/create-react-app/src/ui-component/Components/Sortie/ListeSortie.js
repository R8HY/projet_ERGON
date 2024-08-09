import React, { useEffect,  useState } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { format, parseISO, parse } from 'date-fns';
import { Grid } from '@mui/material';
import { IconCalendar } from '@tabler/icons';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';
import {format} from 'date-fns';


function ListeSortie({type, id}) {
  const [data, setData] = useState([])
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/${type}/`;

    Promise.all([fetch(apiUrl)])
    .then(([response1]) => Promise.all([
      response1.json()
    ]))
    .then(([d]) => {
        d=d.sort((a,b)=>b.dateEvent-a.dateEvent)
        console.log(d);
        d=d.filter(p=>p.ressource===id)
        setData(d);
        setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [data]);

  const getSplittedDate = (date) => {
    const [datePart, timePart] = date.split('T');
    const result = [...datePart.split('-'), ...timePart.split(':')];
    return result;
  };

  const isPast = (date) => {
    if(date){
        const today = new Date();
      const formToday = format(today, "yyyy-MM-dd'T'00:00'Z'");
      date = getSplittedDate(date);
      const formatedToday = getSplittedDate(formToday);

      return (
        formatedToday[0] > date[0] ||
        (formatedToday[0] === date[0] &&
          (formatedToday[1] > date[1] ||
            (formatedToday[1] === date[1] && formatedToday[2] > date[2])))
      );
    }
  };

  return (
      
        <Grid container style={{paddingLeft:"15px", paddingRight:"15px", maxHeight:"200px", overflow:showScrollbar?"auto":"hidden"}}
          onMouseOver={()=>setShowScrollbar(true)} onMouseOut={()=>setShowScrollbar(false)}>
          {loading ? (
              <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
            ) : (
          <table className="table" style={{width:"100%", marginTop:"10px", fontSize:"12px"}}>
            <tbody>
                {data.map((item, index) => (
                    isPast(item.dateEvent)&&
                    (<tr key={index}>
                      <td style={{width:"10px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconCalendar style={{color:"#eaac4e"}}/></p></td>
                      <td><p style={{transform:"translate(0%,75%)", color:"#eaac4e"}}>{item.nomEvent}</p></td>
                      <td><p style={{transform:"translate(0%,75%)", color:"#eaac4e"}}>{item.client}</p></td>
                      {type!="SallePanier"&&<td><p style={{transform:"translate(0%,75%)"}}>Quantité louée : {item.quantite}</p></td>}
                      <td style={{width:"30%", textAlign:"right"}}><p className="badgeDate">
                          {[getSplittedDate(item.dateEvent)[2],
                          getSplittedDate(item.dateEvent)[1],
                          getSplittedDate(item.dateEvent)[0]].join(' / ')}</p></td>
                    </tr>)
                ))}
            </tbody>
          </table>)}
        </Grid>
      
  );
}

export default ListeSortie;