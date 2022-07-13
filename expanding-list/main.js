console.log('hiya');

/**
 * See:
 * https://github.com/mdn/web-components-examples/
 * blob/main/expanding-list-web-component/main.js
 *
 */
class ExpandingList extends HTMLUListElement {
  constructor() {

    self = super();

    const uls = Array.from(self.querySelectorAll('ul'))
    const lis = Array.from(self.querySelectorAll('li'))

    uls.forEach(ul => {
      ul.style.display = 'none';
    });

    lis.forEach(li => {

      if (li.querySelectorAll('ul').length > 0) {
        li.setAttribute('class', 'closed')

        const childText = li.childNodes[0];
        const newSpan = document.createElement('span');

        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = 'pointer';
        newSpan.onclick = self.showul;

        childText.parentNode.insertBefore(newSpan, childText)
        childText.parentNode.removeChild(childText)
      }
    })
  }

  showul = function(evt) {
    const nextul = evt.target.nextElementSibling;

    if (nextul.style.display === 'block') {
      nextul.style.display = 'none';
      nextul.parentNode.setAttribute('class', 'closed');
    } else {
      nextul.style.display = 'block';
      nextul.parentNode.setAttribute('class', 'open')
    }
  }
}

customElements.define('expanding-list', ExpandingList, { extends: 'ul' })