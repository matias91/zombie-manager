const create = (api) => {
  const zombieGetAll = ({ limit = 30, offset }) =>
    api.get('/zombie', { limit, offset });

  const zombieGetSummary = () =>
    api.get('/zombie/summary');

  const zombieAdd = ({ name, location }) => {
    return api.post(
      '/zombie/add',
      JSON.stringify({ name, location })
    );
  }

  const zombieUpdate = ({ id, data }) => {
    return api.patch(
      `/zombie/${id}`,
      JSON.stringify(data)
    );
  }

  const zombieRemove = ({ id }) => {
    return api.delete(`/zombie/remove/${id}`);
  }

  return {
    zombieGetAll,
    zombieGetSummary,
    zombieAdd,
    zombieUpdate,
    zombieRemove
  }
}

const zombie = { create };

export default zombie;
