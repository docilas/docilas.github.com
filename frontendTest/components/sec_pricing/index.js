import Hammer from 'hammerjs'


const area = document.querySelector('#pricing .wrapper'),
			tar = document.querySelector('#pricing .wrapper .flex_box')

let range = getPlanRange()

function getPlanRange(){
	let total = 0;
	document.querySelectorAll('#pricing .plan').forEach((item=>{
			const style = item.currentStyle || window.getComputedStyle(item),
				    width = item.offsetWidth,
				    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
		 total = total + width + margin
	}))

	return total - area.offsetWidth
}

function getNextX(now, move) {
	const next = now + move/8

	if ( next >= 0 )
		return 0
	else if( next < -range ){
		return -range
	}
	else
		return next
}

window.addEventListener("resize", ()=>{
	if (area.offsetWidth > 768){
		tar.style.transform = 'translateX(0px)'
	}

	range = getPlanRange()
	console.log(range)
});

export function onPan( event ) {
	const hammertime = new Hammer(area)
	let	nowX = 0

	hammertime.on('panleft panright', function(ev) {
		if (area.offsetWidth <= 768 ) {
			nowX = getNextX( nowX, ev.deltaX )
			tar.style.transform = `translateX(${nowX}px)`
		}
		else{
			nowX = 0;
			return false
		}
	});

}

export function onDrag( event ) {
	area.classList.add('grabbing');
}
export function onDrop( event ) {
	area.classList.remove('grabbing');
}