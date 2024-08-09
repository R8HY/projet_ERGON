import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput} from '@mui/material';

// third-party
import PopupState from 'material-ui-popup-state';

// project imports
// import Transitions from 'ui-component/extended/Transitions';

// assets
import {IconSearch} from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue}) => {
  // const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = ({ value, setValue}) => {
  const theme = useTheme();
  // const [value, setValue] = useState('');

  return (
    <>
      <Box sx={{ display: { md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
};

export default SearchSection;
