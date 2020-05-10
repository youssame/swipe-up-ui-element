document.addEventListener('DOMContentLoaded', function() {
    // THE ELEMENTS
    const app = document.getElementById('app');
    const swipe_up_element = document.getElementById('swipe-up-header').parentElement;
    const post_content = document.getElementById('post-content');
    const close_swipe_up = document.getElementById('clode-swipe-up');
    const posts = document.querySelectorAll('.post');
    let activate_swipe_up = false;
    let pageY = 0;

    // HANDLE POST CLICK
    close_swipe_up.addEventListener('click', () => {
        swipe_up_element.classList.remove('open');
    });
    posts.forEach((post) => {
        post.addEventListener('click', () => {
            swipe_up_element.classList.add('open');
        });
    });

    // HANDLE SWIPE UP
    app.addEventListener('touchstart', (e) => {
        const id = getTargetId(e);
        activate_swipe_up = id === 'swipe-up-header';
    });
    app.addEventListener('touchend', (e) => {
        if (!activate_swipe_up) {
            return;
        }
        swipeElement();
    });
    app.addEventListener('touchmove', (e) => {
        if (!activate_swipe_up) {
            return;
        }
        e.changedTouches[0].pageY > pageY ? mode = 'DOWN' : mode = 'UP';
        pageY = e.changedTouches[0].pageY;
        changePostContentPosition();

    });
    function changePostContentPosition() {
        const app_height = app.clientHeight;
        const top = (pageY / app_height) * 100;
        const transition = post_content.style.transition;
        transition !== 'none' ? post_content.style.transition = 'none' : '';
        top <= 70 && top >= 10 ? post_content.style.top = top + '%' : '';
    }
    function getTargetId (e) {
        const target = e.target;
        const attributes = target.attributes ? target.attributes : {};
        const id = attributes.id ? attributes.id.nodeValue : '';
        return id;
    }
    function swipeElement () {
        post_content.style.transition = 'top 0.3s';
        mode === 'UP' ? swipe_up_element.classList.add('open') : swipe_up_element.classList.remove('open');
        pageY = 0;
        post_content.style.top = '';
    }
});