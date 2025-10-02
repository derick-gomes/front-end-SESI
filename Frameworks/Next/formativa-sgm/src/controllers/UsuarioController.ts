import Usuario, { IUsuario } from "@/models/Usuario";
import connectMongo from "@/services/mongodb"


//getAll
export const getAllUsuario = async() =>{
    await connectMongo();//estabelece conexão com o BD
    const usuarios = await Usuario.find([]); //listar todos os usuários da coleção
    return usuarios;
}

//getOne
export const getOneUsuario = async(id:string) => {
    await connectMongo();
    const usuario = await Usuario.findById(id); //listar o usuario pelo ID
    return usuario;
}

//create
export const createUsuario = async(data: Partial<IUsuario>) =>{
    await connectMongo();
    const novoUsuario = new Usuario(data); // cria um novo usuario
    const novoUsuarioId = novoUsuario.save() //salva o novo usuario no BD
    return novoUsuarioId; //retorna o ID do novo usuario
}

//update
export const updateUsuario = async(id:string, data:Partial<IUsuario>) =>{
    await connectMongo();
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, data, {new:true}); //atualiza o usuario pelo ID
    return usuarioAtualizado; //retorna o usuario atualizado
}

//delete
export const deleteUsuario = async(id:string) =>{
    await connectMongo();
    await Usuario.findByIdAndDelete(id);
}

// retorna uma mensagem de sucesso
