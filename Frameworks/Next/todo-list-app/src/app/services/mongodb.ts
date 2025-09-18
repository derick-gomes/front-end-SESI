// escrevendo o MongoDB de forma segura 

//convert String para url (URI)
const MongoUri = process.env.DATABASE_URL;

//verificar se existe um endereço URL
if(!MongoUri){ //verificando a nulidade da variavel
    throw new Error("Defina o DATABASE_URL no .env.local") //mensagem de erro
};