import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector.js'
import { DEVICE_PIXEL_RATIO as pixelRatio } from 'ol/has.js'
import KML from 'ol/format/KML'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'

/**
 * Return open layer source and file from kml file
 * @param { String } name Layer name
 * @param { String } path kml file complete path
 * @param { Object } project project.id -> Kml numerical id | project.indicador -> Layer (indicador) numerical id
 * @param { String } type the Pattern type valid -> 'lines-crossed', 'lines-vertical', 'lines-horizontal' or 'dots'
 * @returns { Object } Open Layer new Vector instance
 */
function setPatternLayer(name, path, project, type){
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')

	const pattern = (function() {
		canvas.width = 8 * pixelRatio
		canvas.height = 8 * pixelRatio
		context.fillStyle = 'rgb(0, 0, 0)'
		context.beginPath()

		if(type === 'lines-crossed'){
			context.moveTo(0, 0)
			context.lineTo(canvas.width, canvas.height)
			context.stroke()
	
			context.beginPath()
			context.moveTo(canvas.width, 0)
			context.lineTo(0, canvas.height)
			context.stroke()

		}
		if(type === 'lines-vertical'){
			context.moveTo(canvas.width/2, 0)
			context.lineTo(canvas.width/2, canvas.height)
			context.stroke()
		}

		if(type === 'lines-horizontal'){
			context.moveTo(0, canvas.height/2)
			context.lineTo(canvas.width, canvas.height/2)
			context.stroke()
		}
		if(type === 'dots'){ // inner circle
			context.arc(4 * pixelRatio, 4 * pixelRatio, 1.5 * pixelRatio, 0, 2 * Math.PI)
			context.fill()
		}

		return context.createPattern(canvas, 'repeat')
	}())


	let getStackedStyle = feature => {
		let style = new Style({
			stroke: new Stroke({
				color: [0, 0, 0, 1],
				width: .5,
			}),
			fill: new Fill({
				color: pattern
			})
		})
		return style
	}

	const source = new VectorSource({
		url: path,
		format: new KML({ extractStyles: false })
	})

	return new VectorLayer({
		title: name,
		source: source,
		style: getStackedStyle,
		projectId: project.id, // !!! this is important !!!,
		projectIndicador: project.indicador
	})
}

/**
 * Return open layer source and file from kml file
 * @param { String } name Layer name
 * @param { String } path kml file complete path
 * @param { Object } project project.id -> Kml numerical id | project.indicador -> Layer (indicador) numerical id
 * @param { Object } custom custom open layer styles. Availables: color(Array), width(Number), lineDash(Number), fillCollor(Array)
 * @returns { Object } Open Layer new Vector instance
 */
function setLayer(name, path, project, custom = false){
	const source = new VectorSource({
		url: path,
		format: new KML({ extractStyles: false })
	})

	let style;

	const color = custom.color ? custom.color : [0, 0, 0, 1]
	const width = custom.width ? custom.width : 1
	const lineDash = custom.lineDash ? custom.lineDash : false
	const fillCollor = custom.fillCollor ? custom.fillCollor : [255, 255, 255, 0]

	style = new Style({
		stroke: new Stroke({
			color: color,
			width: width,
			lineDash: lineDash
		}),
		fill: new Fill({
			color: fillCollor
		})
	})

	return new VectorLayer({
		title: name,
		source: source,
		style: style,
		projectId: project.id, // !!! this is important !!!,
		projectIndicador: project.indicador
	})
}

/**
* Return the project data
* @param { Number } id The project id
* @param { Object } colocalizados  The colocalizados.json data
* @return { Object } The project data
*/
function getProjectData(id, colocalizados){
	let output = false
	for (let projeto in colocalizados){
		if (colocalizados[projeto].ID === id) { 
			output = colocalizados[projeto] 
		}
	}
	return output
}

export{ 
	setLayer,
	setPatternLayer,
	getProjectData
}