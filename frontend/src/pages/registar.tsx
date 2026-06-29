import { useState, FormEvent  } from "react";
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  ArrowRight,
  ShieldAlert,
  IdCard
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { usuarioService } from "../services/usuario";
import { Link } from "react-router-dom";


export default function Registar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nBilhete, setNBilhete] = useState("");
  const [matricula, setMatricula] = useState("")
  const [role, setRole] = useState<"ALUNOS" | "RESPONSAVEL" | "PROFESSORES" | "ADMINISTRADORES">(
    "ALUNOS",
  );

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await usuarioService.create({ nome, email, nBilhete, role, senha })

      setNome("")
      setEmail('')
      setSenha('')
      setNBilhete('')
      setMatricula('')
      setRole('ALUNOS')

      alert("Usuario criado com sucesso! Faça o Login.")

    } catch (err: any) {
      const errorMsg = err?.message || 'Erro ao criar usuário'
      setError(errorMsg)
      alert(errorMsg)
    }
  }

  return (
    <section className="register-container">
      <div className="register-content">
        <div className="register-upper">
          <h2>Increva-se no portal</h2>
          <p>Crie sua conta no Portal e tenha acesso aos recursos.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register-form">
            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Nome Completo
              </label>
              <div className="register-box-input">
                <User className="input-icon"/>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="EX: Manuel Junqueira"
                  required
                  className="register-input"
                />
              </div>
            </div>
            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Email de Usuário
              </label>
              <div className="register-box-input">
                <Mail className="input-icon"/>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: ManuelJunqx67@gmail.com"
                  required
                  className="register-input"
                />
              </div>
            </div>
            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Nª Bilhete
              </label>
              <div className="register-box-input">
                
                <IdCard className="input-icon"/>
                <input
                  type="text"
                  value={nBilhete}
                  onChange={(e) => setNBilhete(e.target.value)}
                  placeholder="001234567NN012"
                  required
                  className="register-input"
                />
              </div>
            </div>
            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Palavra passe
              </label>
              <div className="register-box-input">
                <Lock className="input-icon"/>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="*****"
                  required
                  className="register-input"
                />
              </div>
            </div>
          </div>

          <div className="register-form-role">
            <label htmlFor="">Perfil Desejado no Portal</label>
            <div className="register-role-boxes">
                <button
                    type="button"
                    onClick={() => setRole('ALUNOS')}
                    className={`${role === 'ALUNOS' ? 'role-active':'role-desable'}`}
                >
                    <div className="register-role-icon">
                        <User size={14} />
                    </div>
                    <span>Aluno</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('RESPONSAVEL')}
                    className={`${role === 'RESPONSAVEL' ? 'role-active':'role-desable'}`}
                >
                    <div className="register-role-icon">
                        <RiParentFill size={14}/>
                    </div>
                    <span>Responsável</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('PROFESSORES')}
                    className={`${role === 'PROFESSORES' ? 'role-active':'role-desable'}`}
                >
                    <div className="register-role-icon">
                        <FaChalkboardTeacher size={14}/>
                    </div>
                    <span>Docente</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('ADMINISTRADORES')}
                    className={`${role === 'ADMINISTRADORES' ? 'role-active':'role-desable'}`}
                >
                    <div className="register-role-icon">
                        <ShieldCheck size={14}/>
                    </div>
                    <span>Admin</span>
                </button>
            </div>
          </div>

          <div className="register-form-student">
            {
                role === "RESPONSAVEL" && (
                    <div className="register-student">
                        <div className="register-form-box">
                            <label htmlFor="" className="register-box-title">
                                Nª Bilhete do estuante
                            </label>
                            <div className="register-box-input">
                                <IdCard className="input-icon"/>
                                <input
                                type="text"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                placeholder="001234567NN012"
                                required
                                className="register-input"
                                />
                            </div>
                        </div>
                    </div>
                )
            }
          </div>

          <button
            type="submit"
            className="register-confirm-button"
          >
            Cadastrar e entrar <ArrowRight size={14} />
          </button>
        </form>
        
      </div>
      <p className="register-login-button">Já tem uma conta? <a href="#/login">Fazer Login</a></p>
      
    </section>
  );
}
