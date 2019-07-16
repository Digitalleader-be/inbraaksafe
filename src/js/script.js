 var config = {
	easing: 'hustle',
	reset:  true,
	delay:  'onload',
	vFactor: 0.90
}
window.sr = ScrollReveal({ reset: true });
sr.reveal('.fade_next *', { 
    duration: 2000,
    scale: 1,
    origin: 'bottom',
    interval: 60,
    reset: false,
    distance: '23px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
sr.reveal('.fade > div', { 
    duration: 2000,
    scale: 1,
    origin: 'bottom',
    interval: 60,
    distance: '23px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
sr.reveal('.fade_fast *', { 
    duration: 2000,
    scale: 1,
    origin: 'bottom',
    interval: 50,
    distance: '8px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
sr.reveal('.fall', { 
    duration: 2000,
    scale: 1,
    origin: 'top',
    interval: 160,
    distance: '500px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
sr.reveal('.jump', { 
    duration: 2000,
    reset: false,
    scale: 1,
    origin: 'bottom',
    interval: 160,
    distance: '150px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
sr.reveal('.image e', { 
    duration: 2000,
    scale: 1,
    interval: 160,
    origin: 'bottom',
    distance: '16px',
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
});
var rellax = new Rellax('.rellax');