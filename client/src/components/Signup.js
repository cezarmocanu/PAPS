import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {postSignup} from '../Actions';

const Signup = props =>{

    const fields=[{type:"email",name:"email",label:"Adresa Email"},
                  {type:"email",name:"emailConfirm",label:"Confirma Adresa Email"},
                  {type:"password",name:"password",label:"Parola"},
                  {type:"password",name:"passwordConfirm",label:"Connfirma Parola"}
                ];

    const [data,setData] = useState({email:'',
                                     emailConfirm:'',
                                     password:'',
                                     passwordConfirm:''});
    
    const [showSubmit,setShowSubmit] = useState(false);
    const [time,setTime] = useState(5);

    const onChange = (e) =>{
        e.preventDefault();
        setData({...data,
                [e.target.name]:e.target.value});

    }

    useEffect(() => {
        const emailSame = data['email'] !== '' && data['email'] === data['emailConfirm'];
        const passwordSame = data['password'] !== '' && data['password'] === data['passwordConfirm'];
        setShowSubmit(emailSame && passwordSame);
    }, [data])

    const onSumbit = (e)=>{
        e.preventDefault();
        props.dispatch(postSignup(JSON.stringify({email:data.email,password:data.password})));
    }

    const {signupSuccess} = props;
    
    useEffect(() => {
        let interval = null;
        if(time > 0 && signupSuccess)
            interval = setInterval(() => {
                        setTime(time => time - 1);
            }, 1000);
        else{
            clearInterval(interval);
            if(time === 0){
                window.location.reload(true);
            }
            
        }
        return ()=>clearInterval(interval);
        
    }, [signupSuccess,time])

    const formFields = fields
                        .map(f => (<div key={f.name}>
                                    <label htmlFor={f.name}>{f.label}</label>
                                    <input 
                                    name={f.name}
                                    type={f.type}
                                    onChange={onChange}
                                    value={data[f.name]}/>
                                  </div>))

    return (<div>
                {signupSuccess !==undefined && 
                <div>
                    {signupSuccess?<h1>Contul a fost creat cu succes. Veti fi redirectionat in {time} secunde...</h1>:<h1>S-a produs o eroare la crearea contului</h1>}
                </div>}
                {signupSuccess === undefined &&
                <form onSubmit={onSumbit}>
                    {formFields}
                    {showSubmit && <input type="submit" value="Creeaza cont"/>}
                </form>
                }
            </div>)
};

const mapStateToProps = (state)=>({
    signupSuccess:state.signupSuccess
})

export default connect(mapStateToProps)(Signup);