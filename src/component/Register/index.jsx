import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as reactIconsFa from "react-icons/fa";
import * as reactIconsRi from "react-icons/ri";
import * as reactJss from "react-jss";
import {
    mainTheme, lightTheme, darkTheme,
    loginLayoutStyles, buttonStyles, inputStyles,
    toggleThemeButtonStyles, registrationPageStyles,
    labelStyles, alertStyles
} from '../../style/mainStyle';

const RegisterMod = () => {

    const { useState, createContext, useContext, useEffect,View } = React;
    const { ThemeProvider, withStyles } = reactJss;
    //const { BrowserRouter, Switch, Route, useHistory } = ReactRouterDOM;
    const { FaChessBishop, FaPlusCircle, FaArrowLeft } = reactIconsFa;
    const { RiMoonClearLine, RiSunLine } = reactIconsRi;

    const CustomThemeContext = createContext();

    const CustomThemeProvider = props => {
        const [currentTheme, setCurrentTheme] = useState('light');

        const toggleTheme = () => {
            let newValue = currentTheme === 'light' ? 'dark' : 'light';
            setCurrentTheme(newValue);
        }

        const themeData = { currentTheme, toggleTheme };
        return (
            <CustomThemeContext.Provider value={themeData}>
                <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
                    {props.children}
                </ThemeProvider>
            </CustomThemeContext.Provider>
        );
    };

    const useThemeContext = () => {
        return useContext(CustomThemeContext);
    };

    function ToggleThemeButton(props) {
        const classes = props.classes;
        const { currentTheme, toggleTheme } = useThemeContext();

        return <button className={classes.button} onClick={toggleTheme}>
            {currentTheme === 'light' ? <RiMoonClearLine className={classes.themeIcon} /> : <RiSunLine className={classes.themeIcon} />}
        </button>
    }
    ToggleThemeButton = withStyles(toggleThemeButtonStyles)(ToggleThemeButton);

    function LoginLayout(props) {
        const classes = props.classes;

        return <div className={classes.loginLayout}>
            <div className={classes.rightAngleAction}>
                <ToggleThemeButton size={'2.2em'} transparent />
            </div>
            {props.children}
        </div>
    }
    LoginLayout = withStyles(loginLayoutStyles)(LoginLayout);

    function Divider(props) {
        return <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
            <p style={{ margin: '10px', fontWeight: 100, color: '#94979c' }}>OR</p>
            <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
        </div>
    }

    function Alert(props) {
        const classes = props.classes;
        return <>
            <div className={classes.alert}>
                <summary className={classes.title}>{props.title}</summary>
                {props.children}
            </div>
        </>
    }
    Alert = withStyles(alertStyles)(Alert);

    function Label(props) {
        const classes = props.classes;
        return (
            <label className={classes.label}>
                {props.children}
            </label>
        );
    }
    Label = withStyles(labelStyles)(Label);

    function Button(props) {
        const classes = props.classes;
        return <button
            className={classes.buttonMain}
            onClick={props.onClick}
            type={props.type}
        >
            {props.iconLeft ? <span className={classes.iconLeft}>{props.iconLeft}</span> : ''}
            {props.children}
        </button>
    }
    Button = withStyles(buttonStyles)(Button);

    function Input(props) {
        const classes = props.classes;
        return <div className={classes.inputWrapper + (props.type === 'checkbox' ? ' ' + classes.inlineWrapper : '')}>
            <input
                className={classes.inputMain + (props.type === 'checkbox' ? ' ' + classes.checkbox : '')}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                checked={props.value}
                type={props.type}
                style={{ ...props.style }}
            >
            </input>
        </div>
    }
    Input = withStyles(inputStyles)(Input);
 
    function RegistrationPage(props) {
        const classes = props.classes;
        const navigate = useNavigate();
        const [response, setResponse] = useState('');
        const [username, setUsername] = useState('');
        const [code, setCode] = useState('');
        const [password, setPassword] = useState('');
        const [repeatPassword, setRepeatPassword] = useState('');
        const [formErrors, setFormErrors] = useState([]);

        let [num,setNum]=useState(0);
        let [phoneNum,setTel]=useState("");

        const handleSend= async (e)=>{
            e.preventDefault();
            let a = 10;
            console.log(phoneNum,'手机号');
            var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (reg_tel.test(phoneNum)) {
                setNum(a)
                const t1 = setInterval(()=>{
                    a=a-1
                    setNum(a)
                    if(a==0){
                        clearInterval(t1)
                    }
                },1000);
                const data = { 'phone': phoneNum };
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data })
                };
                const response = await fetch('http://127.0.0.1:5000/api/user/valid_code', requestOptions);
                const result = await response.json();
                console.log(response.status);
                console.log(result);
            }else {
                alert('手机号格式不正确')
            }
        }
        const onChangeInput = (e:ChangeEvent<HTMLInputElement>) =>{
            console.log("Input改变",e.target.value);
        
            var reg_num = /^[0-9]*$/
            if (reg_num.test(e.target.value)) {
                setTel(e.target.value)
                console.log(333);
            }
        }
        useEffect(()=>{
            console.log('数据发生了变化,触发useEffect',num);
        })

        const backToLogin = () => {
            navigate('/login');
        }

        const passwordValidate = (value) => {
            if (!value || value.length < 6) return '密码长度应超过6个字符。';
            return undefined;
        }

        const repeatValidate = (val1, val2) => !val1 || val2 !== val1 ? '密码不匹配' : undefined;

        const registrationSubmitHandler = async (e) => {
            e.preventDefault();
            console.log('registration sumbmit handler');

            let errors = [];

            let passwordCheck = passwordValidate(password);
            if (passwordCheck) errors.push(passwordCheck);

            let repeatCheck = repeatValidate(password, repeatPassword);
            if (repeatCheck) errors.push(repeatCheck);

            setFormErrors(errors);
            const data = { phoneNum, username, password ,code};
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data })
            };
            const response = await fetch('http://127.0.0.1:5000/api/user/register', requestOptions);
            const result = await response.json();
            console.log(response.status);
            console.log(result);
            //TODO: check the response.status
            if (!errors.length) setResponse('注册成功, 请登录');
        }

        return (<div className={classes.loginCard}>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
                <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
                <span>Abstract Text2Title Service</span>
            </div>

            <h1 className={classes.cardHeader}>注册账户</h1>

            {!response ? <div className="form">

                <div>
                <Label>
                <span>请输入手机号</span>
                <div style={{ display: "flex"}}>
                <Input type="text" value={phoneNum}  onChange={onChangeInput} />
                <Button type="button" disabled={num!==0} onClick={handleSend}>{num==0?'发送验证码':num+"秒"}</Button>
                </div>
                </Label>
                </div>

                <form onSubmit={registrationSubmitHandler}>

                    {formErrors.length ? <Alert title="注册失败">
                        {formErrors.map(err => <div>{err}</div>)}
                    </Alert> : ''}

                    <div>
                        <Label>
                            <span>用户名</span>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Label>
                    </div>

                    <div>
                        <Label>
                            <span>请设定密码</span>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Label>
                    </div>

                    <div>
                        <Label>
                            <span>请重复输入密码</span>
                            <Input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        </Label>
                    </div>

                    <div>
                        <Label>
                            <span>请输入验证码</span>
                            <Input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                        </Label>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <Button type="submit" fullWidth>创建账户</Button>
                        <Divider />
                    </div>

                </form>

            </div> : <Alert type="success">{response}</Alert>
            }

            <Button fullWidth onClick={backToLogin} color="green" iconLeft={<FaArrowLeft />}>回到登录</Button>

        </div>)
    }

    RegistrationPage = withStyles(registrationPageStyles)(RegistrationPage);

    return <CustomThemeProvider>
        <LoginLayout><RegistrationPage /></LoginLayout>
    </CustomThemeProvider>

};

export default RegisterMod;
