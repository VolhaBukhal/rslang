import navigation from './navigation';
import authentification from './authentification';

import { getWords } from './requests';

import { TGetWords } from './type/types';
import { store } from './store/store';

import Dictionary from './Dictionary';

export default async function App() {

  const levelBtns = document.querySelectorAll('.words-level');
  const nextPageBtn = document.querySelector('#next-page') as HTMLButtonElement;
  const prevPageBtn = document.querySelector('#prev-page') as HTMLButtonElement;
  const currentPageInfo = document.querySelector('#current-page') as HTMLElement;



  navigation();
  authentification();

  //render dictionary
  const renderDictionary = async () => {
    const dictEl = document.querySelector('.dictionary__row') as HTMLDivElement;
    const dict =  new Dictionary(dictEl, store.currentLevel, store.currentPage);
    await dict.getData();
    dict.render();
  };

  renderDictionary();

  levelBtns.forEach(level => level.addEventListener('click', (event: Event) => {
    store.currentLevel = (event.target as HTMLButtonElement).dataset.level || '0';
    store.currentPage =  '0';
    currentPageInfo.textContent = String(+store.currentPage + 1);


    levelBtns.forEach(el => el.classList.remove('active'));
    (event.target as HTMLButtonElement).classList.add('active');

    renderDictionary();
  }));

  nextPageBtn.addEventListener('click', ()=> {

    if (+store.currentPage < 29) {
      store.currentPage = String(+store.currentPage + 1);
    } else {
      store.currentPage = '29';
    }
    currentPageInfo.textContent = String(+store.currentPage + 1);
    renderDictionary();
  });

  prevPageBtn.addEventListener('click', ()=> {

    if (+store.currentPage > 0) {
      store.currentPage = String(+store.currentPage - 1);
    } else {
      store.currentPage = '0';
    }

    currentPageInfo.innerHTML = String(+store.currentPage + 1);
    renderDictionary();
  });
}