//#region Navbar
let navElem = document.querySelector('nav');
let extendNav = document.getElementById('sidebar-extend');
const nav = {
    hide: () => {
        navElem.style.width = '0px';
        navElem.style.opacity = '0';
        setTimeout(() => {
            navElem.style.display = 'none';
            extendNav.style.display = 'block';
        }, 250);
    },
    show: () => {
        navElem.style.display = 'flex';
        extendNav.style.display = 'none';
        setTimeout(() => {
            navElem.style.opacity = '1';
            navElem.style.width = '300px'
        }, 10);
    }
}
//#endregion

//#region  Multipage Handling
let pageTitle = document.querySelector('title');
let mainContent = document.getElementById('main_content');
let page = localStorage.getItem('page') || 'today';
const PAGES = {
    today: {
        title: 'Heute',
        ht: '<h2>Heute</h2>'
    },
    week: {
        title: 'Woche',
        ht: '<h2>Diese Woche</h2>'
    },
    calender: {
        title: 'Kalender',
        ht: '<h2>Kalender</h2>'
    },
    categories: {
        title: 'Kategorien',
        ht: '<h2>Kategorien</h2>'
    },
    err: {
        title: 'Seite nicht gefunden',
        ht: '<h2>Seite nicht gefunden</h2><div id="err-spinner">)-:</div>'
    }
}

function openPage(page) {
    if (!PAGES[page]) page = 'err';
    mainContent.innerHTML = PAGES[page].ht;
    pageTitle.innerHTML = `Todos24 - ${PAGES[page].title}`;
    page = page;
    localStorage.setItem('page', page);
    if (window.innerWidth < 600) {
        nav.hide();
    }
}
// openPage(page);
//#endregion

//#region UI Handling
const TODO_ADD_FORM = {
    show: () => document.getElementById('addTodoForm').style.display = 'flex',
    hide: () => document.getElementById('addTodoForm').style.display = 'none'
}
//#endregion