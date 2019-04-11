var fs = require("fs-extra");
 
function copyPaste(source, destination) {
	var destinationPath =  __dirname
		.replace('tasks', '')
		.replace('data-src', destination)

	fs.copy(source, destinationPath, function (err) {
		if (err){
			console.log('Um erro ocorreu ao copiar o dirtetório.')
			return console.error(err)
		}
		console.log('Cópia concluída! Diretório criado em ' + destinationPath)
	})
}

copyPaste('data-src/projetos', 'dist/data-src/projetos');
copyPaste('data-src/legendas', 'dist/data-src/legendas');