const paintFavs = () => {
    const e = document.querySelector(".js-main__fav__list");
    e.innerHTML = "";
    const t = document.createElement("h2"),
      a = document.createTextNode("Mis series favoritas");
    t.appendChild(a), t.classList.add("main__fav__title"), e.appendChild(t);
    for (const t of favouriteList) {
      const a = document.createElement("li");
      a.classList.add("js-main__fav__item", "main__fav__item");
      const s = document.createElement("img");
      s.classList.add("main__fav__photo");
      const i = document.createTextNode(t.name),
        n = document.createElement("p");
      n.classList.add("main__fav__text");
      const o = document.createElement("div"),
        l = document.createTextNode("X");
      n.appendChild(i),
        s.setAttribute("src", t.url),
        o.appendChild(l),
        o.classList.add("js-main__fav__btn", "main__fav__btn"),
        a.appendChild(s),
        a.appendChild(n),
        a.appendChild(o),
        (a.dataset.id = t.id),
        e.appendChild(a);
    }
    if ((listenButFavs(), e.hasChildNodes())) {
      const t = document.createElement("button"),
        a = document.createTextNode("Borrar todas");
      t.classList.add("js-main__favs__del", "main__favs__del"),
        t.appendChild(a),
        e.append(t),
        listenButDel();
    }
  },
  handleFav = (e) => {
    const t = searchList.find((t) => t.id == e.currentTarget.dataset.id);
    if (0 == favouriteList.length) favouriteList[0] = t;
    else {
      const e = favouriteList.findIndex((e) => e.id === t.id);
      -1 === e
        ? (favouriteList[favouriteList.length] = t)
        : favouriteList.splice(e, 1);
    }
    paintFavs(), paintFilms(), setToLocalSt();
  },
  handleDelFav = (e) => {
    const t = e.currentTarget.parentElement.dataset.id,
      a = favouriteList.findIndex((e) => e.id == t);
    favouriteList.splice(a, 1), paintFavs(), paintFilms(), setToLocalSt();
  },
  handleDelAll = () => {
    (favouriteList = []),
      paintFilms(),
      paintFavs(),
      localStorage.removeItem("favs");
    document.querySelector(".js-main__fav__list").innerHTML = "";
  },
  listenButFavs = () => {
    const e = document.querySelectorAll(".js-main__fav__btn");
    for (const t of e) t.addEventListener("click", handleDelFav);
  },
  listenButDel = () => {
    document
      .querySelector(".js-main__favs__del")
      .addEventListener("click", handleDelAll);
  },
  listenFilms = () => {
    const e = document.querySelectorAll(".js-main__search__item");
    for (const t of e) t.addEventListener("click", handleFav);
  },
  setToLocalSt = () => {
    let e = "";
    (e = JSON.stringify(favouriteList)), localStorage.setItem("favs", e);
  },
  getFromLocalSt = () => {
    if (null != localStorage.getItem("favs")) {
      const e = JSON.parse(localStorage.getItem("favs"));
      (favouriteList = e), paintFavs(), listenButFavs();
    }
  },
  buttonEl = document.querySelector(".js-form__button");
let searchList = [],
  favouriteList = [];
const isFavorite = (e) => {
    for (const t of favouriteList) if (t.id == e) return !0;
  },
  paintFilms = () => {
    const e = document.querySelector(".js-main__search__list");
    e.innerHTML = "";
    for (const t of searchList) {
      const a = document.createElement("li");
      a.classList.add("js-main__search__item", "main__search__item");
      const s = document.createElement("img");
      s.classList.add("js-main__search__photo");
      const i = document.createTextNode(t.name),
        n = document.createElement("p");
      n.classList.add("js-main__search__text"),
        n.appendChild(i),
        s.setAttribute("src", t.url),
        a.appendChild(s),
        a.appendChild(n),
        isFavorite(t.id) &&
          ((a.style.color = "grey"), (a.style.backgroundColor = "blueviolet")),
        (a.dataset.id = t.id),
        e.appendChild(a);
    }
    listenFilms();
  },
  getData = (e) => {
    fetch("//api.tvmaze.com/search/shows?q=" + e)
      .then((e) => e.json())
      .then((e) => {
        searchList = [];
        for (const t of e) {
          let e = "";
          if (null === t.show.image) {
            e =
              "//via.placeholder.com/210x295/CCCCCC/8A2BE2/?text=" +
              t.show.name.toUpperCase();
          } else e = t.show.image.medium;
          const a = { name: t.show.name, id: t.show.id, url: e };
          searchList.push(a);
        }
        paintFilms();
      });
  },
  handleClick = (e) => {
    e.preventDefault();
    const t = document.querySelector(".js-form__input").value;
    t && getData(t);
  };
buttonEl.addEventListener("click", handleClick), getFromLocalSt(), window.alert;
