import './style.css'
import { createContext, useState, ReactNode } from "react";
import foto from '../../assets/user.png'
import axios from 'axios';

interface inicioContextProps {
    message: string;
    showInicio: (msg: string) => void;
    userData: any;
}

interface inicioProviderProps {
    children: ReactNode;
}

interface UserData {
    conta: boolean;
    foto: string;
    nome: string;
    cargo: string;
}

export const InicioContext = createContext<inicioContextProps  | undefined>(undefined);
export const InicioProvider = ({ children }: inicioProviderProps) => { 
    const [message, setMessage] = useState<string>("");

    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [nome,setNome] = useState('')
    const [numero,setNumero] = useState('')
    const [currentStep, setCurrentStep] = useState<"login" | "registerEmail" | "inicio" | "registerDetails">("inicio");

    const [conta,setConta] = useState(false)
    const [userData,setuserData] = useState<UserData>({
        conta: false,
        foto: foto,
        nome: "Fabricio Peres",
        cargo: "Sem cargo",
    });

    const verifyEmail = email.length > 10 && email.includes('@')
    const verifyNome = nome.length > 3 && /\s[a-zA-Z]/.test(nome); 
    const verifySenha = senha.length > 3
    const verifyNumero = numero.length > 3

    const showInicio = (msg: string) => {
        setMessage(msg)
    }

    function formatNumero(value: string) {
        const numericValue = value.replace(/\D/g, "");

        return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
    }

    const changeInfo = (tipo: string, valor: string) => {
        if (tipo == "Email") { setEmail(valor)}
        if (tipo == "Senha") { setSenha(valor)}
        if (tipo == "Nome") { setNome(valor)}
        if (tipo == "Numero") { setNumero(formatNumero(valor)) }
    }
    
    const confirmar = async () => {
        if (verifyEmail && verifySenha) {
             // API PARA VERIFICAR SENHA E EMAIL
            if (conta) {
                 // ADICIONA API PARA PUXAR OS DADOS
                await axios.post(`http://localhost:3000/checkLogin`, { params: { email: email, senha: senha } })
                .then((response) => {
                    setuserData({ conta: true, foto: foto, nome: response.data.nome, cargo: response.data.cargo })
                    setMessage("");
                })
    
                .catch((error) => {
                    if (error.response) {
                        return console.log(error.response.data.error || error.response.statusText);
                    } else if (error.request) {
                        return console.log('Erro de rede: Não foi possível obter uma resposta do servidor');
                    } else {
                        return console.log('Erro:' + error.message);
                    }
                });
            } else if (currentStep == "registerDetails" && verifyNome && verifyNumero) {
                criarConta();
                setCurrentStep("inicio");
            } else {
                setCurrentStep("registerDetails");
            }
        } else {
            await axios.post(`http://localhost:3000/checkEmail`, { params: { email: email } })
            .then(() => {
                setConta(true)
                setCurrentStep("login")
                console.log("Usuário encontrado")
            })

            .catch((error) => {
                if (error.response) {
                    setCurrentStep("registerEmail");
                    return console.log(error.response.data.error || error.response.statusText);
                } else if (error.request) {
                    return console.log('Erro de rede: Não foi possível obter uma resposta do servidor');
                } else {
                    return console.log('Erro:' + error.message);
                }
            });
        }
    };

    const criarConta = async () => {
        if (!email || !senha || !nome || !numero) { return }
        const numericValue = numero.replace(/\D/g, "");
        //API para criar a conta
        await axios.post(`http://localhost:3000/criarUsuario`, { 
            params: { 
                email: email,
                senha: senha,
                nome: nome,
                numero: numericValue
            } 
        })

        .then(() => {
            setuserData({ conta: true, foto: foto, nome: nome, cargo: 'Usuário' })
            setMessage("")
            console.log("Usuário Criado")
        })

        .catch((error) => {
            if (error.response) {
                setCurrentStep("registerEmail");
                return console.log(error.response.data.error || error.response.statusText);
            } else if (error.request) {
                return console.log('Erro de rede: Não foi possível obter uma resposta do servidor');
            } else {
                return console.log('Erro:' + error.message);
            }
        });
    }

    return (
        <InicioContext.Provider value={{ message, showInicio, userData }}>
        {children} {message && 
            <div className='conta'>
                <div className='titulo'>{ currentStep == "login" ? 'Login' : 'Criar Conta' }</div>
                <div className='desc'>{conta ? 'Faça login para gerenciar seus agendamentos.' : currentStep == "inicio" ? 'Crie sua conta ou faça login para conseguir agendar ou gerenciar os seus agendamentos!' : 'Crie sua conta iniciar seus agendamentos!!'}</div>
                <div className='fechar' onClick={() => {setMessage(''); conta: false}}></div>
                {currentStep == 'login' ? 
                    (<>
                        <div className='aba'>
                            <input onChange={(e) => changeInfo('Email', e.target.value)} className='email' type="email" placeholder='Seu E-mail' />
                            <input onChange={(e) => changeInfo('Senha', e.target.value)} className='senha' type="password" placeholder='Sua senha de login' />
                            <button className='confirmar' onClick={confirmar} style={{ pointerEvents: verifyEmail && verifySenha ? 'auto' : 'none', opacity: verifyEmail && verifySenha ? 1 : 0.5 }}>Confirmar</button>
                        </div>
                    </>) : currentStep == "registerEmail" ? (<>
                        <div className='aba'>
                            <input onChange={(e) => changeInfo('Email', e.target.value)} className='email' type="email" placeholder='Seu E-mail' />
                            <input onChange={(e) => changeInfo('Senha', e.target.value)} value={senha} className='senha' type="text" placeholder='Sua senha para registro' />
                            <button className='confirmar' onClick={confirmar} style={{ pointerEvents: verifyEmail && verifySenha ? 'auto' : 'none', opacity: verifyEmail && verifySenha ? 1 : 0.5 }}>Confirmar</button>
                        </div>
                    </>) : currentStep == "registerDetails" ? (<>
                        <div className='aba'>
                            <input onChange={(e) => changeInfo('Nome', e.target.value)} value={nome} className='email' type="text" placeholder='Seu Nome e Sobrenome' />
                            <input onChange={(e) => changeInfo('Numero', e.target.value)} value={numero} className='senha' type="text" placeholder='Seu número' maxLength={15} />
                            <button className='confirmar' onClick={confirmar} style={{ pointerEvents: verifyNome && verifyNumero ? 'auto' : 'none', opacity: verifyNome && verifyNumero ? 1 : 0.5 }}>Confirmar</button>
                        </div>
                    </>) : (<>
                        <div className='aba'>
                            <input onChange={(e) => changeInfo('Email', e.target.value)} className='email' type="email" placeholder='Seu e-mail' />
                            <button className='confirmar' onClick={confirmar} style={{ pointerEvents: verifyEmail ? 'auto' : 'none', opacity: verifyEmail ? 1 : 0.5 }}>Confirmar</button>
                        </div>
                    </>)
                }
            </div>
        }
    </InicioContext.Provider>   
    )
}

export default InicioProvider