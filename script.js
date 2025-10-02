let estudantes = [];

// Navegação SIMPLIFICADA
function mostrarCadastro() {
    document.getElementById('cadastro').classList.remove('hidden');
    document.getElementById('busca').classList.add('hidden');
    document.getElementById('relatorios').classList.add('hidden');
    document.getElementById('lista').classList.add('hidden');
}

function mostrarBusca() {
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('busca').classList.remove('hidden');
    document.getElementById('relatorios').classList.add('hidden');
    document.getElementById('lista').classList.add('hidden');
    document.getElementById('resultadoBusca').innerHTML = '';
}

function mostrarRelatorios() {
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('busca').classList.add('hidden');
    document.getElementById('relatorios').classList.remove('hidden');
    document.getElementById('lista').classList.add('hidden');
    gerarRelatorios();
}

function mostrarLista() {
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('busca').classList.add('hidden');
    document.getElementById('relatorios').classList.add('hidden');
    document.getElementById('lista').classList.remove('hidden');
    atualizarLista();
}

// Cadastrar estudante
function cadastrar() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const notas = document.getElementById('notas').value;

    if (nome && idade && notas) {
        const notasArray = notas.split(',').map(nota => parseFloat(nota.trim()));
        const media = notasArray.reduce((a, b) => a + b, 0) / notasArray.length;

        estudantes.push({
            nome: nome,
            idade: idade,
            notas: notasArray,
            media: parseFloat(media.toFixed(2))
        });

        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('notas').value = '';

        atualizarLista();
        alert('Estudante cadastrado com sucesso!');
        
        // Mostra a lista após cadastrar
        mostrarLista();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

// Atualizar lista
function atualizarLista() {
    const listaDiv = document.getElementById('listaEstudantes');
    
    if (estudantes.length === 0) {
        listaDiv.innerHTML = '<p>Nenhum estudante cadastrado ainda.</p>';
        return;
    }

    listaDiv.innerHTML = estudantes.map(est => {
        const situacao = est.media >= 7 ? 'aprovado' : est.media >= 5 ? 'recuperacao' : 'reprovado';
        return `
            <div class="estudante ${situacao}">
                <strong>${est.nome}</strong> (${est.idade} anos)<br>
                Notas: ${est.notas.join(', ')}<br>
                Média: ${est.media} - ${situacao.toUpperCase()}
            </div>
        `;
    }).join('');
}

// Buscar estudante
function buscarEstudante() {
    const nomeBusca = document.getElementById('buscarNome').value.toLowerCase();
    const resultadoDiv = document.getElementById('resultadoBusca');
    
    if (!nomeBusca) {
        resultadoDiv.innerHTML = '<p>Digite um nome para buscar.</p>';
        return;
    }
    
    const encontrados = estudantes.filter(e => 
        e.nome.toLowerCase().includes(nomeBusca)
    );
    
    if (encontrados.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum estudante encontrado.</p>';
        return;
    }
    
    resultadoDiv.innerHTML = encontrados.map(est => {
        const situacao = est.media >= 7 ? 'aprovado' : est.media >= 5 ? 'recuperacao' : 'reprovado';
        return `
            <div class="estudante ${situacao}">
                <strong>${est.nome}</strong> (${est.idade} anos)<br>
                Notas: ${est.notas.join(', ')}<br>
                Média: ${est.media} - ${situacao.toUpperCase()}
            </div>
        `;
    }).join('');
}

// Gerar relatórios
function gerarRelatorios() {
    const relatoriosDiv = document.getElementById('dadosRelatorios');
    
    const aprovados = estudantes.filter(e => e.media >= 7);
    const recuperacao = estudantes.filter(e => e.media >= 5 && e.media < 7);
    const reprovados = estudantes.filter(e => e.media < 5);
    
    relatoriosDiv.innerHTML = `
        <div class="relatorio-item aprovado">
            <h3>✅ Aprovados: ${aprovados.length} estudantes</h3>
            ${aprovados.length > 0 ? 
                `<ul>${aprovados.map(e => `<li>${e.nome} - Média: ${e.media}</li>`).join('')}</ul>` :
                '<p>Nenhum estudante aprovado</p>'
            }
        </div>
        
        <div class="relatorio-item recuperacao">
            <h3>⚠️ Recuperação: ${recuperacao.length} estudantes</h3>
            ${recuperacao.length > 0 ? 
                `<ul>${recuperacao.map(e => `<li>${e.nome} - Média: ${e.media}</li>`).join('')}</ul>` :
                '<p>Nenhum estudante em recuperação</p>'
            }
        </div>
        
        <div class="relatorio-item reprovado">
            <h3>❌ Reprovados: ${reprovados.length} estudantes</h3>
            ${reprovados.length > 0 ? 
                `<ul>${reprovados.map(e => `<li>${e.nome} - Média: ${e.media}</li>`).join('')}</ul>` :
                '<p>Nenhum estudante reprovado</p>'
            }
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px;">
            <h3>📊 Estatísticas Gerais</h3>
            <p><strong>Total de estudantes:</strong> ${estudantes.length}</p>
            <p><strong>Taxa de aprovação:</strong> ${estudantes.length > 0 ? ((aprovados.length / estudantes.length) * 100).toFixed(1) : 0}%</p>
        </div>
    `;
}

// Inicialização - MOSTRA O CADASTRO AO CARREGAR
window.onload = function() {
    mostrarCadastro();
    atualizarLista();
};