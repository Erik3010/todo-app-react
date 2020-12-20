const formatDate = () => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date());
};

const generateID = (collections) => {
  return Math.max(...collections.map((collection) => collection.id), 0) + 1;
};

export { formatDate, generateID };
