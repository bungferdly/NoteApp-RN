export default {
  request: ({ url }) => url.match(/note/),
  response: ({ params }) => {
    const totalItems = 23;
    const maxId = totalItems - (params._page - 1) * params._limit;
    const minId = Math.max(maxId - params._limit, 0);
    const data = {
      data: [...Array(maxId - minId)].map((_, i) => ({ id: maxId - i, title: `Mock Title ${maxId - i}` }))
    };
    return data;
  }
};
