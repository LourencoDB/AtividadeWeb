"use client"

import * as React from "react"
import { Computer, Plus, Search, Trash2, Edit, Monitor } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Configurações customizadas da sidebar
const CUSTOM_SIDEBAR_WIDTH = "16rem"
const CUSTOM_SIDEBAR_WIDTH_MOBILE = "16rem"

interface ComputerData {
  _id?: string
  marca: string
  modelo: string
  velocidade: string
}

const API_BASE_URL = "https://crudcrud.com/api/6b87ec0903db4f268428b0329d10ad0d"

export function ComputerDashboard() {
  const [computers, setComputers] = React.useState<ComputerData[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [editingComputer, setEditingComputer] = React.useState<ComputerData | null>(null)
  const [formData, setFormData] = React.useState({
    marca: "",
    modelo: "",
    velocidade: "",
  })
  const { toast } = useToast()

  // Fetch computers from API
  const fetchComputers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/computers`)
      if (response.ok) {
        const data = await response.json()
        setComputers(data)
      } else {
        throw new Error("Falha ao carregar computadores")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os computadores",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add new computer
  const addComputer = async () => {
    if (!formData.marca || !formData.modelo || !formData.velocidade) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/computers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Computador adicionado com sucesso",
        })
        setFormData({ marca: "", modelo: "", velocidade: "" })
        setIsAddDialogOpen(false)
        fetchComputers()
      } else {
        throw new Error("Falha ao adicionar computador")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o computador",
        variant: "destructive",
      })
    }
  }

  // Update computer
  const updateComputer = async () => {
    if (!editingComputer || !formData.marca || !formData.modelo || !formData.velocidade) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/computers/${editingComputer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Computador atualizado com sucesso",
        })
        setFormData({ marca: "", modelo: "", velocidade: "" })
        setIsEditDialogOpen(false)
        setEditingComputer(null)
        fetchComputers()
      } else {
        throw new Error("Falha ao atualizar computador")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o computador",
        variant: "destructive",
      })
    }
  }

  // Delete computer
  const deleteComputer = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/computers/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Computador excluído com sucesso",
        })
        fetchComputers()
      } else {
        throw new Error("Falha ao excluir computador")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o computador",
        variant: "destructive",
      })
    }
  }

  // Handle edit
  const handleEdit = (computer: ComputerData) => {
    setEditingComputer(computer)
    setFormData({
      marca: computer.marca,
      modelo: computer.modelo,
      velocidade: computer.velocidade,
    })
    setIsEditDialogOpen(true)
  }

  // Filter computers based on search term
  const filteredComputers = computers.filter(
    (computer) =>
      computer.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.velocidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  React.useEffect(() => {
    fetchComputers()
  }, [])

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: Monitor,
      isActive: true,
    },
    {
      title: "Computadores",
      icon: Computer,
      isActive: false,
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="none"
        className="border-r border-slate-700/50"
        style={
          {
            "--sidebar-width": CUSTOM_SIDEBAR_WIDTH,
            "--sidebar-width-mobile": CUSTOM_SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
      >
        <SidebarHeader className="border-b border-slate-700/50">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <Computer className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-100">Computer Manager</span>
              <span className="text-xs text-slate-400">Dashboard</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-300">Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href="#" className="text-slate-200 hover:text-white">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-100">Gerenciamento de Computadores</h1>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Total de Computadores</CardTitle>
                <Computer className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">{computers.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Marcas Únicas</CardTitle>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  {new Set(computers.map((c) => c.marca)).size}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">{new Set(computers.map((c) => c.marca)).size}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Status</CardTitle>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">Online</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-100">Lista de Computadores</CardTitle>
                  <CardDescription className="text-slate-400">
                    Gerencie todos os computadores cadastrados
                  </CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Computador
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Computador</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Preencha os dados do computador abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="marca" className="text-slate-200">
                          Marca
                        </Label>
                        <Input
                          id="marca"
                          value={formData.marca}
                          onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100"
                          placeholder="Ex: Dell, HP, Lenovo"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="modelo" className="text-slate-200">
                          Modelo
                        </Label>
                        <Input
                          id="modelo"
                          value={formData.modelo}
                          onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100"
                          placeholder="Ex: Inspiron 15, ThinkPad X1"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="velocidade" className="text-slate-200">
                          Velocidade
                        </Label>
                        <Input
                          id="velocidade"
                          value={formData.velocidade}
                          onChange={(e) => setFormData({ ...formData, velocidade: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100"
                          placeholder="Ex: 2.4 GHz, 3.2 GHz"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addComputer} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Adicionar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar computadores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-slate-400">Carregando...</div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Marca</TableHead>
                      <TableHead className="text-slate-300">Modelo</TableHead>
                      <TableHead className="text-slate-300">Velocidade</TableHead>
                      <TableHead className="text-slate-300 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComputers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-slate-400">
                          Nenhum computador encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredComputers.map((computer) => (
                        <TableRow key={computer._id} className="border-slate-700 hover:bg-slate-700/30">
                          <TableCell className="text-slate-200 font-medium">{computer.marca}</TableCell>
                          <TableCell className="text-slate-300">{computer.modelo}</TableCell>
                          <TableCell className="text-slate-300">{computer.velocidade}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(computer)}
                                className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => computer._id && deleteComputer(computer._id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Editar Computador</DialogTitle>
            <DialogDescription className="text-slate-400">Atualize os dados do computador abaixo.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-marca" className="text-slate-200">
                Marca
              </Label>
              <Input
                id="edit-marca"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-modelo" className="text-slate-200">
                Modelo
              </Label>
              <Input
                id="edit-modelo"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-velocidade" className="text-slate-200">
                Velocidade
              </Label>
              <Input
                id="edit-velocidade"
                value={formData.velocidade}
                onChange={(e) => setFormData({ ...formData, velocidade: e.target.value })}
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={updateComputer} className="bg-purple-600 hover:bg-purple-700 text-white">
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </SidebarProvider>
  )
}
