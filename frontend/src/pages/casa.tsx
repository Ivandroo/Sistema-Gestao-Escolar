import React, { useState } from "react";

import {
  Award,
  BookOpen,
  ShieldCheck,
  Cpu,
  Database,
  Laptop,
  Radio,
  ArrowRight,
  UserCheck,
  Zap,
  Banknote,
  HandCoins,
  Home,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Casa() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const garantias = [
    {
      titulo: "Áreas Diversas",
      subtitulo: "Cursos Técnicos Profissionais Variados",
      descricao: "Temos cursos técnicos de diversas áreas de formação",
    },
    {
      titulo: "Gestão Online",
      subtitulo: "Portal de Gestão",
      descricao:
        "Notas em tempo real, emissão de boletins, pautas de frequência",
    },
    {
      titulo: "Intercâmbio",
      subtitulo: "Formações com professores estrangeiros",
      descricao: "Recebemos formadores directamente da Escola de Gaia",
    },
  ];

  const cursos = [
    {
      icon: <Laptop />,
      titulo: "Informática ",
      descricao:
        "Prepara profissionais para a montagem e manutenção de computadores, configuração de redes, instalação de sistemas operativos e desenvolvimento de programas.",
    },
    {
      icon: <Home />,
      titulo: "Desenhador Projetista",
      descricao:
        "Prepara profissionais para criar, interpretar e validar representações gráficas detalhadas de projetos de engenharia, arquitetura e infraestrutura.",
    },
    {
      icon: <Database />,
      titulo: "Gestão de Sistemas Informáticos",
      descricao:
        "Forma profissionais focados na administração e suporte, garantindo a segurança de dados e o desenvolvimento de soluções digitais corporativas.",
    },
    {
      icon: <Banknote />,
      titulo: "Contabilidades e Gestão",
      descricao:
        "Prepara profissionais para atuar no coração administrativo e financeiro das organizações.",
    },
    {
      icon: <Cpu />,
      titulo: "Eletrónica e Telecomunicações",
      descricao:
        "Forma profissionais capacitados para planear, instalar, operar e reparar sistemas eletrónicos (analógicos e digitais) e infraestruturas de comunicação de dados.",
    },
    {
      icon: <HandCoins />,
      titulo: "Finanças",
      descricao:
        "Forma profissionais especializados na gestão de recursos monetários, análise de investimentos e controlo orçamental das organizações.",
    },
  ];

  const recursos = [
    {
      icon: <Award />,
      titulo: "Boletim Trimestral Digitalizado",
      descricao:
        "Média ponderada imediata das provas de avaliação contínua, provas trimestrais e notas de comportamento.",
    },
    {
      icon: <BookOpen />,
      titulo: "Frequência e Chamada em Tempo Real",
      descricao:
        "Professores controlam ausências diretamente das salas de aula. Encarregados recebem avisos de faltas imediatas.",
    },
    {
      icon: <ShieldCheck />,
      titulo: "Segurança dos dados",
      descricao:
        "Dados seguros de forma eficientes e acessíveis à qualquer momento e de qualquer lugar.",
    },
  ];

  const faq = [
    {
      pergunta: "Como visualizar as notas e frequência do meu filho?",
      resposta:
        "Você pode acessar as notas e frequência através do portal IPOCET usando suas credenciais de encarregado. O boletim é atualizado em tempo real e está disponível na seção 'Notas e Frequência' do seu dashboard.",
    },
    {
      pergunta: "Como resetar minha senha de acesso?",
      resposta:
        "Caso esqueça sua senha, clique em 'Esqueci a senha' na página de login. Insira seu email ou número de matrícula e você receberá um link de recuperação por email para redefinir sua senha com segurança.",
    },
    {
      pergunta: "Qual é o horário de atendimento do suporte técnico?",
      resposta:
        "O suporte técnico do portal está disponível de segunda a sexta-feira, das 08:00 às 17:00. Você pode contactar através do email suporte@ipocet.ao ou pelo telefone disponível no portal.",
    },
    {
      pergunta: "Como é calculada a média final do aluno?",
      resposta:
        "A média é calculada através de uma ponderação que inclui: avaliação contínua (40%), provas trimestrais (50%) e comportamento (10%). O sistema calcula automaticamente e apresenta o resultado em tempo real no boletim.",
    },
    {
      pergunta: "Posso alterar meus dados pessoais ou de contacto?",
      resposta:
        "Sim, você pode atualizar seus dados pessoais diretamente no portal acessando 'Perfil' ou 'Minha Conta'. Para alterações de dados escolares, entre em contacto com a secretaria da instituição através do portal de contactos.",
    },
  ];

  return (
    <section className="casa-container">
      <div className="casa-content">
        <span className="casa-badge-upper">
          Educação Tecnológica de Excelência • Angola
        </span>
        <h1 className="casa-title-upper">
          Moldando o futuro através da <br />
          <span className="casa-subtitle-upper">Engenharia e Inovação</span>
        </h1>
        <p className="casa-description-upper">
          Bem vindo ao portal institucional do <b> IPOCET </b>, uma instituição
          focada na formação de técnicos médios competentes e capazes de
          entregar o que o mercado de trabalho atual precisa. Este portal é
          somente para entidades que estejam directamente ligados à
          instituição!! Visando dar suporte aos Alunos, Professores, Encarregados
          e Directores Pedagógicos.
        </p>
        <div className="casa-buttons-upper">
          <a href="" className="casa-button-link1">
            Contactar Instituição
          </a>
          <Link to="login" className="casa-button-link2">
            Acessar Portal <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="casa-garantias">
        {garantias.map((index, item) => {
          return (
            <div key={item} className="casa-garantias-box">
              <h1 className="casa-garantias-title"> {index.titulo}</h1>
              <h3 className="casa-garantias-subtitle"> {index.subtitulo} </h3>
              <span className="casa-garantias-description">
                {" "}
                {index.descricao}{" "}
              </span>
            </div>
          );
        })}
      </div>

      <div className="casa-cursos">
        <span className="casa-cursos-badge">Nossas Áreas Académicas</span>
        <h2 className="casa-cursos-title">Formação Curricular Especializada</h2>
        <p className="casa-cursos-subtitle">
          Oferecemos uma formação teórica aprofundada aliada a laboratórios
          modernos em variadas doações de engenharia.
        </p>
        <div className="casa-cursos-grid">
          {cursos.map((index, id) => {
            return (
              <div key={id} className="casa-cursos-box">
                <span className="casa-cursos-box-icon"> {index.icon}</span>
                <h3 className="casa-cursos-box-title"> {index.titulo} </h3>
                <p className="casa-cursos-box-description">
                  {" "}
                  {index.descricao}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="casa-recursos">
        <div className="casa-func">
          <span className="casa-cursos-badge">
            Funcionalidades do Portal Ipocet
          </span>
          <h2 className="casa-cursos-title">
            Uma plataforma polida de controle e cooperação pedagógica
          </h2>
          <p className="casa-cursos-subtitle">
            O sistema virtual unifica as ações diárias da escola para evitar
            burocracia, dar mais transparência aos encarregados de educação e
            agilizar os lançamentos dos professores. Tudo projetado sobre alta
            segurança e persistência confiável.
          </p>
          <div className="casa-func-boxes">
            {recursos.map((item, idx) => {
              return (
                <div key={idx} className="casa-func-box">
                  <div className="casa-cursos-box-icon">{item.icon}</div>
                  <div className="casa-func-text-div">
                    <h3 className="casa-cursos-box-title">{item.titulo}</h3>
                    <p className="casa-cursos-box-description">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="casa-faq">
          <span className="casa-cursos-badge">Perguntas Frequentes</span>
          <h2 className="casa-cursos-title">Dúvidas Comuns Sobre o Portal</h2>
          <p className="casa-cursos-subtitle">
            Encontre respostas para as perguntas mais frequentes sobre como
            utilizar o portal IPOCET e seus recursos.
          </p>
          <div className="casa-faq-container">
            {faq.map((item, idx) => (
              <div key={idx} className="casa-faq-item">
                <button
                  className="casa-faq-pergunta"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                >
                  <span className="casa-faq-pergunta-text">
                    {item.pergunta}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`casa-faq-icon ${faqOpen === idx ? "open" : ""}`}
                  />
                </button>
                {faqOpen === idx && (
                  <div className="casa-faq-resposta">
                    <p>{item.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
