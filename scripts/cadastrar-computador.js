// Script para cadastrar um computador na API CrudCrud

const API_BASE_URL = "https://crudcrud.com/api/6b87ec0903db4f268428b0329d10ad0d"

async function cadastrarComputador() {
  // Dados do computador a ser cadastrado
  const novoComputador = {
    marca: "Dell",
    modelo: "Inspiron 15 3000",
    velocidade: "2.4 GHz",
  }

  try {
    console.log("🚀 Cadastrando computador na API...")
    console.log("📋 Dados:", JSON.stringify(novoComputador, null, 2))

    const response = await fetch(`${API_BASE_URL}/computers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoComputador),
    })

    if (response.ok) {
      const computadorCadastrado = await response.json()
      console.log("✅ Computador cadastrado com sucesso!")
      console.log("🆔 ID gerado:", computadorCadastrado._id)
      console.log("📄 Dados completos:", JSON.stringify(computadorCadastrado, null, 2))

      // Vamos também listar todos os computadores para confirmar
      await listarComputadores()
    } else {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
  } catch (error) {
    console.error("❌ Erro ao cadastrar computador:", error.message)
  }
}

async function listarComputadores() {
  try {
    console.log("\n📋 Listando todos os computadores cadastrados...")

    const response = await fetch(`${API_BASE_URL}/computers`)

    if (response.ok) {
      const computadores = await response.json()
      console.log(`📊 Total de computadores: ${computadores.length}`)

      if (computadores.length > 0) {
        console.log("\n🖥️  Lista de computadores:")
        computadores.forEach((comp, index) => {
          console.log(`${index + 1}. ${comp.marca} ${comp.modelo} - ${comp.velocidade} (ID: ${comp._id})`)
        })
      } else {
        console.log("📭 Nenhum computador encontrado")
      }
    } else {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
  } catch (error) {
    console.error("❌ Erro ao listar computadores:", error.message)
  }
}

// Executar o cadastro
cadastrarComputador()
