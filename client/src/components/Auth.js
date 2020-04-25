import React,{useEffect,useState} from 'react';
import Login from './Login';
import Signup from './Signup';
import {connect} from 'react-redux';
import {checkAdmins,B64toJSON,reloadToken} from '../Actions';
import {useHistory} from 'react-router-dom';


const Auth = (props) => {

    const {hasAdmins} = props;
    const history = useHistory();
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        props.dispatch(checkAdmins());
    },[])

    useEffect(() => {
        if(props.role === undefined ||
            props.role === ''){
                setLoaded(true);
                return;
            }
        if(window.btoa(B64toJSON(localStorage.getItem('token')).role) === "YWRtaW4=")
            history.push('/');
        
            
    }, [props.role])
    
    return (hasAdmins !== undefined && loaded?
            <div>
                {hasAdmins?<Login/>:<Signup/>}
            </div>:
            <div>Se incarca...</div>)
};

const mapStateToProps = state =>({
    role:state.role,
    hasAdmins:state.hasAdmins
})

export default connect(mapStateToProps)(Auth);