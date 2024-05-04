const btnMore = document.querySelector('.children__more');
const containerColoeing = document.querySelector('.children__content');

const showData = function (data) {
  const html = `<figure class="children__data">
  <img src="./../data/image/${data.name}.jpg" alt="" />
  <figcaption class="children__name">${data.title}</figcaption>
</figure>`;

  containerColoeing.insertAdjacentHTML('beforeend', html);
};

let n = 1;
const addColoringData = function () {
  fetch('./../data/json/vidogame.json')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < 4; i++) {
        if (data[n]) showData(data[n]);
        n++;
      }
    });
};

btnMore.addEventListener('click', addColoringData);
