'use strict';

window.onload = function() {
	const menu = document.querySelector('.welcomeline__burger');
	const modal = document.querySelector('.modal');
	const addInfo = document.querySelector('.add-inf p');
	let moveTop = document.querySelector('.scrollToTop');

	// modal menu for mobiles
	menu.addEventListener('click', function opening (){
		const nav = document.querySelector('.list');

		this.style.display = 'none';

		modal.classList.add('opened');
		modal.appendChild(nav);
		
	});

	modal.addEventListener('click', closingModal);

	function closingModal(e){
		if (e.target.localName === 'a' || e.target.className === 'modal__btn') {
			modal.classList.remove('opened');		
			menu.style.display = 'flex';
			
		}
	}

	//appearence & behavier of button to move to top
	if (moveTop.getBoundingClientRect().top < window.scrollY) moveTop.classList.add('active');
	
	window.addEventListener('scroll', checkPosition);

	function checkPosition(e) {
		if (window.scrollY > window.innerHeight/2) {
			moveTop.classList.add('active');
			moveTop.addEventListener('click', () => {
				window.scrollTo(0, 0);
			});

		} else {
			moveTop.classList.remove('active');
		}
	}

	
	addInfo.addEventListener('click', toggleTextarea);

}


function toggleTextarea(e) {
	let textarea = e.target.nextElementSibling;

	if (textarea.style.display == 'block') {
		textarea.style.display = 'none';
	}else {
		textarea.style.display = 'block';
	}

}
