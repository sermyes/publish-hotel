$(document).ready(function() {
  switchPage();
  // 페이지 부드럽게 로딩

  onMenu();
  // menu event function

  let slide = $('.slider');
  mySlide(slide);
  // slide function

  scrollDown();

  AOS.init({
    duration: 1000,
    ease: 'ease-in-out',
    once: true
  });

  $('[data-fancybox]').fancybox({
    buttons: ['thumbs', 'close']
  });
});

function mySlide(container) {
  const $slideContainer = container;
  const $slideGroup = $slideContainer.find('.slideGroup'); // ul
  const $slide = $slideGroup.find('li'); // li
  const slideCount = $slide.length; // li 갯수
  const $pagerGroup = $slideContainer.find('.pagerGroup'); // ol
  const $pager = $pagerGroup.find('li'); // li
  const $prev = $slideContainer.find('.prev');
  const $next = $slideContainer.find('.next');
  const interval = 3500;
  let currentIndex = 0; // 현재 slide index위치
  // Slide variable

  $pager.click(function(e) {
    e.preventDefault();

    let index = $(this).index();
    currentIndex = index;

    goToSlide(currentIndex);
  });

  $prev.click(function(e) {
    e.preventDefault();

    currentIndex--;
    check();

    goToSlide(currentIndex);
  });

  $next.click(function(e) {
    e.preventDefault();

    currentIndex++;
    check();

    goToSlide(currentIndex);
  });

  autoSlide();

  function goToSlide(index) {
    $slide.eq(index).addClass('active').siblings().removeClass('active');
    $pager.eq(index).addClass('active').siblings().removeClass('active');
  }
  function check() {
    if (currentIndex < 0) {
      currentIndex = slideCount - 1;
    }
    if (currentIndex > slideCount - 1) {
      currentIndex = 0;
    }
  }

  function autoSlide() {
    startSlide();

    $slideGroup
      .mouseenter(function() {
        stopSlide();
      })
      .mouseleave(function() {
        startSlide();
      });
  }

  function startSlide() {
    timer = setInterval(function() {
      currentIndex++;
      let nextIndex = currentIndex % slideCount;
      goToSlide(nextIndex);
    }, interval);
  }

  function stopSlide() {
    clearInterval(timer);
  }
}

function onMenu() {
  const $btnNav = $('header > div span');
  const $nav = $('header nav');
  const $navList = $nav.find('ul li');

  $navList.click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  $btnNav.click(function() {
    $nav.toggleClass('on');
    $(this).css({ display: 'none' });
    if ($nav.hasClass('on')) {
      $btnNav.removeClass('fa-bars').addClass('fa-times');
      $btnNav.fadeIn(1000);
      $('html, body').css({
        height: '100%',
        'overflow-y': 'hidden'
      });
    } else {
      $btnNav.removeClass('fa-times').addClass('fa-bars');
      $btnNav.fadeIn(1000);
      $('html, body').css({
        height: 'auto',
        'overflow-y': 'auto'
      });
    }
  });
}

function switchPage() {
  $('body').css({ display: 'none' });
  $('body').fadeIn(1000);
  $('header nav ul li a').click(function(event) {
    event.preventDefault();
    linkLocation = $(this).attr('href');
    $('body').fadeOut(1000, redirectPage);
  });

  function redirectPage() {
    window.location = linkLocation;
  }
}

function scrollDown() {
  const $btn_scrollDown = $('.main_page1 div > a:last-of-type');
  const $videoArea = $('.videoArea');

  $btn_scrollDown.click(function(e) {
    e.preventDefault();

    $('html, body').stop().animate(
      {
        scrollTop: $videoArea.offset().top
      },
      1000
    );
  });
}
