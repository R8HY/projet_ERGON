import React from 'react';
import PropTypes from 'prop-types';
import CylinderSpin from './CylinderSpin';

const CylinderSpinLoader = props => (
    <CylinderSpin $duration={1} $size={6} color="#6f42c1" {...props} />
);

CylinderSpinLoader.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number,
};

CylinderSpinLoader.defaultProps = {
  color: '#6f42c1',
  duration: 1.1,
  size: 15,
};

export default CylinderSpinLoader;