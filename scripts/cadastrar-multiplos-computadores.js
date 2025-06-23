// Script para cadastrar múltiplos computadores de exemplo

const API_BASE_URL = "https://crudcrud.com/api/6b87ec0903db4f268428b0329d10ad0d"

const computadoresExemplo = [
  {
    marca: "HP",
    modelo: "Pavilion 15",
    velocidade: "2.8 GHz",
  },
  {
    marca: "Lenovo",
    modelo: "ThinkPad X1 Carbon",
    velocidade: "3.2 GHz",
  },
  {
    marca: "ASUS",
    modelo: "VivoBook 15",
    velocidade: "2.1 GHz",
  },
  {
    marca: "Acer",
    modelo: "Aspire 5",
    velocidade: "2.6 GHz",
  },
  {
    marca: "Apple",
    modelo: "MacBook Pro 13",
    velocidade: "3.0 GHz",
  },
]

async function cadastrarMultiplosComputadores() {
  console.log("🚀 Iniciando cadastro de múltiplos computadores...")
  console.log(`📊 Total a cadastrar: ${computadoresExemplo.length}`)

  let sucessos = 0
  let erros = 0

  for (let i = 0; i < computadoresExemplo.length; i++) {
    const computador = computadoresExemplo[i]

    try {
      console.log(`\n⏳ Cadastrando ${i + 1}/${computadoresExemplo.length}: ${computador.marca} ${computador.modelo}`)

      const response = await fetch(`${API_BASE_URL}/computers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(computador),
      })

      if (response.ok) {
        const resultado = await response.json()
        console.log(`✅ Sucesso! ID: ${resultado._id}`)
        sucessos++
      } else {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      // Pequena pausa entre requisições para não sobrecarregar a API
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`❌ Erro ao cadastrar ${computador.marca} ${computador.modelo}:`, error.message)
      erros++
    }
  }

  console.log("\n📈 Resumo do cadastro:")
  console.log(`✅ Sucessos: ${sucessos}`)
  console.log(`❌ Erros: ${erros}`)
  console.log(`📊 Total processado: ${sucessos + erros}`)

  // Listar todos os computadores após o cadastro
  if (sucessos > 0) {
    await listarTodosComputadores()
  }
}

async function listarTodosComputadores() {
  try {
    console.log("\n📋 Verificando todos os computadores cadastrados...")

    const response = await fetch(`${API_BASE_URL}/computers`)

    if (response.ok) {
      const computadores = await response.json()
      console.log(`\n🖥️  Total de computadores na base: ${computadores.length}`)

      if (computadores.length > 0) {
        console.log("\n📄 Lista completa:")
        computadores.forEach((comp, index) => {
          console.log(`${index + 1}. ${comp.marca} ${comp.modelo} - ${comp.velocidade}`)
        })
      }
    } else {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
  } catch (error) {
    console.error("❌ Erro ao listar computadores:", error.message)
  }
}

// Executar o cadastro múltiplo
cadastrarMultiplosComputadores()
