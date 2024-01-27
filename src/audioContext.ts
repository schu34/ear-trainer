let ctx: AudioContext;
export const getContext = () => {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
};
