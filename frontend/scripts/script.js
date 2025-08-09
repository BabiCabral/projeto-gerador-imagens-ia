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
const geradorForm = document.getElementById('gerador');
const inputPrompt = document.getElementById('gerar');
const imagemGerada = document.getElementById('imagem-gerada');
const botaoGerar = document.getElementById('gerador_button');

geradorForm.addEventListener('submit', async (evento) => {
    evento.preventDefault(); 
    
    const prompt = inputPrompt.value;
    
    imagemGerada.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2g3b2J4NmxtNzF4M3d3dGF1cjB0cGtsb3dvMG90aXF2dmtmYWp4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/27E7h1g94XWbS8i9X6/giphy.gif';
    imagemGerada.alt = 'Carregando...';
    botaoGerar.disabled = true;

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