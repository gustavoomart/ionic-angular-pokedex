
# Pokedex App - Angular + Ionic

Implementação do clássico **Pokedex App** que consome a [PokeAPI](https://pokeapi.co/), porém esta versão foi construida com **Angular Standalone Components** e **Ionic Framework**.

![Home Page](./src/assets/readme/showdown.gif)

Teste no GitHub Pages: [Pokedex (Angular + Ionic)](https://gustavoomart.github.io/ionic-angular-pokedex/)

---

## Funcionalidades

- Listagem de Pokémons com paginação
- Marcar e desmarcar Pokémons como favoritos (salvo no storage local)
- Navegação entre páginas (Home, Detalhes, Favoritos)
- Consumo de API externa (PokeAPI)

---

## Arquitetura do Projeto

Para detalhes da arquitetura, padrões de design, camadas e estrutura do projeto, consulte o documento: [ARCHITECTURE](./ARCHITECTURE.md)

---

## Tecnologias Utilizadas

- **Angular 17+ Standalone Components**
- **Ionic Framework**
- **RxJS**
- **HttpClient (Angular)**
- **Ionic Storage** (persistência local)
- **PokeAPI** (https://pokeapi.co/)

---

## Instalação e Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/pokedex-app.git
cd pokedex-app
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o app em modo desenvolvimento:**
```bash
ionic serve
```
