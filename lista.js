const frm = document.querySelector("form")            // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro") 

frm.addEventListener("submit", (e) => {
  e.preventDefault()                                  // evita envio do form

  const tarefa = frm.inTarefa.value                   // obtém o conteúdo digitado

  const h5 = document.createElement("h5")             // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa)       // cria um texto
  h5.appendChild(texto)                               // define que texto será filho de h5
  dvQuadro.appendChild(h5)                            // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                             // limpa o campo de edição
  frm.inTarefa.focus()                                // joga o cursor neste campo
})

frm.btSelecionarAbaixo.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")     // coloca o conteúdo de todos os elementos h5, em um vetor
  
  if (tarefas.length == 0) {                          // verifica se o tamanho do vetor é igual a 0
    alert("Não há tarefas para selecionar")           // diz para o usuário que não tem tarefas 
    return                                            // encerra a função                               
  }

  let aux = -1                                        // cria variável auxiliar para armazaner a posição futuramente
 
  for (let i = 0; i < tarefas.length; i++) {          // laço de repetição que vai procurar pela tarefa selecionada
    
    if (tarefas[i].className == "tarefa-selecionada") { // verifica se é a tarefa seleciona, a partir do nome da classe
      tarefas[i].className = "tarefa-normal"          // troca o nome da classe para "tarefa-normal", tirando a seleção 
      aux = i                                         // atualiza o valor da variável auxiliar
      break                                           // para o laço de repetição
    }
  }
  
  if (aux == tarefas.length - 1) {                // verifica se o valor de "aux", é equivalente à última posição do vetor
    aux = -1                                          // atualiza o valor de "aux", para começar novamente a busca
  }

  tarefas[aux + 1].className = "tarefa-selecionada"   // muda o nome da classe para o elemento na posição indicada
})

frm.btSelecionarAcima.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")     // coloca o conteúdo de todos os elementos "h5", em um vetor
  
  if (tarefas.length == 0) {                          // verifica se o tamanho do vetor é igual a 0
    alert("Não há tarefas para selecionar")           // diz para o usuário que não tem tarefas 
    return                                            // encerra a função                               
  }

  let aux = tarefas.length                           // cria variável auxiliar para armazaner a posição futuramente
 
  for (let i = tarefas.length -1 ; i >=  0; i--) {   // laço de repetição que vai procurar pela tarefa selecionada
    
    if (tarefas[i].className == "tarefa-selecionada") { // verifica se é a tarefa selecionada, a partir do nome da classe
      tarefas[i].className = "tarefa-normal"          // troca o nome da classe para "tarefa-normal", tirando a seleção 
      aux = i                                         // atualiza o valor da variável auxiliar
      break                                           // para o laço de repetição
    }
  }
  
  if (aux == 0) {                                     // verifica se o valor de "aux", é equivalente à primeira posição do vetor
    aux = tarefas.length                              // atualiza o valor de "aux", para começar novamente a busca
  }

  tarefas[aux - 1].className = "tarefa-selecionada"   // muda o nome da classe para o elemento na posição indicada
})

frm.btRetirar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")     // coloca o conteúdo de todos os elementos "h5", em um vetor
  let aux = -1                                        // cria variável auxiliar
  
  tarefas.forEach((tarefa, i) => {                    // laço de repetição, que recebe os valores do vetor e cria uma variável "i", que começa em 0 e é incrementada em 1, a cada execução
    if (tarefa.className == "tarefa-selecionada") {   // verifica o nome da classe 
      aux = i                                         // atualiza o valor de "aux"
      console.log(i)                                  // mostra o "i" no console, "i" é a posição da tarefa removida
    }
  })

  if (aux == -1) {                                    // verifica o valor de "aux" ainda é o padrão definido na criação
    alert("Selecione uma tarefa para removê-la...")   // informa que nenhuma tarefa foi selecionada
    return                                            // encerra execução
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) { // solicita ao usuário que confirme a remoção
    dvQuadro.removeChild(tarefas[aux])                // remove o valor 
  } 
})

frm.btGravar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")     // coloca o conteúdo de todos os elementos h5, em um vetor  

  if (tarefas.length == 0) {                          // verifica o tamanho do vetor
    alert("Não há tarefas para serem salvas")         // avisa ao usuário que não há tarefas para salvar
    return                                            // encerra a função
  }

  let dados = ""                                      // cria uma variável que receberá os dados
  tarefas.forEach(tarefa => {                         // laço de repetição que recebe os valores do vetor
    dados += tarefa.innerText + ";"                   // adiciona o valor assumido pelo laço na variável "dados"
  })

  
  localStorage.setItem("tarefasDia", dados.slice(0, -1)) // salva os dados com o nome "tarefasDia"

  
  if (localStorage.getItem("tarefasDia")) {           // verifica se há um arquivo com o nome "tarefasDia"
    alert("Ok! Tarefas Salvas")                       // informa que foi salvo com sucesso
  }
})

window.addEventListener("load", () => { 
  
  if (localStorage.getItem("tarefasDia")) {           // verifica se há um arquivo com o nome "tarefasDia"
    
    const dados = localStorage.getItem("tarefasDia").split(";") // cria variável "dado", que recebe o conteúdo do "tarefasDia", separados a partir de ';'

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => {                           // cria um laço de recepção com os valores da variável "dados", salvando na variável "dado"
      const h5 = document.createElement("h5")         // cria uma constante "h5", que cria na página um elemento "h5"
      const texto = document.createTextNode(dado)     // cria uma constante "texto", qu"e" recebe o "texto" de "dado"
      h5.appendChild(texto)                           // define a constante "texto" como filha de "h5"
      dvQuadro.appendChild(h5)                        // define a constante "h5" como filha de de "dvQuadro"
    })
  }
})