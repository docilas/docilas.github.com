import 'dom4'
import 'svgxuse'
import domready from 'domready'

import {menuSwitch, menuScroll} from '../navbar'
import {onPan, onDrag, onDrop} from '../sec_pricing'

domready(() => {
	const menuBtn = document.querySelector('.menu_switch')
	const menuItem = document.querySelectorAll('nav a')

	menuBtn.addEventListener('click', menuSwitch)
	menuItem.forEach((item)=>{ item.addEventListener('click', menuScroll) })

	//bind Pan event for Price plan
	const pricePlan = document.querySelector('#pricing .wrapper')
	pricePlan.addEventListener('mousedown', onDrag)
	pricePlan.addEventListener('mouseup', onDrop)
	onPan()


})
