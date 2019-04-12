import { setLayer, setTwoStrokes, setPatternLayer } from './helpers'


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

	const dashedLayers = []
	const bigDots 	   = [  'A21' ]
	const filledLayers = [ 'A2', 'A3', 'A22','A23','A24','A25','A26','A27','A28','A34', 'A35' ]
	const biggerWidths = [ 'A6' ]
	const twoStrokes   = [ 
		{ indicador: 'A7', type: 'butt', lineDash: [ 15 ] },
		{ indicador: 'A8', type: 'butt' },
		{ indicador: 'A9', type: 'butt' },
		{ indicador: 'A10', type: 'round' }
	] // pontes, passarelas, cicilopassarelas (passagens)
	const patternLayers = [
		{ indicador: 'A36', type:'lines-crossed' }, // ZEIS 1
		{ indicador: 'A37', type:'lines-vertical' }, // ZEIS 2
		{ indicador: 'A38', type:'lines-horizontal' }, // ZEIS 3
		{ indicador: 'A39', type:'balls' } // ZEIS 5
	]

	let isDashed = dashed => dashedLayers.includes(dashed)
	let isBigDot = doted => bigDots.includes(doted)
	let isFilled = filled => filledLayers.includes(filled)
	let isBigWid = bigger => biggerWidths.includes(bigger)
	let isTwoStr = stroke => twoStrokes.find(object => object.indicador === stroke)
	let isPattrn = pattern => patternLayers.find(object => object.indicador === pattern)

	validObjs.forEach(valid => {
		const files = projetos.find(obj => obj.id === valid.id)
		if (files) {
			files.children.forEach(file => {
				const indicador = valid.indicador
				const url = app_url + file.path
				const pattern = isPattrn(indicador)
				const twoStrs = isTwoStr(indicador)

				if(file.extension === '.kml') {
					const rgba = cores[indicador]
					const customStyles = { color: rgba }
					const name = valid.name
					const projeto = { id: valid.id, indicador: indicador }
					if(isFilled(indicador)) customStyles.fillCollor = [rgba[0], rgba[1], rgba[2], 0.5]
					if(isDashed(indicador)) customStyles.lineDash = [3]; customStyles.width = 1.5
					if(isBigDot(indicador)) { customStyles.lineDash = [1.25, 10]; customStyles.width = 5 }
					if(isBigWid(indicador)) customStyles.width = 5

					if(twoStrs) {
						const output = twoStrs.lineDash ?
							setTwoStrokes(
								name, url, projeto, [
									{ width: 10, color: rgba },
									{ width: 8, color: [ 255, 255, 255, 1 ] },
								],
								twoStrs.type,
								twoStrs.lineDash
							) :
							setTwoStrokes(
								name, url, projeto, [
									{ width: 10, color: [ 0, 0, 0, 1 ] },
									{ width: 6, color: rgba },
								],
								twoStrs.type
							)
						kmlLayers.push(output)
					}
					if(pattern) { kmlLayers.push(setPatternLayer(name, url, projeto, pattern.type))}
					if(!pattern || !twoStrs ){ kmlLayers.push(setLayer(name, url, projeto, customStyles))}
				}
			})
		}
	})
	return kmlLayers
}

export { returnSimples }