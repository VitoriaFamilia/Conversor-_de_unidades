// Recebe argumentos do terminal
const valor = parseFloat(process.argv[2]);
const unidadeOrigem = process.argv[3].toLowerCase();
const unidadeDestino = process.argv[4].toLowerCase();

// Função de conversão
function converter(valor, origem, destino) {
    // Conversão de distância
    const distancias = {
        km: 0.621371, // km → milhas
        milhas: 1.60934 // milhas → km
    };

    // Conversão de temperatura
    if ((origem === 'celsius' && destino === 'fahrenheit')) {
        return (valor * 9/5) + 32;
    }
    if ((origem === 'fahrenheit' && destino === 'celsius')) {
        return (valor - 32) * 5/9;
    }

    // Distâncias
    if ((origem === 'km' && destino === 'milhas')) {
        return valor * distancias.km;
    }
    if ((origem === 'milhas' && destino === 'km')) {
        return valor * distancias.milhas;
    }

    throw new Error('Conversão não suportada');
}

// Executa conversão
try {
    const resultado = converter(valor, unidadeOrigem, unidadeDestino);
    
    if (['celsius', 'fahrenheit'].includes(unidadeOrigem)) {
        console.log(`${valor} graus ${unidadeOrigem.charAt(0).toUpperCase() + unidadeOrigem.slice(1)} é igual a ${resultado.toFixed(2)} graus ${unidadeDestino.charAt(0).toUpperCase() + unidadeDestino.slice(1)}.`);
    } else {
        console.log(`${valor} ${unidadeOrigem} é igual a ${resultado.toFixed(2)} ${unidadeDestino}.`);
    }
} catch (err) {
    console.log(err.message);
}
