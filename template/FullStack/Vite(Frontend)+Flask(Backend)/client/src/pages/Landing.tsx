import { Hero } from '@/components/Hero/Hero'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate(); 

    const handleSignupClick = () => {
        navigate('/signup'); 
    };

    return (
        <div>
            <Hero onSignupClick={handleSignupClick} />
        </div>
    )
}

export default Landing