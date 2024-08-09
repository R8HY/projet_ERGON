import React, { useEffect,  useState } from "react";
import { format } from 'date-fns';
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { format, parseISO, parse } from 'date-fns';
import { Grid } from '@mui/material';
import {IconClockHour1, IconClockHour2, IconClockHour3,IconClockHour4,IconClockHour5,IconClockHour6,IconClockHour7,
    IconClockHour8,IconClockHour9,IconClockHour10,IconClockHour11,IconClockHour12} from '@tabler/icons';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';

function ListePayement() {
  const [data, setData] = useState([]);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/RendezVous/`;

    Promise.all([fetch(apiUrl)])
    .then(([response1]) => Promise.all([
      response1.json()
    ]))
    .then(([d]) => {
        d=d.sort((a,b)=>b.dateRdv-a.dateRdv)
      setData(d);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const getSplittedDate = (date) => {
    const [datePart, timePart] = date.split('T');
    const result = [...datePart.split('-'), ...timePart.split(':')];
    return result;
  };

  const getClock = (h) => {
    var heure = parseInt(h);
    if(heure===0)heure='12';
    if(heure>12)heure=heure-12;
    return heure;
  }

  const getMonth = () =>{
    const today = new Date();
    const month = format(today, "MM");
    return month;
  }

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
      
        <Grid container style={{paddingLeft:"15px", paddingRight:"15px", height:"170px", overflow:showScrollbar?"auto":"hidden"}}
          onMouseOver={()=>setShowScrollbar(true)} onMouseOut={()=>setShowScrollbar(false)}>
          {loading ? (
              <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
            ) : (
          <table className="table" style={{width:"100%", marginTop:"10px", fontSize:"12px"}}>
            <tbody>
                {data.map((item, index) => (
                  getMonth()===getSplittedDate(item.dateRdv)[1]&&
                  (!isPast(item.dateRdv)?
                      <tr key={index}>
                          {getClock(getSplittedDate(item.dateRdv)[3])===1 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour1 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===2 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour2 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===3 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour3 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===4 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour4 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===5 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour5 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===6 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour6 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===7 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour7 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===8 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour8 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===9 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour9 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===10 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour10 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===11 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour11 color="#5e3295"/></p></td>}
                          {getClock(getSplittedDate(item.dateRdv)[3])===12 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour12 color="#5e3295"/></p></td>}
                          <td><p style={{transform:"translate(0%,75%)",  color:"#5e3295"}}>{getSplittedDate(item.dateRdv)[3]}:{getSplittedDate(item.dateRdv)[4]}</p></td>
                          <td><p style={{transform:"translate(0%,75%)"}}>{item.nom} {item.prenom}</p></td>
                          <td style={{width:"30%", textAlign:"right"}}><p className="badgeDate">
                              {[getSplittedDate(item.dateRdv)[2],
                              getSplittedDate(item.dateRdv)[1],
                              getSplittedDate(item.dateRdv)[0]].join(' / ')}</p></td>
                      </tr>
                  :
                      <tr key={index}>
                        {getClock(getSplittedDate(item.dateRdv)[3])===1 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour1 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===2 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour2 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===3 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour3 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===4 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour4 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===5 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour5 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===6 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour6 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===7 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour7 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===8 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour8 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===9 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour9 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===10 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour10 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===11 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour11 color="gray"/></p></td>}
                        {getClock(getSplittedDate(item.dateRdv)[3])===12 && <td style={{width:"5px", textAlign:"right"}}><p style={{transform:"translate(0%,50%)"}}><IconClockHour12 color="gray"/></p></td>}
                        <td style={{color:"gray"}}><p style={{transform:"translate(0%,75%)"}}>{getSplittedDate(item.dateRdv)[3]}:{getSplittedDate(item.dateRdv)[4]}</p></td>
                        <td style={{color:"gray"}}><p style={{transform:"translate(0%,75%)"}}>{item.nom} {item.prenom}</p></td>
                        <td style={{width:"30%", textAlign:"right"}}><p className="badgeDate">
                            {[getSplittedDate(item.dateRdv)[2],
                            getSplittedDate(item.dateRdv)[1],
                            getSplittedDate(item.dateRdv)[0]].join(' / ')}</p></td>
                    </tr>
                  )
                ))}
            </tbody>
          </table>)}
        </Grid>
      
  );
}

export default ListePayement;