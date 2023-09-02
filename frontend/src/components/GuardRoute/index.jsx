/* eslint-disable react/prop-types */
import useOAuth from '../../stores/oAuth';
import { Navigate } from 'react-router-dom';

const GuardRoute = ({
  type,
  element
}) => {
  const oAuth = useOAuth((state) => state);

  if (type === 'protected' && !oAuth.isLogged) {
    return <Navigate to="/login" replace={true} />
  }

  if (type === 'guest' && oAuth.isLogged) {
    return <Navigate to="/" replace={true} />
  }

  return element;
}

export default GuardRoute;
