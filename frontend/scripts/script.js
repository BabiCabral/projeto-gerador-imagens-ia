// Menu Lateral Interativo
class MobileNavBar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            console.log(index / 7 + 0.3);
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                index / 7 + 0.3
                }s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavBar = new MobileNavBar (
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

mobileNavBar.init();

// Conexão com backend

// Lógica Gerar imagens:
const geradorForm = document.getElementById('gerador');
const inputPrompt = document.getElementById('gerar');
const imagemGerada = document.getElementById('imagem-gerada');
const botaoGerar = document.getElementById('gerador_button');
const botaoBaixar = document.getElementById('botao-baixar');

geradorForm.addEventListener('submit', async (evento) => {
    evento.preventDefault(); 
    
    const prompt = inputPrompt.value;
    
    imagemGerada.src = 'https://64.media.tumblr.com/bec5933eea5043acf6a37bb1394384ab/tumblr_meyfxzwXUc1rgpyeqo1_400.gif';
    imagemGerada.alt = 'Carregando...';
    botaoGerar.disabled = true;
    botaoBaixar.disabled = true;

    try {
        const resposta = await fetch('http://127.0.0.1:5000/gerar_imagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });
        
        const dados = await resposta.json();

        if (resposta.ok) {
            imagemGerada.src = dados.url;
            imagemGerada.alt = prompt;
            botaoBaixar.disabled = false;
        } else {
            console.error('Erro ao gerar imagem:', dados.error);
            alert('Erro ao gerar imagem: ' + dados.error);
            imagemGerada.src = 'https://picsum.photos/600/400?grayscale';
            imagemGerada.alt = 'Imagem padrão';
        }
    } catch (erro) {
        console.error('Erro na conexão com o servidor:', erro);
        alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
        imagemGerada.src = 'https://picsum.photos/600/400?grayscale';
        imagemGerada.alt = 'Imagem padrão';
    } finally {
        botaoGerar.disabled = false;
    }
});

botaoBaixar.addEventListener('click', () => {
    const imageUrl = imagemGerada.src;
    const imageName = imagemGerada.alt || 'imagem_gerada';

    if (imageUrl && imageUrl.startsWith('http')) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${imageName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('A imagem ainda não foi gerada ou a URL não é válida.');
    }
});

// Lógica da Galeria 
document.addEventListener('DOMContentLoaded', () => {
    const corpoTabelaGaleria = document.getElementById('galeria-tabela');
    if (corpoTabelaGaleria) {
        carregarGaleria();
    }
});

async function carregarGaleria() {
    const corpoTabela = document.getElementById('galeria-tabela');
    corpoTabela.innerHTML = '<tr><td colspan="3">Carregando galeria...</td></tr>';

    try {
        const resposta = await fetch('http://127.0.0.1:5000/galeria', {
            method: 'GET'
        });

        if (!resposta.ok) {
            throw new Error('Falha ao carregar a galeria.');
        }

        const imagens = await resposta.json();
        
        corpoTabela.innerHTML = ''; 

        if (imagens.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="3">Nenhuma imagem gerada ainda.</td></tr>';
        } else {
            imagens.forEach(imagem => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td><img src="${imagem.url}" alt="${imagem.descricao}" style="width: 100px;"></td>
                    <td>${imagem.descricao}</td>
                    <td>${imagem.data_criacao}</td>
                `;
                corpoTabela.appendChild(novaLinha);
            });
        }

    } catch (erro) {
        console.error('Erro ao carregar a galeria:', erro);
        corpoTabela.innerHTML = `<tr><td colspan="3">Erro ao carregar a galeria: ${erro.message}</td></tr>`;
    }
}