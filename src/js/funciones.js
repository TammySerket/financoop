$('.carrusel-home').slick({
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
});
// Hubspot
(function myFunction() {
  setTimeout(function(){ 
    var iframe = document.getElementById("hs-form-iframe-0");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("hs-button")[0];
    console.log(elmnt)
    elmnt.style.background = "red";
  }, 1500);
})();
// Open menu mobile
$('.menu').click( function() {
  $('.navbar').toggleClass('open-navbar');
  $('body').toggleClass('no-scroll');
})