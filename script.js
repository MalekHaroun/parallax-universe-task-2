$(document).ready(function() {$(window).on('scroll', function() {
        parallaxScroll();
        revealText();
    });

    parallaxScroll();
    revealText();

    function parallaxScroll() {
        var scrolled = $(window).scrollTop();
        var heroHeight = $('.background').outerHeight();

        $('.layer-1').css('transform', `translate3d(0, ${-scrolled * 0.25}px, 0)`);
        $('.layer-2').css('transform', `translate3d(0, ${-scrolled * 0.50}px, 0)`);
        $('.layer-3').css('transform', `translate3d(0, ${-scrolled * 0.75}px, 0)`);
        
        $('.nebula-1').css('transform', `translate3d(0, ${-scrolled * 0.03}px, 0)`);
        $('.nebula-2').css('transform', `translate3d(0, ${-scrolled * 0.05}px, 0)`);

        $('.planet').css('transform', `translate3d(0, ${scrolled * 0.2}px, 0)`);
        $('.planet-ring').css('margin-top', `${scrolled * 0.08}px`);
        $('.moon').css('transform', `translate3d(0, ${scrolled * 0.12}px, 0)`);
        $('.stars').css('background-position', `0 ${scrolled * 0.08}px`);
        $('.hero-atmosphere').css('transform', `translate3d(0, ${scrolled * 0.12}px, 0)`);
        
        $('.comet').css('transform', `translate3d(${scrolled * 1.8}px, ${scrolled * 0.6}px, 0) rotate(-15deg)`);

        var progress = Math.min(scrolled / (heroHeight * 0.7), 1);
        $('h1').css({
            'opacity': 1 - progress,
            'margin-top': `${-scrolled * 0.12}px`
        });

        var rockSpeeds = [0.8, 0.6, 0.4, 0.5, 0.7, 0.7, 0.5, 0.2, 0.4, 1.4, 1.8];
        $('.rocks').each(function(index) {
            var speed = rockSpeeds[index % rockSpeeds.length];
            var spin = (index % 2 === 0 ? 1 : -1) * (scrolled * speed * 0.4);
            var drift = (index % 3 === 0 ? 1 : -1) * (scrolled * speed * 0.15);
            
            $(this).css('transform', `translate3d(${drift}px, ${-scrolled * speed}px, 0) rotate(${spin}deg)`);
        });
    }

    function revealText() {
        var windowBottom = $(window).scrollTop() + $(window).height();$('p').each(function() {
            if ($(this).offset().top < windowBottom - 50) {$(this).addClass('visible');
            }
        });
    }

    $('#scan-btn').on('click', function() {
        $('body').toggleClass('scan-mode');
        var $textSpan =$(this).find('.hud-text');
        
        if ($('body').hasClass('scan-mode')) {
            $textSpan.text('DISABLE SCANNER');$(this).css({ 'color': '#ff477e', 'border-color': '#ff477e' });
        } else {
            $textSpan.text('SCAN ANOMALIES');$(this).css({ 'color': 'var(--cyan)', 'border-color': 'rgba(141, 234, 255, 0.3)' });
        }
    });

    $('#warp-btn').on('click', function() {
        var targetPosition = $(document).height() - $(window).height();$('html, body').animate({
            scrollTop: targetPosition
        }, 2500); 
    });

    $(window).on('mousemove', function(e) {
        var x = (e.clientX / $(window).width()) - 0.5;
        var y = (e.clientY / $(window).height()) - 0.5;
        
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        
        $('h1').css({ '--tilt-x': (-y * 8) + 'deg', '--tilt-y': (x * 10) + 'deg' });$('.planet').css({ '--move-x': (x * 22) + 'px', '--move-y': (y * 22) + 'px' });
        $('.planet-ring').css({ '--move-x': (x * -30) + 'px', '--move-y': (y * -30) + 'px' });$('.moon').css({ '--move-x': (x * 12) + 'px', '--move-y': (y * 12) + 'px' });
    });
});