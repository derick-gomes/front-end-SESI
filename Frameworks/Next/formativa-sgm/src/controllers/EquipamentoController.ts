import Equipamento from "@/models/Equipamento";
import { IEquipamento } from "@/models/Equipamento";
import connectMongo from "@/services/mongodb"

//getAll
export const getAllEquipamento = async() =>{
    await connectMongo();//estabelece conexão com o BD
    const equipamentos = await Equipamento.find([]); //listar todos os equipamentos da coleção
    return equipamentos;
}
//getOne
export const getOneEquipamento = async(id:string) => {
    await connectMongo();
    const equipamento = await Equipamento.findById(id); //listar o equipamento pelo ID
    return equipamento;
}   
//create
export const createEquipamento = async(data: Partial<IEquipamento>) =>{
    await connectMongo();       
    const novoEquipamento = new Equipamento(data); // cria um novo equipamento
    const novoEquipamentoId = novoEquipamento.save() //salva o novo equipamento no BD
    return novoEquipamentoId; //retorna o ID do novo equipamento
}
//update
export const updateEquipamento = async(id:string, data:Partial<IEquipamento>) =>{
    await connectMongo();
    const equipamentoAtualizado = await Equipamento.findByIdAndUpdate(id
, data, {new:true}); //atualiza o equipamento pelo ID
    return equipamentoAtualizado; //retorna o equipamento atualizado
}

//delete
export const deleteEquipamento = async(id:string) =>{
    await connectMongo();
    await Equipamento.findByIdAndDelete(id);
}
// retorna uma mensagem de sucesso
export const mensagemSucesso = () => {
    return {message: "Operação realizada com sucesso!"};
}

