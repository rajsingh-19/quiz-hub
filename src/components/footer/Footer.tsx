import React from 'react'
import styles from "./footer.module.css";
import { FcLike } from "react-icons/fc";

interface SocialLink {
  href: string;
  label: string;
}

const links: SocialLink[] = [
  { href: "https://www.github.com/rajsingh-19", label: "Github" },
  { href: "https://www.linkedin.com/in/raj-singh19/", label: "LinkedIn" },
  { href: "https://www.twitter.com/raj_singh_19", label: "Twitter" },
  { href: "https://singhrajportfolio.netlify.app/", label: "Portfolio" }
];

const Footer:React.FC = (): React.ReactElement => {
  return (
    <div className={`${styles.footerContainer} flex dir-row align-center justify-space-btwn position-absolute`}>
        {/*         Copyright section       */}
        <div className={styles.copyrightContainer}><span>&copy;</span>2025 Quiz Hub, Inc. All rights reserved</div>
        {/*         Author Section          */}
        <div className={`${styles.authorContainer} flex dir-row align-center text-white`}>
          <span>Made with</span>&nbsp;<FcLike />&nbsp;<span>by Raj Singh</span>
        </div>
        {/*         Social Media Links      */}
        <div className='flex dir-row justify-center align-center'>
            <ul className={`${styles.ul} flex dir-row`}>
              {links.map(({ href, label }, index) => (
                <li key={index}>
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Footer;
