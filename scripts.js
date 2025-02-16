const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

document.getElementById('image-upload').addEventListener('change', function(event) {
    var file = event.target.files[0]; // Pegando o arquivo selecionado pelo usuário
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        return;
      }
    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }
  });

  function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader(); // Criando uma instância do FileReader
      leitor.onload = () => {
          resolve({ url: leitor.result, nome: arquivo.name })
      }
      leitor.onerror = () => {
          reject(`Erro ao ler arquivo ${arquivo.name}`)
      }

      leitor.readAsDataURL(arquivo) // Lendo o arquivo como um Data URL
    })
  }

//exemplo de funcionamento do FileReader API - como usado acima ^ ^ ^
//   HTML
//   <input type="file" id="imageInput" accept="image/*">
//   <img id="preview" src="" alt="Pré-visualização da imagem" style="max-width: 200px; display: none;"></img>

//   JavaScript
//   document.getElementById('imageInput').addEventListener('change', function(event) {
//     const file = event.target.files[0]; // Pegando o arquivo selecionado pelo usuário
//     if (file) {
//         const reader = new FileReader(); // Criando uma instância do FileReader
//         reader.onload = function(e) {
//             const preview = document.getElementById('preview');
//             preview.src = e.target.result; // Atribuindo o resultado da leitura como fonte da imagem de      pré-visualização
//             preview.style.display = 'block'; // Tornando a pré-visualização visível
//         };
//         reader.readAsDataURL(file); // Lendo o arquivo como um Data URL
//     }
//   });

// Explicação do Código
// 1 - Evento 'change': Primeiro, adicionamos um ouvinte de eventos ao nosso input de arquivo. Isso significa que sempre que um arquivo for selecionado, o código dentro da função será executado.
// 2 - FileReader: Criamos uma nova instância do FileReader. Esse objeto nos permite ler o conteúdo do arquivo selecionado.
// 3 - reader.onload: Definimos o que acontece quando a leitura do arquivo é concluída. Neste caso, queremos mostrar a imagem no elemento img que preparamos.
// 4 - readAsDataURL: Este método lê o arquivo e o codifica como um Data URL, uma string base64 que representa os dados do arquivo. Isso permite que a imagem seja mostrada diretamente no navegador sem precisar ser enviada para um servidor primeiro.

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => { //o async é usado para que a função possa usar a palavra-chave await e esperar a resposta do FileReader
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
        const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); // o await é usado para que a função espere a resposta do FileReader antes de continuar
        imagemPrincipal.src = conteudoDoArquivo.url; // atribuindo a imagem ao elemento img
        nomeDaImagem.textContent = conteudoDoArquivo.nome; // atribuindo o nome
      } catch (erro) {
        console.error("Erro na leitura do arquivo");
    }
  }
})
  
// Promises são: em JavaScript é um objeto que representa o sucesso ou a falha de uma operação assíncrona. Assíncrono significa que algo pode acontecer agora ou no futuro, mas não impede outras operações de acontecerem enquanto isso. As Promessas têm três estados:
// Pendente (Pending): Quando a Promessa é criada e a operação ainda não foi concluída.
// Realizada (Fulfilled): Quando a operação assíncrona é concluída com sucesso.
// Rejeitada (Rejected): Quando a operação falha.
// Exemplo de uso de Promisse
// let promessaDePizza = new Promise(function(resolve, reject) {
//   // Simulando a entrega da pizza
//   let pizzaEntregue = true; // Tente mudar para false e veja o que acontece
//   if (pizzaEntregue) {
//     resolve('Pizza entregue com sucesso!');
//   } else {
//     reject('Entrega da pizza falhou.');
//   }
// });

// Async/await
// No JavaScript, uma das formas mais elegantes de lidar com operações assíncronas é usando async/await. Uma função async é uma função que retorna uma promessa, e o await é usado para esperar por essa promessa ser resolvida (ou seja, completada) antes de continuar com o próximo passo. Isso nos permite escrever código assíncrono que parece síncrono, tornando-o mais legível e fácil de entender.

//       async function buscarDados() {
//         const resposta = await fetch('https://api.exemplo.com/dados');
//         const dados = await resposta.json();
//         console.log(dados);
//       }

// Melhores Práticas
// Tratamento de Erros: Sempre use try/catch ao usar await para lidar com possíveis erros de forma elegante.
// Evite Await em Loop: Usar await dentro de loops pode levar a um desempenho ruim, pois espera-se que cada operação seja concluída antes de iniciar a próxima. Considere alternativas como Promise.all.
// Código Limpo: Embora async/await torne o código mais legível, ainda é importante manter seu código organizado e evitar aninhamentos profundos


// inserindo as tags
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");



// remover as tags
listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
      const tagQueQueremosRemover = evento.target.parentElement; //parentElement serve para pegar o elemento pai
      listaTags.removeChild(tagQueQueremosRemover);
  }
})

// definir possiveis tags
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(tagsDisponiveis.includes(tagTexto));
      }, 1000)
  })
}

inputTags.addEventListener("keypress", async (evento) => { //keypress é usado para detectar quando o usuário pressiona uma tecla
  if (evento.key === "Enter") { // se a tecla pressionada for Enter
      evento.preventDefault(); 
      const tagTexto = inputTags.value.trim(); // trim serve para remover espaços em branco
      if (tagTexto !== "") {
        try {
          const existeTag = await verificaTagsDisponiveis(tagTexto);
          if (existeTag) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
          listaTags.appendChild(tagNova); //.appendChild serve aqui para adicionar a tag nova na lista
          inputTags.value = "";
          } else {
            alert("Tag não encontrada");
            }
        } catch (error) {
          console.error("Erro ao verificar a exixtência da tag");
          alert("Erro ao verificar a exixtência da tag, verifique o console.");
        }
      }
  }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deuCerto = Math.random() > 0.5;

        if (deuCerto) {
          resolve("Projeto publicado com sucesso!");
        } else {
          reject("Erro ao publicar o projeto");
          }
        }, 2000);
    })
  }

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();
  
    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
    
    try {
      const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
      console.log(resultado);
      alert("Deu tudo certo!");
    } catch (error) {
      console.error("Erro ao publicar o projeto", error);
      alert("Erro ao publicar o projeto");
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();
  const formulario = document.querySelector("form");
  formulario.reset();

  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "imgem-projeto.png";

  listaTags.innerHTML = "";
})