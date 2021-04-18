$(document).ready(function() {
    $('.header__search__form__select').selectmenu();


});

const swiper1 = new Swiper('.swiper1', {
    // Optional parameters
    slidesPerView: 1,
    loop: true,
    autoplay: {
    delay: 5000,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    slidesPerView: 1,
    loop: true,
    autoplay: {
    delay: 5000,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
const itemSelector = document.querySelectorAll('.header__menu__list__item');
const dropdownSelector = document.querySelectorAll('.header__menu__dropdown');
const overlay = document.querySelector('.overlay');
const overlayMenu = document.querySelector('.overlay-menu');
for (let i=0; i<itemSelector.length; i++) {
    itemSelector[i].addEventListener('click', function() {
        dropdownSelector[i].classList.toggle('active');
        if (dropdownSelector[i].classList.contains('active')) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
        for (let k=0; k<itemSelector.length; k++) {
            if (k!=i && dropdownSelector[k].classList.contains('active')) {
            dropdownSelector[k].classList.toggle('active');
            }
        }
    });
}


const categoryLinkSelector = document.querySelectorAll('.header__menu__dropdown__item');
const categoryLinkGoodSelector = document.querySelectorAll('.header__menu__dropdown__cat');
for (let i=0; i<categoryLinkSelector.length; i++) {
    categoryLinkSelector[i].addEventListener('click', function() {
        //костыль для проверки
        if (i>13) {categoryLinkGoodSelector[1].classList.toggle('active')} 
        else {categoryLinkGoodSelector[0].classList.toggle('active')};
    });
}

overlay.addEventListener('click', function() {
    overlay.classList.remove('show');
    overlayMenu.classList.remove('active');
    for (let i=0; i<dropdownSelector.length; i++) {
    dropdownSelector[i].classList.remove('active');
    }
});


// копирование email по клику 

const emailBtn = document.querySelector('.header-email__button');
const emailText = document.querySelector('.header__nav__breadcrumbs__item_email');

emailText.addEventListener('click', function() {
    emailBtn.classList.toggle('active');
});

function headerEmail(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
}

const overlayHeader = document.querySelector('.overlay-header');
const phone = document.querySelector('.header__nav__breadcrumbs__item_phone');
const modal = document.querySelector('.modal-hover');

phone.addEventListener('mouseover', function() {
    modal.classList.toggle('active');
    overlay.classList.toggle('show'); 
    overlayHeader.classList.toggle('active');
});

phone.addEventListener('mouseout', function() {
    modal.classList.toggle('active');
    overlay.classList.toggle('show');
    overlayHeader.classList.toggle('active');
});


const db = {
	"03067":["Посудомоечная машина купольного типа МПК-700К","Посудомоечное"],
	"04089":["Посудомоечная машина купольного типа МПК-800К","Посудомоечное"],
	"05612":["Посудомоечная машина купольного типа МПК-900К","Посудомоечное"],
	"08889":["Посудомоечная машина купольного типа МПК-700К","Посудомоечное"],
	"07686":["Посудомоечная машина купольного типа МПК-800К","Посудомоечное"],
	"06808":["Посудомоечная машина купольного типа МПК-900К","Посудомоечное"]
}

let search = document.querySelector('.header__search__form__input');
window.search = search; 
search.autocomplete = "off"; // 
search.setAttribute("onkeyup","searchDB(this);");

// Search function
function searchDB(elem) {
	let selector = document.querySelector('.header__search__form__goodslist');
	
	if (elem.value.trim() !== "") {
		
		if (selector == null) {
			selector = document.createElement("div");
			selector.className += "header__search__form__goodslist";
			elem.parentNode.appendChild(selector);
		}
		
		selector.innerHTML = "";
		
		let empty = true;
		for (let item in db) {
			
			let str = [item, db[item][0], db[item][1]].join();
			// If exists, create an item (button)
			if (str.indexOf(elem.value) !== -1) {
				let opt = document.createElement("div");
                let optTitle = document.createElement("a");
                let optCat = document.createElement("a");
                opt.className += "header__search__form__goodslist__item";
                optTitle.className += "header__search__form__goodslist__title";
                optCat.className += "header__search__form__goodslist_cat";
				optTitle.innerHTML = db[item][0];
                optCat.innerHTML = db[item][1];
				selector.appendChild(opt);
                selector.appendChild(optTitle);
                selector.appendChild(optCat);
				empty = false;
			}
		}
		
        if (empty == true) {
			selector.parentNode.removeChild(selector);
		}
	}
	
	else {
		if (selector !== null) {
			selector.parentNode.removeChild(selector);
            overlay.classList.remove('show');
            overlayMenu.classList.remove('active');
		}
	}

}

function insertValue(elem) {
	window.search.value = elem.innerHTML;
	elem.parentNode.parentNode.removeChild(elem.parentNode);
}

search.oninput = function () {
    overlay.classList.add('show');
    overlayMenu.classList.add('active');
}
