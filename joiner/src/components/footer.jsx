import React from 'react';
import '../styles/footer.scss';
const Footer = props => {
  return (
    <div className="footerContainer">
      <ul className="joinerMem">
        <li>
          {' '}
          <a href="https://github.com/gimoring" target="_blank">
            <img src="https://img.shields.io/badge/Byeon,Junphil-34314c?style=flat-square&logo=GitHub&logoColor=white" />
          </a>
        </li>
        <li>
          {' '}
          <a href="https://github.com/eom1228" target="_blank">
            <img src="https://img.shields.io/badge/Eom,Taeho-34314c?style=flat-square&logo=GitHub&logoColor=white" />
          </a>
        </li>
        <li>
          {' '}
          <a href="https://github.com/sungminji" target="_blank">
            <img src="https://img.shields.io/badge/Sung,Minji-34314c?style=flat-square&logo=GitHub&logoColor=white" />
          </a>
        </li>
        <li>
          {' '}
          <a href="https://github.com/kimminsu94" target="_blank">
            <img src="https://img.shields.io/badge/Kim,Minsu-34314c?style=flat-square&logo=GitHub&logoColor=white" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
