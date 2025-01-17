"use strict";

const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);  
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);  
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);  
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);  
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);  
    },
    webOS: function () {
      return navigator.userAgent.match(/webOS/i);  
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.webOS()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('__touch');

    let menuArrows = document.querySelectorAll('.header__menu__item__arrow');

    if(menuArrows.length>0) {
      for(let i = 0; i < menuArrows.length; i++) {
        const menuArrow = menuArrows[i];
        
        menuArrow.addEventListener('click', function (e) {
          menuArrow.parentElement.classList.toggle('__active');
        });
      }
    };
} else {
    document.body.classList.add('__pc');
}

const returnBtn = document.querySelector('.return__btn');

document.addEventListener('scroll', function () {
    if (scrollY >= 100) {
        returnBtn.classList.remove('hidden');
    }else{
        returnBtn.classList.add('hidden');
    };
});

returnBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
});

const burgerIcon = document.querySelector('.burger');
const menuBody = document.querySelector('.header__menu__body');

  if(burgerIcon) {
        burgerIcon.addEventListener('click', () => {
        document.body.classList.toggle('__lock');
        burgerIcon.classList.toggle('__active');
        menuBody.classList.toggle('__active');
      })
  }

const menuLinks = document.querySelectorAll('.header__menu__item[data-goto]');

if(menuLinks.length > 0){
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick (e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

        if(burgerIcon.classList.contains('__active')) {
          document.body.classList.remove('__lock');
          burgerIcon.classList.remove('__active');
          menuBody.classList.remove('__active');
        };

        window.scrollTo ({
            top: gotoBlockValue,
            behavior: 'smooth'
        });
        e.preventDefault();

    };
  };
};

