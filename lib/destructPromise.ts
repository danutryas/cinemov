const destructPromise = async (promise: any) => {
  let data = null;
  promise.then((data: any) => {
    data = data;
  });
  return data;
};

export default destructPromise;
