## Sobre o Projeto GerIA
Este projeto começou como um trabalho para a disciplina de Introdução à Computação, focado em HTML e CSS. Após a conclusão do curso, decidi expandir a ideia de forma independente, transformando-o em um projeto pessoal para aprofundar meus conhecimentos em desenvolvimento web.

O GerIA é um gerador de imagens que utiliza inteligência artificial. Os usuários podem descrever a imagem que desejam, e a aplicação a cria em tempo real. Além disso, as imagens geradas são salvas em uma galeria persistente, onde podem ser visualizadas e baixadas.

### Evolução e Tecnologias
O projeto evoluiu de um site estático para uma aplicação completa, utilizando as seguintes tecnologias:

- Frontend: Desenvolvido com HTML e CSS (originalmente), e expandido com JavaScript para gerenciar a interação do usuário, fazer requisições assíncronas e manipular o DOM.

- Backend: Criado com Python e o framework Flask para atuar como uma API segura, gerenciando a comunicação entre o frontend e a IA.

- Integração com IA: Utiliza a API da OpenAI (DALL-E 3) para gerar as imagens a partir das descrições textuais.

- Banco de Dados: Implementa o SQLite para armazenar de forma persistente a URL, descrição e data de criação de cada imagem gerada, viabilizando a funcionalidade da galeria.

- Versionamento e Hospedagem: Utiliza Git e GitHub para controle de versão, com o frontend hospedado no GitHub Pages.

### Aprendizados e Destaques
- Arquitetura Web: Compreensão da comunicação entre frontend e backend (via API RESTful).

- Consumo de API: Aplicação de requisições fetch no frontend para consumir os endpoints do backend.

- Persistência de Dados: Implementação de um banco de dados para salvar informações de maneira permanente.

- Segurança: Gerenciamento seguro de chaves de API (.env e variáveis de ambiente), um ponto crucial para aplicações reais.
