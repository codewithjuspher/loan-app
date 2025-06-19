import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "react-i18next"

gsap.registerPlugin(ScrollTrigger)

export const ParallaxBackground: React.FC = () => {
    const { t } = useTranslation("homepage")
    const containerRef = useRef<HTMLDivElement>(null)
    const layer1 = useRef<HTMLDivElement>(null)
    const layer2 = useRef<HTMLDivElement>(null)
    const layer3 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                animation: gsap.timeline()
                    .to(layer1.current, { yPercent: 20, ease: "none" }, 0)
                    .to(layer2.current, { yPercent: 40, ease: "none" }, 0)
                    .to(layer3.current, { yPercent: 60, ease: "none" }, 0),
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                height: "100dvh",
                overflow: "hidden",
            }}
        >
            <div
                ref={layer3}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1920&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                    opacity: 0.3,
                }}
            />
            <div
                ref={layer2}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 2,
                    opacity: 0.4,
                }}
            />
            <div
                ref={layer1}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1920&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 3,
                    opacity: 0.6,
                }}
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "0 1rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                    }}
                >
                    {t("parallax.title", "Experience Financial Clarity")}
                </h1>

            </div>
        </div>
    )
}
