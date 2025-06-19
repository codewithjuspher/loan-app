import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

export const initInviteAnimations = (containerRef: React.RefObject<HTMLDivElement>) => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll(".invite-card")

    cards.forEach((card) => {
        gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
            }
        )
    })
}
