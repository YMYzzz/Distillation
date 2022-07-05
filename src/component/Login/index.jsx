import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as reactIconsFa from "react-icons/fa";
import * as reactIconsRi from "react-icons/ri";
import * as reactJss from "react-jss";
import {
    mainTheme, lightTheme, darkTheme,
    loginLayoutStyles, loginPageStyles, buttonStyles, inputStyles,
    toggleThemeButtonStyles,
    labelStyles, alertStyles
} from '../../style/mainStyle';

const LoginMod = () => {

    const { useState, createContext, useContext } = React;
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
            <p style={{ margin: '10px', fontWeight: 100, color: '#94979c' }}>或</p>
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

    function LoginPage(props) {
        const classes = props.classes;
        const navigate = useNavigate();

        const [phoneNum, setPhone] = useState('');
        const [password, setPassword] = useState('');
        const [formErrors, setFormErrors] = useState([]);
        const [isSuccessed, setSuccess] = useState(false);

        const redirectToRegistration = () => {
            navigate('/registration');
        }

        const passwordValidate = (value) => {
            if (!value || value.length < 6) return '密码长度必须超过6个字符。';
            return undefined;
        }


        const loginSubmitHandler = async (e) => {
            e.preventDefault();

            let errors = [];
            let passwordCheck = passwordValidate(password);
            if (passwordCheck) errors.push(passwordCheck);

            setFormErrors(errors);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': phoneNum, password })
            };
            const response = await fetch('http://127.0.0.1:5000/api/user/login', requestOptions);
            const result = await response.json();
            console.log(response.status);
            console.log(result);
            if (result.meta.status == '2000') {
                setSuccess(true);
                localStorage.setItem('token', result.data.token);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
        }

        return <div className={classes.loginCard}>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
                <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
                <span>Distillation 在线服务</span>
            </div>

            <h1 className={classes.cardHeader}>登录</h1>

            <div className="form">

                <form onSubmit={loginSubmitHandler}>

                    {formErrors.length ? <Alert title="登录失败">
                        {formErrors.map(err => <div>{err}</div>)}
                    </Alert> : ''}

                    {isSuccessed ? <Alert type="success">欢迎!</Alert> : ''}

                    <div name="phone">
                        <Label>
                            <span>手机号</span>
                            <Input value={phoneNum} onChange={(e) => setPhone(e.target.value)} />
                        </Label>
                    </div>

                    <div name="password" validate={passwordValidate}>
                        <Label>
                            <span>密码</span>
                            <Input placeholder="包含数字、大小写字母且长度为6-16位" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Label>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <Button type="submit" fullWidth>登录</Button>
                    </div>

                </form>

            </div>

            <Divider />
            <Button fullWidth onClick={redirectToRegistration} color="green" iconLeft={<FaPlusCircle />}>注册账户</Button>

        </div>
    }
    LoginPage = withStyles(loginPageStyles)(LoginPage);

    return <CustomThemeProvider>
        <LoginLayout><LoginPage /></LoginLayout>
    </CustomThemeProvider>

};

export default LoginMod;