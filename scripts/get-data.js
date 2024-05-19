import headerBehavior from './header.js'

new headerBehavior()

const btnMore = document.querySelector('.category__more');
const containerColoeing = document.querySelector('.content');

// const showData = function (data) {
//   const html = `<figure class="data">
//   <div class="blob">
//     <img src="./../data/image/${data.name}.jpg" alt="" />
//   </div>
//   <figcaption class="name">${data.title}</figcaption>
// </figure>`;

//   containerColoeing.insertAdjacentHTML('beforeend', html);
// };

// let n = 1;
// const addColoringData = function () {
//   fetch('./../data/json/vidogame.json')
//     .then(res => res.json())
//     .then(data => {
//       for (let i = 0; i < 4; i++) {
//         if (data[n]) showData(data[n]);
//         n++;
//       }
//     });
// };



// btnMore.addEventListener('click', addColoringData);


btnMore.addEventListener('click', function(){
  window.location.href = './one-category.html';
})
