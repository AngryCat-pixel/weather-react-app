import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectAuth, selectVirificated } from '../../features/auth/authSlice';

export function ProtectRoute({ children }) {
    const verified = useSelector(selectVirificated);
    const auth = useSelector(selectAuth);
    let location = useLocation();
    
    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (!verified && children.type.name !== 'ConfirmPage') {
        console.log("check check")
        return <Navigate to="/confirm" state={{ from: location }} replace />;
    }
    console.log("children")
    return children;
}
