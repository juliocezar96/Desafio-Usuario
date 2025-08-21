# Guia de Estilos SCSS com Padrão BEM

Este projeto utiliza **SCSS** com o padrão **BEM** (Block Element Modifier) para organização e manutenibilidade dos estilos.

## 📁 Estrutura de Arquivos

```
src/styles/
├── main.scss              # Arquivo principal que importa todos os outros
├── base/                  # Estilos base e variáveis
│   ├── _variables.scss    # Variáveis SCSS (cores, tipografia, espaçamentos)
│   ├── _reset.scss        # Reset CSS
│   └── _typography.scss   # Estilos de tipografia
├── utils/                 # Utilitários e mixins
│   ├── _mixins.scss       # Mixins reutilizáveis
│   └── _helpers.scss      # Classes utilitárias
├── components/            # Componentes reutilizáveis
│   ├── _button.scss       # Estilos de botões
│   ├── _form.scss         # Estilos de formulários
│   ├── _card.scss         # Estilos de cards
│   ├── _table.scss        # Estilos de tabelas
│   ├── _modal.scss        # Estilos de modais
│   └── _loading.scss      # Estilos de loading
├── layouts/               # Layouts da aplicação
│   ├── _header.scss       # Estilos do cabeçalho
│   ├── _sidebar.scss      # Estilos da barra lateral
│   └── _main.scss         # Estilos da área principal
└── pages/                 # Estilos específicos de páginas
    ├── _login.scss        # Estilos da página de login
    └── _dashboard.scss    # Estilos do dashboard
```

## 🎯 Padrão BEM

### Estrutura BEM
- **Block**: Componente principal (ex: `.form`, `.button`, `.card`)
- **Element**: Elemento dentro do bloco (ex: `__input`, `__label`, `__header`)
- **Modifier**: Variação do bloco ou elemento (ex: `--primary`, `--large`, `--error`)

### Exemplos de Uso

#### Botões
```scss
// HTML
<button class="button button--primary button--large">
  <span class="button__icon">📝</span>
  <span class="button__text">Criar Pessoa</span>
</button>

// SCSS
.button {
  &--primary { }           // Modificador de cor
  &--large { }             // Modificador de tamanho
  
  &__icon { }              // Elemento ícone
  &__text { }              // Elemento texto
}
```

#### Formulários
```scss
// HTML
<form class="form form--horizontal">
  <div class="form__group">
    <label class="form__label form__label--required">Nome</label>
    <input class="form__input form__input--error" type="text" />
    <span class="form__error">Nome é obrigatório</span>
  </div>
</form>

// SCSS
.form {
  &--horizontal { }        // Modificador de layout
  
  &__group { }             // Elemento grupo
  &__label { }             // Elemento label
  &__input { }             // Elemento input
  &__error { }             // Elemento erro
  
  &__label--required { }   // Modificador do label
  &__input--error { }      // Modificador do input
}
```

## 🎨 Variáveis SCSS

### Cores
```scss
$color-primary: #3b82f6;
$color-primary--light: #60a5fa;
$color-primary--dark: #1d4ed8;

$color-success: #10b981;
$color-danger: #ef4444;
$color-warning: #f59e0b;
```

### Tipografia
```scss
$font-family--primary: 'Inter', sans-serif;
$font-size--base: 1rem;
$font-weight--medium: 500;
```

### Espaçamentos
```scss
$spacing--xs: 0.25rem;    // 4px
$spacing--sm: 0.5rem;     // 8px
$spacing--md: 1rem;       // 16px
$spacing--lg: 1.5rem;     // 24px
```

## 🔧 Mixins Disponíveis

### Flexbox
```scss
@include flex(column, center, center);
@include flex-center;
@include flex-between;
```

### Responsividade
```scss
@include respond-to(md) {
  // Estilos para telas médias e maiores
}
```

### Botões
```scss
@include button-base;
@include button-variant($color-primary, $color-white);
```

### Inputs
```scss
@include input-base;
```

## 📱 Breakpoints

```scss
$breakpoint--sm: 640px;   // Small
$breakpoint--md: 768px;   // Medium
$breakpoint--lg: 1024px;  // Large
$breakpoint--xl: 1280px;  // Extra Large
$breakpoint--2xl: 1536px; // 2X Large
```

## 🚀 Como Usar

### 1. Importar no Componente
```tsx
import './ComponentName.scss';
```

### 2. Aplicar Classes BEM
```tsx
<div className="card card--elevated">
  <div className="card__header">
    <h3 className="card__title">Título do Card</h3>
  </div>
  <div className="card__content">
    Conteúdo do card
  </div>
</div>
```

### 3. Criar Novos Estilos
```scss
// Em _components.scss ou arquivo específico
.user-profile {
  padding: $spacing--md;
  
  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: $border-radius--full;
    
    &--large {
      width: 150px;
      height: 150px;
    }
  }
  
  &__name {
    font-size: $font-size--lg;
    font-weight: $font-weight--semibold;
    color: $color-gray--900;
  }
  
  &--compact {
    padding: $spacing--sm;
    
    .user-profile__avatar {
      width: 50px;
      height: 50px;
    }
  }
}
```

## 📋 Regras Importantes

1. **Use classes, não IDs**
2. **Use nomes descritivos e semânticos**
3. **Mantenha apenas um nível de aninhamento**
4. **Use modificadores para variações**
5. **Use elementos para partes do componente**
6. **Sempre use as variáveis SCSS definidas**
7. **Utilize os mixins disponíveis**
8. **Mantenha a responsividade com os breakpoints**

## 🔍 Exemplos Completos

Veja o arquivo `src/styles/examples/_bem-usage.scss` para exemplos detalhados de uso.

## 📚 Recursos Adicionais

- [BEM Methodology](http://getbem.com/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Architecture](https://css-tricks.com/css-architecture/)
