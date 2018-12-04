# Normaliza CRLF
Este script converte os \r\n (CRLF) para \n (LF) de um arquivo ou dos
arquivos de uma pasta. Caso ainda sobre \r eles serão removidos.

## Atenção
1. Os arquivos serão sobrescritos;
2. Faça o backup do arquivo ou da pasta antes de executar o script;
3. A função lê qualquer arquivo como texto e com codificação windows1252.
Se o arquivo for binário ou a codificação for outra, irá desconfigurar
o arquivo ao salvá-lo.
        
## Uso
Abra o terminal e execute o script da seguinte forma:

`node normalizarCrlf.js <1> <2> <3>`

* `<1>` - `A` para arquivo ou `P` para pasta
* `<2>` - Caminho do arquivo ou pasta
* `<3>` - Extensão de arquivo: só arquivos dessa extensão serão normalizados