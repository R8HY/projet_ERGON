import styled, { keyframes } from 'styled-components';

function createAnimation(props) {
  const d = document.createElement('div');
  d.style.color = props.color;
  document.body.appendChild(d);
  const rgbColor = window.getComputedStyle(d).color;
  const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.d+]*)*\)/g.exec(rgbColor);
  const color = `${match[1]}, ${match[2]}, ${match[3]}`;

  return keyframes`
    0%, 100% {
      box-shadow: 0em -2.6em 0em 0em ${props.color}, 1.8em -1.8em 0 0em rgba(${color}, 0.2), 2.5em 0em 0 0em rgba(${color}, 0.2), 1.75em 1.75em 0 0em rgba(${color}, 0.2), 0em 2.5em 0 0em rgba(${color}, 0.2), -1.8em 1.8em 0 0em rgba(${color}, 0.2), -2.6em 0em 0 0em rgba(${color}, 0.5), -1.8em -1.8em 0 0em rgba(${color}, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(${color}, 0.7), 1.8em -1.8em 0 0em ${props.color}, 2.5em 0em 0 0em rgba(${color}, 0.2), 1.75em 1.75em 0 0em rgba(${color}, 0.2), 0em 2.5em 0 0em rgba(${color}, 0.2), -1.8em 1.8em 0 0em rgba(${color}, 0.2), -2.6em 0em 0 0em rgba(${color}, 0.2), -1.8em -1.8em 0 0em rgba(${color}, 0.5);
    }
    /* ... Autres étapes de l'animation */
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(${color}, 0.2), 1.8em -1.8em 0 0em rgba(${color}, 0.2), 2.5em 0em 0 0em rgba(${color}, 0.2), 1.75em 1.75em 0 0em rgba(${color}, 0.2), 0em 2.5em 0 0em rgba(${color}, 0.2), -1.8em 1.8em 0 0em rgba(${color}, 0.5), -2.6em 0em 0 0em rgba(${color}, 0.7), -1.8em -1.8em 0 0em ${props.color};
    }
  `;
}

const CylinderSpin = styled.div`
  animation: ${(props) => createAnimation(props)} ${(props) => props.$duration}s infinite ease;
  border-radius: 50%;
  font-size: ${(props) => `${props.$size}px`};
  height: 1em;
  margin: 100px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 1em;
`;

export default CylinderSpin;
