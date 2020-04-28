
let $navbar_links = document.querySelectorAll('.header-navbar a');
let $btn_toggle = document.querySelector('button.navbar-toggle');

let $nav_bar = document.querySelector('#nav-bar');
let $nav_bar_links = document.querySelectorAll('#nav-bar a');


for(let z=0; z < $navbar_links.length; z++) {

		/* Change .active class on click */

		$navbar_links[z].addEventListener('click', function(e){


			let currentEl = e.currentTarget;

			/* Change .active class just for elements in <nav> tag, do nothing for a.navbar-logo */

			if(currentEl.getAttribute('class') === 'nav-link') {

				currentEl.classList.add('active');

			} else if (currentEl.getAttribute('href') == '#') {

				currentEl.classList.remove('active');

			}

			/* Change .active class on smooth scroll */

			smoothScroll(e);

			/* Close <nav> element on button.navbar-toggle click */

			if( $nav_bar.classList.contains('open') ) {

					$btn_toggle.click();
				}

		}, false);
		
	}


	function smoothScroll(e) {

		/* Prevent default click behavior on <a> links */
		e.preventDefault();

		const targetId = e.currentTarget.getAttribute('href');

		/* if link is a.navbar-logo go to top of the page */
		let targetPosition = (targetId === "#" ? 0 : document.querySelector(targetId).offsetTop);


		let startPosition = window.pageYOffset; 

		/* distance from scrollYpos to target <section> top */
		let distance = targetPosition - startPosition;

		/* animation speed */ 
		let duration = 800;

		let start = null;

		window.requestAnimationFrame(step);

		function step(timeStamp) {

			if(!start) {

				start = timeStamp;
			}

			let progress = timeStamp - start;

			window.scrollTo(0, easeOutCubic(progress,startPosition,distance,duration));

			if(progress < duration) {

				window.requestAnimationFrame(step);
			}
		}
	}

	/* easeOutCubic() replaces linear animation */

	function easeOutCubic(t, b, c, d) {

			t /= d;
			t--;
			return c*(t*t*t + 1) + b;
		}

let $section_items = document.querySelectorAll('.section-item');

window.addEventListener('scroll', function(){

	// change header height on scroll

	 let $header_navbar = document.querySelector('.header-navbar');

	 if(window.pageYOffset > 160) {

	 	$header_navbar.classList.add('shrink');

	 	$btn_toggle.style.top = '22px';

	 } else {

	 	$header_navbar.classList.remove('shrink');

	 	$btn_toggle.style.top = '33px';

	 }

	 // change on scroll .active class 

	 for (let j=0; j < $nav_bar_links.length; j++) {


					if( ($section_items[j].offsetTop - 90) <= window.pageYOffset) {

						/* create $nav_bar_linksArr for IE */
						let $nav_bar_linksArr = Array.prototype.slice.call( document.querySelectorAll('.nav-link') );

						$nav_bar_linksArr.forEach(function(item){

										item.classList.remove('active');				
								});

							if ( $nav_bar_links[j].getAttribute('href') === ('#'+$section_items[j].id) ) {

								$nav_bar_links[j].classList.add('active');
							} 

					} else {

							$nav_bar_links[j].classList.remove('active');

						}
				}
});

/* Open-close nav-bar on btn click */

$btn_toggle.addEventListener('click', function(){

	 $nav_bar.classList.toggle('open');

});

/* image gallery */

let galleryImages = document.querySelectorAll('.gallery-img');

let getLatestOpenImg;

/* necessary for prev & next buttons position */
let windowWidth = window.innerWidth; 

let yBarWidth = window.innerWidth - document.documentElement.clientWidth;

if(galleryImages.length) {

	function xClose() {

			if(document.querySelector('.img-window').length) {

				document.querySelector('.img-window').remove();
			}
		}

	galleryImages.forEach(function(image, index) {

			image.addEventListener('click', function(){

				/* grab hq image from img folder and show it */

				let getElementCss = window.getComputedStyle(image);

				let getFullImageUrl = getElementCss.getPropertyValue('background-image');

				let setNewImgUrl = getFullImageUrl.split('/').pop().replace('")', '');

				
				/* setting value of getLatestOpenImg to current opened image */

				getLatestOpenImg = index + 1;

				/* create pop-up div (show clicked img) */

				let container = document.body;

				let newImgWindow = document.createElement('div');

				container.appendChild(newImgWindow);

				newImgWindow.setAttribute('class','img-window');
				newImgWindow.setAttribute('onclick','closeImg()');

				let lbClose = document.createElement('span');
				lbClose.setAttribute('class','lb-close');

				newImgWindow.appendChild(lbClose);

				lbClose.setAttribute('onclick','xClose()');


				/* create new img for popup win */

				let newImg = document.createElement('img'); 

				newImgWindow.appendChild(newImg);

				newImg.setAttribute('src','img/' + setNewImgUrl);
				newImg.setAttribute('id','current-img');

				let scrollBarW = window.innerWidth - document.documentElement.clientWidth;


				newImg.addEventListener('load',function(){

					let imgWidth = this.width;

					/* btn(next and prev) position relative to displayed image */
					let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; 

					/* creat next btn and append it to <body> */
					let newNextBtn = document.createElement('a');
					let btnNextText = document.createTextNode('Next');
					newNextBtn.appendChild(btnNextText);

					container.appendChild(newNextBtn);

					newNextBtn.setAttribute('class','img-btn-next');

					/* argument(1) when btn is clicked go forward */
					newNextBtn.setAttribute('onclick','changeImg(1)');

					newNextBtn.style.cssText = "right: "+(calcImgToEdge - scrollBarW)+"px;";


					/* create prev btn and append it to <body> */
					let newPrevBtn = document.createElement('a');
					let btnPrevText = document.createTextNode('Prev');
					newPrevBtn.appendChild(btnPrevText);

					container.appendChild(newPrevBtn);

					newPrevBtn.setAttribute('class','img-btn-prev');

					/* argument(0) when btn is clicked go backward */
					newPrevBtn.setAttribute('onclick','changeImg(0)');

					newPrevBtn.style.cssText = "left: "+calcImgToEdge+"px;";

					/* static pos for btns */
					if(window.innerWidth < 900) {

						newNextBtn.style.cssText = "right: 6px;";
						newPrevBtn.style.cssText = "left: 6px;";
					}

				}, false);

			}, false);
	});
}

function closeImg() {
	
	document.querySelector('.img-window').remove();
	document.querySelector('.img-btn-next').remove();
	document.querySelector('.img-btn-prev').remove();	
}

function changeImg(changeDir) {

	/* remove current img when next or prev btn is clicked */ 
	document.querySelector('#current-img').remove();

	let getImgWindow = document.querySelector('.img-window');

	/* creating new img that will replace previous */
	let newImg = document.createElement('img');
	getImgWindow.appendChild(newImg);

	/* dynamically determine img name */
	let calcNewImg;

	if(changeDir === 1) {

		calcNewImg = getLatestOpenImg + 1;

		if(calcNewImg > galleryImages.length) {

			calcNewImg = 1;
		}

	} else if(changeDir === 0) {

		calcNewImg = getLatestOpenImg - 1;

		if(calcNewImg < 1) {

			calcNewImg = galleryImages.length;
		}
	}

	newImg.setAttribute('src','img/img'+calcNewImg+'.jpg');

	/* again set id for this new img */
	newImg.setAttribute('id','current-img');

	/* again reset getLatestOpenImg */
	getLatestOpenImg = calcNewImg;

	let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

	newImg.addEventListener('load', function(){

		/* determine width of new img when it loads */
		let imgWidth = this.width;

		let calcImgToEdge = ((windowWidth- imgWidth) / 2) - 80; 

		let nextBtn = document.querySelector('.img-btn-next');
		nextBtn.style.cssText = "right: "+ (calcImgToEdge - scrollBarWidth) +"px;";
		let prevBtn = document.querySelector('.img-btn-prev');

		prevBtn.style.cssText = "left: "+ calcImgToEdge +"px;";

		if(window.innerWidth < 900) {

				nextBtn.style.cssText = "right: 6px;";
				prevBtn.style.cssText = "left: 6px;";
			}

	}, false);

}

