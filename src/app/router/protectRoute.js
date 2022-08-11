import { selectVirificated, selectAuth } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectRoute({ children }) {
    const verified = useSelector(selectVirificated);
    const auth = useSelector(selectAuth);
    let location = useLocation();
    
    if (!auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (!verified && children.type.name !== 'ConfirmPage') {
        return <Navigate to="/confirm" state={{ from: location }} replace />;
    }
    return children;
}
