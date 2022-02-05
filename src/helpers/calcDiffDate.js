export const calcDiffDate = (birthDate) => {
  const birth = new Date(birthDate);

  const curtDate = new Date();

  const years = Math.floor(
    (curtDate - birth) / (1000 * 60 * 60 * 24 * 30 * 12)
  );
  return years;
};
