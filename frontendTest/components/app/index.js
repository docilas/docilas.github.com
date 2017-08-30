import 'dom4'
import 'svgxuse'
import domready from 'domready'

import {menuSwitch, menuScroll} from '../navbar';

domready(() => {
	const menuBtn = document.querySelector('.menu_switch')
	const menuItem = document.querySelectorAll('nav a')

	menuBtn.addEventListener('click', menuSwitch, false)
	menuItem.forEach((item)=>{ item.addEventListener('click', menuScroll, false) })

})
