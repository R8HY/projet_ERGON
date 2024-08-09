// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
import logo from 'assets/images/logoErgon.png';

const Logo = () => {

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <div style={{display:"flex", direction:"row"}}>
      <img src={logo} alt="Berry" width="90" />
      <p style={{fontSize:"20px", fontWeight:"bold", margin:"25px 0 0 0"}}>ERGON</p>
    </div>
  );
};

export default Logo;
