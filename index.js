const container = document.querySelector(".container");

const port = require('./script')
const serverUrl = "http://127.0.0.1:" + port;
setTimeout(() => {
  let userArr = [];

  const createCardList = (array) => {
    container.innerHTML = "";

    userArr.forEach((ele) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `<div class="name">Name</div><div class="name-content">${ele.username}</div><div class="email">Email</div><div class="email-content">${ele.email}</div>`;

      container.appendChild(card);
    });
  };

  fetch(serverUrl)
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      userArr = result;
      createCardList(userArr);
    });

  const addUsersButton = document.querySelector(".controls img");

  addUsersButton.addEventListener("click", () => {
    const username = prompt("Enter your username");
    const email = prompt("enter your email");

    const newUser = {
      username,
      email,
    };

  //   input.addEventListener("input", (event) => {
  //     const searchStr = event.target.value.toLowerCase();

  //     const filteredArray = usersArray.filter((ele) => {
  //       return (
  //         ele.username.toLowerCase().includes(searchStr) ||
  //         ele.email.toLowerCase().includes(searchStr)
  //       );
  //     });

  //     createCardList(filteredArray);
  //   });

    const secretKey = prompt("enter your secretKey");

    const bodyData = {
      newUser,
      secretKey,
    };

    fetch(`${serverUrl}/adddata`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        userArr = result;
        console.log(userArr);

        createCardList(result);
      });
  });
}, 2000);



