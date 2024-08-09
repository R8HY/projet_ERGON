import { Typography } from '@mui/material';
import ListePanier from 'ui-component/Components/ListeArticle'

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="Sample Card">
    <Typography variant="body2">
        <ListePanier/>
    </Typography>
  </MainCard>
);

export default SamplePage;