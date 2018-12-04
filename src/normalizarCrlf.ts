'use strict';

import fs = require('fs');
import iconv = require('iconv-lite');
import path = require('path');


export function contar(conteudo: string): string {

    let crCount   =  ((conteudo || '').match(/\r/g)   || []).length;
    let lfCount   =  ((conteudo || '').match(/\n/g)   || []).length;
    let crlfCount =  ((conteudo || '').match(/\r\n/g) || []).length;

    return `CR = ${crCount} | LF = ${lfCount} | CRLF = ${crlfCount}`;
}

export function converter(caminho: string, extensao: string): void {

    console.log(caminho);

    try {

        // Verificando se a extensão do caminho é igual a do parâmetro
        if(caminho.substr(-extensao.length) == extensao) {

            let conteudo: string = iconv.decode(fs.readFileSync(caminho), 'windows1252');

            console.log('Antes:  ' + contar(conteudo));

            conteudo = conteudo.replace(/\r\n/g, '\n');
            conteudo = conteudo.replace(/\r/g, '');

            fs.writeFileSync(caminho, iconv.encode(conteudo, 'windows1252'));

            console.log('Depois: ' + contar(conteudo) + '\n');
        }
        else {
            console.log('Arquivo ignorado: extensão inválida\n');
        }
    }
    catch(e) {
        console.log(`Erro 1: ${e}\n`);
    }
}

export function converterPasta(caminho: string, extensao: string): void {

    console.log('Abrindo a pasta ' + caminho + '\n');

    try {

        let arquivos: string[] = fs.readdirSync(caminho);

        // Percorrendo os arquivos
        for(let i in arquivos) {

            let caminhoArquivo = path.join(caminho, arquivos[i]);

            let stat: fs.Stats = fs.lstatSync(caminhoArquivo);

            // Se for diretório vai para o próximo
            if(!stat.isFile()) continue;

            // Converte o arquivo
            converter(caminhoArquivo, extensao);
        }
    }
    catch(e) {
        console.log(`Erro 2: ${e}\n`);
    }
}

export function main(): void {

    console.log('');

    if(process.argv.length == 5) {

        if(process.argv[3] != '' && process.argv[4] != '') {

            // Caso seja arquivo
            if(process.argv[2] == 'A') {
                converter(process.argv[3], process.argv[4]);
                console.log('Fim!\n');
                return;
            }
            // Caso seja arquivo
            if(process.argv[2] == 'P') {
                converterPasta(process.argv[3], process.argv[4]);
                console.log('Fim!\n');
                return;
            }
        }
    }

    console.log(
`Este programa converte os \\r\\n (CRLF) para \\n (LF) de um arquivo ou dos
arquivos de uma pasta. Caso ainda sobre \\r eles serão removidos.

    + + + + ATENÇÃO + + + +

1 - Os arquivos serão sobrescritos;

2 - Faça o backup do arquivo ou da pasta antes de executar o programa;

3 - A função lê qualquer arquivo como texto e com codificação windows1252.
    Se o arquivo for binário ou a codificação for outra, irá desconfigurar
    o arquivo ao salvá-lo.\n`);
        
    console.log('Use o programa da seguinte forma:\n');
    console.log('node normalizarCrlf.js <1> <2> <3>\n');
    console.log('<1> = "A" para arquivo ou "P" para pasta');
    console.log('<2> = Caminho do arquivo ou pasta');
    console.log('<3> = Extensão de arquivo: só arquivos dessa extensão serão normalizados\n');
}


// Inicia o programa
main();
