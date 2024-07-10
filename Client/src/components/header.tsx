import { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/icons/menu.svg';

const Header = () => {
    const store = useContext(Context);
    const navigate = useNavigate();
    return (
        <header className="bg-gradient-to-b  relative from-[#19d8ff] from-80% to-100% mix-blend-screen to-[#08a7f1] md:h-14 h-12 flex w-full"
            style={
                {
                    boxShadow: "0px 2px 1px rgb(0, 31, 144), 0px 1px 100px rgba(248, 253, 252, 0.4)",
                }
            }
        >
            <div className="md:mx-8 mx-2 flex flex-row w-full justify-between items-center ">
                something
            </div>
        </header>
    );
}

export default Header;