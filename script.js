const atributosMutantes = {
    ciclope: { 
        name: "Ciclope",
        forca: '65%', agilidade: '75%', poder: '85%', cor: '#eab308', brilho: 'rgba(234, 179, 8, 0.6)', classe: 'ALFA', corClasse: '#f97316',
        desc: "Líder tático dos X-Men, ele possui a habilidade de disparar rajadas ópticas de energia concussiva diretamente de seus olhos."
    },
    "jean-grey": { 
        name: "Jean Grey",
        forca: '50%', agilidade: '75%', poder: '100%', cor: '#f97316', brilho: 'rgba(249, 115, 22, 0.6)', classe: 'ÔMEGA', corClasse: '#ef4444',
        desc: "Uma mutante de nível Ômega com poderes telepáticos e telecinéticos incrivelmente devastadores, ligada à Força Fênix."
    },
    "lince-negra": { 
        name: "Lince Negra",
        forca: '55%', agilidade: '90%', poder: '70%', cor: '#a855f7', brilho: 'rgba(168, 85, 247, 0.6)', classe: 'BETA', corClasse: '#eab308',
        desc: "Habilidade de se tornar intangível, permitindo que ela passe através de qualquer matéria sólida ou altere objetos que tocar."
    },
    tempestade: { 
        name: "Tempestade",
        forca: '55%', agilidade: '75%', poder: '95%', cor: '#e2e8f0', brilho: 'rgba(226, 232, 240, 0.5)', classe: 'ALFA', corClasse: '#f97316',
        desc: "Uma das mutantes mais poderosas da Terra, ela consegue controlar o clima, manipular ventos, chuvas e relâmpagos."
    },
    vampira: { 
        name: "Vampira",
        forca: '85%', agilidade: '70%', poder: '90%', cor: '#22c55e', brilho: 'rgba(34, 197, 94, 0.6)', classe: 'ALFA', corClasse: '#f97316',
        desc: "Ela tem a habilidade de absorver temporariamente as memórias, a força física e os superpoderes de qualquer um que tocar."
    },
    wolverine: { 
        name: "Wolverine",
        forca: '95%', agilidade: '80%', poder: '65%', cor: '#0271f7', brilho: 'rgba(2, 113, 247, 0.6)', classe: 'BETA', corClasse: '#eab308',
        desc: "Seu poder mutante é o fator de cura acelerado, sentidos aguçados e garras de adamantium totalmente retraíveis."
    },
    noturno: { 
        name: "Noturno",
        forca: '60%', agilidade: '100%', poder: '80%', cor: '#312e81', brilho: 'rgba(49, 46, 129, 0.7)', classe: 'BETA', corClasse: '#eab308',
        desc: "Capacidade de se teletransportar instantaneamente a distâncias visíveis, deixando uma névoa característica de enxofre."
    },
    magneto: { 
        name: "Magneto",
        forca: '75%', agilidade: '70%', poder: '98%', cor: '#ef4444', brilho: 'rgba(239, 68, 68, 0.6)', classe: 'ÔMEGA', corClasse: '#ef4444',
        desc: "O mestre do magnetismo. Consegue controlar qualquer tipo de metal e gerar campos de força magnéticos impenetráveis."
    }
};

const personagens = document.querySelectorAll('.personagem');
const containerImagem = document.querySelector('.container-imagem-grande');
const imagemPersonagemGrande = document.querySelector('.personagem-grande-imagem');
const nomePersonagem = document.getElementById('nome-personagem');
const descricaoPersonagem = document.getElementById('descricao-personagem');
const btnMusica = document.getElementById('btn-musica');

const logoXmen = document.getElementById('logo-xmen');
const modal = document.getElementById('modal-alerta');
const btnSecreto = document.getElementById('btn-secreto');
const btnFecharModal = document.getElementById('fechar-modal');
const barraForca = document.getElementById('barra-forca');
const barraAgilidade = document.getElementById('barra-agilidade');
const barraPoder = document.getElementById('barra-poder');
const tagAmeaca = document.getElementById('tag-ameaca');

const somMusica = document.getElementById('som-musica');
const somHover = document.getElementById('som-hover');
const somSelecionar = document.getElementById('som-selecionar');
const somSirene = document.getElementById('som-sirene');
const somGlitch = document.getElementById('som-glitch');
const somTeclado = document.getElementById('som-teclado');

somMusica.volume = 0.12;
somHover.volume = 0.15;
somSelecionar.volume = 0.3;
somSirene.volume = 0.2;
somGlitch.volume = 0.4;
somTeclado.volume = 0.05;

let indexAtivo = 5; 
let efeitoDigitacaoId = null;
let musicaLigada = false;

function escreverTextoTerminal(texto, elemento) {
    if (efeitoDigitacaoId) clearInterval(efeitoDigitacaoId);
    
    elemento.textContent = ''; 
    let i = 0;
    
    somTeclado.play().catch(() => {});

    efeitoDigitacaoId = setInterval(() => {
        if (i < texto.length) {
            if (texto.charAt(i) === ' ') {
                elemento.appendChild(document.createTextNode(' '));
            } else {
                elemento.appendChild(document.createTextNode(texto.charAt(i)));
            }
            i++;
        } else {
            clearInterval(efeitoDigitacaoId);
            somTeclado.pause();
        }
    }, 12);
}

function atualizarAtributosECores(idMutante) {
    const dados = atributosMutantes[idMutante];
    if (dados) {
        barraForca.style.width = dados.forca;
        barraAgilidade.style.width = dados.agilidade;
        barraPoder.style.width = dados.poder;

        document.documentElement.style.setProperty('--cor-mutante', dados.cor);
        document.documentElement.style.setProperty('--brilho-mutante', dados.brilho);
        document.documentElement.style.setProperty('--cor-ameaca', dados.corClasse);

        tagAmeaca.innerText = `NÍVEL DE AMEAÇA: ${dados.classe}`;
        
        if (dados.classe === 'ÔMEGA') {
            tagAmeaca.classList.add('omega-ativa');
        } else {
            tagAmeaca.classList.remove('omega-ativa');
        }
    }
}

function activarPersonagemPorId(idPersonagem) {
    const dadosMutante = atributosMutantes[idPersonagem];
    if (!dadosMutante) return;

    containerImagem.classList.add('escondido');

    setTimeout(() => {
        imagemPersonagemGrande.src = `img/card-${idPersonagem}.png`;
        nomePersonagem.innerText = dadosMutante.name;
        
        atualizarAtributosECores(idPersonagem);
        escreverTextoTerminal(dadosMutante.desc, descricaoPersonagem);
        
        containerImagem.classList.remove('escondido');
    }, 150);
}

function atualizarPersonagemPorIndex(index) {
    const cardElement = personagens[index];
    if (!cardElement) return;
    
    const idPersonagem = cardElement.attributes.id.value;

    const personagemSelecionado = document.querySelector('.personagem.selecionado');
    if (personagemSelecionado) {
        personagemSelecionado.classList.remove('selecionado');
    }

    cardElement.classList.add('selecionado');
    indexAtivo = index;

    activarPersonagemPorId(idPersonagem);
}

personagens.forEach((personagem, index) => {
    personagem.addEventListener('mouseenter', () => {
        if(personagem.classList.contains('selecionado')) return;
        somHover.currentTime = 0;
        somHover.play().catch(() => {});
        atualizarPersonagemPorIndex(index);
    });

    personagem.addEventListener('click', () => {
        somSelecionar.currentTime = 0;
        somSelecionar.play().catch(() => {});
    });
});

btnMusica.addEventListener('click', () => {
    if (musicaLigada === false) {
        somMusica.play().catch(() => {});
        musicaLigada = true;
        btnMusica.classList.add('ativo');
    } else {
        somMusica.pause();
        somMusica.currentTime = 0;
        musicaLigada = false;
        btnMusica.classList.remove('ativo');
    }
});

window.addEventListener('keydown', (e) => {
    const total = personagens.length;
    if (e.key === "ArrowRight") {
        let proximo = (indexAtivo + 1) % total;
        somHover.currentTime = 0;
        somHover.play().catch(() => {});
        atualizarPersonagemPorIndex(proximo);
    } else if (e.key === "ArrowLeft") {
        let anterior = (indexAtivo - 1 + total) % total;
        somHover.currentTime = 0;
        somHover.play().catch(() => {});
        atualizarPersonagemPorIndex(anterior);
    }
});

btnSecreto.addEventListener('click', () => {
    somSirene.currentTime = 0;
    somSirene.play().catch(() => {});
    modal.classList.add('aberto');
});

btnFecharModal.addEventListener('click', () => {
    somSirene.pause();
    modal.classList.remove('aberto');
});

logoXmen.addEventListener('dblclick', () => {
    somGlitch.play().catch(() => {});
    document.body.classList.toggle('sobrecarga');
    if (document.body.classList.contains('sobrecarga')) {
        setTimeout(() => {
            document.body.classList.remove('sobrecarga');
        }, 3000);
    }
});

setTimeout(() => {
    activarPersonagemPorId('wolverine');
}, 100);
