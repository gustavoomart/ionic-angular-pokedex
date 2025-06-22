# Arquitetura do Projeto: Pokedex (Angular + Ionic)

Neste projeto, optei por uma arquitetura limpa e modular, utilizando Angular Standalone Components para reduzir a complexidade de módulos e melhorar a reutilização de componentes ja que é um projeto pequeno.

Segui princípios como responsabilidade única, injeção de dependência (DI) e separação de camadas, organizando o projeto em UI (componentes), serviços, e modelos de dados.

Adotei padrões como Service Layer, Component-based Architecture e Reactive Programming com RxJS para garantir um código testável, legível e de fácil manutenção. Além disso, aproveitei o Ionic Storage para persistência local dos favoritos.


## Estrutura de Pastas (High-Level Overview)

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── shared/
│   └── pages/
├── assets/
├── environments/
└── main.ts
```

---

## Padrões de Design Adotados

| Padrão                             | Onde Aparece                         | Justificativa |
|------------------------------------|--------------------------------------|---------------|
| **Component-Based Architecture**   | `PokemonCardComponent`, `HomePage`, etc | Reutilização, isolamento de UI e eventos |
| **Dependency Injection (DI)**      | Serviços como `PokeapiService`, `FavoritesService` | Gestão de dependências e ciclo de vida |
| **Service Layer Pattern**          | `PokeapiService`, `FavoritesService` | Abstração da lógica de acesso a API e armazenamento local |
| **Pipe (Transformers)**            | `KebabToTitlePipe` | Separação de lógica de transformação de dados da UI |
| **Reactive Programming / Observables (RxJS)** | Uso de `HttpClient`, `forkJoin`, `switchMap`, `map` | Manipulação assíncrona, composição de fluxos de dados |
| **Routing & Navigation**           | `app.routes.ts`, uso de `Router` | Navegação entre páginas (Home, Detalhes, Favoritos) |
| **Stateful Service (Local State)** | `FavoritesService.favoriteStatus` | Gerenciamento simples de estado dentro de serviços Singleton |
| **Storage Layer (Persistence)**    | `FavoritesService` + `@ionic/storage-angular` | Persistência local dos pokémons favoritos |
| **Standalone Components**          | Todos os componentes usam `standalone: true` | Redução de complexidade de módulos Angular |

---

## Camadas da Aplicação

### 1. **Apresentação / UI**
- **Responsável por:** Exibir dados, receber interação do usuário.
- **Exemplos:**  
  - `HomePage`  
  - `PokemonCardComponent`

### 2. **Serviços (Domain / Application Layer)**
- **Responsável por:** Lógica de negócios, regras de aplicação, manipulação de dados.
- **Exemplos:**  
  - `PokeapiService`  
  - `FavoritesService`

### 3. **Modelos (Domain Entities)**
- **Responsável por:** Definição das estruturas de dados utilizadas no app.
- **Exemplos:**  
  - `Pokemon`  
  - `PokemonSpecie`  
  - `FlavorTextEntry`

### 4. **Infraestrutura**
- **Responsável por:** Integrações externas (APIs, Storage).
- **Exemplos:**  
  - HttpClient + PokeAPI  
  - IonicStorage (localStorage / IndexedDB abstração)

---

## Tecnologias Utilizadas

| Tecnologia               | Uso |
|--------------------------|----|
| Angular Standalone Components | Componentização sem NgModules |
| Ionic Framework          | UI e componentes mobile-like |
| RxJS                     | Programação reativa |
| HttpClient               | Comunicação com API |
| Ionic Storage            | Persistência local |
| Angular Router           | Navegação entre telas |

---

## Padrões de Boas Práticas Seguidos

- Responsabilidade única por classe.
- Separação entre lógica de apresentação e lógica de negócio.
- Abstração de APIs e storage através de serviços.
- Reatividade com RxJS para manipulação de dados assíncronos.