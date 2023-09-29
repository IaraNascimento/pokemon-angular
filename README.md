# PokemonAngular

### 1. Gerando projeto com angular-cli

Foram executados os comandos abaixo para gerar o projeto inicial e migra-lo de CSS para SASS.

```
ng generate pokemon-angular
ng config schematics.@schematics/angular:component.style scss
```

### 2. Apagando conteúdo original e testes para ter a base do projeto

### 3. Adicionando infomação de code coverage (tentar mantar acima de 80%)

Cobertura atual:

- app.component.ts (100%)

### 4. Gerando componente principal e resetando CSS

Para componentização ser bem otimizada, vou deixar o app.component apenas como porta de entrada.

Vou criar um componente para ser a base do projeto.

Foi executado o comando a seguir para gerar um componente novo.

```
ng g c components/hunt
```

O reset de CSS do Meyer foi adicionado em styles.scss.

### 5. Criando o HTML e SASS base da aplicação (break point: 800px)

### 6. Criando component de botão, ajustando testes e melhorando SASS

Cobertura atual:

- app (100%)
- app/components/button (100%)
- app/components/hunt (100%)

### 7. Implementando serviço de captura de pokemon com seus testes
