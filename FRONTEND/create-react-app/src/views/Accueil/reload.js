import {React, useEffect} from 'react';
import logoAccueil1 from 'assets/images/logoAccueil1.png';
import logoAccueil2 from 'assets/images/logoAccueil2.png';
import logo from 'assets/images/logoErgon.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import Loading from 'ui-component/Components/Loading/CylinderSpinLoader'

// ==============================|| SAMPLE PAGE ||============================== //

function Verification() {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    useEffect(() => {
        const redirectionTimeout = setTimeout(() => {
          window.location.href="http://localhost:3000/Ergon/auth/connexion"
        }, 5500);
    
        // Nettoyer le timeout lorsqu'un composant est démonté
        return () => clearTimeout(redirectionTimeout);
      }, [history]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        data-aos="zoom-in"
        data-aos-delay="500"
        style={{
          width: '500px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 50%)',
        }}
        src={logoAccueil1}
        alt="Logo"
      />
      <img
        data-aos="zoom-in"
        data-aos-delay="1500"
        style={{
          width: '500px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 50%)',
        }}
        src={logoAccueil2}
        alt="Logo"
      />
      <img
        data-aos="zoom-in"
        data-aos-delay="2500"
        style={{
          width: '500px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 50%)',
        }}
        src={logo}
        alt="Logo"
      />
      {/* <Loading/> */}
    </div>
  );
}

export default Verification;
