# Como Incluir Novos Produtos no Site Pele Sensual

## Visão Geral

O site da Pele Sensual possui uma estrutura simples onde os produtos são definidos estaticamente em um arquivo JavaScript. Atualmente não há uma interface de administração, então os produtos devem ser adicionados manualmente no código.

## Estrutura do Produto

Cada produto no sistema possui a seguinte estrutura:

```javascript
{
  id: "código_único",           // Código/referência única do produto
  name: "Nome do Produto",      // Nome exibido no site
  material: "Tipo de Material", // Material de confecção
  sizes: ["P", "M", "G", "GG"], // Tamanhos disponíveis
  retailPrice: 10.50,           // Preço de varejo
  wholesalePrice: 8.00,         // Preço de atacado
  image: "/images/produto.png", // Imagem principal
  images: [                     // Array com todas as imagens
    "/images/produto_frente.png",
    "/images/produto_costas.png"
  ],
  category: "adulto",           // Categoria: "adulto", "infantil" ou "kit"
  description: "Descrição..."   // Descrição detalhada do produto
}
```

## Passo a Passo para Adicionar um Novo Produto

### 1. Preparar as Imagens

- **Localização**: As imagens devem estar na pasta `pelesensual_store/public/images/`
- **Formato**: Preferencialmente PNG ou JPG
- **Nomenclatura**: Use nomes descritivos (ex: `calcinha_modal_frente.png`)
- **Tamanho**: Recomendado resolução adequada para web (não muito pesadas)

### 2. Editar o Arquivo de Produtos

Abra o arquivo: `pelesensual_store/src/data/products.js`

### 3. Adicionar o Novo Produto

Localize a array `products` e adicione o novo produto seguindo o padrão:

```javascript
export const products = [
  // ... produtos existentes ...
  {
    id: "novo_codigo",
    name: "Nome do Novo Produto",
    material: "Material (ex: Microfibra, Modal, Cotton)",
    sizes: ["P", "M", "G", "GG"], // Ou tamanhos específicos
    retailPrice: 12.50,
    wholesalePrice: 9.00,
    image: "/images/novo_produto_principal.png",
    images: [
      "/images/novo_produto_principal.png",
      "/images/novo_produto_costas.png",
      "/images/novo_produto_detalhes.png"
    ],
    category: "adulto", // ou "infantil" ou "kit"
    description: "Descrição completa do produto, destacando características e benefícios."
  }
];
```

### 4. Categorias Disponíveis

As categorias são definidas no mesmo arquivo:

- **adulto**: Moda Íntima Adulto
- **infantil**: Moda Íntima Infantil  
- **kit**: Kits e Embalagens

### 5. Verificar o Resultado

Após adicionar o produto:
1. Salve o arquivo
2. O site irá recarregar automaticamente (se estiver em desenvolvimento)
3. Verifique se o produto aparece no catálogo
4. Teste se as imagens estão carregando corretamente
5. Verifique se os preços estão corretos

## Exemplos Práticos

### Exemplo 1: Calcinha Simples
```javascript
{
  id: "025",
  name: "Calcinha Confort",
  material: "Microfibra",
  sizes: ["P", "M", "G", "GG"],
  retailPrice: 8.50,
  wholesalePrice: 6.50,
  image: "/images/calcinha_confort_025.png",
  images: [
    "/images/calcinha_confort_025.png"
  ],
  category: "adulto",
  description: "Calcinha em microfibra ultra macia, ideal para o uso diário."
}
```

### Exemplo 2: Produto Infantil
```javascript
{
  id: "INF001",
  name: "Calcinha Infantil Colorida",
  material: "Cotton Amaciado",
  sizes: ["2", "4", "6", "8", "10"],
  retailPrice: 6.00,
  wholesalePrice: 4.50,
  image: "/images/infantil_colorida_001.png",
  images: [
    "/images/infantil_colorida_001.png",
    "/images/infantil_colorida_001_verso.png"
  ],
  category: "infantil",
  description: "Calcinha infantil em cotton com estampas coloridas e divertidas."
}
```

### Exemplo 3: Kit/Embalagem
```javascript
{
  id: "KIT002",
  name: "Kit Promocional 5 Peças",
  material: "Variado",
  sizes: ["Kit"],
  retailPrice: 35.00,
  wholesalePrice: 25.00,
  image: "/images/kit_promocional_002.png",
  images: [
    "/images/kit_promocional_002.png",
    "/images/kit_promocional_002_aberto.png"
  ],
  category: "kit",
  description: "Kit com 5 calcinhas variadas, ideal para presente ou revenda."
}
```

## Dicas Importantes

### ✅ Boas Práticas
- Use IDs únicos para cada produto
- Mantenha um padrão de nomenclatura para as imagens
- Sempre inclua uma descrição atrativa
- Verifique se os preços de atacado são menores que os de varejo
- Teste em diferentes tamanhos de tela

### ⚠️ Cuidados
- Não use caracteres especiais nos nomes de arquivo das imagens
- Certifique-se que as imagens existem no diretório correto
- Não esqueça vírgulas entre os objetos no array
- Mantenha a sintaxe JavaScript correta

### 🚫 Evite
- IDs duplicados
- Imagens muito pesadas (>500KB)
- Descrições muito longas
- Preços zerados ou negativos

## Estrutura de Pastas Recomendada

```
pelesensual_store/public/images/
├── embalagens/
│   ├── caixa_presente_1.png
│   └── bag_transparente_1.png
├── adulto/
│   ├── calcinha_modal_001.png
│   └── fio_dental_002.png
├── infantil/
│   ├── infantil_colorida_001.png
│   └── infantil_estampada_002.png
└── kits/
    ├── kit_promocional_001.png
    └── kit_revenda_002.png
```

## Próximos Passos

Para uma solução mais robusta, considere implementar:

1. **Painel de Administração**: Interface web para adicionar produtos
2. **Banco de Dados**: Armazenar produtos em banco de dados
3. **Upload de Imagens**: Sistema para upload automático de imagens
4. **API de Produtos**: Endpoints para gerenciar produtos via API

## Precisa de Ajuda?

Se encontrar dificuldades:
1. Verifique se a sintaxe JavaScript está correta
2. Confirme se as imagens estão no local correto
3. Use o console do navegador para identificar erros
4. Compare com produtos existentes como referência