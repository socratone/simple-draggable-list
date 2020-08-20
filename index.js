const DATA = [
  { id: 1, title: '홈', route: '/' },
  { id: 2, title: '프로필', route: '/profile' },
  { id: 3, title: '포트폴리오1', route: '/portfolio1' },
  { id: 4, title: '포트폴리오2', route: '/portfolio2' },
  { id: 5, title: '포트폴리오3', route: '/portfolio3' },
];

const SELECTED_LINE_COLOR = 'black';

function dragStart(e) {
  e.dataTransfer.setData('dragged', e.target.id); // 드래그 할 때 dragged라는 이름으로 저장
  setTimeout(() => {
    const dropAreas = document.getElementsByClassName('drop-area');
    [...dropAreas].forEach((area) => {
      area.classList.add('expand'); // 드래그 할 때 expand 속성을 적용
    });
  }, 0);
}

function dragEnd() {
  const dropAreas = document.getElementsByClassName('drop-area');
  [...dropAreas].forEach((area) => {
    area.classList.remove('expand');
  });
}

function allowDrop(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.target.parentNode.style.background = SELECTED_LINE_COLOR;
}

function dragLeave(e) {
  e.target.parentNode.style.background = '';
}

function drop(e) {
  e.preventDefault();
  e.target.parentNode.style.background = ''; // 내려 놓은 라인(div)의 색을 원래대로 되돌린다.

  const id = event.dataTransfer.getData('dragged'); // 드래그할 때 저장했던 엘리먼트의 아이디를 가져온다.
  const dragged = document.getElementById(id);

  dragged.nextElementSibling.remove(); // 옮기기 전 dragged의 아래쪽 라인(div) 역할을 했던 엘리먼트를 삭제한다.

  const line = e.target.parentNode;
  line.after(dragged); // 내려 놓은 drop-area의 부모인 line 다음에 dragged가 오게 한다.

  const newLine = createLineElement();
  dragged.after(newLine); // dragged 다음에 새로운 라인(div)을 추가한다.
}

function createDraggableElement(id, title) {
  const li = document.createElement('li');
  li.id = id.toString();
  li.classList.add('draggable-element');
  li.addEventListener('dragstart', dragStart);
  li.addEventListener('dragend', dragEnd);
  li.draggable = 'true';
  li.innerText = title;
  return li;
}

function createLineElement() {
  const line = document.createElement('div');
  line.classList.add('line-element');
  const newDropArea = document.createElement('div');
  newDropArea.classList.add('drop-area');
  line.appendChild(newDropArea);

  newDropArea.addEventListener('drop', drop);
  newDropArea.addEventListener('dragover', allowDrop);
  newDropArea.addEventListener('dragenter', dragEnter);
  newDropArea.addEventListener('dragleave', dragLeave);
  return line;
}

function createNavChildren(DATA) {
  const nav = document.getElementById('nav');
  for (let i = 0; i < DATA.length; i++) {
    nav.appendChild(createLineElement());
    nav.appendChild(createDraggableElement(DATA[i].id, DATA[i].title));
  }
  nav.appendChild(createLineElement());
}

function init() {
  createNavChildren(DATA);
}

init();
