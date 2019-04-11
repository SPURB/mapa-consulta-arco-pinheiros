import { setLayer, setPatternLayer } from './helpers'


/**
* Create all layers for app
* @param { Object } projetos The projetos.json tree of /data-src/projetos/
* @param { Object } simples The simples.json data
* @param { String } app_url Url of this app (not attached to this app)
* @param { Object } cores The indicadores colors { indicador: [r, g, b, a] }
* @return { Array } Array of new Layers's (from Open Layers) to create de base
*/
function returnSimples(projetos, simples, app_url, cores){
	let kmlLayers = []
	let validObjs = []
	Object.values(simples).forEach(value => { if(value.ID) { 
		validObjs.push({ 
			id: value.ID,
			name: value.NOME,
			indicador: value.INDICADOR
		})
	} })

	const dashedLayers = [ 'A7' ]
	const filledLayers = [ 'A2', 'A3', 'A22','A23','A24','A25','A26','A27','A28' ]
	const biggerWidths = [ 'A6' ]
	const patternLayers = [
		{ indicador: 'A36', type:'lines-crossed' }, // ZEIS 1
		{ indicador: 'A37', type:'lines-vertical' }, // ZEIS 2
		{ indicador: 'A38', type:'lines-horizontal' }, // ZEIS 3
		{ indicador: 'A39', type:'dots' } // ZEIS 5
	]

	let isDashed = dashed => dashedLayers.includes(dashed)
	let isFilled = filled => filledLayers.includes(filled)
	let isBigWid = bigger => biggerWidths.includes(bigger)
	let isPattrn = pattern => patternLayers.find(object => object.indicador === pattern)

	validObjs.forEach(valid => {
		const files = projetos.find(obj => obj.id === valid.id)
		if (files) {
			files.children.forEach(file => {
				const url = app_url + file.path
				const pattern = isPattrn(valid.indicador)
				if(file.extension === '.kml') {

					const rgba = cores[valid.indicador]
					const customStyles = {
						color: rgba
					}

					if(isFilled(valid.indicador)) customStyles.fillCollor = [rgba[0], rgba[1], rgba[2], 0.5]
					if(isDashed(valid.indicador)) { customStyles.lineDash = [3]; customStyles.width = 1.5 }
					if(isBigWid(valid.indicador)) { customStyles.width = 5  }


					if(!pattern || pattern === undefined){
						kmlLayers.push({
							layer: setLayer(valid.name, url, {id: valid.id, indicador: valid.indicador}, customStyles)
						})
					}

					if(pattern) {
						kmlLayers.push({
							layer: setPatternLayer(valid.name, url, {id: valid.id, indicador: valid.indicador}, pattern.type)
						})
					}
				}
			})
		}
	})
	const layers = kmlLayers.map(vector => vector.layer)
	return layers
}

export { returnSimples }