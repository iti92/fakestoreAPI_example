import list from 'src/constants/list';
import IListElement from 'src/types/list';

class ListGroup {
  constructor() {}

  public create(settings: IListElement[] | string[]): Element {
    const list = document.createElement('div');
    list.classList.add('list');

    settings.forEach((item) => {
      if (typeof item !== 'string') {
        const element = document.createElement('a');
        element.href = item.url;
        element.innerText = item.title;
        list.appendChild(element);
      } else {
        const element = document.createElement('div');
        element.innerText = item;
        list.appendChild(element);
      }
    });
    return list;
  }
}

export default ListGroup;
