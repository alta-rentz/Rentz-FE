import './footer.scss';
import { BsFacebook, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
    <div className="c-footer">
      <footer>
        <p> © Rentz.ID</p>
        <div className="follow-footer"><p>IKUTI KAMI</p> 
        
        <BsFacebook size="25px" style={{ marginRight : "10px"}}/>
        <BsInstagram size="25px"/>
        
        </div>
      </footer>
    </div>
    </>
  )
}

export default Footer;