let saldTot = 0
let despTot = 0

function removeMask(val) {
    // LIMPAR MÁSCARA DE FORMATAÇÃO
    const n1$ = val.replace('R$ ', '')
    const n1Com = n1$.replace(',', '')
    const n1Dot = n1Com.replace('.', '')
    const valor = parseFloat(n1Dot)

    return valor
}


function cadastrar() {
    const tn1 = document.getElementById('valor')
    const tn2 = document.getElementById('desconto')
    var resSaldo = document.getElementById('totSaldo')
    var resDesc = document.getElementById('totDesp')
    const n1 = tn1.value
    const n2 = tn2.value

    const valor = removeMask(n1)
    let desc = 0

    if (n2 != '') {
        desc = removeMask(n2)
    }


    tipo = ''
    // VERIFICA SE DESCONTO É MAIOR QUE VALOR
    if (n1 != '') {
        if (desc > valor) {
            alert('Desconto maior que o Valor da movimentação!')
        } else {
            // SELECIONA A RECEITA OU DESPESA PARA CÁLC
            var radios = document.getElementsByName("radio");
            if (n1 != '') {
                if (radios[0].checked) {
                    tipo = radios[0].value
                    saldTot += valor
                    if (n2 != '') {
                        saldTot -= desc
                    }
                }

                if (radios[1].checked) {
                    tipo = radios[1].value
                    saldTot -= valor
                    despTot += valor
                    if (n2 != '') {
                        // const desc = removeMask(n2)
                        despTot -= desc
                        saldTot += desc
                    }
                }
            }
            // RETORNA OS VALORES EM CARD: INFORMAÇÕES GERAIS
            resSaldo.innerText = saldTot / 100
            resDesc.innerText = despTot / 100
            validador(tipo)

        }
    }

}

function validador(tipo) {
    if (
        document.getElementById('descricao').value != '' &&
        document.getElementById('valor').value != '' &&
        document.getElementById('dtVenc').value != '' &&
        document.getElementById('dtLiq').value != '' &&
        document.getElementById('origem').value != ''
    ) {
        addRegister(tipo)
        limpaCampos()
    } else {
        alert('Preencha todos os campos obrigatórios *')
    }

}

// LIMPAR PREENCHIMENTO 
function limpaCampos() {

    document.getElementById('radio1').checked = true
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''
    document.getElementById('desconto').value = ''
    document.getElementById('dtVenc').value = ''
    document.getElementById('dtLiq').value = ''
    document.getElementById('origem').value = ''
}

// MÁSCARA DE MOEDA
$(function () {
    $('#valor').maskMoney();
    $('#desconto').maskMoney();
})

// INSERE DADOS NA TABELA
let n = 0

function addRegister(type) {
    n += 1
    var registro = document.getElementById('dados')

    let linha = document.createElement('tr')

    let head = document.createElement('th')
    head.setAttribute('scope', 'row')
    head.innerText = n

    let tipo = document.createElement('td')
    tipo.innerText = type

    let descricao = document.createElement('td')
    descricao.innerText = document.getElementById('descricao').value

    let valor = document.createElement('td')
    valor.innerText = document.getElementById('valor').value

    let desconto = document.createElement('td')
    desconto.innerText = document.getElementById('desconto').value

    let dtVenc = document.createElement('td')
    dtVenc.innerText = document.getElementById('dtVenc').value

    let dtLiq = document.createElement('td')
    dtLiq.innerText = document.getElementById('dtLiq').value

    let origem = document.createElement('td')
    origem.innerText = document.getElementById('origem').value

    registro.appendChild(linha)
    linha.appendChild(head)
    linha.appendChild(tipo)
    linha.appendChild(descricao)
    linha.appendChild(valor)
    linha.appendChild(desconto)
    linha.appendChild(dtVenc)
    linha.appendChild(dtLiq)
    linha.appendChild(origem)
}
