// make a search to seat geek api
export const searchAPIEvents = (query) => {
    return fetch(`https://api.seatgeek.com/2/events?q=${query}&client_id=Mjc4Nzk0NzV8MTY1NzkxMzI4MC4xMDY3MDc2`);
  };

  export const getAPIEvent = (id) => {
    return fetch(`https://api.seatgeek.com/2/events?id=${id}&client_id=Mjc4Nzk0NzV8MTY1NzkxMzI4MC4xMDY3MDc2`);
  };