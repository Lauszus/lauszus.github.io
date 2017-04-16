(function() {
 	var menu = document.querySelector('.navbar'),
     menulink = document.querySelector('.js-navbar-menu-toggle');
  menulink.addEventListener('click', function(e){
    menu.classList.toggle('active');
    e.preventDefault();
  });
})();
