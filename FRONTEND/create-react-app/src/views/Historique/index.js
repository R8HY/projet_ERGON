// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  Fab,
  FormControl,
  Grid,
  IconButton,
  Tooltip,
  Button
} from '@mui/material';
import { IconSettings } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import {useState, useEffect} from 'react';
import {format} from 'date-fns'
import SearchSection from "ui-component/Components/SearchSection/index";

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = ({open, setOpen}) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  // drawer on/off
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/Commande/`;
    const evUrl = `http://127.0.0.1:8000/store/Evenement/`;

    Promise.all([fetch(apiUrl), fetch(evUrl)])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
      .then(([commandeData, evenementData]) => {
        evenementData = evenementData.filter(event=>isPast(event.date));
        evenementData = evenementData.filter(
          data=>data.description.toLowerCase().includes(inputSearch.toLowerCase())||
          data.date.toLowerCase().includes(inputSearch.toLowerCase())
        )
        setData(commandeData); 
        setEvents(evenementData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [events, data, inputSearch]);

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
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize" style={{display:"none"}}>
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 650
          }
        }}
      >
        
        <PerfectScrollbar component="div" className="mt-2">
        <SearchSection value={inputSearch} setValue={setInputSearch}/>
          <Grid container spacing={gridSpacing} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {/* font family */}
              {events.map((event, index)=>
                <SubCard key={index} title={[getSplittedDate(event.date)[2]
                ,getSplittedDate(event.date)[1]
                ,getSplittedDate(event.date)[0]].join('/')} className="h-100 historicalContainer" secondary={<Button style={{color:"red", fontSize:"12px", transform:"translate(15%,1%)"}}>x</Button>}>
                  <FormControl>
                    {event.nomClient} {event.prenomClient} - {event.description}
                  </FormControl>
                </SubCard>
              )}
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
