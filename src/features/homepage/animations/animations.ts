import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

export const initHowItWorksAnimations = (containerRef: React.RefObject<HTMLDivElement>) => {
  gsap.registerPlugin(ScrollTrigger)

  if (!containerRef.current) return

  const cards = containerRef.current.querySelectorAll(".how-card")

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      }
    )
  })
}
