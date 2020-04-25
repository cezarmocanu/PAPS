import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {postLogin} from '../Actions';

const Login = (props)=>{

    const fields = [{name:'email',type:'email',label:'Adresa Email'},
                    {name:'password',type:'password',label:'Parola'}];

    const [data,setInputs] = useState({email:'',password:''});
    const [showLogin,setShowLogin] = useState(false);
    const [error,setError] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        setInputs({...data,[e.target.name]:e.target.value})
    };

    useEffect(() => {
        const value = Object.keys(data).reduce((total,key)=>(total && (data[key].trim() !== '')),true);
        setShowLogin(value);
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        props.dispatch(postLogin(JSON.stringify(data)));
    };

    const history = useHistory();
    useEffect(() => {
        if(window.btoa(props.role) === "YWRtaW4=")
            history.push('/');
        else if(props.role !== undefined){
            ///de facut eroarea cu status
            setError(true);
            setInputs({email:'',password:''});
        }
    }, [props.role])

    const fieldList = fields.map(f => <div key={f.name}>
                                        <label htmlFor={f.name}>{f.label}</label>
                                        <input 
                                        onChange={onChange} 
                                        name={f.name} 
                                        type={f.type} 
                                        value={data[f.name]}/>                    
                                      </div>)

    return (<div>
                {error && <h1>Email sau parola incorecta</h1>}
                <form onSubmit={onSubmit}>
                    {fieldList}
                    {showLogin && <input type="submit" value="Intra in cont"/>}
                </form>
            </div>)
};

const mapStateToProps = (state)=>({
    role:state.role
});

export default connect(mapStateToProps)(Login);