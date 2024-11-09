// Preços das tintas por kg
const PRECOS_TINTAS = {
    tinta_acrilica_premium: 89.90,
    tinta_acrilica_standard: 69.90,
    tinta_epoxi: 129.90,
    tinta_fosca_premium: 99.90,
    tinta_fosca_standard: 79.90
};

// Nomes das tintas para exibição
const NOMES_TINTAS = {
    tinta_acrilica_premium: "Tinta Acrílica Premium",
    tinta_acrilica_standard: "Tinta Acrílica Standard",
    tinta_epoxi: "Tinta Epóxi",
    tinta_fosca_premium: "Tinta Fosca Premium",
    tinta_fosca_standard: "Tinta Fosca Standard"
};


// Função para formatar mensagem do WhatsApp
function formatarMensagemWhatsApp() {
    let mensagem = 'Olá! Gostaria de saber se estas tintas estão disponíveis para retirada.\n\n';
    
    mensagem += `👤 DADOS DO CLIENTE:\n`;
    mensagem += `Nome: ${document.getElementById('nome').value}\n`;
    mensagem += `WhatsApp: ${document.getElementById('whatsapp').value}\n\n`;
    
    mensagem += `🛒 ITENS DO PEDIDO:\n`;
    
    document.querySelectorAll('.produto-item').forEach(item => {
        const select = item.querySelector('.tinta-select');
        const quantidade = item.querySelector('.quantidade-input').value;
        
        if (select.value && quantidade > 0) {
            const nomeTinta = NOMES_TINTAS[select.value];
            const preco = PRECOS_TINTAS[select.value];
            const subtotal = preco * quantidade;
            
            mensagem += `\n🎨 ${nomeTinta}\n`;
            mensagem += `Quantidade: ${quantidade}kg\n`;
            mensagem += `Valor/kg: R$ ${preco.toFixed(2)}\n`;
            mensagem += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
        }
    });
    
    mensagem += `\n💰 VALOR TOTAL: ${document.getElementById('valorTotal').textContent}`;
    
    return mensagem;
}


//async function carregarLogoEmBase64(caminho) {
   // return new Promise((resolve, reject) => {
      //  const img = new Image();
     //   img.src = caminho;
     //   img.crossOrigin = 'Anonymous'; // Garante que a imagem seja carregada sem problemas de CORS

    //    img.onload = () => {
     //       const canvas = document.createElement('canvas');
     //       canvas.width = img.width;
     //       canvas.height = img.height;
     //       const ctx = canvas.getContext('2d');
     //       ctx.drawImage(img, 0, 0);
     //       const dataURL = canvas.toDataURL('image/jpeg');
     //       resolve(dataURL);
     //   };

     //   img.onerror = () => {
     //       reject(new Error('Erro ao carregar a imagem.'));
     //   };
 //   });
//}

async function gerarPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Carrega a logo em base64
        //const logoBase64 = await carregarLogoEmBase64('/assets/images/logo.jpeg');

        
        // Configurações iniciais com fonte mais moderna
        doc.setFont('helvetica', 'bold');
        
        // Cabeçalho com gradiente
        doc.setFillColor(125, 151, 166);
        doc.rect(0, 0, 220, 45, 'F');

        // Adiciona a logo
       // doc.addImage(logoBase64, 'JPEG', 20, 10, 40, 30);
        
        // Logo
       // try {
       //     doc.addImage(LOGO_BASE64, 'JPEG', 20, 10, 40, 30);
       // } catch (erroLogo) {
       //     console.error('Erro ao carregar logo:', erroLogo);
      //  }
        
    // Título principal com fonte maior e mais destacada
doc.setTextColor(255, 255, 255);
doc.setFontSize(28);
doc.setFont('helvetica', 'bold');
doc.text('F A L B', 105, 20, { align: 'center' }); // Posicione mais acima (y = 20)

doc.setTextColor(255, 255, 255);
doc.setFontSize(28);
doc.setFont('times', 'bold');
doc.text('Pedido de Tintas', 105, 35, { align: 'center' }); // Posicione mais abaixo (y = 35)

// Adicione mais espaço antes da data e hora
const yOffset = 45; // Define a posição y abaixo do título principal

// Data e hora com fonte mais elegante
doc.setFontSize(12);
doc.setFont('helvetica', 'normal');
const dataAtual = new Date();
const dataFormatada = dataAtual.toLocaleDateString();
const horaFormatada = dataAtual.toLocaleTimeString();
doc.text(`Data: ${dataFormatada}`, 30, yOffset); // Posiciona a data mais abaixo
doc.text(`Hora: ${horaFormatada}`, 170, yOffset, { align: 'right' }); // Posiciona a hora mais abaixo


        
        // Seção de dados do cliente com fonte melhorada
doc.setFillColor(125, 151, 166);
// Ajuste a altura (último valor) e largura (terceiro valor) para diminuir o tamanho do retângulo
doc.rect(20, 50, 170, 40, 'F'); // Diminuiu a altura de 50 para 40
doc.setTextColor(255, 255, 255);
doc.setFontSize(18);
doc.setFont('helvetica', 'bold');
doc.text('DADOS DO CLIENTE', 105, 65, { align: 'center' });
        
        // Dados do cliente com melhor espaçamento
        doc.setFontSize(13);
        doc.setFont('times', 'normal'); // Fonte mais estilosa (pode trocar por 'courier' ou outras opções suportadas)
        const lineHeight = 3; // Ajuste o espaçamento entre as linhas

        // Exibindo os dados com menor espaçamento
        doc.text(`Nome: ${document.getElementById('nome').value}`, 30, 80);
        doc.text(`WhatsApp: ${document.getElementById('whatsapp').value}`, 30, 80 + lineHeight * 2);

        
        // Cabeçalho dos produtos com destaque
        let y = 120;
        doc.setFillColor(125, 151, 166);
        doc.rect(20, y-10, 170, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('PRODUTOS SELECIONADOS', 105, y-1, { align: 'center' });
        
        // Subheader da tabela com fonte mais legível
        y += 10;
        doc.setFillColor(147, 168, 160);
        doc.rect(20, y, 170, 10, 'F');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Produto', 25, y+7);
        doc.text('Qtd (kg)', 95, y+7);
        doc.text('Valor/kg', 130, y+7);
        doc.text('Subtotal', 170, y+7);
        
        // Lista de produtos com fonte mais clara
        y += 15;
        let linha = 0;
        doc.setFont('helvetica', 'normal');
        document.querySelectorAll('.produto-item').forEach(item => {
            const select = item.querySelector('.tinta-select');
            const quantidade = parseFloat(item.querySelector('.quantidade-input').value) || 0;
            
            if (select.value && quantidade > 0) {
                const nomeTinta = NOMES_TINTAS[select.value];
                const preco = PRECOS_TINTAS[select.value];
                const subtotal = preco * quantidade;
                
                if (linha % 2 === 0) {
                    doc.setFillColor(240, 240, 240);
                    doc.rect(20, y-5, 170, 12, 'F');
                }
                
                doc.setTextColor(60, 60, 60);
                doc.text(nomeTinta, 25, y+2);
                doc.text(`${quantidade}`, 95, y+2);
                doc.text(`R$ ${preco.toFixed(2)}`, 130, y+2);
                doc.text(`R$ ${subtotal.toFixed(2)}`, 170, y+2, { align: 'right' });
                
                y += 12;
                linha++;
            }
        });
        
        // Total com destaque especial
        y += 10;
        doc.setFillColor(125, 151, 166);
        doc.rect(20, y, 170, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('VALOR TOTAL DO PEDIDO:', 35, y+16);
        doc.setFontSize(18);
        doc.text(document.getElementById('valorTotal').textContent, 170, y+16, { align: 'right' });
        
  // Rodapé com fonte mais elegante
doc.setTextColor(0, 0, 0);
doc.setFontSize(12); // Aumenta o tamanho da fonte
doc.setFont('helvetica', 'bold'); // Deixa o texto em negrito
doc.text([
    'Este é um orçamento preliminar.',
    'Envie esse pedido para o WhatsApp, para verificar disponibilidade dos itens e validar!',
    'Para efetivar o pedido, aguarde nossa confirmação.'
], 105, 270, { align: 'center', lineHeightFactor: 1.5 });

 // Adiciona a assinatura no canto direito inferior
 doc.setTextColor(90, 90, 90);
 doc.setFontSize(9); // Tamanho da fonte
 doc.setFont('helvetica', 'normal'); // Fonte normal (sem negrito)
 doc.text('Desenvolvido por DevSil', 200, 290, { align: 'right' }); // Canto direito inferior

        
        return doc;
    } catch (erro) {
        console.error('Erro ao gerar PDF:', erro);
        throw erro;
    }
}

// Função para criar novo produto
function criarNovoProduto(numero) {
    const produtoHtml = `
        <div class="produto-item">
            <select id="tinta${numero}" class="tinta-select">
                <option value="">Selecione a Tinta</option>
                <option value="tinta_acrilica_premium">Tinta Acrílica Premium</option>
                <option value="tinta_acrilica_standard">Tinta Acrílica Standard</option>
                <option value="tinta_epoxi">Tinta Epóxi</option>
                <option value="tinta_fosca_premium">Tinta Fosca Premium</option>
                <option value="tinta_fosca_standard">Tinta Fosca Standard</option>
            </select>
            <span class="valor-unitario">R$ 0,00</span>
            <input type="number" class="quantidade-input" placeholder="Kg" min="1" step="1">
            <span class="subtotal">R$ 0,00</span>
            <button type="button" class="btn-remover" onclick="removerProduto(this)">×</button>
        </div>
    `;
    return produtoHtml;
}

// Função para remover produto
function removerProduto(botao) {
    const produtoItem = botao.closest('.produto-item');
    produtoItem.remove();
    atualizarTotal();
}

// Função para calcular subtotal
function calcularSubtotal(preco, quantidade, elementoSubtotal) {
    const subtotal = preco * (parseFloat(quantidade) || 0);
    elementoSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    return subtotal;
}

// Função para atualizar total
function atualizarTotal() {
    const subtotais = [...document.querySelectorAll('.subtotal')]
        .map(el => parseFloat(el.textContent.replace('R$ ', '')) || 0);
    
    const total = subtotais.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('valorTotal').textContent = `R$ ${total.toFixed(2)}`;
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    let numeroAtual = 4; // Começamos com 4 porque já temos 4 linhas iniciais

    // Adiciona eventos às linhas iniciais
    document.querySelectorAll('.produto-item').forEach(item => {
        const select = item.querySelector('.tinta-select');
        const valorUnitario = item.querySelector('.valor-unitario');
        const quantidadeInput = item.querySelector('.quantidade-input');
        const subtotalElement = item.querySelector('.subtotal');

        select.addEventListener('change', () => {
            const precoSelecionado = PRECOS_TINTAS[select.value] || 0;
            valorUnitario.textContent = `R$ ${precoSelecionado.toFixed(2)}`;
            calcularSubtotal(precoSelecionado, quantidadeInput.value, subtotalElement);
            atualizarTotal();
        });

        quantidadeInput.addEventListener('input', () => {
            const precoSelecionado = PRECOS_TINTAS[select.value] || 0;
            calcularSubtotal(precoSelecionado, quantidadeInput.value, subtotalElement);
            atualizarTotal();
        });
    });

    // Evento do botão adicionar
    document.getElementById('btnAdicionar').addEventListener('click', () => {
        numeroAtual++;
        const produtosLista = document.querySelector('.produtos-lista');
        produtosLista.insertAdjacentHTML('beforeend', criarNovoProduto(numeroAtual));
        
        // Adiciona eventos à nova linha
        const novoProduto = produtosLista.lastElementChild;
        const select = novoProduto.querySelector('.tinta-select');
        const valorUnitario = novoProduto.querySelector('.valor-unitario');
        const quantidadeInput = novoProduto.querySelector('.quantidade-input');
        const subtotalElement = novoProduto.querySelector('.subtotal');

        select.addEventListener('change', () => {
            const precoSelecionado = PRECOS_TINTAS[select.value] || 0;
            valorUnitario.textContent = `R$ ${precoSelecionado.toFixed(2)}`;
            calcularSubtotal(precoSelecionado, quantidadeInput.value, subtotalElement);
            atualizarTotal();
        });

        quantidadeInput.addEventListener('input', () => {
            const precoSelecionado = PRECOS_TINTAS[select.value] || 0;
            calcularSubtotal(precoSelecionado, quantidadeInput.value, subtotalElement);
            atualizarTotal();
        });
    });

    // Evento do botão enviar
    document.getElementById('enviarPedido').addEventListener('click', async () => {
        // Validações
        const nome = document.getElementById('nome').value;
        const whatsapp = document.getElementById('whatsapp').value;

        if (!nome || !whatsapp) {
            alert('Por favor, preencha todos os dados do cadastro!');
            return;
        }

        const temItens = [...document.querySelectorAll('.quantidade-input')]
            .some(input => parseFloat(input.value) > 0);
            if (!temItens) {
                alert('Por favor, selecione pelo menos uma tinta e sua quantidade!');
                return;
            }
    
            try {
                // Gerar e abrir PDF
                const doc = await gerarPDF();
                const pdfUrl = doc.output('datauristring');
                window.open(pdfUrl, '_blank');
    
                // Enviar mensagem para WhatsApp
                const mensagem = formatarMensagemWhatsApp();
                const whatsappUrl = `https://wa.me/5585933005754?text=${encodeURIComponent(mensagem)}`;
                window.open(whatsappUrl, '_blank');
                
            } catch (erro) {
                console.error('Erro:', erro);
                alert('Ocorreu um erro ao gerar o pedido. Por favor, tente novamente.');
            }
        });
    });

    // Função para salvar pedido
async function salvarPedido(dadosPedido) {
    try {
        const response = await fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosPedido)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar pedido');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}