export const slide = {
  initial: {
    y: "30",
    opacity: 0
  },
  animate: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: delay }
  }),
  exit: {
    y: "30",
    opacity: 0
  }
}