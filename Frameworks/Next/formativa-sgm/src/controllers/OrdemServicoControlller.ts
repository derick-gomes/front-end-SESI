import OrdemServico from "@/models/OrdemServico";
import { IOrdemServico } from "@/models/OrdemServico";
import connectMongo from "@/services/mongodb"   
//getAll
export const getAllOrdemServico = async() =>{
    await connectMongo();//estabelece conexão com o BD
    const ordensServico = await OrdemServico.find([]); //listar todos os ordensServico da coleção
    return ordensServico;
}
//getOne
export const getOneOrdemServico = async(id:string) => {
    await connectMongo();
    const ordemServico = await OrdemServico.findById(id);
    return ordemServico; //listar o ordemServico pelo ID
}
//create
export const createOrdemServico = async(data: Partial<IOrdemServico>) =>{
    await connectMongo();
    const novaOrdemServico = new OrdemServico(data); // cria um novo ordemServico
    const novaOrdemServicoId = novaOrdemServico.save() //salva o novo ordemServico no BD
    return novaOrdemServicoId; //retorna o ID do novo ordemServico
}
//update
export const updateOrdemServico = async(id:string, data:Partial<IOrdemServico>) =>{
    await connectMongo();
    const ordemServicoAtualizado = await OrdemServico.findByIdAndUpdate
(id, data, {new:true}); //atualiza o ordemServico pelo ID
    return ordemServicoAtualizado; //retorna o ordemServico atualizado
}
//delete
export const deleteOrdemServico = async(id:string) =>{
    await connectMongo();
    await OrdemServico.findByIdAndDelete(id);
}
// retorna uma mensagem de sucesso
export const mensagemSucesso = () => {
    return {message: "Operação realizada com sucesso!"};
}
// retorna uma mensagem de erro
export const mensagemErro = (error: any) => {
    return {error: error.message || "Ocorreu um erro na operação."};
}
