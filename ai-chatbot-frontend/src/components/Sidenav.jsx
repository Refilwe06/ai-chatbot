import Menu from './Menu';
import logo from '../assets/logo.png';
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';
const Sidenav = ({ handleClose = () => { } }) => {
    return (
        <>
            <div className="logo flex items-center">
                <img src={logo} alt="Superpage" width={'95%'} className='mobile-logo' />
                <Icon path={getIconPath('close')} width={20} height={20} classes='close-icon pointer' onClick={() => handleClose()} />
            </div>
            <Menu handleClose={handleClose} />
        </>
    )
}

export default Sidenav;